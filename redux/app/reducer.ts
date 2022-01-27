import { AnyAction, Reducer } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import {
  APP_SET_IS_RN,
  APP_SET_LOGO,
  APP_SET_NAME,
  APP_SET_INSTAGRAM_URL,
  APP_SET_TWITTER_URL,
  APP_SET_URL,
  AppState,
} from './types';

export const appDefaultState = {
  isRN: false,
  logo: undefined,
  name: 'SecretNFT',
  instagramUrl: 'https://twitter.com/SecretNFT_',
  twitterUrl: 'https://www.instagram.com/ternoa_/',
  url: 'https://secret-nft.com',
};

// Disclaimer: The actions below aimed to be used on getInitialProps server side rendering
export const appReducer: Reducer<AppState, AnyAction> = (state = appDefaultState, action) => {
  switch (action.type) {
    case APP_SET_IS_RN: {
      const { value } = action;

      return {
        ...state,
        isRN: value,
      };
    }

    case APP_SET_LOGO: {
      const { value } = action;

      return {
        ...state,
        logo: value,
      };
    }

    case APP_SET_NAME: {
      console.log('redux action appSetName');
      console.log({ action });
      const { value } = action;

      return {
        ...state,
        name: value,
      };
    }

    case APP_SET_INSTAGRAM_URL: {
      const { value } = action;

      return {
        ...state,
        instagramUrl: value,
      };
    }

    case APP_SET_TWITTER_URL: {
      const { value } = action;

      return {
        ...state,
        twitterUrl: value,
      };
    }

    case APP_SET_URL: {
      const { value } = action;

      return {
        ...state,
        url: value,
      };
    }

    case HYDRATE:
      // Attention: This will overwrite client state!
      return { ...state, ...action.payload.app };

    default:
      return state;
  }
};
