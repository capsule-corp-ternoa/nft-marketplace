/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './WalletConnector.module.scss';
import Close from 'components/assets/close';
import { onModelClose } from 'utils/model-helpers';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
export interface WalletConnectorProps {
  setModalExpand: (b: boolean) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ setModalExpand }) => {
  const [error] = useState('');
  useEffect(() => {
    const walletConnect = new WalletConnectConnector({
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      bridge: process.env.NEXT_PUBLIC_WALLETCONNECT_BRIDGE
    });
    walletConnect.activate().then((response) => {
      console.log('WalletConnectConnector response', response);
    });
  });

  return (
    <div id="WalletConnector" className={style.Background}>
      <div className={style.Container}>
        <Close
          onClick={() => {
            onModelClose();
            setModalExpand(false);
          }}
          className={style.Close}
        />
        <div className={style.Title}>WalletConnect</div>
        <div className={style.Text}>
          To authenticate, scan this QR Code from your Ternoa Wallet mobile
          application.
        </div>
        <div>

        </div>
        {error && <div className={style.Error}>{error}</div>}
      </div>
    </div>
  );
};

export default WalletConnector;
