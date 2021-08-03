import React from 'react';
import Link from 'next/link';

import style from './FloatingMenu.module.scss';

import PowerOff from 'components/assets/poweroff';
import Close from 'components/assets/close';

import Cookies from "js-cookie";
import { useRouter } from "next/router";

export interface FloatingMenuProps {
  setScope: (s: string) => void;
  setExpand: (b: boolean) => void;
  scope: string;
  ownedAmount: number;
  createdAmount: number;
  likedAmount: number;
  listedOwnedAmount: number;
  unlistedOwnedAmount: number;
  followersAmount: number;
  followedAmount: number;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  scope,
  setScope,
  setExpand,
  ownedAmount,
  createdAmount,
  likedAmount,
  listedOwnedAmount,
  unlistedOwnedAmount,
  followersAmount,
  followedAmount,
}) => {
  const router = useRouter();

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

  function disconnect() {
    setExpand(false);
    Cookies.remove('token');
    router.push('/');
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
          <div className={returnActiveNumber('My NFTs')}>
            {ownedAmount}
          </div>
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
          <div className={returnActiveNumber('My creations')}>
            {createdAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('Liked')
              setExpand(false)
            }}
            className={returnActiveTitle('Liked')}
          >
            Liked
          </div>
          <div className={returnActiveNumber('Liked')}>
            {likedAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('My NFTs on sale')
              setExpand(false)
            }}
            className={returnActiveTitle('My NFTs on sale')}
          >
            On sale
          </div>
          <div className={returnActiveNumber('My NFTs on sale')}>
            {listedOwnedAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('My NFTs not for sale')
              setExpand(false)
            }}
            className={returnActiveTitle('My NFTs not for sale')}
          >
            Not on sale
          </div>
          <div className={returnActiveNumber('My NFTs not for sale')}>
            {unlistedOwnedAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('Followers')
              setExpand(false)
            }}
            className={returnActiveTitle('Followers')}
          >
            Followers
          </div>
          <div className={returnActiveNumber('Followers')}>
            {followersAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => {
              setScope('Followed')
              setExpand(false)
            }}
            className={returnActiveTitle('Followed')}
          >
            Followed
          </div>
          <div className={returnActiveNumber('Followed')}>
            {followedAmount}
          </div>
        </div>
        <div onClick={disconnect} className={style.Logoff}>
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
