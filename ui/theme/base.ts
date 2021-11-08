import { Breakpoints, MediaQueries } from './types';

export const breakpointMap: { [key: string]: number } = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1440,
};

const breakpoints: Breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`
);

const mediaQueries: MediaQueries = {
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
};

export default {
  breakpoints,
  mediaQueries,
};
