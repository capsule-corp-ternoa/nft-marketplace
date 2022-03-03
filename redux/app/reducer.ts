import { AnyAction, Reducer } from 'redux'

import { APP_SET_IS_RN, APP_SET_USER, APP_SET_USER_LIKED_NFTS, AppState } from './types'

export const appDefaultState = {
  isRN: false,
  user: undefined,
}

export const appReducer: Reducer<AppState, AnyAction> = (state = appDefaultState, action) => {
  switch (action.type) {
    case APP_SET_IS_RN: {
      const { value } = action

      return {
        ...state,
        isRN: value,
      }
    }

    case APP_SET_USER: {
      const { value } = action

      return {
        ...state,
        user: value,
      }
    }

    case APP_SET_USER_LIKED_NFTS: {
      const { value } = action

      return {
        ...state,
        user: {
          ...state.user,
          likedNFTs: value,
        },
      }
    }

    default:
      return state
  }
}
