import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import { getByTheSameArtistNFTs, getOwnedNFTS, getSeriesData } from 'actions/nft';
import Avatar from 'components/base/Avatar';
import Media from 'components/base/Media';
import ModalShare from 'components/base/ModalShare';
import Showcase from 'components/base/Showcase';
import { Container, Title, Wrapper } from 'components/layout';
import Button from 'components/ui/Button';
import Chip from 'components/ui/Chip';
import Icon from 'components/ui/Icon';
import { UserType, NftType } from 'interfaces';
import { MARKETPLACE_ID } from 'utils/constant';
import { getRandomNFTFromArray } from 'utils/functions';
import { toggleLike } from 'utils/profile';
import { LIKE_ACTION, UNLIKE_ACTION } from 'utils/profile/constants';
import { computeCaps, computeTiime } from 'utils/strings';

import Details from './Details';
export interface NFTPageProps {
  NFT: NftType;
  setNftToBuy: (NFT: NftType) => void;
  user: UserType;
  type: string | null;
  setExp: (n: number) => void;
  capsValue: number;
  isUserFromDappQR: boolean;
}

const NFTPage = ({
  setExp,
  NFT,
  setNftToBuy,
  user,
  type,
  isUserFromDappQR,
}: NFTPageProps) => {
  const [isLiked, setIsLiked] = useState(
    (NFT.serieId === '0'
      ? user?.likedNFTs?.some(({ nftId }) => nftId === NFT.id)
      : user?.likedNFTs?.some(({ serieId }) => serieId === NFT.serieId)) ?? false
  );
  const [likeLoading, setLikeLoading] = useState(false);
  const [modalShareOpen, setModalShareOpen] = useState(false);
  const [byTheSameArtistNFTs, setByTheSameArtistNFTs] = useState<NftType[]>([])
  const [canUserBuyAgain, setCanUserBuyAgain] = useState(true)
  const [seriesData, setSeriesData] = useState([NFT])
  const isVR = (NFT.categories.findIndex(x => x.code === "vr") !== -1) && NFT.creator === NFT.owner
  const shareSubject = 'Check out this Secret NFT';
  const shareText = `Check out ${NFT.title ? NFT.title : 'this nft'} on ${
    process.env.NEXT_PUBLIC_APP_LINK
      ? process.env.NEXT_PUBLIC_APP_LINK
      : 'secret-nft.com'
  }`;
  const shareUrl =
    (typeof window !== 'undefined' && window.location?.href) ||
    `https://www.${
      process.env.NEXT_PUBLIC_APP_LINK
        ? process.env.NEXT_PUBLIC_APP_LINK
        : 'secret-nft.com'
    }/nft/${NFT.id}`;
  const smallestPriceRow =
    seriesData
      .filter((x) => x.marketplaceId === MARKETPLACE_ID)
      .sort(
        (a, b) =>
          (a.owner === b.owner
            ? 0
            : !user
            ? 0
            : a.owner === user.walletId
            ? 1
            : b.owner === user.walletId
            ? -1
            : 0) || // take nft which i'm not owner first
          b.listed - a.listed || //listed first
          Number(a.price) - Number(b.price) || //lowest price first
          Number(a.priceTiime) - Number(b.priceTiime) // lower pricetiime first
      )[0];
  const userCanBuy = (!isVR || (isVR && isUserFromDappQR && canUserBuyAgain)) && (user
    ? user.capsAmount &&
      smallestPriceRow &&
      smallestPriceRow.listed &&
      smallestPriceRow.price &&
      smallestPriceRow.price !== '' &&
      Number(user.capsAmount) >= Number(smallestPriceRow.price) &&
      user.walletId !== smallestPriceRow.owner &&
      smallestPriceRow.marketplaceId === MARKETPLACE_ID
    : smallestPriceRow
    ? smallestPriceRow.listed === 1 &&
      smallestPriceRow.marketplaceId === MARKETPLACE_ID
    : false);

  useEffect(() => {
    loadSeriesData(NFT.serieId);
  }, []);
  
  useEffect(() => {
    setNftToBuy(smallestPriceRow);
  }, [smallestPriceRow]);

  useEffect(() => {
    loadByTheSameArtistNFTs()
  }, [NFT])

  useEffect(() => {
    if (isVR && user){
      loadCanUserBuyAgain()
    }else{
      setCanUserBuyAgain(true)
    }
  }, [isVR])

  const loadSeriesData = async (seriesId: string) => {
    try{
      const result = await getSeriesData(seriesId)
      setSeriesData(result.data)
    }catch(err){
      console.log(err)
    }
  }

  const loadCanUserBuyAgain = async () => {
    try{
      const res = await getOwnedNFTS(user.walletId,false, undefined, undefined, undefined, seriesData?.map(x => x.id))
      const canUserBuyAgainValue = res.totalCount === 0
      setCanUserBuyAgain(canUserBuyAgainValue)
      return canUserBuyAgainValue
    }catch(err){
      setCanUserBuyAgain(false)
      return false
    }
  }

  const loadByTheSameArtistNFTs = async () => {
    const NFTs = await getByTheSameArtistNFTs(NFT.creator, "1", "7")
    setByTheSameArtistNFTs(NFTs.data.filter(x => x.serieId !== NFT.serieId))
  }

  const toggleLikeDislike = async () => {
    try {
      if (!likeLoading && user?.walletId) {
        setLikeLoading(true);
        await toggleLike(NFT, isLiked ? UNLIKE_ACTION : LIKE_ACTION, user.walletId, setIsLiked);
        setLikeLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLikeLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (window && window.isRNApp &&  window.navigator && window.navigator.share){
        await window.navigator.share({
          title: shareSubject,
          text: shareText,
          url: shareUrl
        })
      }else{
        setModalShareOpen(true)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuy = async () => {
    //get a random row to buy if same price
    const smallestPriceRows = seriesData
        .filter((x) => x.marketplaceId === MARKETPLACE_ID && x.listed===1 && (!user || (x.owner !== user.walletId)))
        .sort(
          (a, b) =>
            Number(a.price) - Number(b.price) || //lowest price first
            Number(a.priceTiime) - Number(b.priceTiime) // lower pricetiime first
        ).filter((x, _i, arr) => 
          x.price === arr[0].price &&
          x.priceTiime === arr[0].priceTiime
        )
    let canBuyAgain = true
    if (isVR){
      canBuyAgain = await loadCanUserBuyAgain()
    }
    if (canBuyAgain){
      setNftToBuy(getRandomNFTFromArray(smallestPriceRows));
      setExp(2);
    }
  };

  const smallestCapsPrice = Number(smallestPriceRow?.price);
  const smallestTiimePrice = Number(smallestPriceRow?.priceTiime);
  const isSmallestCapsPrice = smallestCapsPrice > 0;
  const isSmallestTiimePrice = smallestTiimePrice > 0;

  const smallestPriceWording =
    isSmallestCapsPrice || isSmallestTiimePrice
      ? `${isSmallestCapsPrice ? `${computeCaps(smallestCapsPrice)} CAPS` : ''}
          ${isSmallestCapsPrice && isSmallestTiimePrice ? ' / ' : ''}
          ${isSmallestTiimePrice ? `${computeTiime(smallestTiimePrice)} TIIME` : ''}`
      : undefined;

  const ctaWording =
    isVR && !isUserFromDappQR
      ? 'Reserved for VR gallery'
      : !canUserBuyAgain
      ? '1 VR NFT per account'
      : smallestPriceWording && `Buy for ${smallestPriceWording}`;

  return (
    <Container>
      <Wrapper>
        <SNftWrapper>
          <SMediaWrapper>
            <Media src={NFT.properties?.preview.ipfs!} type={type} alt="imgnft" draggable="false" />
            <SScaleButton color="invertedContrast" icon="scale" onClick={() => setExp(1)} size="small" variant="contained" />
          </SMediaWrapper>
          <SInfosContainer>
            <STopInfosContainer>
              <Avatar
                isVerified={NFT.creatorData?.verified}
                name={NFT.creatorData?.name}
                picture={NFT.creatorData?.picture}
                twitterName={NFT.creatorData?.twitterName}
                walletId={NFT.creatorData?.walletId}
              />
              <STopCtasContainer>
                <Chip color="invertedContrast" icon="eye" size="medium" text={NFT.viewsCount} variant="rectangle" />
                <Button color="neutral200" disabled={likeLoading} icon="heart" isLoading={likeLoading} onClick={toggleLikeDislike} size="small" variant="outlined" />
                <Button color="neutral200" icon="share" onClick={handleShare} size="small" variant="outlined" />
              </STopCtasContainer>
            </STopInfosContainer>
            <STitle>
              {NFT.title}
              {NFT.isCapsule && (
                <SChip
                  color="primaryLight"
                  text={
                    <>
                      <SDot />
                      Capsule
                    </>
                  }
                  variant="rectangle"
                />
              )}
            </STitle>
            {NFT.categories.length > 0 && (
              <SCategoriesWrapper>
                {NFT.categories.map(({ name, code }) => (
                  <Chip key={code} color="invertedContrast" text={name} size="medium" variant="rectangle" />
                ))}
              </SCategoriesWrapper>
            )}
            {NFT.description && <SDescription>{NFT.description}</SDescription>}
            {ctaWording && (
              <SBuyContainer>
                <SBuyTopContainer>
                  <Button color="primary" disabled={!userCanBuy} onClick={handleBuy} size="medium" text={ctaWording} variant="contained"/>
                  {/* TODO: Use real date when biding option is implemented */}
                  {/* <Countdown date={new Date('2022-01-17T03:24:00')} /> */}
                </SBuyTopContainer>
                <SAvailableContainer>
                  <SAvailableText>
                    <SIcon name="noNFTImage" />
                    <SAvailableLabel>
                      {`${NFT.totalListedInMarketplace ?? 0} of ${NFT.totalNft ?? 0}`} available
                    </SAvailableLabel>
                  </SAvailableText>
                  <SAvailableBackLine />
                </SAvailableContainer>
              </SBuyContainer>
            )}
          </SInfosContainer>
        </SNftWrapper>
        <SDetailsWrapper>
          <Details
            NFT={NFT}
            seriesData={seriesData}
            user={user}
            setNftToBuy={setNftToBuy}
            setExp={setExp}
            isUserFromDappQR={isUserFromDappQR}
            isVR={isVR}
            canUserBuyAgain={canUserBuyAgain}
          />
        </SDetailsWrapper>
      </Wrapper>
      {byTheSameArtistNFTs.length > 0 && (
        <Wrapper>
          <Showcase category="By the same artist" NFTs={byTheSameArtistNFTs} user={user} />
        </Wrapper>
      )}
      {modalShareOpen && (
        <ModalShare
          setModalExpand={setModalShareOpen}
          title={'Share this NFT with your friends'}
          subject={shareSubject}
          text={shareText}
          url={shareUrl}
        />
      )}
    </Container>
  );
};

const SNftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
`;

const SDetailsWrapper = styled.div`
  margin-top: 5.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 9.6rem;
  }
`;

const SMediaWrapper = styled.div`
  height: ${({theme}) => theme.sizes.cardHeight.md};
  width: ${({theme}) => theme.sizes.cardWidth.md};
  display: flex;
  position: relative;
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  box-shadow: 0px 0px 14.5243px 5.0835px rgba(0, 0, 0, 0.15);
  border-radius: 1.2rem;

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: ${({theme}) => theme.sizes.cardHeight.lg};
    width: ${({theme}) => theme.sizes.cardWidth.lg};
  }
`;

const SScaleButton = styled(Button)`
  position: absolute;
  bottom: 2.4rem;
  right: 2.4rem;
  z-index: 3;
`;

const SInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 4rem;
  width: 100%;
  max-width: ${({theme}) => theme.sizes.cardWidth.md};

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 48rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 8rem;
    margin-top: 0;
    max-width: none;
    width: auto;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 12rem;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-left: 16rem;
  }
`;

const STopInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const STopCtasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.4rem;

  > * {
    &:not(:first-child) {
      margin-left: 1.6rem;
    };
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
  }
`;

const STitle = styled(Title)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3.2rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
    text-align: left;
  }
`;

const SDescription = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.neutral200};
  margin-top: 3.2rem;
  text-align: justify;
  white-space: pre-line;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 5.6rem;
    text-align: left;
  }
