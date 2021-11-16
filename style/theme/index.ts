import base from './base';
import { Breakpoints, MediaQueries } from './types';

export interface TernoaTheme {
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
}

const theme: TernoaTheme = {
  ...base,
};

export default theme;
