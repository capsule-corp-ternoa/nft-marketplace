import React from 'react';

import style from './ModalWallets.module.scss';
import Metamask from 'components/assets/wallets/metamask';
import Fortmatic from 'components/assets/wallets/fortmatic';
import WalletConnect from 'components/assets/wallets/walletconnect';
import WalletLink from 'components/assets/wallets/walletlink';
import Key from 'components/assets/key';
import Close from 'components/assets/close';

export interface ModalWalletProps {
  setModalExpand: (b: boolean) => void;
}

const ModalWallets: React.FC<ModalWalletProps> = ({ setModalExpand }) => (
  <div id="modalWallet" className={style.Background}>
    <div className={style.Container}>
      <Close onClick={() => setModalExpand(false)} className={style.Close} />
      <div className={style.Title}>Connect your wallet</div>
      <div className={style.Subtitle}>
        Connect with one of the available wallet
      </div>
      <div className={style.Wallets}>
        <div className={style.WalletItem}>
          <Metamask className={style.WalletSVG} />
          Metamask
        </div>
        <div className={style.WalletItem}>
          <WalletConnect className={style.WalletSVG} />
          Wallet Connect
        </div>
        <div className={style.WalletItem}>
          <Fortmatic className={style.WalletSVG} />
          Fortmatic
        </div>
        <div className={style.WalletItem}>
          <WalletLink className={style.WalletSVG} />
          WalletLink
        </div>
      </div>
      <div className={style.Secret}>
        <Key className={style.KeySVG} />
        <span className={style.Text}>
          We do not own your private keys and cannot access your funds without
          your confirmation.
        </span>
      </div>
    </div>
  </div>
);

export default ModalWallets;
