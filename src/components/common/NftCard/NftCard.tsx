import React, { useEffect, useState } from 'react';
import style from './NftCard.module.scss';
import Heart from '../assets/heart';
import Creator from '../Creator/Creator';

const NftCard: React.FC<any> = ({ item }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={style.NFT}
      onFocus={() => false}
      onBlur={() => false}
      onMouseOver={(e) => setIsHovering(true)}
      onMouseOut={(e) => setIsHovering(false)}
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
          <Creator
            item={item.author}
            className={isHovering && style.Slide}
            size="card"
            showTooltip={false}
          />
          <div
            className={
              isHovering ? `${style.Author} ${style.Fade}` : style.Author
            }
          >
            {item.author.name}
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
