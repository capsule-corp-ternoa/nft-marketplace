import React, { useState, useEffect } from 'react';
import style from './NftCard.module.scss';
import Creator from '../Creator';
import Router from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Media from '../Media';
import Heart from 'components/assets/heart';
import { NftType, UserType } from 'interfaces/index';
import { computeCaps, computeTiime } from 'utils/strings';
import { likeNFT, unlikeNFT } from 'actions/user';
import { getNFT } from 'actions/nft';
import { MARKETPLACE_ID } from 'utils/constant';

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
  const smallestPriceRow = !(item.serieData) ? item : item.serieData.filter(x=>x.marketplaceId === MARKETPLACE_ID).sort(
    (a, b) =>
      b.listed - a.listed ||
      Number(a.price) - Number(b.price) ||
      Number(a.priceTiime) - Number(b.priceTiime)
  )[0];
  const displayQuantity = () => {
    if (!scope) return `${typeof item.totalListedNft !== 'undefined' ? item.totalListedNft : 1}`
    switch(scope){
      case 'My NFTs':
        return `${typeof item.totalNft !== 'undefined' ? item.serieData?.filter(x=>x.owner===user?.walletId).length : 1}`
      case 'My creations':
        return `${typeof item.totalNft !== 'undefined' ? item.totalNft : 1}`
      case 'My NFTs on sale':
        return `${typeof item.totalListedNft !== 'undefined' ? item.serieData?.filter(x=>x.owner===user?.walletId && x.listed===1).length : 1}`
      case 'My NFTs not for sale':
        return `${(typeof item.totalListedNft !== 'undefined' && typeof item.totalNft !== 'undefined') ? item.serieData?.filter(x=>x.owner===user?.walletId && x.listed===0).length : 1}`
      case 'Liked': 
        return 0
      default:
        return `${typeof item.totalListedNft !== 'undefined' ? item.totalListedNft : 1}`
    }
  }
  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(item.media!.url, { method: 'HEAD' });
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

  const isMobile = useMediaQuery({ query: '(max-device-width: 720px)' });

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
    <div
      onClick={() => !isDragging && Router.push(`/nft/${item.id}`)}
      className={manageClass()}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOver={() => !isMobile && setIsHovering(true)}
      onMouseOut={() => !isMobile && setIsHovering(false)}
    >
      <Media
        src={item.media!.url}
        type={type}
        alt="imgnft"
        draggable="false"
        className={
          `${style.NFTIMG} ${(type?.substr(0, 5) === 'image' && isHovering) ? style.ImgScaling : ""}`
        }
      />
      {Number(displayQuantity()) > 1 && <span className={style.QtyLabel}>
        {displayQuantity()}
      </span>}
      {item.cryptedMedia?.url !== item.media?.url && !isHovering && (
        <span className={style.SecretLabel}>S</span>
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
            onClick={(e) => manageRouting(e, item.creatorData.walletId)}
            className={style.Auth}
          >
            {item.creatorData && (
              <Creator
                user={item.creatorData}
                className={isHovering ? style.Slide : ''}
                size="card"
                showTooltip={false}
              />
            )}
            {item.creatorData && (
              <div
                className={
                  isHovering ? `${style.Author} ${style.Fade}` : style.Author
                }
              >
                {item.creatorData.name}
              </div>
            )}
          </div>
          {(smallestPriceRow && smallestPriceRow.listed && ((smallestPriceRow.price && Number(smallestPriceRow.price)>0) || (smallestPriceRow.priceTiime && Number(smallestPriceRow.priceTiime)))) &&
            <div className={isHovering ? `${style.Button} ${style.FadeLong}` : style.Button}>
              <div className={style.Price}>
                {smallestPriceRow.price && Number(smallestPriceRow.price)>0 &&
                  `${computeCaps(Number(smallestPriceRow.price))} CAPS`
                }
                {smallestPriceRow.price && Number(smallestPriceRow.price)>0 && smallestPriceRow.priceTiime && Number(smallestPriceRow.priceTiime) && 
                  ` / `
                }
                {smallestPriceRow.priceTiime && Number(smallestPriceRow.priceTiime)>0 && 
                  `${computeTiime(Number(smallestPriceRow.priceTiime))} TIIME`
                }
              </div>
              <div className={style.ButtonText}>Buy</div>
            </div>
          }
      </div>
      </div>
    </div>
  );
};

export default NftCard;
