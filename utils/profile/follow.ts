import { getFollowersCount, isUserFollowing } from 'actions/follower';

export const FOLLOW_ACTION = 'follow';
export const UNFOLLOW_ACTION = 'unfollow';
export type FOLLOW_ACTION_TYPE = typeof FOLLOW_ACTION | typeof UNFOLLOW_ACTION;


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

export const getProfilesFollowersCount = async (
  profiles: string[]
): Promise<{ [key: string]: number } | void> => {
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
