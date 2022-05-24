/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import WalletConnect, { CLIENT_EVENTS } from '@walletconnect/client';
import { WALLET_CONNECT_CLIENT_PARAMS, CHAINS, TERNOA_RPC_METHODS } from 'utils/chains.const';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [requestorVisible, setRequestorVisible] = useState(false);
  const [client, setClient] = useState<WalletConnect | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const hasPairing = () => {
    console.log('sessions', (client as WalletConnect).session.values);
    return (client as WalletConnect).session.values.length > 0;
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (session) {
      showRequestorPanel();
    } else {
      closeRequestorPanel();
    }
  }, [session]);

  useEffect(() => {
    if (client) {
      subscribeToEvents();
      if (hasPairing()) {
        console.log('has pairing', (client as WalletConnect).session.values[0]);
        const currentSession = (client as WalletConnect).session.values[0];
        console.log('currentSession', currentSession);
        setSession(currentSession);
      } else {
        console.log('has NO pairing');
        connect();
      }
    }
  }, [client]);

  const ternoaChains = [CHAINS.TERNOA.STAGING, CHAINS.TERNOA.TESTNET];
  const ternoaChainIds = ternoaChains.map(chain => chain.id);
  const ternoaRpcMethods = TERNOA_RPC_METHODS;

  const init = async () => {
    const _client: WalletConnect = await WalletConnect.init({
      projectId: WALLET_CONNECT_CLIENT_PARAMS.projectId,
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
      console.log('_uri', _uri)
      setUri(_uri);
      console.log("EVENT", "QR Code Modal open", _uri);
      QRCodeModal.open(_uri, () => {
        console.log("EVENT", "QR Code Modal closed");
        setModalExpand(false);
        setModalVisible(false);
      });
    });

    (client as WalletConnect).on(CLIENT_EVENTS.session.response, async (proposal: PairingTypes.Settled) => {
      console.log('pairing.created 1', proposal);

    });

    (client as WalletConnect).on(CLIENT_EVENTS.session.created, async (proposal: PairingTypes.Settled) => {
      console.log('pairing.created 2', proposal);
      QRCodeModal.close();
      setPairingSuccess(true)
      setModalVisible(true);
    });
  };

  const showRequestorPanel = () => {
    setRequestorVisible(true);
    setModalVisible(true);
  };

  const closeRequestorPanel = () => {
    setRequestorVisible(false);
    setModalVisible(false);
  };

  const onPairingSuccessClick = () => {
    setPairingSuccess(false);
  };

  const handleClose = () => {
    setModalVisible(false);
    setModalExpand(false);
  };

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
    setSession(_session);
  };

  const pgpReadyEvent = async () => {
    const requestMethod = 'PGPS_READY_RECEIVED';
    const requestParams = '';
    const requestChainId = CHAINS.TERNOA.STAGING.id;
    onRequestSend(requestMethod, requestParams, requestChainId )
  }

  const onRequestSend = async (requestMethod: string, requestParams: string, requestChainId: string) => {
    try {

      console.log('onRequestSend', requestMethod, requestParams, requestChainId);
      let parsedParams
      switch (requestMethod) {
        case "sign_message":
          parsedParams = requestParams;
          break;
        // case "nfts_mint":
        //   parsedParams = JSON.parse(requestParams);
        //   break;
        default:
          try {
            parsedParams = JSON.parse(requestParams);
          }
          catch (e) {
            return setTransactionResult({ status: 'error', message: 'Invalid JSON' });
          }
          break;
      };

      const request: ClientTypes.RequestParams = {
        topic: session?.topic as string,
        chainId: requestChainId,
        request: {
          method: requestMethod,
          params: requestParams ? parsedParams : null,
        },
      };

      console.log('request', request)
      console.log('request topic', session?.topic)
      console.log('request chainId', requestChainId)
      console.log('request method', requestMethod)
      console.log('request params', requestParams)

      console.log('onRequestSend', request, requestChainId, requestMethod, requestParams);
      const result = await client?.request(request)

      console.log('REQUEST result', result);

      const { event, params } = result;

      switch (event) {
        case 'PGPS_READY':
          pgpReadyEvent()
          break;
        default:
          console.log('no case', result)
          break;
      }

      setTransactionResult(result);

    } catch (err) {
      console.log('REQUEST err', err);
      return { status: 'error', message: err.message }
    }
  };

  const onSessionDisconnect = () => {
    const { topic } = session as SessionTypes.Settled;
    (client as WalletConnect).disconnect({ topic } as ClientTypes.DisconnectParams);
    QRCodeModal.close();
    setModalExpand(false);
  };

  const PairingSuccess = () => (
    <>
      <div className={style.Text}>
        <div>Pairing success!</div>
      </div>
      <div className={style.Text}>
        <button onClick={onPairingSuccessClick}>OK</button>
      </div>
    </>
  );

  const RequestPanel = useCallback(({ _handleDisconnect, _handleSend }) => {
    console.log('Request Panel');
    const [requestMethod, setRequestMethod] = useState<string | null>(ternoaRpcMethods[0]);
    const [requestParams, setRequestParams] = useState<string | null>(null);
    const [requestChainId, setRequestChainId] = useState<string | null>(CHAINS.TERNOA.STAGING.id);

    const handleRequestMethodChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setRequestMethod(event.target.value);

    };

    const handleRequestParamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('handleRequestParamsChange', event.target.value);
      setRequestParams(event.target.value);
    };

    const handleRequestChainIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRequestChainId(event.target.value);
    };

    const handleDisconnect = () => {
      _handleDisconnect();
    };

    const handleSend = () => {
      _handleSend(requestMethod, requestParams, requestChainId);
    };

    const currentSession = (session as SessionTypes.Settled);

    return (
      <>
        <div className={style.Text}>
          Current session: <br />Topic {currentSession.topic} <br />Account: {currentSession.state.accounts[0]}
        </div>
        <div className={style.Text}>
          Method: <select key="rpc-method-select" onChange={handleRequestMethodChange} >
            {ternoaRpcMethods.map((ternoaRpcMethod) => (
              <option selected={ternoaRpcMethod == requestMethod} value={ternoaRpcMethod}>{ternoaRpcMethod}</option>
            ))}
          </select>
        </div>
        <div className={style.Text}>
          Params (pass a stringified array): <input key="rpc-params-input" onChange={handleRequestParamsChange} value={requestParams as string} type="text" />
        </div>
        <div className={style.Text}>
          Select chain: <select key="chain-select" onChange={handleRequestChainIdChange} >
            {ternoaChains.map(chain => (
              <option selected={chain.id == requestChainId} key={`option-chain-${chain.id}`} value={chain.id}>{chain.name}</option>
            ))}
          </select>
        </div>
        <div className={style.Text}>
          <button onClick={handleSend}>Send Request!</ button>
        </div>
        <div className={style.Text}>
          <button onClick={handleDisconnect}>Disconnect</ button>
        </div>
      </>
    );
  }, [session]);

  const handleTransactionResultClick = () => {
    setTransactionResult(null);
  };

  const TransactionResult = () => {
    return (
      <>
        <div className={style.Text}>
          Transaction result: <br />{transactionResult.status === 'success' ? 'Success' : 'Error'} <br />Message: {transactionResult.message}
        </div>
        <div className={style.Text}>
          <button onClick={handleTransactionResultClick}>OK</ button>
        </div>
      </>
    );
  };

  return (
    <>
      {modalVisible ?
        (<div id="walletConnect" className={style.Background}>
          <div className={style.Container}>
            <Close
              onClick={handleClose}
              className={style.Close}
            />
            {pairingSuccess ?
              <PairingSuccess />
              : null}
            {requestorVisible && !pairingSuccess ?
              <>
                {transactionResult ? <TransactionResult /> : <RequestPanel key="request-panel" _handleSend={onRequestSend} _handleDisconnect={onSessionDisconnect} />}
              </>
              : null}
          </div>
        </div>)
        : null}
    </>
  );
};

export default WalletConnector;


// ["Public","3","testttt","http:wewewe.we","http:wewewe.we/img"]