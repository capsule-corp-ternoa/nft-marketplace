/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {
  fetchNftBegin,
  fetchNftSuccess,
  fetchNftFailure,
} from './actions';

const proxyBackend= '/nft-api';

// Retrieve NFT information through the proxy-backend
export const fetchNfts: any = async ( dispatch: any ) => {
  fetchNftBegin(dispatch);
  try {
    const res = await axios.get(`${proxyBackend}/nfts`);
    const nftList: any[] = res.data.nfts;
    fetchNftSuccess(dispatch, nftList);
  } catch (error) {
    fetchNftFailure(dispatch);
  }
};