`;

const SChip = styled(Chip)`
  margin: 1.6rem auto 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0;
    transform: translateY(85%);
  }
`;

const SDot = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background: ${({theme}) => theme.colors.primary};
  border-radius: 50%;
`;

const SCategoriesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;


  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: start;
    margin: 0;
  }
`;

const SBuyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 4rem;
  position: relative;
  width: fit-content;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-self: flex-start;
    margin-top: 4.8rem;
  }
`;

const SBuyTopContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  > * {
      &:not(:first-child) {
        margin-bottom: 1.6rem;
      }
    }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;

    > * {
      &:not(:first-child) {
        margin-bottom: 0;
        margin-left: 5.6rem;
      }
    }
  }
`;

const SAvailableContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
`;

const SAvailableText = styled.div`
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
`;

const SIcon = styled(Icon)`
  width: 2.4rem;
  height: 2.4rem;
`;

const SAvailableLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-size: 1.6rem;
  margin-left: 0.8rem;
  white-space: nowrap;
`;

const SAvailableBackLine = styled.div`
  width: calc(100% - 4.8rem);
  border-bottom: solid 1px;
  border-color: ${({ theme }) => theme.colors.neutral400};
  position: absolute;
  left: 2.4rem;
  z-index: -1;
`;

export default NFTPage;
