import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import { likeNFT, unlikeNFT } from 'actions/user';
import { getNFT } from 'actions/nft';
import Heart from 'components/assets/heart';
import Creator from 'components/base/Creator';
import Chip from 'components/ui/Chip';
import { INFTLike, NftType, UserType } from 'interfaces/index';
import { computeCaps, computeTiime } from 'utils/strings';
import { breakpointMap } from 'style/theme/base';

import NftCard, { ModeType } from '../NftCard';
import style from '../NftCard.module.scss';

interface Props {
  className?: string;
  isDragging?: boolean;
  item: NftType;
  likedNfts?: NftType[];
  mode?: ModeType;
  setLikedNfts?: (nfts: NftType[]) => void;
  setUser?: (u: UserType) => void;
  scope?: string;
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
  setLikedNfts,
  setUser,
  scope,
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
  const isLargeDesktop = useMediaQuery({
    query: `(min-width: ${breakpointMap.xxl}px)`,
  });

  const displayQuantity = () => {
    const defaultValue = `${
      typeof item.totalListedInMarketplace !== 'undefined'
        ? item.totalListedInMarketplace
        : typeof item.totalListedNft !== 'undefined'
        ? item.totalListedNft
        : 1
    }`;
    if (!scope) return defaultValue;
    switch (scope) {
      case 'My NFTs':
        return `${
          item.totalOwnedByRequestingUser ? item.totalOwnedByRequestingUser : 1
        }`;
      case 'My creations':
        return `${typeof item.totalNft !== 'undefined' ? item.totalNft : 1}`;
      case 'My NFTs on sale':
        return `${
          item.serieData
            ? item.serieData.filter(
                (x) => x.owner === user?.walletId && x.listed === 1
              ).length
            : 1
        }`;
      case 'My NFTs not for sale':
        return `${
          item.serieData
            ? item.serieData.filter(
                (x) => x.owner === user?.walletId && x.listed === 0
              ).length
            : 1
        }`;
      case 'Liked':
        return 0;
      default:
        return defaultValue;
    }
  };

  const handleLikeDislike = async (nftId: string, serieId: string) => {
    try{
      let res: INFTLike | null = null
      if (!likeLoading && isLiked !== undefined && user){
        setLikeLoading(true)
        if (!isLiked){
          res = await likeNFT(user.walletId, nftId, serieId) as INFTLike
        }else{
          res = await unlikeNFT(user.walletId, nftId, serieId) as INFTLike
        }
      }
      if (res !== null && setUser && user){
        let newUser = user
        if (newUser.likedNFTs){
          if (!isLiked){
            newUser.likedNFTs.push(res)
          }else{
            newUser.likedNFTs = newUser?.likedNFTs.filter(x => x.walletId !== res?.walletId && x.nftId !== res?.nftId && x.serieId !== res?.serieId)
          }
          setUser(newUser)
        }
        if (likedNfts && setLikedNfts){
          if (!isLiked){
            let newlyLikedNFT = await getNFT(nftId)
            if (newlyLikedNFT) setLikedNfts([...likedNfts, newlyLikedNFT])
          }else{
            setLikedNfts(
              likedNfts.filter(x => x.id !== nftId)
            )
          }
        }
      }
      setLikeLoading(false)
    }catch(err){
      setLikeLoading(false)
      console.error(err)
    }
  }

  return (
    <NftCard
      item={item}
      mode={mode}
      isDragging={isDragging}
      isHovering={isHovering}
      onMouseOut={() => !isMobile && setIsHovering(false)}
      onMouseOver={() => !isMobile && setIsHovering(true)}
    >
      {Number(displayQuantity()) > 1 && (
        <SAvailableChipWrapper>
          <Chip
            color="whiteBlur"
            size="small"
            text={`${
              !isLargeDesktop ? '' : 'Available : '
            }${displayQuantity()} of ${item.totalNft}`}
            variant="round"
          />
        </SAvailableChipWrapper>
      )}
      {item.properties?.cryptedMedia.ipfs !== item.properties?.preview.ipfs &&
        !isHovering && (
          <SSecretChipWrapper>
            <Chip
              color="whiteBlur"
              icon="secretCards"
              size="small"
              text={isMobile && mode !== 'grid' ? undefined : 'Secret'}
              variant="round"
            />
          </SSecretChipWrapper>
        )}
      {((item.smallestPrice && Number(item.smallestPrice)) ||
        (item.smallestPriceTiime && Number(item.smallestPriceTiime))) &&
        !isHovering && (
          <SPriceChipWrapper>
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
          </SPriceChipWrapper>
        )}
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
          <div
            onClick={(e) => manageRouting(e, item.creator)}
            className={style.Auth}
          >
            <Creator
              user={item.creatorData}
              walletId={item.creator}
              className={isHovering ? style.Slide : ''}
              size="card"
              showTooltip={false}
              isClickable={false}
            />
            <div
              className={
                isHovering ? `${style.Author} ${style.Fade}` : style.Author
              }
            >
              {item.creatorData?.name || `Ternoa #${item.creator.slice(0, 5)}`}
            </div>
          </div>
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
  bottom: 1.6rem;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const SPriceWrapper = styled.div`
  margin-top: 0.8rem;
`;

export default NftCardWithHover;
