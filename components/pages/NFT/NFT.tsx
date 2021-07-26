import React from 'react';
import Link from 'next/link';
import style from './NFT.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Media from 'components/base/Media';

import Scale from 'components/assets/scale';

import Check from 'components/assets/check';
import gradient from 'random-gradient';

import { computeCaps, computeTiime } from 'utils/strings';
import { UserType, NftType } from 'interfaces';

export interface NFTPageProps {
  NFT: NftType;
  user: UserType;
  type: string | null;
  setExp: (n: number) => void;
  setNotAvailable: (b: boolean) => void;
  setModalExpand: (b: boolean) => void;
  capsValue: number;
}

const NFTPage: React.FC<NFTPageProps> = ({
  setExp,
  NFT,
  setModalExpand,
  setNotAvailable,
  user,
  type,
  capsValue,
}) => {
  const bgGradientOwner = { background: gradient(NFT.ownerData.name) };
  const bgGradientCreator = { background: gradient(NFT.creatorData.name) };

  const fiatPrice = (Number(NFT.price) / 1000000000000000000) * capsValue;
  const userCanBuyCaps = user ? user.capsAmount && NFT.price && NFT.price !== "" && (Number(user.capsAmount) >= Number(NFT.price)) : true
  const userCanBuyTiime = user ? user.tiimeAmount && NFT.priceTiime && NFT.priceTiime !== "" && (Number(user.tiimeAmount) >= Number(NFT.priceTiime)) : true
  const userCanBuy = userCanBuyCaps || userCanBuyTiime

  return (
    <div className={style.Container} onClick={()=> console.log(NFT)}>
      <div className={style.Wrapper}>
        <div className={style.NFT}>
          <Media
            src={NFT.media.url}
            type={type}
            alt="imgnft"
            draggable="false"
            className={style.NFTIMG}
          />
          <div onClick={() => setExp(1)} className={style.Scale}>
            <Scale className={style.ScaleSVG} />
          </div>
        </div>
        <div className={style.Text}>
          <div className={style.Top}>
            <h1 className={style.Title}>{NFT.name}</h1>
            <div className={style.TopInfos}></div>
          </div>
          <div className={style.Line} />
          <div className={style.Hide}>
            <div className={style.Tags}>
              <div className={style.Tag}>
                <span role="img" className={style.Emoji} aria-label="art">
                  🎨
                </span>
                Design
              </div>
            </div>
          </div>
          <p className={style.Description}>{NFT.description}</p>
          <div className={style.Buy}>
            <div className={style.BuyLeft}>
              <div className={style.QuantityLabel}>
                {`Available : `}
                <span className={style.QuantityCount}>
                  {typeof NFT.totalListedNft !== 'undefined' ? NFT.totalListedNft : 1}
                </span>
                {` of ${typeof NFT.totalNft !== 'undefined' ? NFT.totalNft : 1}`}
              </div>
              <div
                onClick={() => NFT.listed && userCanBuy && setExp(2)}
                className={
                  NFT.listed && userCanBuy
                    ? style.Button
                    : `${style.Button} ${style.Disabled}`
                }
              >
                Buy
              </div>
            </div>
            {NFT.listed === 1 && (
              <div className={style.BuyRight}>
                <div className={style.Price}>
                  {NFT.price && Number(NFT.price)>0 &&
                    `${computeCaps(Number(NFT.price))} CAPS`
                  }
                  {NFT.price && Number(NFT.price)>0 && NFT.priceTiime && Number(NFT.priceTiime) && 
                    ` / `
                  }
                  {NFT.priceTiime && Number(NFT.priceTiime)>0 && 
                    `${computeTiime(Number(NFT.priceTiime))} TIIME`
                  }
                </div>
                {fiatPrice > 0 && (
                  <span className={style.FiatPrice}>
                    {fiatPrice.toFixed(4)}$
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={style.HistoryTop}>
            <div className={style.HistoryTitle}>History</div>
            <div className={style.HistoryLine} />
          </div>
          <div className={style.History}>
            <Link href={`/${NFT.ownerData.walletId}`}>
              <a className={style.HistoryItem}>
                <Check className={style.Check} />
                <div className={style.HistoryAvatar}>
                  {NFT.ownerData.picture ? (
                    <img
                      src={NFT.ownerData.picture}
                      className={style.HistoryIMG}
                    />
                  ) : (
                    <div className={style.HistoryIMG} style={bgGradientOwner} />
                  )}
                </div>
                <div className={style.HistoryUser}>
                  <div className={style.HistoryRole}>Owner</div>
                  <div className={style.HistoryName}>{NFT.ownerData.name}</div>
                </div>
              </a>
            </Link>

            <Link href={`/${NFT.creatorData.walletId}`}>
              <a className={style.HistoryItem}>
                <Check className={style.Check} />
                <div className={style.HistoryAvatar}>
                  {NFT.creatorData.picture ? (
                    <img
                      src={NFT.creatorData.picture}
                      className={style.HistoryIMG}
                    />
                  ) : (
                    <div
                      className={style.HistoryIMG}
                      style={bgGradientCreator}
                    />
                  )}
                </div>
                <div className={style.HistoryUser}>
                  <div className={style.HistoryRole}>Creator</div>
                  <div className={style.HistoryName}>
                    {NFT.creatorData.name}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

export default NFTPage;
