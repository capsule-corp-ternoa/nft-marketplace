import { createWrapper } from 'next-redux-wrapper';
import { createStore, combineReducers, Store } from 'redux';

import { appDefaultState, appReducer } from './app';

const reducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const initialState: RootState = {
  app: appDefaultState,
};

const store = createStore(reducer, initialState);

export const wrapper = createWrapper<Store<RootState>>(() => store, { debug: true });
