/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Switch from 'react-switch';
import Link from 'next/link';
import style from './ArtCreators.module.scss';
import Creator from 'components/base/Creator';
import NFTCard from 'components/base/NftCard';

import Blaze from 'components/assets/blaze';

import { CreatorType, NftType } from 'interfaces/index';

export interface ArtCreatorsProps {
  creators: CreatorType[];
  NFTs: NftType[];
  category?: string;
}

const ArtCreators: React.FC<ArtCreatorsProps> = ({ creators, NFTs }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  function returnCreators() {
    return creators.slice(0, 9).map((item) => (
      <Link key={item.id} href={`/${item.name}`}>
        <a className={style.CreatorItem}>
          <Creator item={item} size="small" />
        </a>
      </Link>
    ));
  }

  function returnNFTs() {
    return NFTs.map((item) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard mode="show" item={item} />
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
          <div className={style.Toggle}>
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
