import React, { useState } from 'react';
import style from './NftCard.module.scss';
import Heart from 'components/assets/heart';
import Creator from '../Creator';
import Router from 'next/router';

import { NftType } from 'interfaces/index';

export interface NftCardProps {
  item: NftType;
  mode: string;
}

function manageRouting(e: any) {
  e.stopPropagation();
  Router.push('/test-author');
}

const NftCard: React.FC<NftCardProps> = ({ item, mode }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onClick={() => Router.push(`/nft/nft-test`)}
      className={mode === 'grid' ? style.NFTGrid : style.NFT}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <img
        src={item.img}
        alt="imgnft"
        className={
          isHovering ? `${style.NFTIMG} ${style.ImgScaling}` : style.NFTIMG
        }
      />
      {item.secret && !isHovering && (
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
          <div onClick={(e) => manageRouting(e)} className={style.Auth}>
            <Creator
              item={item.creator}
              className={isHovering ? style.Slide : ''}
              size="card"
              showTooltip={false}
            />
            <div
              className={
                isHovering ? `${style.Author} ${style.Fade}` : style.Author
              }
            >
              {item.creator.name}
            </div>
          </div>
          <div
            className={
              isHovering ? `${style.Button} ${style.FadeLong}` : style.Button
            }
          >
            <div className={style.Price}>{item.price} CAPS</div>
            <div className={style.ButtonText}>Buy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
