/* eslint-disable @typescript-eslint/no-explicit-any */
// Actions type
export const FETCH_NFT_BEGIN = 'FETCH_NFT_BEGIN';
export const FETCH_NFT_SUCCESS = 'FETCH_NFT_SUCCESS';
export const FETCH_NFT_FAILURE = 'FETCH_NFT_FAILURE';

export const FETCH_ONE_NFT_BEGIN = 'FETCH_ONE_NFT_BEGIN';
export const FETCH_ONE_NFT_SUCCESS = 'FETCH_ONE_NFT_SUCCESS';
export const FETCH_ONE_NFT_FAILURE = 'FETCH_ONE_NFT_FAILURE';

export const FETCH_ONE_USER_BEGIN = 'FETCH_ONE_USER_BEGIN';
export const FETCH_ONE_USER_SUCCESS = 'FETCH_ONE_USER_SUCCESS';
export const FETCH_ONE_USER_FAILURE = 'FETCH_ONE_USER_FAILURE';

export const UPDATE_STORE_ELEMENT = 'UPDATE_STORE_ELEMENT';

export const updateStoreElement = 
(
  dispatch: any,
  propertyName: string,
  propertyNewValue: string|number|boolean
): any => 
  dispatch({
    type: UPDATE_STORE_ELEMENT,
    payload: {
      propertyName,
      propertyNewValue,
    },
  });

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


export const fetchOneUserBegin = (dispatch: any): any =>
  dispatch({ type: FETCH_ONE_USER_BEGIN });

export const fetchOneUserSuccess = (dispatch: any, auth: any): any =>
  dispatch({ type: FETCH_ONE_USER_SUCCESS, payload: auth });

export const fetchOneUserFailure = (dispatch: any): any =>
  dispatch({
    type: FETCH_ONE_USER_FAILURE,
  });