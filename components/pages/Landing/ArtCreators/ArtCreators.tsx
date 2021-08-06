import React, { useState } from 'react';
import Switch from 'react-switch';
import Link from 'next/link';
import style from './ArtCreators.module.scss';
import Creator from 'components/base/Creator';
import NFTCard from 'components/base/NftCard';

import Blaze from 'components/assets/blaze';

import { UserType, NftType } from 'interfaces/index';

export interface ArtCreatorsProps {
  creators: UserType[];
  NFTs: NftType[];
  category?: string;
  user?: UserType;
  setUser?: (u: UserType) => void
}

const ArtCreators: React.FC<ArtCreatorsProps> = ({
  creators,
  NFTs,
  user, 
  setUser
}) => {
  const [isFiltered, setIsFiltered] = useState(false);
  function returnCreators() {
    return creators.slice(0, 9).map((item, index) => (
      <Link key={index} href={`/${item.walletId}`}>
        <a className={style.CreatorItem}>
          <Creator user={item} size="small" />
        </a>
      </Link>
    ));
  }

  function returnNFTs() {
    return NFTs.map((item) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard 
          mode="show" 
          item={item} 
          user={user}
          setUser={setUser}
        />
      </div>
    ));
  }

  return (
    <>
      <div className={style.Wrapper}>
        <div className={style.Top}>
          <h3 className={style.Title}>
            Best art creators <Blaze className={style.BlazeSVG} />
          </h3>
          <div className={`${style.Toggle} ${style.Hide}`}>
            <label>
              <Switch
                checked={isFiltered}
                onChange={() => setIsFiltered(!isFiltered)}
                offColor="#000000"
                onColor="#7417ea"
                uncheckedIcon={false}
                checkedIcon={false}
                width={46}
                handleDiameter={23}
                className={style.SwitchShell}
              />
            </label>
            <span className={style.Label}>Certified only</span>
          </div>
        </div>
        <div className={style.Bottom}>
          <div className={style.NFTS}>{returnNFTs()}</div>
          <div className={style.CreatorsContainer}>
            <div className={style.CreatorsInner}>{returnCreators()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtCreators;
