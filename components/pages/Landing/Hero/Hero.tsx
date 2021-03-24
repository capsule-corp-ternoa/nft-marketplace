/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import style from './Hero.module.scss';
import Link from 'next/link';

import Creator from 'components/base/Creator';
import Ternoart from 'components/assets/ternoart';

import { CreatorType } from 'interfaces/index';

export interface HeroProps {
  creators: CreatorType[];
}

const Hero: React.FC<HeroProps> = ({ creators }) => {
  function returnCreators() {
    return creators.slice(0, 10).map((item) => (
      <Link key={item.id} href={`/creator-test`}>
        <a className={style.CreatorWrapper}>
          <Creator item={item} showTooltip={true} />
        </a>
      </Link>
    ));
  }

  return (
    <>
      <div className={style.Hero}>
        <div className={style.Head}>
          <div className={style.VideoContainer}>
            <video
              className={style.Video}
              muted
              controls={true}
              data-reactid=".0.1.0.0"
              height="100%"
              width="100%"
            >
              <source
                type="video/mp4"
                data-reactid=".0.1.0.0.0"
                src="ternoart.mp4"
              />
            </video>
          </div>

          <div className={style.Content}>
            <div className={style.Left}>
              <div className={style.Label}>Be Alpha User !</div>
              <div className={style.ContentContainer}>
                <div className={style.Headline}>
                  <span className={style.Light}>Be the first</span>
                  <div className={style.Bold}>to use SECRET NFT</div>
                </div>
                <p className={style.Description}>
                  We invit you to test our Secret NFT Marketplace in alpha
                  version on the ternoa Blockchain. Help us discover bugs, give
                  feedback to improve the Blockchain and the Marketplace and
                  <span>earn NFTs in return</span> !
                </p>
              </div>
              <div className={style.Button}>
                Are you an artist ? Submit your art
              </div>
            </div>
            <div className={style.Logo}>
              <Ternoart className={style.Ternoart} />
            </div>
            <div className={style.Right}>
              <div className={style.RightContainer}>
                <div className={style.Line} />
                <div className={style.Step}>
                  <div className={style.StepNumber}>1</div>
                  <div className={style.StepText}>Connect your wallet</div>
                </div>
                <div className={style.Step}>
                  <div className={style.StepNumber}>2</div>
                  <div className={style.StepText}>Get free caps : FCAPS</div>
                </div>
                <div className={style.Step}>
                  <div className={style.StepNumber}>3</div>
                  <div className={style.StepText}>Make transactions</div>
                </div>
                <div className={style.Step}>
                  <div className={style.StepNumber}>4</div>
                  <div className={style.StepText}>Win a 'secret NFT'</div>
                </div>
              </div>
            </div>
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
