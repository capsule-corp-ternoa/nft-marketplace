import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import cookies from 'next-cookies';

import { getOwnedNFTS } from 'actions/nft';
import { getFollowers, getFollowed } from 'actions/follower';
import { getUser, getProfile } from 'actions/user';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile from 'components/pages/Profile';
import {
  NftType,
  UserType,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
} from 'interfaces';
import { decryptCookie } from 'utils/cookie';
import { getUserIp } from 'utils/functions';
import { middleEllipsis } from 'utils/strings';

export interface PublicProfileProps {
  user: UserType;
  profile: UserType;
}

const ORDERED_TABS_ID = [
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
] as const;

const PublicProfilePage = ({
  user,
  profile,
}: PublicProfileProps) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [viewProfile, setViewProfile] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  //Owned listed NFTs
  const [ownedNftsListed, setOwnedNftsListed] = useState([] as NftType[]);
  const [ownedNftsListedTotal, setOwnedNftsListedTotal] = useState<number>(0);
  const [ownedNftsListedHasNextPage, setOwnedNftsListedHasNextPage] =
    useState(false);
  const [ownedNftsListedCurrentPage, setOwnedNftsListedCurrentPage] =
    useState(1);
  //Owned not listed NFTs
  const [ownedNftsUnlisted, setOwnedNftsUnlisted] = useState([] as NftType[]);
  const [ownedNftsUnlistedTotal, setOwnedNftsUnlistedTotal] =
    useState<number>(0);
  const [ownedNftsUnlistedHasNextPage, setOwnedNftsUnlistedHasNextPage] =
    useState(false);
  const [ownedNftsUnlistedCurrentPage, setOwnedNftsUnlistedCurrentPage] =
    useState(1);
  //profile followers
  const [followersUsers, setFollowersUsers] = useState([] as UserType[]);
  const [followersUsersTotal, setFollowersUsersTotal] = useState<number>(0);
  const [followersUsersHasNextPage, setFollowersUsersHasNextPage] =
    useState(false);
  const [followersCurrentPage, setFollowersCurrentPage] = useState(1);
  //profile followed
  const [followedUsers, setFollowedUsers] = useState([] as UserType[]);
  const [followedUsersTotal, setFollowedUsersTotal] = useState<number>(0);
  const [followedUsersHasNextPage, setFollowedUsersHasNextPage] = useState(false);
  const [followedCurrentPage, setFollowedCurrentPage] = useState(1);
  const [profileDataLoaded, setProfileDataLoaded] = useState(false)


  const populateProfileData = async (token: string) => {
    //Owned listed NFTs
    const ownedListed = await getOwnedNFTS(
      token,
      true,
      true,
      undefined,
      undefined,
    );
    setOwnedNftsListed(ownedListed.data);
    setOwnedNftsListedTotal(ownedListed.totalCount ?? 0);
    setOwnedNftsListedHasNextPage(ownedListed.hasNextPage);
    //Owned not listed NFTs
    const ownedUnlisted = await getOwnedNFTS(
      token,
      false,
      false,
      undefined,
      undefined,
    );
    setOwnedNftsUnlisted(ownedUnlisted.data);
    setOwnedNftsUnlistedTotal(ownedUnlisted.totalCount ?? 0);
    setOwnedNftsUnlistedHasNextPage(ownedUnlisted.hasNextPage);
    //profile followers
    const followers = await getFollowers(token);
    setFollowersUsers(followers.data);
    setFollowersUsersTotal(followers.totalCount ?? 0);
    setFollowersUsersHasNextPage(followers.hasNextPage);
    //profile followed
    const followed = await getFollowed(token);
    setFollowedUsers(followed.data);
    setFollowedUsersTotal(followed.totalCount ?? 0);
    setFollowedUsersHasNextPage(followed.hasNextPage);
    setProfileDataLoaded(true)
  };

  const loadMoreOwnedListedNfts = async () => {
    setIsLoading(true);
    try {
      if (ownedNftsListedHasNextPage) {
        let result = await getOwnedNFTS(
          profile.walletId,
          true,
          true,
          (ownedNftsListedCurrentPage + 1).toString(),
          undefined,
        );
        setOwnedNftsListedCurrentPage(ownedNftsListedCurrentPage + 1);
        setOwnedNftsListedHasNextPage(result.hasNextPage || false);
        setOwnedNftsListed([...ownedNftsListed, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadMoreOwnedUnlistedNfts = async () => {
    setIsLoading(true);
    try {
      if (ownedNftsUnlistedHasNextPage) {
        let result = await getOwnedNFTS(
          profile.walletId,
          false,
          false,
          (ownedNftsUnlistedCurrentPage + 1).toString(),
          undefined,
        );
        setOwnedNftsUnlistedCurrentPage(ownedNftsUnlistedCurrentPage + 1);
        setOwnedNftsUnlistedHasNextPage(result.hasNextPage || false);
        setOwnedNftsUnlisted([...ownedNftsUnlisted, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadMoreFollowers = async (forceLoad: boolean = false) => {
    setIsLoading(true);
    try {
      if (followersUsersHasNextPage || forceLoad) {
        let pageToLoad = !forceLoad ? followersCurrentPage : 0;
        let result = await getFollowers(
          profile.walletId,
          (pageToLoad + 1).toString(),
          undefined,
          searchValue,
          isFiltered ? true : undefined
        );
        setFollowersCurrentPage(pageToLoad + 1);
        setFollowersUsersHasNextPage(result.hasNextPage || false);
        if (!forceLoad) {
          setFollowersUsers([...followersUsers, ...result.data]);
        } else {
          setFollowersUsers([...result.data]);
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadMoreFollowed = async (forceLoad: boolean = false) => {
    setIsLoading(true);
    try {
      if (followedUsersHasNextPage || forceLoad) {
        let pageToLoad = !forceLoad ? followedCurrentPage : 0;
        let result = await getFollowed(
          profile.walletId,
          (pageToLoad + 1).toString(),
          undefined,
          searchValue,
          isFiltered ? true : undefined
        );
        setFollowedCurrentPage(pageToLoad + 1);
        setFollowedUsersHasNextPage(result.hasNextPage || false);
        if (!forceLoad) {
          setFollowedUsers([...followedUsers, ...result.data]);
        } else {
          setFollowedUsers([...result.data]);
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      populateProfileData(user.walletId);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_APP_NAME
            ? process.env.NEXT_PUBLIC_APP_NAME
            : 'SecretNFT'}{' '}
          - {viewProfile.name || middleEllipsis(viewProfile.walletId, 10)}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Ternoart - ${
            viewProfile.name || middleEllipsis(viewProfile.walletId, 10)
          } profile page.`}
        />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      <BetaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Profile
        user={viewProfile}
        setUser={setViewProfile}
        ownedNftsListed={ownedNftsListed}
        ownedNftsListedTotal={ownedNftsListedTotal}
        ownedNftsListedHasNextPage={ownedNftsListedHasNextPage}
        loadMoreOwnedListedNfts={loadMoreOwnedListedNfts}
        ownedNftsUnlisted={ownedNftsUnlisted}
        ownedNftsUnlistedTotal={ownedNftsUnlistedTotal}
        ownedNftsUnlistedHasNextPage={ownedNftsUnlistedHasNextPage}
        loadMoreOwnedUnlistedNfts={loadMoreOwnedUnlistedNfts}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        followers={followersUsers}
        followersTotal={followersUsersTotal}
        followersUsersHasNextPage={followersUsersHasNextPage}
        loadMoreFollowers={loadMoreFollowers}
        followed={followedUsers}
        followedTotal={followedUsersTotal}
        setFollowed={setFollowedUsers}
        followedUsersHasNextPage={followedUsersHasNextPage}
        loadMoreFollowed={loadMoreFollowed}
        setModalExpand={setModalExpand}
        loading={isLoading}
        canEditProfile={false}
        tabs={ORDERED_TABS_ID}
        profileDataLoaded={profileDataLoaded}
      />
    </>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  const token =
    cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user: UserType | null = null,
    profile: UserType | null = null;
  const promises = [];
  let ip = getUserIp(ctx.req);
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token, true)
          .then((_user) => {
            user = _user;
            success();
          })
          .catch(success);
      })
    );
  }
  promises.push(
    new Promise<void>((success) => {
      getProfile(ctx.query.name as string, token ? token : null, ip)
        .then((_profile) => {
          profile = _profile;
          success();
        })
        .catch(success);
    })
  );
  await Promise.all(promises);
  if (!profile) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user, profile },
  };
}

export default PublicProfilePage;
