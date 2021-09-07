import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import style from './ModalShowcase.module.scss';

import Close from 'components/assets/close';
import Wallet from 'components/assets/wallet';

import Media from 'components/base/Media';

import { computeCaps, computeTiime } from 'utils/strings';
import { NftType, UserType } from 'interfaces';

export interface ModalProps {
  NFT: NftType;
  type: string | null;
  exp: number;
  setExp: (n: number) => void;
  setModalExpand: (b: boolean) => void;
  user: UserType;
}

const Modal: React.FC<ModalProps> = ({
  setExp,
  exp,
  setModalExpand,
  type,
  NFT,
  user,
}) => {
  return (
    <>
      {exp === 1 ? (
        <div className={style.Modal}>
          <Close onClick={() => setExp(0)} className={style.Close} />
          <div className={style.ModalBG}>
            <ClickAwayListener onClickAway={() => setExp(0)}>
              <div className={style.NFT}>
                <Media
                  src={NFT.media.url}
                  type={type}
                  alt="imgnft"
                  draggable="false"
                  className={style.NFTIMG}
                />
              </div>
            </ClickAwayListener>
          </div>
        </div>
      ) : (
        <div className={style.ModalCheckout}>
          <ClickAwayListener onClickAway={() => setExp(0)}>
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
                
                {NFT.price && Number(NFT.price)>0 &&
                  <div className={style.SB}>
                    <div className={style.PriceNumber}>
                      {computeCaps(Number(NFT.price))}
                    </div>
                    <div className={style.PriceCaps}>CAPS</div>
                  </div>
                }
                {NFT.price && Number(NFT.price)>0 && NFT.priceTiime && Number(NFT.priceTiime)>0 && 
                  <div className={style.OrLabel}>
                    OR
                  </div>
                }
                {NFT.priceTiime && Number(NFT.priceTiime)>0 &&
                  <div className={style.SB}>
                    <div className={style.PriceNumber}>
                      {computeTiime(Number(NFT.priceTiime))}
                    </div>
                    <div className={style.PriceCaps}>TIIME</div>
                  </div>
                }
                
                
                <div className={style.Line} />
                <div className={style.SB}>
                  <div className={style.SBLight}>Your balance</div>
                  <div className={style.SBLight}>
                    {user && user.capsAmount ? computeCaps(Number(user.capsAmount)) : 0} CAPS
                    {/*`
                      ${user && user.capsAmount ? computeCaps(Number(user.capsAmount)) : 0} CAPS
                      |
                      ${user && user.tiimeAmount ? computeCaps(Number(user.tiimeAmount)) : 0} TIIME
                    `*/}
                  </div>
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
          </ClickAwayListener>
        </div>
      )}
    </>
  );
};

export default Modal;
