import { MP_SET_LOGO, MP_SET_NAME, MP_SET_INSTAGRAM_URL, MP_SET_TWITTER_URL, MP_SET_URL } from './types'

export function mpSetLogo(value: string) {
  return {
    value,
    type: MP_SET_LOGO,
  }
}

export function mpSetName(value: string) {
  return {
    value,
    type: MP_SET_NAME,
  }
}

export function mpSetInstagramUrl(value: string) {
  return {
    value,
    type: MP_SET_INSTAGRAM_URL,
  }
}

export function mpSetTwitterUrl(value: string) {
  return {
    value,
    type: MP_SET_TWITTER_URL,
  }
}

export function mpSetUrl(value: string) {
  return {
    value,
    type: MP_SET_URL,
  }
}
