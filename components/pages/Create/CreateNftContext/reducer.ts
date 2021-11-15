import {
  SET_BLURRED_VALUE,
  SET_EFFECT,
  SET_ERROR,
  SET_NFT,
  SET_OUTPUT,
  SET_QR_DATA,
  SET_RN,
  SET_SECRET_NFT,
  SET_UPLOAD_SIZE,
  CreateNftActionTypes,
  CreateNftStateType,
} from './types';

export default function createNftDataReducer(
  state: CreateNftStateType,
  action: CreateNftActionTypes
): CreateNftStateType {
  switch (action.type) {
    case SET_BLURRED_VALUE:
      const { value: blurredValue } = action;
      return {
        ...state,
        blurredValue,
      };

    case SET_EFFECT:
      const { effect } = action;
      return {
        ...state,
        effect,
      };

    case SET_ERROR:
      const { error } = action;
      return {
        ...state,
        error,
      };

    case SET_NFT:
      const { NFT } = action;
      return {
        ...state,
        NFT,
      };

    case SET_OUTPUT:
      const { value: output } = action;
      return {
        ...state,
        output,
      };

    case SET_QR_DATA:
      const { data: QRData } = action;
      return {
        ...state,
        QRData,
      };

    case SET_RN:
      const { value: isRN } = action;
      return {
        ...state,
        isRN,
      };

    case SET_SECRET_NFT:
      const { NFT: secretNFT } = action;
      return {
        ...state,
        secretNFT,
      };

    case SET_UPLOAD_SIZE:
      const { value: uploadSize } = action;
      return {
        ...state,
        uploadSize,
      };

    default:
      throw new Error();
  }
}
