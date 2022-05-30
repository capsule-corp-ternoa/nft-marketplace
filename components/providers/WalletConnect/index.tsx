import React, { useState, useEffect, createContext } from 'react';

import WalletConnectClient, { CLIENT_EVENTS } from '@walletconnect/client';
import { ClientTypes, PairingTypes, SessionTypes } from '@walletconnect/types';
import QRCodeModal from '@walletconnect/legacy-modal';

import isEmpty from 'lodash.isempty';

import {
  WALLET_CONNECT_CLIENT_PARAMS,
  WALLET_CONNECT_SESSION_PARAMS,
  TERNOA_CHAINS_IDS,
  TERNOA_CHAINS,
  CHAINS,
} from 'utils/chains.const';

interface IWalletConnectProviderProps {
  children: React.ReactNode;
}

export const WalletConnectContext = createContext<any>(null);

export const WalletConnectProvider: React.FC<IWalletConnectProviderProps> = ({
  children,
}) => {
  const [isPairingSuccess, setIsPairingSuccess] = useState<boolean>(false);
  const [session, setSession] = useState<SessionTypes.Settled | null>(null);
  const [client, setClient] = useState<WalletConnectClient | null>(null);

  const [proposalUri, setProposalUri] = useState<string>('');
  const [currentEvent, setCurrentEvent] = useState<string>('');

  // const [isEventPgpReady, setIsEventPgpReady] = useState<boolean>(false);
  const [publicPgpKeys, setPublicPgpKeys] = useState<string[] | null>(null);

  const [currentChainId, setCurrentChainId] = useState<string>(
    CHAINS.TERNOA.STAGING.id
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isEmpty(client)) return;

    subscribeToEvents();

    if (hasPairing()) {
      console.log('[WALLET CONNECT]: PAIRING EXISTS');
      const _session = (client as WalletConnectClient).session.values[0];
      setSession(_session);
    } else {
      console.log('[WALLET CONNECT]: PAIRING DOESN\'T EXISTS');
      connect();
    }
  }, [client]);

  const init = async () => {
    console.log('[WALLET CONNECT]: INIT', WALLET_CONNECT_CLIENT_PARAMS);
    try{
      const _client: WalletConnectClient = await WalletConnectClient.init(
        WALLET_CONNECT_CLIENT_PARAMS
      );
      setClient(_client);
    }catch(err){
      console.log('WALLET CONNECT:INIT: err', err)
    }
    
  };

  const connect = async () => {
    console.log('[WALLET CONNECT]: CONNECT');
    const _session = await (client as WalletConnectClient).connect(
      WALLET_CONNECT_SESSION_PARAMS
    );
    setSession(_session);
  };

  const connectWallet = async () => {
    console.log('[WALLET CONNECT]: CONNECT WALLET');

    if (proposalUri) {
      QRCodeModal.open(proposalUri, () => { });
    } else {
      connect();
    }
  }

  const disconnectWallet = () => {
    console.log('[WALLET CONNECT]: DISCONNECT WALLET');
    const { topic } = session as SessionTypes.Settled;
    (client as WalletConnectClient).disconnect({
      topic,
    } as ClientTypes.DisconnectParams);
    QRCodeModal.close();
  };

  const selectBlockchainNetwork = (_netowrkName: string) => {
    let selectedBlockchainNetwork;

    switch (_netowrkName) {
      case 'STAGING':
        selectedBlockchainNetwork = CHAINS.TERNOA.STAGING.id;
        break;
      case 'TESTNET':
        selectedBlockchainNetwork = CHAINS.TERNOA.TESTNET.id;
        break;
      default:
        selectedBlockchainNetwork = CHAINS.TERNOA.STAGING.id;
        break;
    }

    setCurrentChainId(selectedBlockchainNetwork);
  };

  const hasPairing = () => {
    console.log('[WALLET CONNECT]: CHECK IF PAIRING EXISTS');
    return (client as WalletConnectClient).session.values.length > 0;
  };

  const subscribeToEvents = () => {
    console.log('[WALLET CONNECT]: SUBSCRIBE TO EVENT');

    (client as WalletConnectClient).on(
      CLIENT_EVENTS.pairing.proposal,
      async (proposal: PairingTypes.Proposal) => {
        console.log('[WALLET CONNECT]: EVENT PAIRING PROPOSAL', proposal);
        const { uri } = proposal.signal.params;

        setProposalUri(uri);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            action: 'connectWallet',
            data: uri
          }))
        } else {
          QRCodeModal.open(uri, () => { })
        }
      }
    );

    (client as WalletConnectClient).on(
      CLIENT_EVENTS.session.created,
      async (proposal: PairingTypes.Settled) => {
        console.log('[WALLET CONNECT]: EVENT SESSION CREATED', proposal);
        QRCodeModal.close();
        setProposalUri('');
        setIsPairingSuccess(true);
      }
    );

    (client as WalletConnectClient).on(
      CLIENT_EVENTS.session.deleted,
      (session: SessionTypes.Settled) => {
        console.log('[WALLET CONNECT]: EVENT SESSION CREATED', session);
        if (session.topic !== session?.topic) return;
        resetApp();
      });
  };

  const resetApp = () => {
    console.log('[WALLET CONNECT]: RESET APP');
    setIsPairingSuccess(false);
    setSession(null);
    setProposalUri('')
  }

  const getParsedParams = (
    _method: string,
    _params: string
  ): string | object => {
    if (_method === 'sign_message' || _method === 'PGPS_READY_RECEIVED') return _params;
    else return JSON.parse(_params);
  };

  const getRequestParams = (
    _topic: string,
    _chainId: string,
    _method: string,
    _params: string | object
  ) => {
    const request: ClientTypes.RequestParams = {
      topic: _topic,
      chainId: _chainId,
      request: {
        method: _method,
        params: _params,
      },
    };

    return request;
  };

  const onRequestSend = async (
    requestMethod: string,
    requestParams: string = ''
  ) => {
    try {
      console.log('[WALLET CONNECT]: ON SEND REQUEST');

      const parsedParams = getParsedParams(requestMethod, requestParams);
      const request = getRequestParams(
        session!!.topic,
        currentChainId,
        requestMethod,
        parsedParams
      );


      console.log('[WALLET CONNECT]: ON SEND REQUEST parsedParams', parsedParams);
      console.log('[WALLET CONNECT]: ON SEND REQUEST request', request);

      const result: object = await client!!.request(request);
      // setRequestResult(result);

      await handleRequestResult(result);
    } catch (err) {
      console.error('[WALLET CONNECT]:  ON SEND REQUEST ERROR', err);

    }
  };

  const handlePgpsReadyEvent = async (_pgpKeys:any) => {
    onRequestSend('PGPS_READY_RECEIVED', _pgpKeys);
    setPublicPgpKeys(_pgpKeys)
    // setIsEventPgpReady(true);
    // const { categories, nftUrls, seriesId } = await uploadNFT(_pgpKeys, setProgressData)
    // console.log('categories, nftUrls, seriesId ', categories, nftUrls, seriesId)
  }

  // const uploadNFT = async (publicPGPs: string[], quantity: number, originalNFT: File, previewNFT: File, NFTData: NFTProps, thumbnailTimecode: number, setProgressData?: Function) => {
  //   if (!originalNFT) throw new Error();
  //   let uploadIndex = 0
  //   let videoThumbnailHash = ""
  //   //Upload preview
  //   const { hashOrURL: previewHash, mediaType } = await uploadIPFS(previewNFT ?? originalNFT, setProgressData, uploadIndex);
  //   //Upload thumbnail if video
  //   if (mediaType.toString().indexOf("video") !== -1) {
  //     uploadIndex += 1
  //     const videoThumbnailFile = await generateVideoThumbnail(previewNFT ?? originalNFT, thumbnailTimecode);
  //     const result = await uploadIPFS(videoThumbnailFile as File, setProgressData, uploadIndex);
  //     videoThumbnailHash = result.hashOrURL
  //   }
  //   const cryptedMediaType = mime.lookup(originalNFT.name)
  //   //Encrypt and upload secrets
  //   //Parallel
  //   const cryptPromises = Array.from({ length: quantity ?? 0 }).map((_x, i) => {
  //     return cryptAndUploadNFT(originalNFT, cryptedMediaType as string, publicPGPs[i] as string, setProgressData, uploadIndex + 1 + i)
  //   })
  //   const cryptResults = await Promise.all(cryptPromises);
  //   /* SEQUENTIAL
  //   const cryptResults = [] as any
  //   for (let i=0; i<quantity; i++){
  //     const singleResult = await cryptAndUploadNFT(originalNFT, cryptedMediaType as string, publicPGPs[i] as string, setProgressData, 1+i)
  //     cryptResults.push(singleResult)
  //   }*/
  //   const cryptNFTsJSONs = cryptResults.map((r: any) => r[0]);
  //   const publicPGPsIPFS = cryptResults.map((r: any) => r[1]);
  //   const { categories, description, name, seriesId } = NFTData;

  //   const results = cryptNFTsJSONs.map((result: any, i: number) => {
  //     const data = {
  //       title: name,
  //       description,
  //       image: videoThumbnailHash !== "" ? videoThumbnailHash : previewHash,
  //       properties: {
  //         publicPGP: publicPGPsIPFS[i].hashOrURL,
  //         preview: {
  //           ipfs: previewHash,
  //           mediaType
  //         },
  //         cryptedMedia: {
  //           ipfs: result.hashOrURL,
  //           cryptedMediaType
  //         }
  //       },
  //     }
  //     const finalBlob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  //     const finalFile = new File([finalBlob], "final json")
  //     return uploadIPFS(finalFile);
  //   });
  //   const JSONHASHES = (await Promise.all(results));
  //   return {
  //     categories: categories.map((x) => x.code),
  //     nftUrls: JSONHASHES as any[],
  //     seriesId: seriesId ? seriesId : uuidv4(),
  //   };
  // }

  const handleRequestResult = async (result: any) => {
    try {
      const { event, params } = result;
      switch (event) {
        case 'PGPS_READY':
          setCurrentEvent('PGPS_READY');
          await handlePgpsReadyEvent(params);
          break;
        case 'RUN_NFT_MINT_RECEIVED':
          setCurrentEvent('RUN_NFT_MINT_RECEIVED');
          break;
        case 'RUN_NFT_MINT_ERROR':
          setCurrentEvent('RUN_NFT_MINT_ERROR');
          break;
        default:
          console.log('no case', result);
          break;
      }
    } catch (err) { }
  };

  return (
    <WalletConnectContext.Provider
      value={{
        isClient: !isEmpty(client),
        connectWallet,
        disconnectWallet,
        sendRequest: onRequestSend,
        // isEventPgpReady,
        publicPgpKeys,
        currentEvent,
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};