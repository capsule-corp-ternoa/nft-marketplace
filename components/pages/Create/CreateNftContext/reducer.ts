import {
  SET_BLURRED_VALUE,
  SET_EFFECT,
  SET_ERROR,
  SET_NFT,
  SET_RN,
  SET_SECRET_NFT,
  CreateNftActionTypes,
  CreateNftStateType,
} from './types';

export default function uiDataReducer(
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

    default:
      throw new Error();
  }
}
