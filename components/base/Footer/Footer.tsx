import React from 'react';

import style from './Footer.module.scss';
import WaterMark from 'components/assets/Watermark';
import Telegram from 'components/assets/SocialMedias/Telegram';
import Twitter from 'components/assets/SocialMedias/Twitter';
import LinkedIn from 'components/assets/SocialMedias/LinkedIn';
import Instagram from 'components/assets/SocialMedias/Instagram';
import Github from 'components/assets/SocialMedias/Github';
import Youtube from 'components/assets/SocialMedias/Youtube';

export interface FooterProps {
  setNotAvailable: (b: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ setNotAvailable }) => {
  return (
    <div className={style.Footer}>
      <WaterMark className={style.WaterMark} />
      <div className={style.Container}>
        <span className={style.Insight}>Keep in touch !</span>
        <div className={style.InputContainer}>
          <input
            className={style.Input}
            placeholder="Your email..."
            type="text"
          />
          <div className={style.Button} onClick={() => setNotAvailable(true)}>
            Go
          </div>
        </div>
        <div className={style.SocialMedias}>
          <a href="https://t.me/ternoa" target="_blank">
            <Telegram onClick={() => true} className={style.SVGMedia} />
          </a>
          <a href="https://twitter.com/SecretNFT_" target="_blank">
            <Twitter onClick={() => true} className={style.SVGMediaTwitter} />
          </a>
          <a href="https://www.linkedin.com/company/50607388/" target="_blank">
            <LinkedIn onClick={() => true} className={style.SVGMedia} />
          </a>
          <a href="https://www.instagram.com/ternoa_/" target="_blank">
            <Instagram onClick={() => true} className={style.SVGMedia} />
          </a>
          <a href="https://github.com/capsule-corp-ternoa" target="_blank">
            <Github onClick={() => true} className={style.SVGMedia} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCUYvbtRE5HoWPz7z88V7Khw"
            target="_blank"
          >
            <Youtube onClick={() => true} className={style.SVGMedia} />
          </a>
        </div>
      </div>
      <div className={style.FooterBar}>
        <div className={style.Legals}>
          <div className={style.Link}>SECRET NFT</div>
          <div className={style.Link}>All rights reserved</div>
          <a
            href="https://intercom.help/ternoa/fr/collections/2774679-legal"
            className={style.Link}
          >
            Terms
          </a>
          <a
            href="https://intercom.help/ternoa/fr/collections/2774679-legal"
            className={style.Link}
          >
            Privacy
          </a>
        </div>
        {/* <div className={style.Languages}></div> */}
      </div>
    </div>
  );
};

export default Footer;
