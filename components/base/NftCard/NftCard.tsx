import React, { useState, useEffect } from 'react';
import style from './NftCard.module.scss';
import Creator from '../Creator';
import Router from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Media from '../Media';

import { NftType } from 'interfaces/index';

import { computeCaps } from 'utils/strings';

export interface NftCardProps {
  item: NftType;
  serieCount?: number;
  mode: string;
  isDragging?: boolean;
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
  serieCount,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [type, setType] = useState<string | null>(null);

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
      {item.serieId !== '0' ? (
        <span className={style.QtyLabel}>{`${
          typeof serieCount !== 'undefined' ? serieCount : 1
        }/${typeof item.itemTotal !== 'undefined' ? item.itemTotal : 1}`}</span>
      ) : (
        <span className={style.QtyLabel}>1/1</span>
      )}
      {item.cryptedMedia?.url !== item.media?.url && (
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
        <div></div>

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
          <div
            className={
              isHovering ? `${style.Button} ${style.FadeLong}` : style.Button
            }
          >
            {item.price && (
              <div className={style.Price}>
                {computeCaps(Number(item.price))} CAPS
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
