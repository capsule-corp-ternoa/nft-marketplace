import React, { createContext, useCallback, useReducer } from 'react';

import createNftDataReducer from './reducer';
import {
  CreateNftState,
  CreateNftContextProps,
  SET_BLURRED_VALUE,
} from './types';

export const CreateNftContext = createContext<CreateNftContextProps>(undefined);

interface Props {
  children: React.ReactNode;
  createNftData: CreateNftState;
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

  return (
    <CreateNftContext.Provider
      value={{
        CreateNftState: state,
        setBlurredValue,
      }}
    >
      {children}
    </CreateNftContext.Provider>
  );
};

export default CreateNftContextProvider;
