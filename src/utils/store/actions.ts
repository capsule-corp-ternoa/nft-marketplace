/* eslint-disable @typescript-eslint/no-explicit-any */
// Actions type
export const FETCH_NFT_BEGIN = 'FETCH_NFT_BEGIN';
export const FETCH_NFT_SUCCESS = 'FETCH_NFT_SUCCESS';
export const FETCH_NFT_FAILURE = 'FETCH_NFT_FAILURE';

export const FETCH_ONE_NFT_BEGIN = 'FETCH_ONE_NFT_BEGIN';
export const FETCH_ONE_NFT_SUCCESS = 'FETCH_ONE_NFT_SUCCESS';
export const FETCH_ONE_NFT_FAILURE = 'FETCH_ONE_NFT_FAILURE';


export const fetchNftBegin = (dispatch: any): any => 
  dispatch({ type: FETCH_NFT_BEGIN }
  );

export const fetchNftSuccess = (dispatch: any, auth: any): any => 
  dispatch({ type: FETCH_NFT_SUCCESS, payload: auth }
  );

export const fetchNftFailure = (dispatch: any): any => dispatch({
  type: FETCH_NFT_FAILURE,
});


export const fetchOneNftBegin = (dispatch: any): any =>
  dispatch({ type: FETCH_ONE_NFT_BEGIN });

export const fetchOneNftSuccess = (dispatch: any, auth: any): any =>
  dispatch({ type: FETCH_ONE_NFT_SUCCESS, payload: auth });

export const fetchOneNftFailure = (dispatch: any): any =>
  dispatch({
    type: FETCH_ONE_NFT_FAILURE,
  });