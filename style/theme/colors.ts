import { Colors, Shadows } from './types'

export const colors: Colors = {
  whiteBlur: 'rgba(255, 255, 255, 0.55)',

  invertedContrast: '#fff',
  contrast: '#0C0B0B',

  primary100: '#F5F5FD',
  primary200: '#ECE3F7',
  primary300: '#C3A2EE',
  primary500: '#7417EA',
  primary700: '#47049C',

  danger100: '#FFF2F1',
  danger200: '#FFC3C0',
  danger300: '#FF968F',
  danger400: '#FD6150',
  danger500: '#E61B00',
  danger600: '#AB1400',
  danger700: '#8B1200',
  danger800: '#5E0C00',

  neutral100: '#F7F7F7',
  neutral200: '#D6D7DB',
  neutral300: '#BABABB',
  neutral400: '#A1A1A1',
  neutral500: '#8A8A8A',
  neutral600: '#727272',
  neutral700: '#565656',
  neutral800: '#383838',
  neutral900: '#1B1B1B',

  success100: '#DFF5F1',
  success200: '#C7EEE6',
  success300: '#76DDC8',
  success400: '#2FD6B3',
  success500: '#1BC3A0',
  success600: '#11A889',
  success700: '#098C71',
  success800: '#045847',
}

export const shadows: Shadows = {
  popupShadow: '0 0.2rem 1.2rem rgba(0, 0, 0, 0.15)',
}

const colorsBase = {
  colors,
  shadows,
}

export default colorsBase
