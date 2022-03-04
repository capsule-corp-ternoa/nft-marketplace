import { AnyAction, Reducer } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import { MP_SET_LOGO, MP_SET_NAME, MP_SET_INSTAGRAM_URL, MP_SET_TWITTER_URL, MP_SET_URL, MpState } from './types'

export const mpDefaultState = {
  logo: null,
  name: 'SecretNFT',
  instagramUrl: 'https://twitter.com/SecretNFT_',
  twitterUrl: 'https://www.instagram.com/ternoa_/',
  url: 'https://secret-nft.com',
}

// Disclaimer: The actions below aimed to be used on getInitialProps server side rendering
export const mpReducer: Reducer<MpState, AnyAction> = (state = mpDefaultState, action) => {
  switch (action.type) {
    case MP_SET_LOGO: {
      const { value } = action

      return {
        ...state,
        logo: value,
      }
    }

    case MP_SET_NAME: {
      const { value } = action

      return {
        ...state,
        name: value,
      }
    }

    case MP_SET_INSTAGRAM_URL: {
      const { value } = action

      return {
        ...state,
        instagramUrl: value,
      }
    }

    case MP_SET_TWITTER_URL: {
      const { value } = action

      return {
        ...state,
        twitterUrl: value,
      }
    }

    case MP_SET_URL: {
      const { value } = action

      return {
        ...state,
        url: value,
      }
    }

    case HYDRATE:
      // Attention: This will overwrite client state!
      return { ...state, ...action.payload.marketplaceData }

    default:
      return state
  }
}
