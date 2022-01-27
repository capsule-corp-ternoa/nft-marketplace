export interface AppState {
  isRN: boolean;
  logo?: string;
  name: string;
  instagramUrl: string;
  twitterUrl: string;
  url: string;
}

// Actions names
export const APP_SET_IS_RN = 'APP_SET_IS_RN';
export const APP_SET_LOGO = 'APP_SET_LOGO';
export const APP_SET_NAME = 'APP_SET_NAME';
export const APP_SET_INSTAGRAM_URL = 'APP_SET_INSTAGRAM_URL';
export const APP_SET_TWITTER_URL = 'APP_SET_TWITTER_URL';
export const APP_SET_URL = 'APP_SET_URL';

// Actions interfaces
interface SetIsRN {
  type: typeof APP_SET_IS_RN;
  value: boolean;
}
interface SetLogo {
  type: typeof APP_SET_LOGO;
  value: string;
}
interface SetName {
  type: typeof APP_SET_NAME;
  value: string;
}
interface SetInstagramUrl {
  type: typeof APP_SET_INSTAGRAM_URL;
  value: string;
}
interface SetTwitterUrl {
  type: typeof APP_SET_TWITTER_URL;
  value: string;
}
interface SetUrl {
  type: typeof APP_SET_URL;
  value: string;
}

export type AppActionTypes = SetIsRN | SetLogo | SetName | SetInstagramUrl | SetTwitterUrl | SetUrl;
