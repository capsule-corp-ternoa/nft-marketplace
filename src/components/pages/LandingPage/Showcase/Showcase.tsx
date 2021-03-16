/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Switch from 'react-switch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import style from './Showcase.module.scss';

import NFTCard from '../../../general/NftCard/NftCard';
import ArrowLeft from '../../../general/assets/arrowLeft';
import ArrowRight from '../../../general/assets/arrowRight';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1330 },
    items: 4.2,
  },
  desktop2: {
    breakpoint: { max: 1330, min: 950 },
    items: 3.8,
  },
  tablet: {
    breakpoint: { max: 950, min: 830 },
    items: 3.5,
  },
  tablet2: {
    breakpoint: { max: 830, min: 600 },
    items: 3,
  },
  mobile2: {
    breakpoint: { max: 600, min: 530 },
    items: 2.4,
  },
  mobile3: {
    breakpoint: { max: 530, min: 450 },
    items: 2,
  },
  mobile4: {
    breakpoint: { max: 450, min: 0 },
    items: 1.5,
  },
};

export interface ShowcaseProps {
  NFTs: NftType[];
  category: string;
}

const Showcase: React.FC<ShowcaseProps> = ({ NFTs, category }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  let carousel: Carousel | null = null;

  function returnNFTs() {
    return NFTs.map((item) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard item={item} />
      </div>
    ));
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
            <div
              onClick={() => carousel?.previous(1)}
              className={style.NavButton}
            >
              <ArrowLeft className={style.ArrowSVG} />
            </div>

            <div onClick={() => carousel?.next(1)} className={style.NavButton}>
              <ArrowRight className={style.ArrowSVG} />
            </div>
          </div>
        </div>
        <div className={style.Wrapper}>
          <div className={style.NFTContainer}>
            <Carousel
              ref={(el) => {
                carousel = el;
              }}
              responsive={responsive}
              infinite
              arrows={false}
              className={style.CarouselContainer}
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
