export const ipfsNodes = {
    ternoaIpfsBaseUrl: `https://ipfs.ternoa.dev`
}
export const ipfsBaseUrl = process.env.IPFS_BASEURL || ipfsNodes.ternoaIpfsBaseUrl;
export const ipfsGatewayUri = `${ipfsBaseUrl}/ipfs`;
