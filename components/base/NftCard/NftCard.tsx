import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { likeNFT, unlikeNFT } from 'actions/nft';
import { Picture } from 'components/base/Avatar';
import Button from 'components/ui/Button';
import Chip from 'components/ui/Chip';
import { NftType } from 'interfaces/index';
import { appSetUserLikedNFTs } from 'redux/app';
import { useApp } from 'redux/hooks';
import { fadeIn, ySlide } from 'style/animations';
import { PRICE_FILTER } from 'utils/constant';
import { LIKE_ACTION, LIKE_ACTION_TYPE, UNLIKE_ACTION } from 'utils/profile/constants';
import { computeCaps } from 'utils/strings';

import Media from '../Media';

export interface NftCardProps {
  className?: string;
  handleLike?: (action: LIKE_ACTION_TYPE, nft?: NftType) => void;
  item: NftType;
  noClikeable?: boolean;
  noHover?: boolean;
  noStatsChips?: boolean;
  noAvailableChip?: boolean;
  noPriceChip?: boolean;
  noSecretChip?: boolean;
  quantity?: number;
}

function manageRouting(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
  e.stopPropagation();
  Router.push(`/${id}`);
}

const NftCard: React.FC<NftCardProps> = ({
  className,
  handleLike,
  item,
  noClikeable = false,
  noHover = false,
  noStatsChips = false,
  noAvailableChip = false,
  noPriceChip = false,
  noSecretChip = false,
  quantity,
}) => {
  const { user } = useApp();
  const dispatch = useDispatch();
  const router = useRouter();
  const { creator, creatorData, id: nftId, price, properties, serieId, smallestPrice, totalListedInMarketplace, totalListedNft, totalNft } = item;

  const [isHovering, setIsHovering] = useState(false);
  const [isLiked, setIsLiked] = useState(
    (serieId === '0' ? user?.likedNFTs?.some(({ nftId }) => nftId === item.id) : user?.likedNFTs?.some(({ serieId }) => serieId === item.serieId)) ?? false
  );
  const [likeLoading, setLikeLoading] = useState(false);
  const [type, setType] = useState<string | null>(null);

  const isCreator = creator !== undefined && creator !== '' && creatorData !== undefined;
  const isUserLogged = user !== undefined && user !== null;

  const isPriceFilterActive = router.query.filter === PRICE_FILTER && (Number(router.query.minPrice) > 0 || Number(router.query.maxPrice) > 0);
  const isPrice = Number( isPriceFilterActive ? price : smallestPrice) > 0;
  const isSecret = properties?.cryptedMedia.ipfs !== properties?.preview.ipfs;

  const priceWording = isPrice ? `${computeCaps(Number(isPriceFilterActive ? price : smallestPrice))} CAPS` : undefined;
  const defaultQuantityAvailable = totalListedInMarketplace ?? totalListedNft ?? 1;
  const quantityAvailable = quantity ?? defaultQuantityAvailable;

  // Filter gradients flags
  const isTopFilter = (quantityAvailable > 1 && !noAvailableChip) || (isSecret && !noSecretChip);
  const isBottomFilter = isPrice && !noPriceChip;

  const toggleLikeDislike = async () => {
    try {
      if (!likeLoading && user?.walletId) {
        setLikeLoading(true);
        if (isLiked) {
          await unlikeNFT(user.walletId, nftId, serieId);
          if (user.likedNFTs && user.likedNFTs.length > 0) {
            dispatch(appSetUserLikedNFTs(user.likedNFTs.filter((item) => item.nftId !== nftId)));
          }
        } else {
          await likeNFT(user.walletId, nftId, serieId);
          dispatch(appSetUserLikedNFTs(user.likedNFTs?.concat([{ serieId, nftId, walletId: user.walletId }])));
        }
        setIsLiked((prevState) => !prevState);
        setLikeLoading(false);
        if (handleLike) handleLike(isLiked ? UNLIKE_ACTION : LIKE_ACTION, item);
      }
    } catch (error) {
      console.error(error);
      setLikeLoading(false);
    }
  };

  useEffect(() => {
    setIsLiked(
      (serieId === '0' ? user?.likedNFTs?.some(({ nftId }) => nftId === item.id) : user?.likedNFTs?.some(({ serieId }) => serieId === item.serieId)) ??
        false
    );
  }, [user?.likedNFTs]);

  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(item.properties?.preview.ipfs!, {
          method: 'HEAD',
        });
        setType(res.headers.get('Content-Type'));
        return res;
      } catch (err) {
        console.log('Error :', err);
      }
    }

    callBack();
  }, []);

  return (
    <SMediaWrapper
      className={className}
      noClikeable={noClikeable}
      onClick={() => !noClikeable && Router.push(`/nft/${item.id}`)}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOut={() => !noHover && setIsHovering(false)}
      onMouseOver={() => !noHover && setIsHovering(true)}
    >
      <Media src={item.properties?.preview.ipfs!} type={type} alt="imgnft" draggable="false" isHovering={isHovering} />
      {!noStatsChips && (
        <>
          {quantityAvailable > 1 && !noAvailableChip && !isHovering && (
            <SAvailableChipWrapper>
              <Chip color="whiteBlur" size="small" text={`${quantityAvailable} of ${totalNft}`} variant="round" />
            </SAvailableChipWrapper>
          )}
          {isSecret && !noSecretChip && !isHovering && (
            <SSecretChipWrapper>
              <Chip color="whiteBlur" icon="secretCards" size="small" text="Secret" variant="round" />
            </SSecretChipWrapper>
          )}
          {priceWording && !noPriceChip && !isHovering && (
            <SPriceChipWrapper>
              <Chip color="whiteBlur" size="small" text={priceWording} variant="round" />
            </SPriceChipWrapper>
          )}
          <SChipsFilter isTopFilter={isTopFilter} isBottomFilter={isBottomFilter} />
        </>
      )}
      {!noHover && (
        <>
          <SHoverFilter isHovering={isHovering} />
          <SHoverContainer isHovering={isHovering}>
            <SLikeButtonContainer isHovering={isHovering}>
              <Button
                color={isLiked ? 'primary500' : 'neutral600'}
                disabled={!isUserLogged || likeLoading}
                icon="heart"
                isLoading={likeLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLikeDislike();
                }}
                size="small"
                suppressHydrationWarning
                variant="contained"
              />
            </SLikeButtonContainer>
            <SInfosContainer>
              {isCreator && (
                <SCreatorContainer onClick={(e) => manageRouting(e, creator)}>
                  <SCreatorPicture isHovering={isHovering}>
                    <Picture
                      isClickable
                      isVerified={creatorData?.verified}
                      name={creatorData?.name}
                      picture={creatorData?.picture}
                      walletId={creatorData?.walletId}
                    />
                  </SCreatorPicture>
                  <SCreatorName isHovering={isHovering}>{creatorData?.name || `Ternoa #${creator.slice(0, 5)}`}</SCreatorName>
                </SCreatorContainer>
              )}
              {priceWording && (
                <SPriceWrapper isHovering={isHovering}>                  <Chip color="whiteBlur" size="small" text={priceWording} variant="round" />
                </SPriceWrapper>
              )}
            </SInfosContainer>
          </SHoverContainer>
        </>
      )}
    </SMediaWrapper>
  );
};

