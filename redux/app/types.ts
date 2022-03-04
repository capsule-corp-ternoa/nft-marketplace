import { UserType } from 'interfaces'

export interface AppState {
  isRN: boolean
  user?: UserType | null
}

// Actions names
export const APP_SET_IS_RN = 'APP_SET_IS_RN'
export const APP_SET_USER = 'APP_SET_USER'
export const APP_SET_USER_LIKED_NFTS = 'APP_SET_USER_LIKED_NFTS'
