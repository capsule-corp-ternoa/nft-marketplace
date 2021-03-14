/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Switch from 'react-switch';
import style from './ArtCreators.module.scss';
import Creator from '../../../common/Creator/Creator';
import NFTCard from '../../../common/NftCard/NftCard';

import Blaze from '../../../common/assets/blaze';

const ArtCreators: React.FC<any> = ({ creators, NFTs, category }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  function returnCreators() {
    return creators.map((item: any) => (
      <div key={item.id} className={style.CreatorItem}>
        <Creator item={item} showTooltip={true} />
      </div>
    ));
  }

  function returnNFTs() {
    return NFTs.map((item: any) => <NFTCard key={item.id} item={item} />);
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
                onChange={(e) => setIsFiltered(!isFiltered)}
                offColor="#00000"
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
