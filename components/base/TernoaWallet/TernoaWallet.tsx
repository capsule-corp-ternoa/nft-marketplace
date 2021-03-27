/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Link from 'next/link';
import style from './TernoaWallet.module.scss';
import Close from 'components/assets/close';

const TernoaWallet: React.FC<any> = ({ setModalExpand }) => (
  <div id="ternoaWallet" className={style.Background}>
    <div className={style.Container}>
      <Close onClick={() => setModalExpand(false)} className={style.Close} />
      <div className={style.Label}>Coming Soon</div>
      <div className={style.Title}>Wallet connect</div>
      <div className={style.Text}>
        Soon you will discover our Ternoa Wallet App to connect you on all
        Ternoa ecosystem.
      </div>
      <Link href="/profile">
        <a className={style.Button}>Visit profile page</a>
      </Link>
    </div>
  </div>
);

export default TernoaWallet;
