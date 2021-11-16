import React, { createContext, useCallback, useReducer } from 'react';

import createNftDataReducer from './reducer';
import {
  CreateNftStateType,
  CreateNftContextProps,
  SET_BLURRED_VALUE,
  SET_EFFECT,
  SET_ERROR,
  SET_NFT,
  SET_OUTPUT,
  SET_QR_DATA,
  SET_RN,
  SET_SECRET_NFT,
  SET_UPLOAD_SIZE,
} from './types';

export const CreateNftContext = createContext<CreateNftContextProps>(undefined);

interface Props {
  children: React.ReactNode;
  createNftData: CreateNftStateType;
}

const CreateNftContextProvider = ({ createNftData, children }: Props) => {
  const [state, dispatch] = useReducer(createNftDataReducer, createNftData);

  const setBlurredValue = useCallback(
    (value) =>
      dispatch({
        type: SET_BLURRED_VALUE,
        value,
      }),
    []
  );

  const setEffect = useCallback(
    (effect) =>
      dispatch({
        type: SET_EFFECT,
        effect,
      }),
    []
  );

  const setError = useCallback(
    (error) =>
      dispatch({
        type: SET_ERROR,
        error,
      }),
    []
  );

  const setRN = useCallback(
    (value) =>
      dispatch({
        type: SET_RN,
        value,
      }),
    []
  );

  const setNFT = useCallback(
    (NFT) =>
      dispatch({
        type: SET_NFT,
        NFT,
      }),
    []
  );

  const setSecretNFT = useCallback(
    (NFT) =>
      dispatch({
        type: SET_SECRET_NFT,
        NFT,
      }),
    []
  );

  const setOutput = useCallback(
    (value) =>
      dispatch({
        type: SET_OUTPUT,
        value,
      }),
    []
  );

  const setQRData = useCallback(
    (data) =>
      dispatch({
        type: SET_QR_DATA,
        data,
      }),
    []
  );

  const setUploadSize = useCallback(
    (value) =>
      dispatch({
        type: SET_UPLOAD_SIZE,
        value,
      }),
    []
  );

  return (
    <CreateNftContext.Provider
      value={{
        createNftData: state,
        setBlurredValue,
        setEffect,
        setError,
        setNFT,
        setOutput,
        setQRData,
        setRN,
        setSecretNFT,
        setUploadSize,
      }}
    >
      {children}
    </CreateNftContext.Provider>
  );
};

export default CreateNftContextProvider;
