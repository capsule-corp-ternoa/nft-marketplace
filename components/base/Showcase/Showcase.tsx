import React, { useState } from 'react';
import Switch from 'react-switch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useMediaQuery } from 'react-responsive';
import { breakpointMap } from 'style/theme/base';

import style from './Showcase.module.scss';

import { NftCardWithHover } from 'components/base/NftCard';
import ArrowLeft from 'components/assets/arrowLeft';
import ArrowRight from 'components/assets/arrowRight';

import { NftType, UserType } from 'interfaces/index';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: breakpointMap.xxl },
    items: 4.2,
  },
  tablet: {
    breakpoint: { max: (breakpointMap.xxl - 1), min: breakpointMap.lg },
    items: 4.2,
  },
  tablet2: {
    breakpoint: { max: (breakpointMap.lg - 1), min: breakpointMap.md },
    items: 3.5,
  },
  mobile: {
    breakpoint: { max: (breakpointMap.md - 1), min: breakpointMap.sm },
    items: 2.4,
  },
  mobile2: {
    breakpoint: { max: (breakpointMap.sm - 1), min: 0 },
    items: 1.8,
  },
};

export interface ShowcaseProps {
  NFTs: NftType[];
  category: string;
  user?: UserType;
  setUser?: (u: UserType) => void
}

const Showcase: React.FC<ShowcaseProps> = ({ NFTs, category, user, setUser }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isMobile = useMediaQuery({ query: `(max-width: ${breakpointMap.md - 1}px)` });

  let carousel: Carousel | null = new Carousel({
    responsive: {},
    children: <></>,
  });

  return (
    <>
      {NFTs?.length > 0 && (
        <div className={style.Showcase}>
          <div className={style.Top}>
            <div className={style.Infos}>
              <h3 className={style.Title}>{category}</h3>
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
            {!isMobile && (
              <div className={style.Nav}>
                <div
                  onClick={() => {
                    carousel?.previous(1);
                  }}
                  className={style.NavButton}
                >
                  <ArrowLeft className={style.ArrowSVG} />
                </div>

                <div
                  onClick={() => {
                    carousel?.next(1);
                  }}
                  className={style.NavButton}
                >
                  <ArrowRight className={style.ArrowSVG} />
                </div>
              </div>
            )}
          </div>
          <div className={style.Wrapper}>
            <div
              className={style.NFTContainer}
              onMouseDown={() => setIsDragging(false)}
              onMouseMove={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(false)}
              onTouchMove={() => setIsDragging(true)}
            >
              {isMobile ? (
                NFTs.map((item) => (
                  <div key={item.id} className={style.NFTShell}>
                    <NftCardWithHover
                      isDragging={isDragging}
                      item={item}
                      user={user}
                      setUser={setUser}
                    />
                  </div>
                ))
              ) : (
                <Carousel
                  ref={(el) => {
                    carousel = el;
                  }}
                  responsive={responsive}
                  infinite
                  ssr={false}
                  arrows={false}
                  className={style.CarouselContainer}
                  swipeable={true}
                >
                  {NFTs.map((item) => (
                    <div key={item.id} className={style.NFTShell}>
                      <NftCardWithHover
                        isDragging={isDragging}
                        item={item}
                        user={user}
                        setUser={setUser}
                      />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Showcase;
