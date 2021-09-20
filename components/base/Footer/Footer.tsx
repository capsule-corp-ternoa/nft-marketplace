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
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK ? process.env.NEXT_PUBLIC_TELEGRAM_LINK : "https://t.me/ternoa"
  const twitterLink = process.env.NEXT_PUBLIC_TWITTER_LINK ? process.env.NEXT_PUBLIC_TWITTER_LINK : "https://twitter.com/SecretNFT_"
  const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_LINK ? process.env.NEXT_PUBLIC_LINKEDIN_LINK : "https://www.linkedin.com/company/50607388/"
  const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_LINK ? process.env.NEXT_PUBLIC_INSTAGRAM_LINK : "https://www.instagram.com/ternoa_/"
  const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK ? process.env.NEXT_PUBLIC_GITHUB_LINK : "https://github.com/capsule-corp-ternoa"
  const youtubeLink = process.env.NEXT_PUBLIC_YOUTUBE_LINK ? process.env.NEXT_PUBLIC_YOUTUBE_LINK : "https://www.youtube.com/channel/UCUYvbtRE5HoWPz7z88V7Khw"
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
          {telegramLink!=="false" && <a href={telegramLink} target="_blank">
            <Telegram onClick={() => true} className={style.SVGMedia} />
          </a>}
          {twitterLink!=="false" && <a href={twitterLink} target="_blank">
            <Twitter onClick={() => true} className={style.SVGMediaTwitter} />
          </a>}
          {linkedinLink!=="false" && <a href={linkedinLink} target="_blank">
            <LinkedIn onClick={() => true} className={style.SVGMedia} />
          </a>}
          {instagramLink!=="false" && <a href={instagramLink} target="_blank">
            <Instagram onClick={() => true} className={style.SVGMedia} />
          </a>}
          {githubLink!=="false" && <a href={githubLink} target="_blank">
            <Github onClick={() => true} className={style.SVGMedia} />
          </a>}
          {youtubeLink!=="false" && <a href={youtubeLink} target="_blank">
            <Youtube onClick={() => true} className={style.SVGMedia} />
          </a>}
        </div>
      </div>
      <div className={style.FooterBar}>
        <div className={style.Legals}>
          <div className={style.Link}>{process.env.NEXT_PUBLIC_APP_NAME || "SecretNFT"}</div>
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
