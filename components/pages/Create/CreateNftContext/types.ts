import { NftEffectType } from 'interfaces';

export interface CreateNftStateType {
  blurredValue: number;
  effect: NftEffectType;
  error: string;
  isRN: boolean;
  NFT: File | null;
  secretNFT: File | null;
}

export interface CreateNftProviderValue {
  createNftData: CreateNftStateType;
  setBlurredValue: (value: number) => void;
  setEffect: (effect: NftEffectType) => void;
  setError: (error: string) => void;
  setRN: (value: boolean) => void;
  setNFT: (f: File | null) => void;
  setSecretNFT: (f: File | null) => void;
}

export type CreateNftContextProps = CreateNftProviderValue | undefined;

// Actions names
export const SET_BLURRED_VALUE = 'SET_BLURRED_VALUE';
export const SET_EFFECT = 'SET_EFFECT';
export const SET_ERROR = 'SET_ERROR';
export const SET_NFT = 'SET_NFT';
export const SET_RN = 'SET_RN';
export const SET_SECRET_NFT = 'SET_SECRET_NFT';

// Actions interfaces
type SetBlurredValueType = {
  type: typeof SET_BLURRED_VALUE;
  value: number;
};

type SetEffectType = {
  type: typeof SET_EFFECT;
  effect: NftEffectType;
};

type SetErrorType = {
  type: typeof SET_ERROR;
  error: string;
};

type SetNftType = {
  type: typeof SET_NFT | typeof SET_SECRET_NFT;
  NFT: File;
};

type SetRNType = {
  type: typeof SET_RN;
  value: boolean;
};

export type CreateNftActionTypes =
  | SetBlurredValueType
  | SetEffectType
  | SetErrorType
  | SetNftType
  | SetRNType;
