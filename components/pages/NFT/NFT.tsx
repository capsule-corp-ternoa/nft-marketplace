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

const NFTPage: React.FC<any> = ({ setExp, NFT, setModalExpand }) => {
  //const { t } = useTranslation();

  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <div className={style.NFT}>
          <img className={style.NFTIMG} src={NFT.img} alt="imgnft" />
          <div onClick={() => setExp(1)} className={style.Scale}>
            <Scale className={style.ScaleSVG} />
          </div>
        </div>
        <div className={style.Text}>
          <div className={style.Top}>
            <h1 className={style.Title}>Nature art floral</h1>
            <div className={style.TopInfos}>
              <div className={style.Views}>
                <Eye className={style.EyeSVG} />
                105
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
          <div className={style.Infos}>
            <div className={style.Collection}>
              <div className={style.TopCol}>Collection ERC 721</div>
              <div className={style.BotCol}>Name</div>
            </div>
            <div className={style.Tags}>
              <div className={style.Tag}>
                <span role="img" className={style.Emoji} aria-label="art">
                  🎨
                </span>
                Design
              </div>
            </div>
          </div>
          <p className={style.Description}>
            Description jdiezaoje jdeizaopeijd eizoapiejd iopaziejd jiezopaiejd
            deizpaoiejh dheapzoeihde uzoapeuhfeuzoap.
          </p>
          <div className={style.Buy}>
            <div className={style.BuyLeft}>
              <div onClick={() => setExp(2)} className={style.Button}>
                Buy
              </div>
              <span className={style.Fees}>Service fee 1.5%</span>
            </div>
            <div className={style.BuyRight}>
              <div className={style.Price}>14 982 caps</div>
              <span className={style.FiatPrice}>13 500$</span>
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
                <img
                  className={style.HistoryIMG}
                  src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                />
              </div>
              <div className={style.HistoryUser}>
                <div className={style.HistoryRole}>Creator</div>
                <div className={style.HistoryName}>Jean Jack</div>
              </div>
            </div>
            <div className={style.HistoryItem}>
              <Check className={style.Check} />
              <div className={style.HistoryAvatar}>
                <img
                  className={style.HistoryIMG}
                  src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                />
              </div>
              <div className={style.HistoryUser}>
                <div className={style.HistoryRole}>Owner</div>
                <div className={style.HistoryName}>Jean Jack</div>
              </div>
            </div>
            <div className={style.HistoryItem}>
              <Check className={style.Check} />
              <div className={style.HistoryAvatar}>
                <img
                  className={style.HistoryIMG}
                  src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                />
              </div>
              <div className={`${style.HistoryUser} ${style.HistoryPast}`}>
                <div className={style.HistoryRole}>Previous Owner</div>
                <div className={style.HistoryName}>Jean Jack</div>
              </div>
            </div>
            <div className={style.HistoryItem}>
              <Check className={style.Check} />
              <div className={style.HistoryAvatar}>
                <img
                  className={style.HistoryIMG}
                  src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                />
              </div>

              <div className={`${style.HistoryUser} ${style.HistoryPast}`}>
                <div className={style.HistoryRole}>Previous Owner</div>
                <div className={style.HistoryName}>Jean Jack</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingHeader setModalExpand={setModalExpand} />
    </div>
  );
};

export default NFTPage;
