import React from "react";
//import { useTranslation } from "react-i18next";

import French from "../../assets/Languages/France";
import Japanese from "../../assets/Languages/Japan";
import English from "../../assets/Languages/UK";

import Discord from "../../assets/SocialMedias/Discord";

import style from "./Footer.module.scss";
import WaterMark from "components/assets/Watermark";
import Telegram from "components/assets/SocialMedias/Telegram";
import Twitter from "components/assets/SocialMedias/Twitter";
import LinkedIn from "components/assets/SocialMedias/LinkedIn";
import Instagram from "components/assets/SocialMedias/Instagram";
import Twitch from "components/assets/SocialMedias/Twitch";
import Github from "components/assets/SocialMedias/Github";
import Youtube from "components/assets/SocialMedias/Youtube";

const Footer: React.FC = () => {
  //const { i18n, t } = useTranslation();

  const changeLang = (lang?: string) => {
    //i18n.changeLanguage(lang);
    return lang;
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
          <Discord onClick={() => true} className={style.SVGMedia} />
          <Telegram onClick={() => true} className={style.SVGMedia} />
          <Twitter onClick={() => true} className={style.SVGMedia} />
          <LinkedIn onClick={() => true} className={style.SVGMedia} />
          <Instagram onClick={() => true} className={style.SVGMedia} />
          <Twitch onClick={() => true} className={style.SVGMedia} />
          <Github onClick={() => true} className={style.SVGMedia} />
          <Youtube onClick={() => true} className={style.SVGMedia} />
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
          <English onClick={() => changeLang("en")} className={style.Flag} />
          <French onClick={() => changeLang("fr")} className={style.Flag} />
          <Japanese onClick={() => changeLang("ja")} className={style.Flag} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
