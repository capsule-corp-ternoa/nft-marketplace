import React from 'react';
//import { useTranslation } from 'react-i18next';
import style from './Infos.module.scss';

import Badge from 'components/assets/badge';
import CopyPaste from 'components/assets/copypaste';
import Twitter from 'components/assets/SocialMedias/Twitter';

const Infos: React.FC<any> = ({ item }) => {
  //const { t } = useTranslation();

  return (
    <div className={style.Infos}>
      <div className={style.Container}>
        <div className={style.AvatarShell}>
          <div className={style.Avatar}>
            <img className={style.AvatarIMG} src={item.img} />
            {item.verified && <Badge className={style.Badge} />}
          </div>
        </div>
        <div className={style.ContainerInner}>
          <div className={style.Left}>
            <h1 className={style.Name}>{item.name}</h1>
            <a href="https://twitter.com/elonmusk" className={style.Twitter}>
              <Twitter onClick={() => true} className={style.TwitterSVG} />@
              {item.twitter}
            </a>
            <div className={style.Description}>{item.description}</div>
          </div>
          <div className={style.Right}>
            <div className={style.Top}>
              <div
                className={style.Address}
                onClick={() => {
                  navigator.clipboard.writeText(item.address);
                }}
              >
                {item.address} <CopyPaste className={style.CopyPaste} />
              </div>
              <div className={style.Button}>Follow</div>
            </div>
            <div className={style.Bottom}>
              <span className={style.Bold}>{item.followers}</span>followers
              <span className={style.Separator}>·</span>
              <span className={style.Bold}>{item.following}</span>following
              <span className={style.Separator}>·</span>
              <span className={style.Bold}>{item.views}</span>vues
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infos;
