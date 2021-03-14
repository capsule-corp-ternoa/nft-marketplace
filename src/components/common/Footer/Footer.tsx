import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type } from 'os';
import French from '../assets/Languages/France';
import Japanese from '../assets/Languages/Japan';
import English from '../assets/Languages/UK';

import Discord from '../assets/SocialMedias/Discord';

import style from './Footer.module.scss';
import WaterMark from '../assets/Watermark';
import Telegram from '../assets/SocialMedias/Telegram';
import Twitter from '../assets/SocialMedias/Twitter';
import LinkedIn from '../assets/SocialMedias/LinkedIn';
import Instagram from '../assets/SocialMedias/Instagram';
import Twitch from '../assets/SocialMedias/Twitch';
import Github from '../assets/SocialMedias/Github';
import Youtube from '../assets/SocialMedias/Youtube';

const Footer: React.FC<any> = ({ item }) => {
  const { i18n, t } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };
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
          <div className={style.Button}>Go</div>
        </div>
        <div className={style.SocialMedias}>
          <Discord onClick={(e) => true} className={style.SVGMedia} />
          <Telegram onClick={(e) => true} className={style.SVGMedia} />
          <Twitter onClick={(e) => true} className={style.SVGMedia} />
          <LinkedIn onClick={(e) => true} className={style.SVGMedia} />
          <Instagram onClick={(e) => true} className={style.SVGMedia} />
          <Twitch onClick={(e) => true} className={style.SVGMedia} />
          <Github onClick={(e) => true} className={style.SVGMedia} />
          <Youtube onClick={(e) => true} className={style.SVGMedia} />
        </div>
      </div>
      <div className={style.FooterBar}>
        <div className={style.Legals}>
          <div className={style.Link}>SECRET NFT</div>
          <div className={style.Link}>All rights reserved</div>
          <div className={style.Link}>Terms</div>
          <div className={style.Link}>Privacy</div>
          <div className={style.Link}>Support</div>
        </div>
        <div className={style.Languages}>
          <div className={style.Text}>Languages</div>
          <English onClick={() => changeLang('en')} className={style.Flag} />
          <French onClick={() => changeLang('fr')} className={style.Flag} />
          <Japanese onClick={() => changeLang('ja')} className={style.Flag} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
