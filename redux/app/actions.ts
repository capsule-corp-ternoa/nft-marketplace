import {
  APP_SET_IS_RN,
  APP_SET_LOGO,
  APP_SET_NAME,
  APP_SET_INSTAGRAM_URL,
  APP_SET_TWITTER_URL,
  APP_SET_URL,
} from './types';

export function appSetIsRN(value: boolean | undefined = undefined) {
  return {
    type: APP_SET_IS_RN,
    value,
  };
}

export function appSetLogo(value: string) {
  return {
    value,
    type: APP_SET_LOGO,
  };
}

export function appSetName(value: string) {
  return {
    value,
    type: APP_SET_NAME,
  };
}
export function appSetInstagramUrl(value: string) {
  return {
    value,
    type: APP_SET_INSTAGRAM_URL,
  };
}
export function appSetTwitterUrl(value: string) {
  return {
    value,
    type: APP_SET_TWITTER_URL,
  };
}
export function appSetUrl(value: string) {
  return {
    value,
    type: APP_SET_URL,
  };
}
