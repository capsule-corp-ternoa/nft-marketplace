/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import style from './Hero.module.scss';

import Creator from '../../../common/Creator/Creator';

export interface HeroProps {
  creators: CreatorType[];
}

const Hero: React.FC<HeroProps> = ({ creators }) => {
  function returnCreators() {
    return creators.map((item) => (
      <div key={item.id} className={style.CreatorWrapper}>
        <Creator item={item} showTooltip={true} />
      </div>
    ));
  }

  return (
    <>
      <div className={style.Hero}>
        <div className={style.Head}>
          <h1 className={style.Title}>The 1st secret NFT market place.</h1>

          <div className={style.VideoContainer}>
            <video
              className={style.Video}
              controls={true}
              data-reactid=".0.1.0.0"
              height="100%"
              width="100%"
            >
              <source
                type="video/mp4"
                data-reactid=".0.1.0.0.0"
                src="teaser.mp4"
              />
            </video>
          </div>
        </div>
        <div className={style.Creators}>
          <h3 className={style.CreatorsTitle}>Creators of the week</h3>
          <div className={style.CreatorsDisplay}>{returnCreators()}</div>
        </div>
      </div>
    </>
  );
};

export default Hero;
