/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './WalletConnector.module.scss';
import Close from 'components/assets/close';
import WalletConnect, { CLIENT_EVENTS } from '@walletconnect/client';
import { onModelClose } from 'utils/model-helpers';
import { WALLET_CONNECT } from 'utils/chains.const';
import { PairingTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/legacy-modal";
export interface WalletConnectorProps {
  setModalExpand: (b: boolean) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ setModalExpand }) => {
  const [error] = useState('');
  const [client, setClient] = useState<WalletConnect | null>(null);
  const [uri, setUri] = useState<string | null>(null);
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
      });
    });
  };
  const connect = async () => {
    const session = await (client as WalletConnect).connect({
      permissions: {
        blockchain: {
          chains: ["eip155:1"],
        },
        jsonrpc: {
          methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
        },
      },
    });
    console.log('session', session);

  };
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
