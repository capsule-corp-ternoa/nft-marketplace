import { DefaultTheme } from 'styled-components'

import {
  AVATAR_VARIANT_BADGE,
  AVATAR_VARIANT_BANNER,
  AVATAR_VARIANT_CHECKOUT,
  AVATAR_VARIANT_EDIT,
  AVATAR_VARIANT_MOSAIC,
  AVATAR_VARIANT_TRANSACTION,
} from './constants'
import { AVATAR_VARIANT_TYPE } from './interfaces'

export const getNameColor = (theme: DefaultTheme, variant?: AVATAR_VARIANT_TYPE): string => {
  switch (variant) {
    case AVATAR_VARIANT_BANNER:
      return theme.colors.primary500
    case AVATAR_VARIANT_CHECKOUT:
      return theme.colors.invertedContrast
    default:
      return theme.colors.contrast
  }
}

export const getNameFontSize = (variant?: AVATAR_VARIANT_TYPE): string => {
  switch (variant) {
    case AVATAR_VARIANT_BANNER:
      return '3.2rem'
    case AVATAR_VARIANT_TRANSACTION:
      return '1.2rem'
    default:
      return '1.6rem'
  }
}

export const getPictureSize = (variant?: AVATAR_VARIANT_TYPE): string => {
  switch (variant) {
    case AVATAR_VARIANT_BANNER:
      return '12rem'
    case AVATAR_VARIANT_EDIT:
      return '9.6rem'
    case AVATAR_VARIANT_BADGE:
    case AVATAR_VARIANT_TRANSACTION:
      return '3.6rem'
    case AVATAR_VARIANT_MOSAIC:
      return '8rem'
    default:
      return '5.6rem'
  }
}

export const getPictureFontSize = (variant?: AVATAR_VARIANT_TYPE): string => {
  switch (variant) {
    case AVATAR_VARIANT_BANNER:
      return '5.6rem'
    case AVATAR_VARIANT_EDIT:
      return '3.2rem'
    case AVATAR_VARIANT_BADGE:
    case AVATAR_VARIANT_TRANSACTION:
      return '2rem'
    case AVATAR_VARIANT_MOSAIC:
      return '2.8rem'
    default:
      return '2.4rem'
  }
}
