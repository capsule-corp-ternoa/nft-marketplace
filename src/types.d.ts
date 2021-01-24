/* eslint-disable @typescript-eslint/no-explicit-any */
type ContextArgs = {
  state: ContextState;
  dispatch: React.Dispatch<ContextAction>;
};

type ContextState = {
  isLoading: boolean;
  nftList: any[];
};

type ContextAction = {
  type: string;
  payload: any;
};

type CategoryType = {
  id: number;
  name: string;
  position?: number;
};

type NftListMockupType = {
  labels: number[];
  name: string;
  quantity: string;
  price: string;
  image: string;
};