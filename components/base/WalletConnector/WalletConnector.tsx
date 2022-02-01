/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import WalletConnect, { CLIENT_EVENTS } from '@walletconnect/client';
import { WALLET_CONNECT, CHAINS } from 'utils/chains.const';
import { PairingTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/legacy-modal";
import { getAppMetadata } from "@walletconnect/utils";
import Close from 'components/assets/close';
import style from './WalletConnector.module.scss';
export interface WalletConnectorProps {
  setModalExpand: (b: boolean) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  setModalExpand
}) => {
  const [pairingSuccess, setPairingSuccess] = useState(false);
  const [client, setClient] = useState<WalletConnect | null>(null);
  const [, setUri] = useState<string | null>(null);
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (client) {
      subscribeToEvents();
      connect();
    }
  }, [client]);
  const init = async () => {
    const _client: WalletConnect = await WalletConnect.init({
      projectId: WALLET_CONNECT.projectId,
      relayUrl: 'wss://relay.walletconnect.com',
      metadata: {
        name: 'Marketplace Dapp WalletConnect',
        description: 'Marketplace Dapp WalletConnect',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
      },
    });
    setClient(_client);
  };
  const subscribeToEvents = () => {
    console.log('subscribeToEvents');
    (client as WalletConnect).on(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
      console.log('session.proposal', proposal);
      // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
      const { uri: _uri } = proposal.signal.params;
      setUri(_uri);
      console.log("EVENT", "QR Code Modal open");
      QRCodeModal.open(_uri, () => {
        console.log("EVENT", "QR Code Modal closed");
        setModalExpand(false);
      });
    });
    (client as WalletConnect).on(CLIENT_EVENTS.pairing.created, async (proposal: PairingTypes.Settled) => {
      console.log('pairing.created', proposal);
    });
    (client as WalletConnect).on(CLIENT_EVENTS.session.created, async (proposal: PairingTypes.Settled) => {
      console.log('pairing.created', proposal);
      QRCodeModal.close();
      setPairingSuccess(true)
    });
  };
  const onPairingSuccessClick = () => {
    setModalExpand(false);
  }
  const connect = async () => {
    const session = await (client as WalletConnect).connect({
      metadata: getAppMetadata(),
      permissions: {
        blockchain: {
          chains: [CHAINS.ETH.id],
        },
        jsonrpc: {
          methods: [...CHAINS.ETH.rpcMethods],
        },
      },
    });
    console.log('session', session);
  };
  return <>
    { pairingSuccess ?
      (<div id="walletConnect" className={style.Background}>
        <div className={style.Container}>
          <Close
            onClick={onPairingSuccessClick}
            className={style.Close}
          />
          <div className={style.Text}>
            <div onClick={onPairingSuccessClick}>Paring success!</div>
          </div>
        </div>
      </div>)
      : null}
  </>;
};
export default WalletConnector;
