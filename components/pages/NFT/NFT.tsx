import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components'
import style from './NFT.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Media from 'components/base/Media';
import Scale from 'components/assets/scale';
import Share from 'components/assets/share';
import Like from 'components/assets/heart';
import Eye from 'components/assets/eye';
import { computeCaps, computeTiime, middleEllipsis } from 'utils/strings';
import { UserType, NftType } from 'interfaces';
import { likeNFT, unlikeNFT } from 'actions/user';
import ModalShare from 'components/base/ModalShare';
import NoNFTImage from '../../assets/NoNFTImage';
import Details from './Details';
import Creator from 'components/base/Creator';
import { MARKETPLACE_ID } from 'utils/constant';
import { Title } from 'components/layout'
import Chip from 'components/ui/Chip';
import Showcase from 'components/base/Showcase';
import { getByTheSameArtistNFTs, getOwnedNFTS } from 'actions/nft';
import { getRandomNFTFromArray } from 'utils/functions';

export interface NFTPageProps {
  NFT: NftType;
  setNftToBuy: (NFT: NftType) => void;
  user: UserType;
  setUser: (u: UserType) => void;
  type: string | null;
  setExp: (n: number) => void;
  setModalExpand: (b: boolean) => void;
  capsValue: number;
  isUserFromDappQR: boolean;
}

