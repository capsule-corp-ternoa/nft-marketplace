/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Switch from 'react-switch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import style from './Showcase.module.scss';

import NFTCard from '../../../common/NftCard/NftCard';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  }
};

const Showcase: React.FC<any> = ({ NFTs, category }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  let carousel : Carousel | null = null;

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
            <button type="button" onClick={() => carousel?.previous(1)}>-</button>
            <button type="button" onClick={() => carousel?.next(1)}>+</button>
          </div>
        </div>
        <div className={style.Wrapper}>
          <div className={style.NFTContainer}>
            <Carousel
              ref={(el) => {carousel = el;}} 
              responsive={responsive} 
              infinite
              arrows={false} 
              centerMode
            >
              {returnNFTs()}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Showcase;
