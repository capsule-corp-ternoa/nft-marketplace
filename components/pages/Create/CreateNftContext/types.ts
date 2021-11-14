export interface CreateNftState {
  blurredValue: number;
}

export interface CreateNftProviderValue {
  CreateNftState: CreateNftState;
  setBlurredValue: (value: number) => void;
}

export type CreateNftContextProps = CreateNftProviderValue | undefined;

// Actions names
export const SET_BLURRED_VALUE = 'SET_BLURRED_VALUE';

// Actions interfaces
interface SetBlurredValue {
  type: typeof SET_BLURRED_VALUE;
  value: number;
}

export type CreateNftActionTypes = SetBlurredValue;
