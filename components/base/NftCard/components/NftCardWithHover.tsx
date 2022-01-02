import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import { likeNFT, unlikeNFT } from 'actions/user';
import { getNFT } from 'actions/nft';
import Heart from 'components/assets/heart';
import { Picture } from 'components/base/Avatar';
import Chip from 'components/ui/Chip';
import { INFTLike, NftType, UserType } from 'interfaces/index';
import { computeCaps, computeTiime } from 'utils/strings';
import { breakpointMap } from 'style/theme/base';

import NftCard, { ModeType } from '../NftCard';
import style from '../NftCard.module.scss';

import NftChips from './NftChips';

interface Props {
  className?: string;
  isDragging?: boolean;
  item: NftType;
  likedNfts?: NftType[];
  mode?: ModeType;
  noCreator?: boolean;
  setLikedNfts?: (nfts: NftType[]) => void;
  setUser?: (u: UserType) => void;
  user?: UserType;
}

function manageRouting(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string
) {
  e.stopPropagation();
  Router.push(`/${id}`);
}

const NftCardWithHover = ({
  isDragging,
  item,
  likedNfts,
  mode,
  noCreator = false,
  setLikedNfts,
  setUser,
  user,
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const isLiked = !user
    ? undefined
    : item.serieId === '0'
    ? user.likedNFTs?.map((x) => x.nftId).includes(item.id)
    : user.likedNFTs?.map((x) => x.serieId).includes(item.serieId);

  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpointMap.md - 1}px)`,
  });

  const handleLikeDislike = async (nftId: string, serieId: string) => {
    try {
      let res: INFTLike | null = null;
      if (!likeLoading && isLiked !== undefined && user) {
        setLikeLoading(true);
        if (!isLiked) {
          res = (await likeNFT(user.walletId, nftId, serieId)) as INFTLike;
        } else {
          res = (await unlikeNFT(user.walletId, nftId, serieId)) as INFTLike;
        }
      }
      if (res !== null && setUser && user) {
        let newUser = user;
        if (newUser.likedNFTs) {
          if (!isLiked) {
            newUser.likedNFTs.push(res);
          } else {
            newUser.likedNFTs = newUser?.likedNFTs.filter(
              (x) =>
                x.walletId !== res?.walletId &&
                x.nftId !== res?.nftId &&
                x.serieId !== res?.serieId
            );
          }
          setUser(newUser);
        }
        if (likedNfts && setLikedNfts) {
          if (!isLiked) {
            let newlyLikedNFT = await getNFT(
              nftId,
              undefined,
              undefined,
              undefined,
              undefined,
              true
            );
            if (newlyLikedNFT) setLikedNfts([...likedNfts, newlyLikedNFT]);
          } else {
            setLikedNfts(likedNfts.filter((x) => x.id !== nftId));
          }
        }
      }
      setLikeLoading(false);
    } catch (err) {
      setLikeLoading(false);
      console.error(err);
    }
  };

  return (
    <NftCard
      item={item}
      mode={mode}
      isDragging={isDragging}
      isHovering={isHovering}
      onMouseOut={() => !isMobile && setIsHovering(false)}
      onMouseOver={() => !isMobile && setIsHovering(true)}
    >
      <NftChips
        NFT={item}
        mode={mode}
        noPriceChip={isHovering}
        noSecretChip={isHovering}
      />
      <div
        className={
          isHovering
            ? `${style.Filter} ${style.Fade}`
            : `${style.Filter} ${style.Hide}`
        }
      />
      <div className={isHovering ? `${style.Container}` : style.Hide}>
        {isLiked !== undefined ? (
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
              handleLikeDislike(item.id, item.serieId);
            }}
          >
            <Heart className={style.HeartSVG} />
          </div>
        ) : (
          <div></div>
        )}
        <div className={style.Infos}>
          {!noCreator && (
            <div
              onClick={(e) => manageRouting(e, item.creator)}
              className={style.Auth}
            >
              <Picture
                className={isHovering ? style.Slide : ''}
                link={item.creatorData?.walletId}
                name={item.creatorData?.name}
                picture={item.creatorData?.picture}
              />
              <div
                className={
                  isHovering ? `${style.Author} ${style.Fade}` : style.Author
                }
              >
                {item.creatorData?.name ||
                  `Ternoa #${item.creator.slice(0, 5)}`}
              </div>
            </div>
          )}
          {((item.smallestPrice && Number(item.smallestPrice)) ||
            (item.smallestPriceTiime && Number(item.smallestPriceTiime))) && (
            <SPriceWrapper className={isHovering ? style.FadeLong : ''}>
              <Chip
                color="whiteBlur"
                size="small"
                text={
                  <>
                    {item.smallestPrice &&
                      Number(item.smallestPrice) > 0 &&
                      `${computeCaps(Number(item.smallestPrice))} CAPS`}
                    {item.smallestPrice &&
                      Number(item.smallestPrice) &&
                      item.smallestPriceTiime &&
                      Number(item.smallestPriceTiime) &&
                      ` / `}
                    {item.smallestPriceTiime &&
                      Number(item.smallestPriceTiime) > 0 &&
                      `${computeTiime(Number(item.smallestPriceTiime))} TIIME`}
                  </>
                }
                variant="round"
              />
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
