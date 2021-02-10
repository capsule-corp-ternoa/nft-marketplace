/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {

  fetchNftBegin,
  fetchNftSuccess,
  fetchNftFailure,
  
  fetchOneNftBegin,
  fetchOneNftSuccess,
  fetchOneNftFailure,

  fetchOneUserBegin,
  fetchOneUserSuccess,
  fetchOneUserFailure,
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

// Retrieve one NFT information through the proxy-backend
export const fetchOneNft: any = async ( dispatch: any ) => {
  fetchOneNftBegin(dispatch);
  try {
    const res = await axios.get(`${proxyBackend}/nft/1`);
    fetchOneNftSuccess(dispatch, res.data.nft);
  } catch (error) {
    fetchOneNftFailure(dispatch);
  }
};

// Retrieve one NFT information through the proxy-backend
export const fetchOneUser: any = async ( dispatch: any ) => {
  fetchOneUserBegin(dispatch);
  try {
    const res = await axios.get(`${proxyBackend}/user/1`);
    fetchOneUserSuccess(dispatch, res.data.user);
  } catch (error) {
    fetchOneUserFailure(dispatch);
  }
};