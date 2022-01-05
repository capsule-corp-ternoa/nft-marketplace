import { getFollowed, getFollowers, getFollowersCount, isUserFollowing } from 'actions/follower';

import { TabsIdType, UserType, FOLLOWED_TAB, FOLLOWERS_TAB } from 'interfaces';

type CurrentPageNominalSetState = React.Dispatch<React.SetStateAction<number>>;
type DataNominalSetState = React.Dispatch<React.SetStateAction<UserType[]>>;
type HasNextPageNominalSetState = React.Dispatch<React.SetStateAction<boolean>>;

export const getFollowingStatus = async (
  profiles: string[],
  userWalletId: string
): Promise<{ [key: string]: boolean } | void> => {
  const promises = [] as Promise<{ isFollowing: boolean }>[];

  profiles.forEach((profileWalletId) => {
    promises.push(isUserFollowing(profileWalletId, userWalletId));
  });

  try {
    const result = await Promise.all(promises);
    const status = result.reduce(
      (acc, { isFollowing }, idx) => {
        acc[profiles[idx]] = isFollowing;
        return acc;
      },
      {} as {
        [key: string]: boolean;
      }
    );

    return status;
  } catch (err) {
    console.log(err);
  }
};

export const getProfilesFollowersCount = async (profiles: string[]): Promise<{ [key: string]: number } | void> => {
  const promises = [] as Promise<number>[];

  profiles.forEach((profileWalletId) => {
    promises.push(getFollowersCount(profileWalletId));
  });

  try {
    const result = await Promise.all(promises);
    const counts = result.reduce(
      (acc, count, idx) => {
        acc[profiles[idx]] = count ?? 0;
        return acc;
      },
      {} as {
        [key: string]: number;
      }
    );

    return counts;
  } catch (err) {
    console.log(err);
  }
};

export const loadMoreProfiles = async (
  userWalletId: string,
  currentPage: number,
  setCurrentPage: CurrentPageNominalSetState,
  setHasNextPage: HasNextPageNominalSetState,
  setData: DataNominalSetState,
  tabId: TabsIdType,
  forceLoad: boolean = false,
  searchValue?: string,
  isFiltered?: boolean
): Promise<UserType[]> => {
  try {
    const pageToLoad = forceLoad ? 0 : currentPage;
    let promise;
    switch (tabId) {
      case FOLLOWED_TAB:
        promise = getFollowed(userWalletId, (pageToLoad + 1).toString(), undefined, searchValue, isFiltered);
        break;
      case FOLLOWERS_TAB:
      default:
        promise = getFollowers(userWalletId, (pageToLoad + 1).toString(), undefined, searchValue, isFiltered);
        break;
    }

    const { data, hasNextPage } = await promise;
    if (hasNextPage) setCurrentPage((prevState) => prevState + 1);
    setHasNextPage(hasNextPage || false);

    if (forceLoad) {
      setData([...data]);
    } else {
      setData((prevState) => [...prevState, ...data]);
    }

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
