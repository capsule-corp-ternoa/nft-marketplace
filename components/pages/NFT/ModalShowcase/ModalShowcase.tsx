import React from 'react';
import style from './ModalShowcase.module.scss';

import Close from 'components/assets/close';
import Wallet from 'components/assets/wallet';

import { computeCaps } from 'utils/strings';
import { NftType } from 'interfaces';

export interface ModalProps {
  NFT: NftType;
  type: string | null;
  exp: number;
  setExp: (n: number) => void;
  setModalExpand: (b: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  setExp,
  exp,
  setModalExpand,
  type,
  NFT,
}) => {
  function returnType() {
    if (!type) return null;
    if (type!.substr(0, 5) === 'image') {
      return (
        <img
          className={style.NFTIMG}
          draggable="false"
          src={NFT.media.url}
          alt="imgnft"
        />
      );
    } else if (type!.substr(0, 5) === 'video')
      return (
        <video autoPlay muted loop playsInline className={style.NFTIMG}>
          <source id="outputVideo" src={NFT.media.url} type="video/mp4" />
        </video>
      );
  }

  return (
    <>
      {exp === 1 ? (
        <div className={style.Modal}>
          <Close onClick={() => setExp(0)} className={style.Close} />
          <div className={style.ModalBG}>
            <div className={style.NFT}>{returnType()}</div>
          </div>
        </div>
      ) : (
        <div className={style.ModalCheckout}>
          <div className={style.Container}>
            <div className={style.Top}>
              <Close onClick={() => setExp(0)} className={style.Close2} />
              <div className={style.Title}>
                <Wallet className={style.WalletSVG} />
                Checkout
              </div>
            </div>

            <div className={style.Section}>
              <div className={style.Insight}>You are about to purchase :</div>
              <div className={style.Infos}>{NFT.name}</div>
            </div>

            <div className={style.PricingContainer}>
              <div className={style.SB}>
                <div className={style.PriceNumber}>
                  {computeCaps(Number(NFT.price))}
                </div>
                <div className={style.PriceCaps}>CAPS</div>
              </div>
              <div className={style.Line} />
              <div className={style.SB}>
                <div className={style.SBLight}>Your balance</div>
                <div className={style.SBLight}>0 CAPS</div>
              </div>
            </div>

            <div className={style.Buttons}>
              <div className={style.Buy} onClick={() => setModalExpand(true)}>
                Proceed to payment
              </div>
              <div onClick={() => setExp(0)} className={style.Cancel}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
