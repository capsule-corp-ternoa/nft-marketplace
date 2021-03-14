/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Switch from 'react-switch';
import style from './Showcase.module.scss';

import NFTCard from '../../../common/NftCard/NftCard';

import 'react-multi-carousel/lib/styles.css';

const Showcase: React.FC<any> = ({ NFTs, category }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  function returnNFTs() {
    return NFTs.map((item: any) => <NFTCard key={item.id} item={item} />);
  }

  return (
    <>
      <div className={style.Showcase}>
        <div className={style.Top}>
          <div className={style.Infos}>
            <h3 className={style.Title}>{category}</h3>
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
          <div className={style.Nav}>
            <span>-</span>
            <span>+</span>
          </div>
        </div>
        <div className={style.Wrapper}>
          <div className={style.NFTContainer}>{returnNFTs()}</div>
        </div>
      </div>
    </>
  );
};

export default Showcase;
