import React, { useState } from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';

import { likeNFT, unlikeNFT } from 'actions/user';
import { Picture } from 'components/base/Avatar';
import Chip from 'components/ui/Chip';
import { NftType } from 'interfaces/index';
import { LIKE_ACTION, LIKE_ACTION_TYPE, UNLIKE_ACTION } from 'utils/profile/constants';
import { computeCaps, computeTiime } from 'utils/strings';
import { useApp } from 'redux/hooks';
import { fadeIn, ySlide } from 'style/animations';

import NftCard from '../NftCard';
import { ModeType } from '../interfaces';

import NftChips from './NftChips';
import Button from 'components/ui/Button';

interface Props {
  className?: string;
  isDragging?: boolean;
  item: NftType;
  mode?: ModeType;
  quantity?: number;
  handleLike?: (action: LIKE_ACTION_TYPE, nft?: NftType) => void;
}

function manageRouting(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
  e.stopPropagation();
  Router.push(`/${id}`);
}

const NftCardWithHover = ({ className, isDragging, item, mode, quantity, handleLike }: Props) => {
  const { user } = useApp();
  const { creator, creatorData, id: nftId, serieId, smallestPrice, smallestPriceTiime } = item;
  const [isHovering, setIsHovering] = useState(false);
  const [isLiked, setIsLiked] = useState(
    (item.serieId === '0' ? user?.likedNFTs?.some(({ nftId }) => nftId === item.id) : user?.likedNFTs?.some(({ serieId }) => serieId === item.serieId)) ?? false
  );
  const [likeLoading, setLikeLoading] = useState(false);

  const toggleLikeDislike = async () => {
    try {
      if (!likeLoading && user?.walletId) {
        setLikeLoading(true);
        if (isLiked) {
          await unlikeNFT(user.walletId, nftId, serieId);
        } else {
          await likeNFT(user.walletId, nftId, serieId);
        }
        setIsLiked((prevState) => !prevState);
        setLikeLoading(false);
        if (handleLike) await handleLike(isLiked ? UNLIKE_ACTION : LIKE_ACTION, item);
      }
    } catch (error) {
      console.error(error);
      setLikeLoading(false);
    }
  };

  const isCreator = creator !== undefined && creator !== '' && creatorData !== undefined;
  const isUserLogged = user !== undefined && user !== null;

  const smallestCapsPrice = Number(smallestPrice);
  const smallestTiimePrice = Number(smallestPriceTiime);
  const isSmallestCapsPrice = smallestCapsPrice > 0;
  const isSmallestTiimePrice = smallestTiimePrice > 0;

  const smallestPriceWording =
    isSmallestCapsPrice || isSmallestTiimePrice
      ? `${isSmallestCapsPrice ? `${computeCaps(smallestCapsPrice)} CAPS` : ''}
          ${isSmallestCapsPrice && isSmallestTiimePrice ? ' / ' : ''}
          ${isSmallestTiimePrice ? `${computeTiime(smallestTiimePrice)} TIIME` : ''}`
      : undefined;

  return (
    <NftCard
      className={className}
      item={item}
      mode={mode}
      isDragging={isDragging}
      isHovering={isHovering}
      onMouseOut={() => setIsHovering(false)}
      onMouseOver={() => setIsHovering(true)}
    >
      <NftChips NFT={item} noPriceChip={isHovering} noSecretChip={isHovering} quantity={quantity} />
      <SFilter isHovering={isHovering} />
      <SHoverContainer isHovering={isHovering}>
        {isUserLogged && (
          <SLikeButtonContainer isHovering={isHovering}>
            <Button
              color={isLiked ? 'primary500' : 'neutral600'}
              disabled={likeLoading}
              icon="heart"
              isLoading={likeLoading}
              onClick={(e) => {
                e.stopPropagation();
                toggleLikeDislike();
              }}
              size="small"
              variant="contained"
            />
          </SLikeButtonContainer>
        )}
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
          {smallestPriceWording && (
            <SPriceWrapper isHovering={isHovering}>
              <Chip color="whiteBlur" size="small" text={smallestPriceWording} variant="round" />
            </SPriceWrapper>
          )}
        </SInfosContainer>
      </SHoverContainer>
    </NftCard>
  );
};

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

const SFilter = styled.div<{ isHovering: boolean }>`
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
  justify-content: space-between;
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
  top: 1.2rem;
  right: 1.2rem;
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

export default NftCardWithHover;
