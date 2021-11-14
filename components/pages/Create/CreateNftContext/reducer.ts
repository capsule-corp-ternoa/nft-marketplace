import {
  SET_BLURRED_VALUE,
  CreateNftActionTypes,
  CreateNftState,
} from './types';

export default function uiDataReducer(
  state: CreateNftState,
  action: CreateNftActionTypes
): CreateNftState {
  switch (action.type) {
    case SET_BLURRED_VALUE:
      const { value } = action;
      return {
        ...state,
        blurredValue: value,
      };

    default:
      throw new Error();
  }
}
