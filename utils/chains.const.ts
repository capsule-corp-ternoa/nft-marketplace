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
        list: 'list',
        unlist: 'unlist',
    },
    [txPallets.nfts]: {
        //nfts
        burn: 'burn',
        create: 'create',
        transfer: 'transfer',
        finishSeries: 'finishSeries',
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
    }
};
const additionalRpcCalls = ["sign_message"];
export const ternoaCommonRpcMethods = Object.keys(txCalls).reduce((rpcCalls: string[], txPallet: string) => {
    rpcCalls = [...rpcCalls, ...Object.values(txCalls[txPallet]).map(txMethod => `${txPallet}_${txMethod}`)]
    return [...rpcCalls, ...additionalRpcCalls]
}, []);

export const CHAINS = {
    ETH: {
        id: "eip155:1",
        rpcMethods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"]
    },
    POLKADOT: {
        id: 'polkadot:b0a8d493285c2df73290dfb7e61f870f',
        rpcMethods: [],
    },
    TERNOA: {
        STAGING: {
            id: 'polkadot:d44bcfb0e98da45ace37e4df8469e5db',
            name: 'Ternoa Staging Chaos net',
            rpcMethods: ternoaCommonRpcMethods,
        },
        TESTNET: {
            id: 'polkadot:d9adfc7ea82be63ba28088d62b96e927',
            name: 'Ternoa Testnet',
            rpcMethods: ternoaCommonRpcMethods,
        }
    }
}
export const WALLET_CONNECT = {
    projectId: '441431138975688f696a34766e4ff48d',
};
export enum TRANSACTION_EXECUTOR {
    SIGN_AND_SEND = 'signAndSend',
    SEND = 'send'
}