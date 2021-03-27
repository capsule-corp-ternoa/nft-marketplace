import React from 'react';
import Link from 'next/link';
//import { useTranslation } from 'react-i18next';
import style from './FloatingMenu.module.scss';

import PowerOff from 'components/assets/poweroff';
import Close from 'components/assets/close';

const FloatingMenu: React.FC<any> = ({ scope, setScope, setExpand }) => {
  //const { t } = useTranslation();

  function returnActiveTitle(name: any) {
    if (scope === name) {
      return `${style.SectionTitle} ${style.SectionTitleActive}`;
    } else {
      return style.SectionTitle;
    }
  }

  function returnActiveNumber(name: any) {
    if (scope === name)
      return `${style.SectionNumber} ${style.SectionNumberActive}`;
    else return style.SectionNumber;
  }

  return (
    <div id="FPM" className={`${style.FloatingMenu} ${style.PopMenu}`}>
      <div className={style.Sections}>
        <Link href="/edit">
          <a className={style.Section}>Edit profile</a>
        </Link>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('My NFTs on sale');
              setExpand(false);
            }}
            className={returnActiveTitle('My NFTs on sale')}
          >
            On sale
          </div>
          <div className={returnActiveNumber('My NFTs on sale')}>12</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('My Collectibles');
              setExpand(false);
            }}
            className={returnActiveTitle('My Collectibles')}
          >
            Collectibles
          </div>
          <div className={returnActiveNumber('My Collectibles')}>45</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('My creations');
              setExpand(false);
            }}
            className={returnActiveTitle('My creations')}
          >
            Created
          </div>
          <div className={returnActiveNumber('My creations')}>4</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('Likes');
              setExpand(false);
            }}
            className={returnActiveTitle('Likes')}
          >
            Likes
          </div>
          <div className={returnActiveNumber('Likes')}>103</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('Followers');
              setExpand(false);
            }}
            className={returnActiveTitle('Followers')}
          >
            Followers
          </div>
          <div className={returnActiveNumber('Followers')}>349</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('Followings');
              setExpand(false);
            }}
            className={returnActiveTitle('Followings')}
          >
            Followings
          </div>
          <div className={returnActiveNumber('Followings')}>38</div>
        </div>

        <div onClick={() => setExpand(false)} className={style.Logoff}>
          <div className={style.SectionTitle}>Disconnect</div>
          <PowerOff className={style.PowerOff} />
        </div>

        <div className={style.Close} onClick={() => setExpand(false)}>
          <Close onClick={() => true} className={style.CloseSVG} />
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;
