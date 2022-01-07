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
        TESTNET: {
            id: 'ternoa:?',
            rpcMethods: [],
        },
        STAGING: {
            id: 'ternoa:?',
            rpcMethods: [],
        }
    }
}
export const WALLET_CONNECT = {
    projectId: '441431138975688f696a34766e4ff48d',
};
