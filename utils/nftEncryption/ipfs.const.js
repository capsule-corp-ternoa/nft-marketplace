export const ipfsNodes = {
    ternoaPinataIpfsBaseUrl: `https://ternoa.mypinata.cloud`,
    cloudfareIpfsBaseUrl: `https://cloudflare-ipfs.com`,
    ternoaIpfsBaseUrl: `https://ipfs.ternoa.dev`

}
export const ipfsBaseUrl = process.env.IPFS_BASEURL || ipfsNodes.ternoaIpfsBaseUrl;
export const ipfsGatewayUri = `${ipfsBaseUrl}/ipfs`;
