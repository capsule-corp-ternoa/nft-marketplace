import React, { useState, useEffect } from 'react';
import style from './NftCard.module.scss';
import Heart from 'components/assets/heart';
import Creator from '../Creator';
import Router from 'next/router';

import { NftType } from 'interfaces/index';

import { shortString } from 'utils/strings';

export interface NftCardProps {
  item: NftType;
  mode: string;
}

function manageRouting(e: any, id: any) {
  e.stopPropagation();
  Router.push(`/${id}`);
}

const NftCard: React.FC<NftCardProps> = ({ item, mode }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [nftMedia, setNftMedia] = useState<string | null>(null);

  useEffect(() => {
    async function callBack() {
      let res = await fetch(item.media!.url);
      setType(res.headers.get('Content-Type'));
      setNftMedia(URL.createObjectURL(await res.blob()));
      return res;
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

  function returnType() {
    if (nftMedia === null) return null;
    else if (type!.substr(0, 5) === 'image') {
      return (
        <img
          src={nftMedia}
          alt="imgnft"
          className={
            isHovering ? `${style.NFTIMG} ${style.ImgScaling}` : style.NFTIMG
          }
        />
      );
    } else if (type!.substr(0, 5) === 'video')
      return (
        <video autoPlay muted loop className={style.IMGBackground}>
          <source id="outputVideo" src={nftMedia} type="video/mp4" />
        </video>
      );
  }

  return (
    <div
      onClick={() => Router.push(`/nft/${item.id}`)}
      className={manageClass()}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {returnType()}
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
        <div
          className={
            isHovering ? `${style.Favorite} ${style.FadeSimple}` : style.Hide
          }
        >
          <Heart className={style.HeartSVG} />
        </div>

        <div className={style.Infos}>
          <div
            onClick={(e) => manageRouting(e, item.creatorData?.walletId)}
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
          <div
            className={
              isHovering ? `${style.Button} ${style.FadeLong}` : style.Button
            }
          >
            {item.price && (
              <div className={style.Price}>
                {shortString(Number(item.price))} CAPS
              </div>
            )}
            <div className={style.ButtonText}>Buy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
