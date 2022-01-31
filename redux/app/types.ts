import { UserType } from "interfaces";

export interface AppState {
  isRN: boolean;
  user?: UserType | null;
}

// Actions names
export const APP_SET_IS_RN = 'APP_SET_IS_RN';
export const APP_SET_USER = 'APP_SET_USER';

// Actions interfaces
interface SetIsRN {
  type: typeof APP_SET_IS_RN;
  value: boolean;
}

interface SetUser {
  type: typeof APP_SET_USER;
  value: UserType;
}

export type AppActionTypes = SetIsRN | SetUser;
