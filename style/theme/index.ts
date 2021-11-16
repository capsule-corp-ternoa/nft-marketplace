import base from './base';
import fonts from './fonts'
import { Breakpoints, Fonts, MediaQueries } from './types';

export interface TernoaTheme {
  breakpoints: Breakpoints;
  fonts: Fonts,
  mediaQueries: MediaQueries;
}

const theme: TernoaTheme = {
  ...base,
  ...fonts,
};

export default theme;
