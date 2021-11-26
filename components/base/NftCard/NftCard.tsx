import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import style from './NftCard.module.scss';
import Creator from '../Creator';
import Router from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Media from '../Media';
import Heart from 'components/assets/heart';
import Chip from 'components/ui/Chip';
import { NftType, UserType } from 'interfaces/index';
import { computeCaps, computeTiime } from 'utils/strings';
import { likeNFT, unlikeNFT } from 'actions/user';
import { getNFT } from 'actions/nft';
import { breakpointMap } from 'style/theme/base';

export interface NftCardProps {
  item: NftType;
  mode: string;
  isDragging?: boolean;
  user?: UserType;
  setUser?: (u: UserType) => void
  likedNfts?: NftType[]
  setLikedNfts?: (nfts: NftType[]) => void
  scope?: string
}

function manageRouting(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string
) {
  e.stopPropagation();
  Router.push(`/${id}`);
}

const NftCard: React.FC<NftCardProps> = ({
  item,
  mode,
  isDragging,
  user,
  setUser,
  likedNfts,
  setLikedNfts,
  scope,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [likeLoading, setLikeLoading] = useState(false)
  const isLiked = !user ? undefined : (item.serieId === "0" ? user.likedNFTs?.map(x => x.nftId).includes(item.id) : user.likedNFTs?.map(x => x.serieId).includes(item.serieId))
  const displayQuantity = () => {
    const defaultValue = `${typeof item.totalListedInMarketplace !== 'undefined' ? item.totalListedInMarketplace : (typeof item.totalListedNft !== 'undefined' ? item.totalListedNft : 1)}`
    if (!scope) return defaultValue
    switch(scope){
      case 'My NFTs':
        return `${item.totalOwnedByRequestingUser ? item.totalOwnedByRequestingUser : 1}`
      case 'My creations':
        return `${typeof item.totalNft !== 'undefined' ? item.totalNft : 1}`
      case 'My NFTs on sale':
        return `${item.serieData ? item.serieData.filter(x=>x.owner===user?.walletId && x.listed===1).length : 1}`
      case 'My NFTs not for sale':
        return `${item.serieData ? item.serieData.filter(x=>x.owner===user?.walletId && x.listed===0).length : 1}`
      case 'Liked': 
        return 0
      default:
        return defaultValue
    }
  }
  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(item.image!, { method: 'HEAD' });
        setType(res.headers.get('Content-Type'));
        return res;
      } catch (err) {
        console.log('Error :', err);
      }
    }

    callBack();
  }, []);

  function manageClass() {
    if (mode === 'grid') {
      return style.NFTGrid;
    } else if (mode === 'profile') {
      return style.NFTProfile;
    } else {
      return style.NFT;
    }
  }
  const isMobileXS = useMediaQuery({ query: `(max-width: ${breakpointMap.sm}px)` });
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpointMap.md}px)` });

  const handleLikeDislike = async (nftId: string, serieId: string) => {
    try{
      let res = null
      if (!likeLoading && isLiked !== undefined && user){
        setLikeLoading(true)
        if (!isLiked){
          res = await likeNFT(user.walletId, nftId, serieId)
        }else{
          res = await unlikeNFT(user.walletId, nftId, serieId)
        }
      }
      if (res !== null && setUser){
        setUser({...user, ...res})
        if (likedNfts && setLikedNfts){
          if (isLiked){
            setLikedNfts(
              likedNfts.filter(x => x.id !== nftId)
            )
          }else{
            let newlyLikedNFT = await getNFT(nftId)
            if (newlyLikedNFT) setLikedNfts([...likedNfts, newlyLikedNFT])
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
    <SMediaWrapper
      onClick={() => !isDragging && Router.push(`/nft/${item.id}`)}
      className={manageClass()}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOver={() => !isMobile && setIsHovering(true)}
      onMouseOut={() => !isMobile && setIsHovering(false)}
    >
      <Media
        src={item.image!}
        type={type}
        alt="imgnft"
        draggable="false"
        className={
          `${style.NFTIMG} ${(type?.substr(0, 5) === 'image' && isHovering) ? style.ImgScaling : ""}`
        }
      />
      {Number(displayQuantity()) > 1 && (
        <SAvailableChipWrapper>
          <Chip
            color="whiteBlur"
            size="small"
            text={`${isMobile ? '' : 'Available : '}${displayQuantity()} of ${item.totalNft}`}
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
              text={isMobileXS ? undefined : "Secret"}
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
        {isLiked!==undefined ? 
          <div 
            className={
              isHovering ? 
                `${style.Favorite} 
                 ${style.FadeSimple} 
                 ${isLiked ? style.Favorited : ""} 
                 ${likeLoading ? style.Disabled : ""}`
              : 
                style.Hide
            }
            onClick={(e) => {e.stopPropagation(); handleLikeDislike(item.id, item.serieId);}}
          >
            <Heart className={style.HeartSVG} />
          </div>
        :
            <div></div>
        }
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
              {item.creatorData?.name || `Ternoa #${item.creator.slice(0,5)}`}
            </div>
          </div>
          {((item.smallestPrice && Number(item.smallestPrice)) || (item.smallestPriceTiime && Number(item.smallestPriceTiime))) &&
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
                      `${computeTiime(
                        Number(item.smallestPriceTiime)
                      )} TIIME`}
                  </>
                }
                variant="round"
              />
            </SPriceWrapper>
          }
      </div>
      </div>
    </SMediaWrapper>
  );
};

const SMediaWrapper = styled.div`
  height: ${({theme}) => theme.sizes.cardHeight.xs};
  width: ${({theme}) => theme.sizes.cardWidth.xs};

  ${({ theme }) => theme.mediaQueries.md} {
    height: ${({theme}) => theme.sizes.cardHeight.sm};
    width: ${({theme}) => theme.sizes.cardWidth.sm};
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: ${({theme}) => theme.sizes.cardHeight.md};
    width: ${({theme}) => theme.sizes.cardWidth.md};
  }
`

const SChipWrapper = styled.div`
  background: transparent;
  position: absolute;
  z-index: 4;
`

const SAvailableChipWrapper = styled(SChipWrapper)`
  top: 1.6rem;
  left: 1.6rem;
`

const SSecretChipWrapper = styled(SChipWrapper)`
  top: 1.6rem;
  right: 1.6rem;
`

const SPriceChipWrapper = styled(SChipWrapper)`
  width: fit-content;
  bottom: 1.6rem;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const SPriceWrapper = styled.div`
  margin-top: 0.8rem;
`

export default NftCard;
