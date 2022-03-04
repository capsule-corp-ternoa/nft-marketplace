import { createWrapper } from 'next-redux-wrapper'
import { createStore, combineReducers, Store } from 'redux'

import { appDefaultState, appReducer } from './app'
import { mpDefaultState, mpReducer } from './marketplaceData'

const reducer = combineReducers({
  app: appReducer,
  marketplaceData: mpReducer,
})

export type RootState = ReturnType<typeof reducer>

export const initialState: RootState = {
  app: appDefaultState,
  marketplaceData: mpDefaultState,
}

const store = createStore(reducer, initialState)

export const wrapper = createWrapper<Store<RootState>>(() => store, { debug: false })
