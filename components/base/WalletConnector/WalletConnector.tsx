/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import WalletConnect, { CLIENT_EVENTS } from '@walletconnect/client';
import { WALLET_CONNECT, CHAINS } from 'utils/chains.const';
import { ClientTypes, PairingTypes, SessionTypes } from "@walletconnect/types";
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
  const [session, setSession] = useState<SessionTypes.Settled | null>(null);
  const [requestMethod, setRequestMethod] = useState<string | null>(null);
  const [requestParams, setRequestParams] = useState<string | null>(null);
  const [requestChainId, setRequestChainId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestorVisible, setRequestorVisible] = useState(false);
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
  const ternoaChains = [CHAINS.TERNOA.STAGING, CHAINS.TERNOA.TESTNET];
  const ternoaChainIds = ternoaChains.map(chain => chain.id);
  const ternoaRpcMethods = [...CHAINS.TERNOA.STAGING.rpcMethods, ...CHAINS.TERNOA.TESTNET.rpcMethods].filter((rpc, index, a) => {
    return a.indexOf(rpc) == index;
  });
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
      setModalVisible(true);
    });
  };
  const onPairingSuccessClick = () => {
    setRequestChainId(CHAINS.TERNOA.STAGING.id)
    setRequestorVisible(true);
  }
  const handleClose = () => {
    setModalVisible(false);
  }
  const connect = async () => {
    const _session = await (client as WalletConnect).connect({
      metadata: getAppMetadata(),
      permissions: {
        blockchain: {
          chains: ternoaChainIds,
        },
        jsonrpc: {
          methods: ternoaRpcMethods,
        },
      },
    });
    console.log('session', _session);
    setSession(_session);
  };
  const handleRequestMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestMethod(event.target.value);

  };
  const handleRequestParamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestParams(event.target.value);
  };
  const handleRequestChainIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRequestChainId(event.target.value);
  };
  const onRequestSend = async () => {
    const request: ClientTypes.RequestParams = {
      topic: session?.topic as string,
      chainId: requestChainId as string,
      request: {
        method: requestMethod as string,
        params: requestParams ? JSON.parse(requestParams) : null,
      },
    }
    console.log('request', request);
    const result = await client?.request(request)
    console.log('result', result);
  }
  return <>
    { modalVisible ?
      (<div id="walletConnect" className={style.Background}>
        <div className={style.Container}>
          <Close
            onClick={handleClose}
            className={style.Close}
          />
          {pairingSuccess ?
            <div className={style.Text}>
              <div onClick={onPairingSuccessClick}>Paring success!</div>
            </div>
            : null}
          {requestorVisible ?
            <>
              <div className={style.Text}>
                Method: <input onChange={handleRequestMethodChange} />
              </div>
              <div className={style.Text}>
                Params (pass a stringified array): <input onChange={handleRequestParamsChange} />
              </div>
              <div className={style.Text}>
                Select chain: <select onChange={handleRequestChainIdChange} >
                  {ternoaChains.map(chain => {
                    <option selected={requestChainId == chain.id} value={chain.id}>{chain.name}</option>
                  })}
                </select>
              </div>
              <div className={style.Text}>
                <button onClick={onRequestSend}>Send Request!</ button>
              </div>
            </>
            : null}
        </div>
      </div>)
      : null}
  </>;
};
export default WalletConnector;
