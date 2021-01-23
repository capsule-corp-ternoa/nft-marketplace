/* eslint-disable @typescript-eslint/no-explicit-any */
// Actions type
export const FETCH_NFT_BEGIN = 'FETCH_NFT_BEGIN';
export const FETCH_NFT_SUCCESS = 'FETCH_NFT_SUCCESS';
export const FETCH_NFT_FAILURE = 'FETCH_NFT_FAILURE';

export const fetchNftBegin = (dispatch: any): any => dispatch({ type: FETCH_NFT_BEGIN });

export const fetchNftSuccess = (dispatch: any, auth: any): any => dispatch({ type: FETCH_NFT_SUCCESS, payload: auth });

export const fetchNftFailure = (dispatch: any): any => dispatch({
  type: FETCH_NFT_FAILURE,
});