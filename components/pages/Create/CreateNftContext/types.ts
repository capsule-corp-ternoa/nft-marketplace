import { NftEffectType } from 'interfaces';

type QRDataType = {
  walletId?: string;
  quantity: number;
};
export interface CreateNftStateType {
  blurredValue: number;
  effect: NftEffectType;
  error: string;
  NFT: File | null;
  output: string[];
  QRData: QRDataType;
  secretNFT: File | null;
  uploadSize: number;
}

export type CreateNftContextProps = {
  createNftData: CreateNftStateType;
  setBlurredValue: (value: number) => void;
  setEffect: (effect: NftEffectType) => void;
  setError: (error: string) => void;
  setNFT: (f: File | null) => void;
  setOutput: (value: string[]) => void;
  setQRData: (data: QRDataType) => void;
  setSecretNFT: (f: File | null) => void;
  setUploadSize: (n: number) => void;
};

// Actions names
export const SET_BLURRED_VALUE = 'SET_BLURRED_VALUE';
export const SET_EFFECT = 'SET_EFFECT';
export const SET_ERROR = 'SET_ERROR';
export const SET_NFT = 'SET_NFT';
export const SET_OUTPUT = 'SET_OUTPUT';
export const SET_QR_DATA = 'SET_QR_DATA';
export const SET_SECRET_NFT = 'SET_SECRET_NFT';
export const SET_UPLOAD_SIZE = 'SET_UPLOAD_SIZE';

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

type SetOutput = {
  type: typeof SET_OUTPUT;
  value: string[];
};

type SetQRData = {
  type: typeof SET_QR_DATA;
  data: QRDataType;
};

type SetUploadSize = {
  type: typeof SET_UPLOAD_SIZE;
  value: number;
};

export type CreateNftActionTypes =
  | SetBlurredValueType
  | SetEffectType
  | SetErrorType
  | SetNftType
  | SetOutput
  | SetQRData
  | SetUploadSize;
