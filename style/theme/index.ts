import base from './base';
import colors from './colors'
import fonts from './fonts'
import sizes from './sizes'
import { Breakpoints, Colors, Fonts, MediaQueries, Sizes } from './types';

export interface TernoaTheme {
  breakpoints: Breakpoints;
  colors: Colors,
  fonts: Fonts,
  mediaQueries: MediaQueries;
  sizes: Sizes,
}

const theme: TernoaTheme = {
  ...base,
  ...colors,
  ...fonts,
  ...sizes,
};

export default theme;
