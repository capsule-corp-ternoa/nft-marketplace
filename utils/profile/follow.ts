import { getFollowed, getFollowers } from 'actions/follower'
import { TabsIdType, FOLLOWED_TAB, FOLLOWERS_TAB } from 'components/pages/Profile'
import { UserType } from 'interfaces'

type CurrentPageNominalSetState = React.Dispatch<React.SetStateAction<number>>
type DataNominalSetState = React.Dispatch<React.SetStateAction<UserType[]>>
type HasNextPageNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

export const loadMoreProfiles = async (
  userWalletId: string,
  currentPage: number,
  setCurrentPage: CurrentPageNominalSetState,
  setHasNextPage: HasNextPageNominalSetState,
  setData: DataNominalSetState,
  tabId: TabsIdType,
  forceLoad = false,
  searchValue?: string,
  isFilterVerified?: boolean
): Promise<UserType[]> => {
  try {
    const pageToLoad = forceLoad ? 0 : currentPage
    let promise
    switch (tabId) {
      case FOLLOWED_TAB:
        promise = getFollowed(
          userWalletId,
          (pageToLoad + 1).toString(),
          undefined,
          searchValue || undefined,
          isFilterVerified || undefined
        )
        break
      case FOLLOWERS_TAB:
      default:
        promise = getFollowers(
          userWalletId,
          (pageToLoad + 1).toString(),
          undefined,
          searchValue || undefined,
          isFilterVerified || undefined
        )
        break
    }

    const { data, hasNextPage } = await promise
    setCurrentPage((prevState) => prevState + 1)
    setHasNextPage(hasNextPage || false)

    if (forceLoad) {
      setData([...data])
    } else {
      setData((prevState) => prevState.concat(data))
    }

    return data
  } catch (err) {
    console.log(err)
    return []
  }
}
