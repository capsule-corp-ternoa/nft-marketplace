import base from './base';
import colors from './colors'
import fonts from './fonts'
import { Breakpoints, Colors, Fonts, MediaQueries } from './types';

export interface TernoaTheme {
  breakpoints: Breakpoints;
  colors: Colors,
  fonts: Fonts,
  mediaQueries: MediaQueries;
}

const theme: TernoaTheme = {
  ...base,
  ...colors,
  ...fonts,
};

export default theme;
