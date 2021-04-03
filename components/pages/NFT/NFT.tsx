import React from 'react';
//import { useTranslation } from 'react-i18next';
import style from './NFT.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';

import Scale from 'components/assets/scale';

import Check from 'components/assets/check';
import Share from 'components/assets/share';
import Like from 'components/assets/heart';
import Eye from 'components/assets/eye';

import gradient from 'random-gradient';

import { shortString } from 'utils/strings';

const NFTPage: React.FC<any> = ({
  setExp,
  NFT,
  setModalExpand,
  setNotAvailable,
  user,
  type,
}) => {
  const bgGradientOwner = { background: gradient(NFT.ownerData.name) };
  const bgGradientCreator = { background: gradient(NFT.creatorData.name) };
  const bgGradient = { background: gradient(user.name) };

  const fiatPrice = NFT.price * 0.008;

  function returnType() {
    if (!type) return null;
    if (type!.substr(0, 5) === 'image') {
      return <img className={style.NFTIMG} src={NFT.media.url} alt="imgnft" />;
    }
    if (type!.substr(0, 5) === 'video')
      return (
        <video autoPlay muted loop className={style.NFTIMG}>
          <source id="outputVideo" src={NFT.media.url} type="video/mp4" />
        </video>
      );
  }

  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <div className={style.NFT}>
          {returnType()}
          <div onClick={() => setExp(1)} className={style.Scale}>
            <Scale className={style.ScaleSVG} />
          </div>
        </div>
        <div className={style.Text}>
          <div className={style.Top}>
            <h1 className={style.Title}>{NFT.name}</h1>
            <div className={style.TopInfos}>
              <div className={style.Views}>
                <Eye className={style.EyeSVG} />0
              </div>
              <div className={style.Like}>
                <Like className={style.LikeSVG} />
              </div>
              <div className={style.Share}>
                <Share className={style.ShareSVG} />
              </div>
            </div>
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
          <p className={style.Description}>{NFT.descripion}</p>
          <div className={style.Buy}>
            <div className={style.BuyLeft}>
              <div onClick={() => setExp(2)} className={style.Button}>
                Buy
              </div>
            </div>
            <div className={style.BuyRight}>
              <div className={style.Price}>
                {shortString(Number(NFT.price))} CAPS
              </div>
              <span className={style.FiatPrice}>{fiatPrice}$</span>
            </div>
          </div>
          <div className={style.HistoryTop}>
            <div className={style.HistoryTitle}>History</div>
            <div className={style.HistoryLine} />
          </div>
          <div className={style.History}>
            <div className={style.HistoryItem}>
              <Check className={style.Check} />
              <div className={style.HistoryAvatar}>
                <div className={style.HistoryIMG} style={bgGradientCreator} />
              </div>
              <div className={style.HistoryUser}>
                <div className={style.HistoryRole}>Creator</div>
                <div className={style.HistoryName}>{NFT.creatorData.name}</div>
              </div>
            </div>
            <div className={style.HistoryItem}>
              <Check className={style.Check} />
              <div className={style.HistoryAvatar}>
                <div className={style.HistoryIMG} style={bgGradientOwner} />
              </div>
              <div className={style.HistoryUser}>
                <div className={style.HistoryRole}>Owner</div>
                <div className={style.HistoryName}>{NFT.ownerData.name}</div>
              </div>
            </div>
            <div className={style.HistoryItem}>
              <Check className={style.Check} />
              <div className={style.HistoryAvatar}>
                <div className={style.HistoryIMG} style={bgGradient} />
              </div>
              <div className={`${style.HistoryUser} ${style.HistoryPast}`}>
                <div className={style.HistoryRole}>Previous Owner</div>
                <div className={style.HistoryName}>Satoshi Nakamoto</div>
              </div>
            </div>
            <div className={style.HistoryItem}>
              <Check className={style.Check} />
              <div className={style.HistoryAvatar}>
                <div className={style.HistoryIMG} style={bgGradient} />
              </div>

              <div className={`${style.HistoryUser} ${style.HistoryPast}`}>
                <div className={style.HistoryRole}>Previous Owner</div>
                <div className={style.HistoryName}>Satoshi Nakamoto</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

export default NFTPage;
