import { getCreatorNFTS, getLikedNFTs, getOwnedNFTS } from 'actions/nft';
import { likeNFT, unlikeNFT } from 'actions/user';
import {
  NftType,
  NFTsNominalSetState,
  TabsIdType,
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
} from 'interfaces';

import { LIKE_ACTION, UNLIKE_ACTION, LIKE_ACTION_TYPE } from './constants';

type CurrentPageNominalSetState = React.Dispatch<React.SetStateAction<number>>;
type DataNominalSetState = React.Dispatch<React.SetStateAction<NftType[]>>;
type ToggleNominalSetState = React.Dispatch<React.SetStateAction<boolean>>;

export const loadMoreNfts = async (
  userWalletId: string,
  currentPage: number,
  setCurrentPage: CurrentPageNominalSetState,
  setHasNextPage: ToggleNominalSetState,
  setData: DataNominalSetState,
  tabId: TabsIdType
) => {
  try {
    let promise;
    switch (tabId) {
      case NFT_CREATED_TAB:
        promise = getCreatorNFTS(userWalletId, (currentPage + 1).toString(), undefined);
        break;
      case NFT_LIKED_TAB:
        promise = getLikedNFTs(userWalletId, (currentPage + 1).toString(), undefined);
        break;
      case NFT_ON_SALE_TAB:
        promise = getOwnedNFTS(userWalletId, true, true, (currentPage + 1).toString(), undefined);
        break;
      case NFT_NOT_FOR_SALE_TAB:
        promise = getOwnedNFTS(userWalletId, false, false, (currentPage + 1).toString(), undefined);
        break;
      case NFT_OWNED_TAB:
      default:
        promise = getOwnedNFTS(userWalletId, false, undefined, (currentPage + 1).toString(), undefined);
        break;
    }

    const { data, hasNextPage } = await promise;
    if (hasNextPage) setCurrentPage((prevState) => prevState + 1);
    setHasNextPage(hasNextPage || false);
    setData((prevState) => [...prevState, ...data]);
  } catch (err) {
    console.log(err);
  }
};

export const toggleLike = async (
  nft: NftType,
  action: LIKE_ACTION_TYPE,
  userWalletId: string,
  toogleIsLike: ToggleNominalSetState,
  setData?: NFTsNominalSetState
) => {
  const { id: nftId, serieId } = nft;

  try {
    switch (action) {
      case LIKE_ACTION: {
        await likeNFT(userWalletId, nftId, serieId);
        if (setData) setData((prevState) => [...prevState, nft]);
        break;
      }
      case UNLIKE_ACTION: {
        await unlikeNFT(userWalletId, nftId, serieId);
        if (setData) setData((prevState) => prevState.filter(({ id }) => id !== nftId));
        break;
      }
      default:
        break;
    }
    toogleIsLike((prevState) => !prevState);
  } catch (error) {
    console.error(error);
  }
};
