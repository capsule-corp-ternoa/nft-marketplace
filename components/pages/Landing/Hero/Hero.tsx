import React, { useState } from 'react';
import style from './Hero.module.scss';
import Link from 'next/link';

import Creator from 'components/base/Creator';
//import Ternoart from 'components/assets/ternoart';

import SoundOn from 'components/assets/SoundOn';
import SoundOff from 'components/assets/SoundOff';

import { UserType } from 'interfaces/index';

export interface HeroProps {
  users: UserType[];
}

const Hero: React.FC<HeroProps> = ({ users }) => {
  const [mute, setMute] = useState(true);

  function returnCreators() {
    return users.slice(0, 10).map((item, index) => (
      <Link key={index} href={`/${item.walletId}`}>
        <a className={style.CreatorWrapper}>
          <Creator user={item} showTooltip={true} />
        </a>
      </Link>
    ));
  }

  function toggleMute() {
    var video = document.getElementById('video') as HTMLVideoElement;
    video!.muted = !video!.muted;
    setMute(!mute);
  }

  return (
    <>
      <div className={style.Hero}>
        <div className={style.Head}>
          <div className={style.VideoContainer}>
            <video
              className={style.Video}
              autoPlay
              muted={true}
              loop
              playsInline
              data-reactid=".0.1.0.0"
              height="100%"
              width="100%"
              id="video"
            >
              <source
                data-reactid=".0.1.0.0.0"
                src="ternoart.mp4"
              />
            </video>
            <span className={style.Sound} onClick={() => toggleMute()}>
              {mute ? (
                <SoundOff className={style.SoundOffSVG} />
              ) : (
                <SoundOn className={style.SoundOnSVG} />
              )}
            </span>
          </div>

          {/*<div className={style.Content}>
            <div className={style.Left}>
              <div className={style.Label}>
                Hello Alpha tester
                <span role="img" className={style.Emoji} aria-label="wave">
                  👋
                </span>
              </div>
              <div className={style.ContentContainer}>
                <div className={style.Headline}>
                  <span className={style.Light}>Be the first</span>
                  <div className={style.Bold}>Try SecretNFT</div>
                </div>
                <p className={style.Description}>
                  We invite you to try the “SecretNFT”, our NFTs marketplace in alpha
                  version on Ternoa Chain. Help us discover bugs, give feedbacks
                  to improve the product and the experience. <span>You earn NFTs in return</span> ! 🙂
                </p>
              </div>

              <a
                className={style.Button}
                href="https://t.me/joinchat/haiw0G_RU0w1OTc0"
                target="blank"
              >
                Submit your creations
              </a>
            </div>
            <div className={style.Logo}>
              <Ternoart className={style.Ternoart} />
            </div>
            <div className={style.Right}>
              <div className={style.RightContainer}>
                <div className={style.AvailableSoon}>Available Soon</div>
                <div className={style.Line} />
                <div className={style.Step}>
                  <div className={style.StepNumber}>1</div>
                  <div className={style.StepText}>Connect your wallet</div>
                </div>
                <div className={style.Step}>
                  <div className={style.StepNumber}>2</div>
                  <div className={style.StepText}>Get “chaos CAPS”</div>
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
          </div>*/}
        </div>
        <div className={style.Creators}>
          <h3 className={style.CreatorsTitle}>Creators</h3>
          <div className={style.CreatorsDisplay}>{returnCreators()}</div>
        </div>
      </div>
    </>
  );
};

export default Hero;
