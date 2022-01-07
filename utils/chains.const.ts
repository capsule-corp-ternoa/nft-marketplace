export const CHAINS = {
    ETH:{
        id:"eip155:1",
        rpcMethods:["eth_sendTransaction", "personal_sign", "eth_signTypedData"]
    },
    TERNOA: {
        STAGING : {
            rpc: undefined, // { [chainId ]: string }
            bridge: undefined, // string
            qrcode: undefined, // boolean
            pollingInterval: undefined, // boolean
        }
    }
}
export const WALLET_CONNECT = {
    projectId: '441431138975688f696a34766e4ff48d',
  };
  