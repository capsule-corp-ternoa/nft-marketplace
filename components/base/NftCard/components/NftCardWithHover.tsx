import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import Heart from 'components/assets/heart';
import { Picture } from 'components/base/Avatar';
import Chip from 'components/ui/Chip';
import { NftType, NFTsNominalSetState, UserType } from 'interfaces/index';
import { toggleLike } from 'utils/profile';
import { LIKE_ACTION, LIKE_ACTION_TYPE, UNLIKE_ACTION } from 'utils/profile/constants';
import { computeCaps, computeTiime } from 'utils/strings';
import { breakpointMap } from 'style/theme/base';

import NftCard from '../NftCard';
import { ModeType } from '../interfaces';
import style from '../NftCard.module.scss';

import NftChips from './NftChips';

interface Props {
  className?: string;
  isDragging?: boolean;
  item: NftType;
  mode?: ModeType;
  quantity?: number;
  handleLikeCount?: (action: LIKE_ACTION_TYPE) => void;
  setLikedNfts?: NFTsNominalSetState;
  user?: UserType;
}

function manageRouting(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
  e.stopPropagation();
  Router.push(`/${id}`);
}

const NftCardWithHover = ({
  className,
  isDragging,
  item,
  mode,
  quantity,
  handleLikeCount,
  setLikedNfts,
  user,
}: Props) => {
  const { creator, creatorData, smallestPrice, smallestPriceTiime } = item;
  const [isHovering, setIsHovering] = useState(false);
  const [isLiked, setIsLiked] = useState(
    (item.serieId === '0'
      ? user?.likedNFTs?.some(({ nftId }) => nftId === item.id)
      : user?.likedNFTs?.some(({ serieId }) => serieId === item.serieId)) ?? false
  );
  const [likeLoading, setLikeLoading] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: ${breakpointMap.md - 1}px)` });

  const toggleLikeDislike = async () => {
    try {
      if (!likeLoading && user?.walletId) {
        setLikeLoading(true);
        await toggleLike(
          item,
          isLiked ? UNLIKE_ACTION : LIKE_ACTION,
          user.walletId,
          setIsLiked,
          setLikedNfts,
          handleLikeCount
        );
        setLikeLoading(false);
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
      onMouseOut={() => !isMobile && setIsHovering(false)}
      onMouseOver={() => !isMobile && setIsHovering(true)}
    >
      <NftChips NFT={item} mode={mode} noPriceChip={isHovering} noSecretChip={isHovering} quantity={quantity} />
      <div className={isHovering ? `${style.Filter} ${style.Fade}` : `${style.Filter} ${style.Hide}`} />
      <div className={isHovering ? `${style.Container}` : style.Hide}>
        {isUserLogged && (
          <div
            className={
              isHovering
                ? `${style.Favorite} 
                 ${style.FadeSimple} 
                 ${isLiked ? style.Favorited : ''} 
                 ${likeLoading ? style.Disabled : ''}`
                : style.Hide
            }
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeDislike();
            }}
          >
            <Heart className={style.HeartSVG} />
          </div>
        )}
        <div className={style.Infos}>
          {isCreator && (
            <div onClick={(e) => manageRouting(e, creator)} className={style.Auth}>
              <Picture
                className={isHovering ? style.Slide : ''}
                isClickable
                isVerified={creatorData?.verified}
                name={creatorData?.name}
                picture={creatorData?.picture}
                walletId={creatorData?.walletId}
              />
              <div className={isHovering ? `${style.Author} ${style.Fade}` : style.Author}>
                {creatorData?.name || `Ternoa #${creator.slice(0, 5)}`}
              </div>
            </div>
          )}
          {smallestPriceWording && (
            <SPriceWrapper className={isHovering ? style.FadeLong : ''}>
              <Chip color="whiteBlur" size="small" text={smallestPriceWording} variant="round" />
            </SPriceWrapper>
          )}
        </div>
      </div>
    </NftCard>
  );
};

const SPriceWrapper = styled.div`
  margin-top: 0.8rem;
`;

export default NftCardWithHover;
