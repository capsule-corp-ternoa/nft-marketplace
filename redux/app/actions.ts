import { LikedNFTsType, UserType } from 'interfaces'

import { APP_SET_IS_RN, APP_SET_USER, APP_SET_USER_LIKED_NFTS } from './types'

export function appSetIsRN(value: boolean | undefined = undefined) {
  return {
    type: APP_SET_IS_RN,
    value,
  }
}

export function appSetUser(value: UserType | null) {
  return {
    value,
    type: APP_SET_USER,
  }
}

export function appSetUserLikedNFTs(value: LikedNFTsType[] | undefined) {
  return {
    value,
    type: APP_SET_USER_LIKED_NFTS,
  }
}
