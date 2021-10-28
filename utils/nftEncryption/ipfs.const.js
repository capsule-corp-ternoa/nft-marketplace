import { removeURLSlash } from "utils/strings";

export const ipfsNodes = {
    ternoaIpfsBaseUrl: `https://ipfs.ternoa.dev`
}
export const ipfsBaseUrl = (process.env.NEXT_PUBLIC_IPFS_BASEURL && removeURLSlash(process.env.NEXT_PUBLIC_IPFS_BASEURL)) || ipfsNodes.ternoaIpfsBaseUrl;
export const ipfsGatewayUri = `${ipfsBaseUrl}/ipfs`;
