export interface MpState {
  logo: string | null;
  name: string;
  instagramUrl: string;
  twitterUrl: string;
  url: string;
}

// Actions names
export const MP_SET_LOGO = 'MP_SET_LOGO';
export const MP_SET_NAME = 'MP_SET_NAME';
export const MP_SET_INSTAGRAM_URL = 'MP_SET_INSTAGRAM_URL';
export const MP_SET_TWITTER_URL = 'MP_SET_TWITTER_URL';
export const MP_SET_URL = 'MP_SET_URL';

// Actions interfaces
interface SetLogo {
  type: typeof MP_SET_LOGO;
  value: string;
}
interface SetName {
  type: typeof MP_SET_NAME;
  value: string;
}
interface SetInstagramUrl {
  type: typeof MP_SET_INSTAGRAM_URL;
  value: string;
}
interface SetTwitterUrl {
  type: typeof MP_SET_TWITTER_URL;
  value: string;
}
interface SetUrl {
  type: typeof MP_SET_URL;
  value: string;
}

export type MpActionTypes = SetLogo | SetName | SetInstagramUrl | SetTwitterUrl | SetUrl;
