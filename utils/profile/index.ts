import { getCreatorNFTS, getLikedNFTs, getOwnedNFTS } from 'actions/nft'
import {
  TabsIdType,
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
} from 'components/pages/Profile'
import { NftType } from 'interfaces'

type CurrentPageNominalSetState = React.Dispatch<React.SetStateAction<number>>
type DataNominalSetState = React.Dispatch<React.SetStateAction<NftType[]>>
type ToggleNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

export const loadMoreNfts = async (
  userWalletId: string,
  currentPage: number,
  setCurrentPage: CurrentPageNominalSetState,
  setHasNextPage: ToggleNominalSetState,
  setData: DataNominalSetState,
  tabId: TabsIdType
) => {
  try {
    let promise
    switch (tabId) {
      case NFT_CREATED_TAB:
        promise = getCreatorNFTS(userWalletId, (currentPage + 1).toString(), undefined)
        break
      case NFT_LIKED_TAB:
        promise = getLikedNFTs(userWalletId, (currentPage + 1).toString(), undefined)
        break
      case NFT_ON_SALE_TAB:
        promise = getOwnedNFTS(userWalletId, true, true, (currentPage + 1).toString(), undefined)
        break
      case NFT_NOT_FOR_SALE_TAB:
        promise = getOwnedNFTS(userWalletId, false, false, (currentPage + 1).toString(), undefined)
        break
      case NFT_OWNED_TAB:
      default:
        promise = getOwnedNFTS(userWalletId, false, undefined, (currentPage + 1).toString(), undefined)
        break
    }

    const { data, hasNextPage } = await promise
    setCurrentPage((prevState) => prevState + 1)
    setHasNextPage(hasNextPage || false)
    setData((prevState) => prevState.concat(data))
  } catch (err) {
    console.log(err)
  }
}
