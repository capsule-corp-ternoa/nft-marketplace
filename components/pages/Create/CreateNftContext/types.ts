export interface CreateNftState {
  blurredValue: string;
}

export interface CreateNftProviderValue {
  CreateNftState: CreateNftState;
  setBlurredValue: (value: string) => void;
}

export type CreateNftContextProps = CreateNftProviderValue | undefined;

// Actions names
export const SET_BLURRED_VALUE = 'SET_BLURRED_VALUE';

// Actions interfaces
interface SetBlurredValue {
  type: typeof SET_BLURRED_VALUE;
  value: string;
}

export type CreateNftActionTypes = SetBlurredValue;
