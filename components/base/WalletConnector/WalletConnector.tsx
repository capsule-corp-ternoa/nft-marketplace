/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAINS } from 'utils/chains.const';
import Close from 'components/assets/close';
import style from './WalletConnector.module.scss';
export interface WalletConnectorProps {
  setModalExpand: (b: boolean) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  setModalExpand
}) => {
  const [connectSuccess, setConnectSuccess] = useState(false);
  const [provider, setProvider] = useState<WalletConnectProvider | null>(null);
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (provider) {
      subscribeToEvents();
      connect();
    }
  }, [provider]);
  const init = async () => {
    const _provider = new WalletConnectProvider({
      rpc: CHAINS.RPC,
    });

    setProvider(_provider);
  };
  const subscribeToEvents = () => {
    const _provider: WalletConnectProvider = (provider as WalletConnectProvider);
    console.log('subscribeToEvents');
    _provider.on("accountsChanged", (accounts: string[]) => {
      console.log('accountsChanged', accounts);
    });
    _provider.on("chainChanged", (chainId: number) => {
      console.log('chainChanged to' + chainId);
    });
    _provider.on("close", (chainId: number) => {
      onProviderClose(chainId);
    });
    _provider.onConnect(onConnect)

    _provider.onDisconnect().then(onDisconnect)
  };
  const onConnect = () => {
    console.log('chainChanged tonConnect');
    setConnectSuccess(true);
  }
  const onDisconnect = () => {
    console.log('onDisconnect');
  }
  const onConnectSuccessClick = () => {
    setModalExpand(false);
  }
  const onProviderError = () => {
    console.log('onProviderError');
    setModalExpand(false);
  }
  const onProviderClose = (chainId: number) => {
    console.log('onProviderClose', chainId);
    setModalExpand(false);
  }
  const connect = async () => {
    const _provider = (provider as WalletConnectProvider);
    //  Enable session (triggers QR Code modal)
    await _provider.enable().catch(onProviderError);
    console.log('provider enabled');
  };
  return <>
    { connectSuccess ?
      (<div id="walletConnect" className={style.Background}>
        <div className={style.Container}>
          <Close
            onClick={onConnectSuccessClick}
            className={style.Close}
          />
          <div className={style.Text}>
            <div onClick={onConnectSuccessClick}>Connection success!</div>
          </div>
        </div>
      </div>)
      : null}
  </>;
};
export default WalletConnector;
