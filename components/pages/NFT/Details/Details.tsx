import { useState } from 'react';
import { UserType, NftType } from 'interfaces';
import gradient from 'random-gradient';
import style from './Details.module.scss';
import Link from 'next/link';

export interface DetailsProps {
  NFT: NftType;
  user: UserType;
}

const Details: React.FC<DetailsProps> = ({ NFT }) => {
  const [info, setInfo] = useState(true);
  const [owners, setOwners] = useState(false);
  const [history, setHistory] = useState(false);
  const [bid, setBid] = useState(false);
  const bgGradientOwner = { background: gradient(NFT.ownerData.name) };

  const handleInfo = () => {
    setInfo(true);
    setOwners(false), setHistory(false), setBid(false);
  };
  const handleOwners = () => {
    setInfo(false);
    setOwners(true), setHistory(false), setBid(false);
  };
  const handHistory = () => {
    setInfo(false);
    setOwners(false), setHistory(true), setBid(false);
  };
  // const handleBid = () => {
  //   setInfo(false)
  //   setOwners(false),
  //   setHistory(false),
  //   setBid(true)
  // }

  return (
    <div className={style.detailsMain}>
      <div className={style.detailsMenu}>
        <button
          className={info ? style.detailsMenuActiveItem : style.detailsMenuItem}
          onClick={handleInfo}
        >
          Infos
        </button>
        <button
          className={
            owners ? style.detailsMenuActiveItem : style.detailsMenuItem
          }
          onClick={handleOwners}
        >
          Owners
        </button>
        <button
          className={
            history ? style.detailsMenuActiveItem : style.detailsMenuItem
          }
          onClick={handHistory}
        >
          History
        </button>
        <button
          className={bid ? style.detailsMenuActiveItem : style.detailsMenuItem}
          disabled={true}
        >
          Bid
        </button>
      </div>
      <div>
        <div className={style.detailsContent}>
          {info && (
            <div className={style.detailsInfos}>
              <div className={style.infoDatas}>
                <small className={style.infoDatasTitle}>Contract Address</small>
                <div className={style.infoDatasContent}>
                  0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec
                </div>
              </div>
              <div className={style.infoDatas}>
                <small className={style.infoDatasTitle}>Token ID</small>
                <div className={style.infoDatasContent}>100300039566</div>
              </div>
              <div className={style.infoDatas}>
                <small className={style.infoDatasTitle}>Size</small>
                <div className={style.infoDatasContent}>
                  1024 x 1024 px.IMAGE(427KB)
                </div>
              </div>
            </div>
          )}
          {owners && (
            <div className={style.owners}>
              <Link href={`/${NFT.ownerData.walletId}`}>
                <a className={style.owner}>
                  <div className={style.ownerProfile}>
                    {NFT.ownerData.picture ? (
                      <img
                        src={NFT.ownerData.picture}
                        className={style.ownerProfileIMG}
                      />
                    ) : (
                      <div
                        className={style.ownerProfileIMG}
                        style={bgGradientOwner}
                      />
                    )}
                  </div>
                  <div className={style.ownerDatas}>
                    <div className={style.ownerDatasName}>
                      {NFT.ownerData.name}
                    </div>
                    <div className={style.ownerDatasSales}>
                      <small>12/12 on sale for 100 CAPS each</small>
                    </div>
                  </div>
                </a>
              </Link>
              <div>
                <div className={style.buyButton}>Buy</div>
              </div>
            </div>
          )}
        </div>
        {history && 'history'}
        {bid && 'bid'}
      </div>
    </div>
  );
};

export default Details;
