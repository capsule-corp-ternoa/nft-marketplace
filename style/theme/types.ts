export type Breakpoints = string[]

export interface Colors {
  contrast: string
  invertedContrast: string
  danger100: string
  danger200: string
  danger300: string
  danger400: string
  danger500: string
  danger600: string
  danger700: string
  danger800: string
  neutral100: string
  neutral200: string
  neutral300: string
  neutral400: string
  neutral500: string
  neutral600: string
  neutral700: string
  neutral800: string
  neutral900: string
  primary100: string
  primary200: string
  primary300: string
  primary500: string
  primary700: string
  success100: string
  success200: string
  success300: string
  success400: string
  success500: string
  success600: string
  success700: string
  success800: string
  whiteBlur: string
}

export interface Fonts {
  black: string
  bold: string
  extraBold: string
  light: string
  medium: string
  regular: string
}

export type MediaQueries = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
}

export type Sizes = {
  cardHeight: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  cardWidth: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export interface Shadows {
  popupShadow: string
}
