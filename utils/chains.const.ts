import { getAppMetadata } from '@walletconnect/utils';

export const txPallets = {
  marketplace: 'marketplace',
  nfts: 'nfts',
  balances: 'balances',
  tiimeBalances: 'tiimeBalances',
  capsules: 'capsules',
  associatedAccounts: 'associatedAccounts',
};

export const txCalls = {
  [txPallets.marketplace]: {
    //marketplace
    buy: 'buy',
    create: 'create',
    list: 'list',
    unlist: 'unlist',
  },
  [txPallets.nfts]: {
    //nfts
    burn: 'burn',
    create: 'create',
    transfer: 'transfer',
    finishSeries: 'finishSeries',
    mint: 'mint',
  },
  [txPallets.tiimeBalances]: {
    //balances tiimebalances
    transferKeepAlive: 'transferKeepAlive',
  },
  [txPallets.capsules]: {
    //capsules
    createFromNft: 'createFromNft',
    remove: 'remove',
  },
  [txPallets.associatedAccounts]: {
    //associatedAccounts
    setAltvrUsername: 'setAltvrUsername',
  },
};

const additionalRpcCalls = ['sign_message', 'PGPS_READY_RECEIVED', 'RUN_NFT_MINT'];

const extrinsics = Object.keys(txCalls).reduce(
  (rpcCalls: string[], txPallet: string) => {
    rpcCalls = [
      ...rpcCalls,
      ...Object.values(txCalls[txPallet]).map(
        (txMethod) => `${txPallet}_${txMethod}`
      ),
    ];
    return rpcCalls;
  },
  []
);

export const TERNOA_RPC_METHODS = [...extrinsics, ...additionalRpcCalls];

export const CHAINS = {
  ETH: {
    id: 'eip155:1',
    rpcMethods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData'],
  },
  POLKADOT: {
    id: 'polkadot:b0a8d493285c2df73290dfb7e61f870f',
    rpcMethods: [],
  },
  TERNOA: {
    STAGING: {
      id: 'polkadot:d44bcfb0e98da45ace37e4df8469e5db',
      name: 'Ternoa Staging Chaos net',
      rpcMethods: TERNOA_RPC_METHODS,
    },
    TESTNET: {
      id: 'polkadot:d9adfc7ea82be63ba28088d62b96e927',
      name: 'Ternoa Testnet',
      rpcMethods: TERNOA_RPC_METHODS,
    },
  },
};

export const TERNOA_CHAINS = [CHAINS.TERNOA.STAGING, CHAINS.TERNOA.TESTNET];

export const TERNOA_CHAINS_IDS = TERNOA_CHAINS.map((chain) => chain.id);

export const WALLET_CONNECT_CLIENT_PARAMS = {
  projectId: "d9adfc7ea82be63ba28088d62b96e927",
  relayUrl: 'wss://wallet-connectrelay.ternoa.network',
  metadata: {
    name: 'Marketplace Dapp WalletConnect',
    description: 'Marketplace Dapp WalletConnect',
    url: '#',
    icons: ['https://walletconnect.com/walletconnect-logo.png'],
  },
};

export const WALLET_CONNECT_SESSION_PARAMS = {
  metadata: getAppMetadata(),
  permissions: {
    blockchain: {
      chains: TERNOA_CHAINS_IDS,
    },
    jsonrpc: {
      methods: TERNOA_RPC_METHODS,
    },
  },
};

export enum TRANSACTION_EXECUTOR {
  SIGN_AND_SEND = 'signAndSend',
  SEND = 'send',
}