const NFTPage = ({
  setExp,
  NFT,
  setNftToBuy,
  setModalExpand,
  user,
  setUser,
  type,
  isUserFromDappQR,
}: NFTPageProps) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const [modalShareOpen, setModalShareOpen] = useState(false);
  const [byTheSameArtistNFTs, setByTheSameArtistNFTs] = useState<NftType[]>([])
  const [canUserBuyAgain, setCanUserBuyAgain] = useState(true)
  const isVR = (NFT.categories.findIndex(x => x.code === "vr") !== -1 || NFT.serieId === "1390370908" || NFT.serieId === "3350596370") && NFT.creator === NFT.owner
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
  const isLiked = !user
    ? undefined
    : NFT.serieId === '0'
    ? user.likedNFTs?.map((x) => x.nftId).includes(NFT.id)
    : user.likedNFTs?.map((x) => x.serieId).includes(NFT.serieId);
  const numberListedOnThisMarketplace = NFT.totalListedInMarketplace 
    ? NFT.totalListedInMarketplace 
    : !NFT.serieData
    ? 0
    : NFT.serieData.reduce(
        (prev, current) =>
          prev +
          (current?.listed === 1 && current.marketplaceId === MARKETPLACE_ID
            ? 1
            : 0),
        0
      );
  const smallestPriceRow =
    (!NFT.serieData || NFT.serieData.length <= 1)
      ? NFT
      : NFT.serieData
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

  const loadCanUserBuyAgain = async () => {
    try{
      const res = await getOwnedNFTS(user.walletId,false, undefined, undefined, undefined, true, NFT.serieData?.map(x => x.id))
      const canUserBuyAgainValue = res.totalCount === 0
      setCanUserBuyAgain(canUserBuyAgainValue)
      return canUserBuyAgainValue
    }catch(err){
      setCanUserBuyAgain(false)
      return false
    }
  }

  const loadByTheSameArtistNFTs = async () => {
    const NFTs = await getByTheSameArtistNFTs(NFT.creator, "1", "7", true)
    setByTheSameArtistNFTs(NFTs.data.filter(x => x.serieId !== NFT.serieId))
  }

  const handleLikeDislike = async () => {
    try {
      let res = null;
      if (!likeLoading && user) {
        setLikeLoading(true);
        if (!isLiked) {
          res = await likeNFT(user.walletId, NFT.id, NFT.serieId);
        } else {
          res = await unlikeNFT(user.walletId, NFT.id, NFT.serieId);
        }
      }
      if (res !== null) setUser({ ...user, ...res });
      setLikeLoading(false);
    } catch (err) {
      console.error(err);
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
    const smallestPriceRows = (!NFT.serieData || NFT.serieData.length <= 1) ? 
      [NFT]
    : 
      NFT.serieData
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

  return (
    <div className={style.Container}>
      <div className={style.MainWrapper}>
        <div className={style.Wrapper}>
          <SMediaWrapper className={style.NFT}>
            <Media
              src={NFT.image!}
              type={type}
              alt="imgnft"
              draggable="false"
              className={style.NFTIMG}
            />
            <div onClick={() => setExp(1)} className={style.Scale}>
              <Scale className={style.ScaleSVG} />
            </div>
          </SMediaWrapper>
          <div className={style.Text}>
            <div className={style.Top}>
              <div className={style.TopInfosCreator}>
                <div className={style.TopInfosCreatorPicture}>
                  <Creator
                    className={style.TopInfosCreatorPictureIMG}
                    size={'fullwidth'}
                    user={NFT.creatorData}
                    walletId={NFT.creator}
                  />
                </div>
                <div className={style.TopInfosCreatorName}>
                  <Link href={`/${NFT.creator}`}>
                    <a>{NFT.creatorData?.name || middleEllipsis(NFT.creator, 20)}</a>
                  </Link>
                  <span className={style.creatorTwitterUsername}>
                    {NFT.creatorData?.twitterName || null}
                  </span>
                </div>
              </div>
              <div className={style.TopInfos}>
                <div className={style.Views}>
                  <Eye className={style.EyeSVG} />
                  {NFT.viewsCount}
                </div>
                <div
                  className={`${style.Like} ${isLiked ? style.Liked : ''} ${
                    likeLoading || !user ? style.DisabledLike : ''
                  }`}
                  onClick={() => handleLikeDislike()}
                >
                  <Like className={style.LikeSVG} />
                </div>
                <div className={style.Share} onClick={() => handleShare()}>
                  <Share className={style.ShareSVG} />
                </div>
              </div>
            </div>
            <div className={style.Line} />
            <div className={style.Hide}>
              <div className={style.Tags}>
                <div className={style.Tag}>
                  <span role="img" className={style.Emoji} aria-label="art">
                    🎨
                  </span>
                  Design
                </div>
              </div>
            </div>
            <Title>
              {NFT.title}
              {NFT.isCapsule && <SChip
                color="primaryLight"
                text={
                  <>
                    <SDot />
                    Capsule
                  </>
                }
                variant="rectangle"
              />}
            </Title>
            <SCategoriesWrapper>
              {NFT.categories.map(({ name, code }) => (
                <Chip
                  key={code}
                  color="invertedContrast"
                  text={name}
                  size="medium"
                  variant="rectangle"
                />
              ))}
            </SCategoriesWrapper>
            <p className={style.Description}>{NFT.description}</p>
            <div className={style.Buy}>
              <div
                onClick={() => userCanBuy && handleBuy()}
                className={
                  userCanBuy
                    ? style.Button
                    : `${style.Button} ${style.Disabled}`
                }
              >
                {(isVR && !isUserFromDappQR) ? 
                  "Reserved for VR gallery"
                :
                  (!canUserBuyAgain ? 
                    "1 VR NFT per account"
                  :
                    <>
                      Buy{' '}
                      {`${
                        smallestPriceRow &&
                        (smallestPriceRow.price || smallestPriceRow.priceTiime)
                          ? 'for '
                          : ''
                      }`}
                      {smallestPriceRow && (
                        <>
                          {smallestPriceRow.price &&
                            Number(smallestPriceRow.price) > 0 &&
                            `${computeCaps(Number(smallestPriceRow.price))} CAPS`}
                          {smallestPriceRow.price &&
                            Number(smallestPriceRow.price) > 0 &&
                            smallestPriceRow.priceTiime &&
                            Number(smallestPriceRow.priceTiime) &&
                            ` / `}
                          {smallestPriceRow.priceTiime &&
                            Number(smallestPriceRow.priceTiime) > 0 &&
                            `${computeTiime(
                              Number(smallestPriceRow.priceTiime)
                            )} TIIME`}
                        </>
                      )}
                    </>
                  )
                }
              </div>
            </div>
            <div className={style.Available}>
              <div className={style.AvailbleText}>
                <NoNFTImage className={style.AvailbleCards} />
                <div className={style.AvailableTextContent}>
                  {`${numberListedOnThisMarketplace} of ${
                    NFT.serieData ? NFT.serieData.length : 1
                  }`}{' '}
                  Available
                </div>
              </div>
              <div className={style.AvailableBackLine} />
            </div>
          </div>
        </div>
        <div>
          <Details
            NFT={NFT}
            user={user}
            setNftToBuy={setNftToBuy}
            setExp={setExp}
            isUserFromDappQR={isUserFromDappQR}
            isVR={isVR}
            canUserBuyAgain={canUserBuyAgain}
          />
        </div>
      </div>
      {byTheSameArtistNFTs.length>0 && <Showcase category="By the same artist" NFTs={byTheSameArtistNFTs} user={user} setUser={setUser} />}
      <Footer />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      {modalShareOpen && (
        <ModalShare
          setModalExpand={setModalShareOpen}
          title={'Share this NFT with your friends'}
          subject={shareSubject}
          text={shareText}
          url={shareUrl}
        />
      )}
    </div>
  );
};

const SMediaWrapper = styled.div`
  height: ${({theme}) => theme.sizes.cardHeight.md};
  width: ${({theme}) => theme.sizes.cardWidth.md};

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: ${({theme}) => theme.sizes.cardHeight.lg};
    width: ${({theme}) => theme.sizes.cardWidth.lg};
  }
`

const SChip = styled(Chip)`
  margin: 1.6rem auto 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0;
    transform: translateY(85%);
  }
`

const SDot = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background: ${({theme}) => theme.colors.primary};
  border-radius: 50%;
`

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
`

export default NFTPage;
