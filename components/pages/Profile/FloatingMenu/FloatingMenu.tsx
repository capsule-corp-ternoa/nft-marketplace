import React from 'react';
import Link from 'next/link';

import style from './FloatingMenu.module.scss';

import PowerOff from 'components/assets/poweroff';
import Close from 'components/assets/close';

export interface FloatingMenuProps {
  setScope: (s: string) => void;
  setExpand: (b: boolean) => void;
  scope: string;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  scope,
  setScope,
  setExpand,
}) => {
  function returnActiveTitle(name: string) {
    if (scope === name) {
      return `${style.SectionTitle} ${style.SectionTitleActive}`;
    } else {
      return style.SectionTitle;
    }
  }

  function returnActiveNumber(name: string) {
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
              setScope('My NFTs');
              setExpand(false);
            }}
            className={returnActiveTitle('My NFTs')}
          >
            My NFTs
          </div>
          <div className={returnActiveNumber('My NFTs')}>12</div>
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
