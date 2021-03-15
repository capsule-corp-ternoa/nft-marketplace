/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Switch from 'react-switch';
import style from './ArtCreators.module.scss';
import Creator from '../../../general/Creator/Creator';
import NFTCard from '../../../general/NftCard/NftCard';

import Blaze from '../../../general/assets/blaze';

export interface ArtCreatorsProps {
  creators: CreatorType[];
  NFTs: NftType[];
  category?: string;
}

const ArtCreators: React.FC<ArtCreatorsProps> = ({
  creators,
  NFTs,
  category,
}) => {
  const [isFiltered, setIsFiltered] = useState(false);

  function returnCreators() {
    return creators.slice(0, 9).map((item) => (
      <div key={item.id} className={style.CreatorItem}>
        <Creator item={item} size="small" />
      </div>
    ));
  }

  function returnNFTs() {
    return NFTs.map((item) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard item={item} />
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