const SMediaWrapper = styled.div<{ noClikeable?: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 12px;
  background: linear-gradient(180deg, #f29fff 0%, #878cff 100%);
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  cursor: ${({ noClikeable }) => (noClikeable ? 'auto' : 'pointer')};
  overflow: hidden;
  transform: translateZ(0);

  height: ${({ theme }) => theme.sizes.cardHeight.sm};
  width: ${({ theme }) => theme.sizes.cardWidth.sm};

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: ${({ theme }) => theme.sizes.cardHeight.md};
    width: ${({ theme }) => theme.sizes.cardWidth.md};
  }
`;

const SChipWrapper = styled.div`
  background: transparent;
  position: absolute;
  z-index: 4;
`;

const SAvailableChipWrapper = styled(SChipWrapper)`
  top: 1.6rem;
  left: 1.6rem;
`;

const SSecretChipWrapper = styled(SChipWrapper)`
  top: 1.6rem;
  right: 1.6rem;
`;

const SPriceChipWrapper = styled(SChipWrapper)`
  width: fit-content;
  bottom: 2.4rem;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const SChipsFilter = styled.div<{ isTopFilter?: boolean; isBottomFilter?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${({ isTopFilter, isBottomFilter }) => `${isTopFilter ? 'linear-gradient(0deg, rgba(57, 57, 57, 0) 70%, #0303039e 100%)' : 'none'},
  ${isBottomFilter ? 'linear-gradient(180deg, rgba(57, 57, 57, 0) 70%, #0303039e 100%)' : 'none'}`};
  border-radius: 1.2rem;
`;

const ySlideStyle = css<{ isHovering: boolean }>`
  animation-fill-mode: forwards;
  animation: ${ySlide('40px', '0px')} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

const ySlideFadeStyle = css<{ isHovering: boolean }>`
  animation-fill-mode: forwards;
  animation: ${ySlide('30px', '0px')} 0.8s cubic-bezier(0.25, 1, 0.5, 1), ${fadeIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

const yLongSlideFadeStyle = css<{ isHovering: boolean }>`
  animation-fill-mode: forwards;
  animation: ${ySlide('20px', '0px')} 0.8s cubic-bezier(0.25, 1, 0.5, 1), ${fadeIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

const SHoverFilter = styled.div<{ isHovering: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.5s ease-out;
  background: linear-gradient(180deg, rgba(57, 57, 57, 0) 60%, #030303 92.5%);
  border-radius: 12px;

  ${({ isHovering }) => isHovering && ySlideFadeStyle}
`;

const SHoverContainer = styled.div<{ isHovering: boolean }>`
  display: ${({ isHovering }) => (isHovering ? 'flex' : 'none')};
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  border-radius: 1.2rem;
`;

const LikeButtonStyle = css<{ isHovering: boolean }>`
  align-self: flex-end;
  margin: 1.6rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  animation-fill-mode: forwards;
  animation: ${fadeIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1);
`;

const SLikeButtonContainer = styled.div<{ isHovering: boolean }>`
  ${({ isHovering }) => isHovering && LikeButtonStyle}
`;

const SInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const SCreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SCreatorPicture = styled.div<{ isHovering: boolean }>`
  ${({ isHovering }) => isHovering && ySlideStyle}
`;

const SCreatorName = styled.div<{ isHovering: boolean }>`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-size: 1.2rem;
  margin-top: 1.2rem;

  ${({ isHovering }) => isHovering && ySlideFadeStyle}
`;

const SPriceWrapper = styled.div<{ isHovering: boolean }>`
  margin-top: 0.8rem;

  ${({ isHovering }) => isHovering && yLongSlideFadeStyle}
`;

export default NftCard;
