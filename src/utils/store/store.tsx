/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer } from 'react';

import {
  FETCH_NFT_BEGIN,
  FETCH_NFT_SUCCESS,
  FETCH_NFT_FAILURE,

  FETCH_ONE_NFT_BEGIN,
  FETCH_ONE_NFT_SUCCESS,
  FETCH_ONE_NFT_FAILURE,

  FETCH_ONE_USER_BEGIN,
  FETCH_ONE_USER_SUCCESS,
  FETCH_ONE_USER_FAILURE,

} from './actions';

// Reducer for updating the store based on the 'action.type'
export const Reducer = (state: ContextState, action: ContextAction): any => {
  switch (action.type) {
    case FETCH_NFT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_NFT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        nftList: action.payload,
      };
    case FETCH_NFT_FAILURE:
      return {
        ...state,
        isLoading: false,
        nftList: [],
      };

    case FETCH_ONE_NFT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ONE_NFT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedNft: action.payload,
      };
    case FETCH_ONE_NFT_FAILURE:
      return {
        ...state,
        isLoading: false,
        selectedNft: null,
      };

    case FETCH_ONE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ONE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case FETCH_ONE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};

export const Context = createContext({} as ContextArgs);

// Initial state for the store
const initialState = {
  isLoading: false,
  nftList: [],
  selectedNftId: 0,
  selectedNft: null,
  user: null,
};

export const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = { state, dispatch };
  Context.displayName = 'Context';
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
