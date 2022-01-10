export type Breakpoints = string[];

export interface Colors {
  contrast: string;
  danger: string;
  invertedContrast: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  success: string;
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
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type Sizes = {
  cardHeight: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  cardWidth: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};
