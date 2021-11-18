export type Breakpoints = string[];

export interface Colors {
  contrast: string;
  invertedContrast: string;
  neutral400: string;
  neutral500: string;
  primary: string;
  primaryLight: string;
  whiteBlur: string;
}

export interface Fonts {
  black: string;
  bold: string;
  extraBold: string;
  light: string;
  medium: string;
  regular: string;
}

export type MediaQueries = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};
