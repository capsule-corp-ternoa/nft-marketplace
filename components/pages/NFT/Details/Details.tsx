import {useEffect, useState} from 'react';
import { UserType, NftType } from 'interfaces';
import style from './Details.module.scss';

export interface DetailsProps {
    NFT: NftType;
    user: UserType;
  }
  
  const Details: React.FC<DetailsProps> = ({NFT}) => {
    const [info, setInfo] = useState(true)
    const [owners, setOwners] = useState(false)
    const [history, setHistory] = useState(false)
    const [bid, setBid] = useState(false)

    const handleInfo = () => {
      setInfo(true)
      setOwners(false),
      setHistory(false),
      setBid(false)
    }
    const handleOwners = () => {
      setInfo(false)
      setOwners(true),
      setHistory(false),
      setBid(false)
    }
    const handHistory = () => {
      setInfo(false)
      setOwners(false),
      setHistory(true),
      setBid(false)
    }
    // const handleBid = () => {
    //   setInfo(false)
    //   setOwners(false),
    //   setHistory(false),
    //   setBid(true)
    // }
    
    return (
      <div className={style.detailsMain}>
          <div className={style.detailsMenu}>
              <button className={info ? style.detailsMenuActiveItem : style.detailsMenuItem} onClick={handleInfo}>Infos</button>
              <button className={owners ? style.detailsMenuActiveItem : style.detailsMenuItem} onClick={handleOwners}>Owners</button>
              <button className={history ? style.detailsMenuActiveItem : style.detailsMenuItem} onClick={handHistory}>History</button>
              <button className={bid ? style.detailsMenuActiveItem : style.detailsMenuItem} disabled={true}>Bid</button>
          </div>
          <div>
            <div className={style.detailsContent}>
            {info &&
              <div className={style.detailsInfos}>
                <div className={style.infoDatas}>
                  <small className={style.infoDatasTitle}>Contract Address</small>
                  <div className={style.infoDatasContent}>0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec</div>
                </div>
                <div className={style.infoDatas}>
                  <small className={style.infoDatasTitle}>Token ID</small>
                  <div className={style.infoDatasContent}>100300039566</div>
                </div>
                <div className={style.infoDatas}>
                  <small className={style.infoDatasTitle}>Size</small>
                  <div className={style.infoDatasContent}>1024 x 1024 px.IMAGE(427KB)</div>
                </div>
              </div>
            }
            </div>
              {owners && "owners"}
              {history && "history"}
              {bid && "bid"}
            </div>
      </div>
    );
  };
  
  export default Details;
  