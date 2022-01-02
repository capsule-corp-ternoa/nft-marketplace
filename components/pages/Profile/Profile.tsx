import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
// import Link from 'next/link';
import { Banner as AvatarBanner } from 'components/base/Avatar';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import { follow, unfollow } from 'actions/follower';
import { getUserNFTsStat } from 'actions/nft';
import { Container, Wrapper } from 'components/layout/Container';
import Button from 'components/ui/Button';
import Tabs from 'components/ui/Tabs';
import {
  NftType,
  TabsIdType,
  UserType,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
} from 'interfaces';
import { breakpointMap } from 'style/theme/base';
import {
  FOLLOW_ACTION,
  FOLLOW_ACTION_TYPE,
  UNFOLLOW_ACTION,
  getFollowingStatus,
  getProfilesFollowersCount,
} from 'utils/profile/follow';

import FollowersProfileBlock from './components/FollowersProfileBlock';
import NftsProfileBlock from './components/NftsProfileBlock';

export const ARTIST_PROFILE_VARIANT = 'artist_profile';
export const USER_PERSONNAL_PROFILE_VARIANT = 'user_personnal_profile';

export interface ProfileProps {
  setModalExpand: (b: boolean) => void;
  artist?: UserType;
  setArtist?: (u: UserType) => void;
  user: UserType;
  setUser: (u: UserType) => void;
  loading: boolean;
  isFiltered: boolean;
  setIsFiltered: (b: boolean) => void;
  searchValue: string;
  setSearchValue: (s: string) => void;
  //Owned
  ownedNfts?: NftType[];
  loadMoreOwnedNfts?: () => void;
  ownedNftsHasNextPage?: boolean;
  //Owned listed
  ownedNftsListed: NftType[];
  ownedNftsListedHasNextPage: boolean;
  loadMoreOwnedListedNfts: () => void;
  //Owned not listed
  ownedNftsUnlisted: NftType[];
  ownedNftsUnlistedHasNextPage: boolean;
  loadMoreOwnedUnlistedNfts: () => void;
  //created
  createdNfts?: NftType[];
  loadMoreCreatedNfts?: () => void;
  createdNftsHasNextPage?: boolean;
  //liked
  likedNfts?: NftType[];
  setLikedNfts?: (nfts: NftType[]) => void;
  likedNftsHasNextPage?: boolean;
  loadMoreLikedNfts?: () => void;
  //followers
  followers: UserType[];
  followersUsersHasNextPage: boolean;
  loadMoreFollowers: (forceLoad?: boolean) => void;
  setFollowers: (users: UserType[]) => void;
  //followed
  followed: UserType[];
  setFollowed: (users: UserType[]) => void;
  followedUsersHasNextPage: boolean;
  loadMoreFollowed: (forceLoad?: boolean) => void;
  canEditProfile: boolean;
  tabs: readonly TabsIdType[];
  profileDataLoaded: boolean;
  variant:
    | typeof ARTIST_PROFILE_VARIANT
    | typeof USER_PERSONNAL_PROFILE_VARIANT;
}

const Profile = ({
  setModalExpand,
  artist,
  setArtist,
  user,
  setUser,
  loading,
  isFiltered,
  setIsFiltered,
  searchValue,
  setSearchValue,
  ownedNfts,
  loadMoreOwnedNfts,
  ownedNftsHasNextPage,
  ownedNftsListed,
  ownedNftsListedHasNextPage,
  loadMoreOwnedListedNfts,
  ownedNftsUnlisted,
  ownedNftsUnlistedHasNextPage,
  loadMoreOwnedUnlistedNfts,
  createdNfts,
  createdNftsHasNextPage,
  loadMoreCreatedNfts,
  likedNfts,
  likedNftsHasNextPage,
  loadMoreLikedNfts,
  followers,
  followersUsersHasNextPage,
  loadMoreFollowers,
  setFollowers,
  followed,
  followedUsersHasNextPage,
  loadMoreFollowed,
  setFollowed,
  canEditProfile,
  tabs,
  profileDataLoaded,
  variant,
}: ProfileProps) => {
  const [followLoading, setFollowLoading] = useState(false);
  const [userFollowingStatus, setUserFollowingStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [profilesFollowersCount, setProfilesFollowersCount] = useState<{
    [key: string]: number;
  }>({});
  const [counts, setCounts] = useState<{
    [key in TabsIdType]: number;
  }>(
    tabs.reduce(
      (acc, id) => ({
        ...acc,
        [id]: 0,
      }),
      {} as {
        [key in TabsIdType]: number;
      }
    )
  );

  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });
  const isMyProfile =
    variant === USER_PERSONNAL_PROFILE_VARIANT ||
    (variant === ARTIST_PROFILE_VARIANT && artist?.walletId === user?.walletId);

  const initCounts = async () => {
    const { walletId } = artist ?? user;
    try {
      if (walletId) {
        const stats = await getUserNFTsStat(walletId, true);
        if (stats) {
          const {
            countOwned,
            countOwnedListed,
            countOwnedUnlisted,
            countCreated,
            countFollowers,
            countFollowed,
          } = stats;

          setCounts((prevCounts) => ({
            ...prevCounts,
            [NFT_OWNED_TAB]: countOwned,
            [NFT_ON_SALE_TAB]: countOwnedListed,
            [NFT_NOT_FOR_SALE_TAB]: countOwnedUnlisted,
            [NFT_CREATED_TAB]: countCreated,
            [NFT_LIKED_TAB]: user?.likedNFTs?.length || 0,
            [FOLLOWERS_TAB]: countFollowers,
            [FOLLOWED_TAB]: countFollowed,
          }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const initFollowersData = async (): Promise<void> => {
    const profileWalletIds = [...followers, ...followed].map(
      ({ walletId }) => walletId
    );

    if (artist !== undefined) {
      profileWalletIds.push(artist.walletId);
    }

    setFollowLoading(true);
    if (user) {
      const status =
        (await getFollowingStatus(profileWalletIds, user.walletId)) ?? {};
      setUserFollowingStatus(status);
    }

    const counts = (await getProfilesFollowersCount(profileWalletIds)) ?? {};
    setProfilesFollowersCount(counts);
    setFollowLoading(false);
  };

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleUserFollow = async (
    profileWalletId: string,
    action: FOLLOW_ACTION_TYPE
  ) => {
    if (user) {
      setFollowLoading(true);
      try {
        switch (action) {
          case FOLLOW_ACTION: {
            follow(profileWalletId, user.walletId).then((res) => {
              if (isMyProfile) {
                setFollowed([...followed, res]);
                setCounts((prevCounts) => ({
                  ...prevCounts,
                  [FOLLOWED_TAB]: prevCounts[FOLLOWED_TAB] + 1,
                }));
              } else {
                if (artist && setArtist)
                  setArtist({ ...res, viewsCount: artist.viewsCount ?? 0 });
                setFollowers([...followers, res]);
                setCounts((prevCounts) => ({
                  ...prevCounts,
                  [FOLLOWERS_TAB]: prevCounts[FOLLOWERS_TAB] + 1,
                }));
              }

              setProfilesFollowersCount((prevState) => ({
                ...prevState,
                [profileWalletId]: prevState[profileWalletId] + 1,
              }));
            });
            setFollowLoading(false);
            break;
          }
          case UNFOLLOW_ACTION: {
            unfollow(profileWalletId, user.walletId).then((res) => {
              if (isMyProfile) {
                setFollowed(
                  followed.filter(
                    ({ walletId }) => walletId !== profileWalletId
                  )
                );
                setCounts((prevCounts) => ({
                  ...prevCounts,
                  [FOLLOWED_TAB]: prevCounts[FOLLOWED_TAB] - 1,
                }));
              } else {
                if (artist && setArtist)
                  setArtist({ ...res, viewsCount: artist.viewsCount ?? 0 });
                setFollowers(
                  followers.filter(
                    ({ walletId }) => walletId !== profileWalletId
                  )
                );
                setCounts((prevCounts) => ({
                  ...prevCounts,
                  [FOLLOWERS_TAB]: prevCounts[FOLLOWERS_TAB] - 1,
                }));
              }

              setProfilesFollowersCount((prevState) => ({
                ...prevState,
                [profileWalletId]: prevState[profileWalletId] - 1,
              }));
            });
            setFollowLoading(false);
            break;
          }
          default:
            break;
        }

        const isFollowing = action === FOLLOW_ACTION;
        setUserFollowingStatus((prevState) => ({
          ...prevState,
          [profileWalletId]: isFollowing,
        }));
      } catch (err) {
        setFollowLoading(false);
        console.error(err);
      }
    }
  };

  const returnNFTs = (tabId: TabsIdType) => {
    switch (tabId) {
      case NFT_CREATED_TAB:
        return (
          <NftsProfileBlock
            NFTs={createdNfts}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={!!createdNftsHasNextPage}
            loadMore={loadMoreCreatedNfts}
            noNftHref="/create"
            noNftLinkLabel="Create your NFT"
            noNftTitle="Nothing to display"
            tabId={tabId}
            user={user}
            setUser={setUser}
          />
        );
      case NFT_LIKED_TAB:
        return (
          <NftsProfileBlock
            NFTs={likedNfts}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={!!likedNftsHasNextPage}
            loadMore={loadMoreLikedNfts}
            noNftBody="The NFTs you liked are displayed here"
            noNftTitle="Nothing to display"
            tabId={tabId}
            user={user}
            setUser={setUser}
          />
        );
      case NFT_ON_SALE_TAB:
        return (
          <NftsProfileBlock
            NFTs={ownedNftsListed}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={ownedNftsListedHasNextPage}
            loadMore={loadMoreOwnedListedNfts}
            noNftHref="/"
            noNftLinkLabel="Sell your NFT"
            noNftTitle="Nothing to display"
            tabId={tabId}
            user={user}
            setUser={setUser}
          />
        );
      case NFT_NOT_FOR_SALE_TAB:
        return (
          <NftsProfileBlock
            NFTs={ownedNftsUnlisted}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={ownedNftsUnlistedHasNextPage}
            loadMore={loadMoreOwnedUnlistedNfts}
            noNftBody="The NFTs you owned and are not for sale are displayed here"
            noNftTitle="Nothing to display"
            tabId={tabId}
            user={user}
            setUser={setUser}
          />
        );
      case NFT_OWNED_TAB:
      default:
        return (
          <NftsProfileBlock
            NFTs={ownedNfts}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={!!ownedNftsHasNextPage}
            loadMore={loadMoreOwnedNfts}
            noNftBody="The NFTs you owned are displayed here"
            noNftHref="/explore"
            noNftLinkLabel="Explore NFTs"
            noNftTitle="Nothing to display"
            tabId={tabId}
            user={user}
            setUser={setUser}
          />
        );
    }
  };

  const returnFollowers = (tabId: TabsIdType) => {
    switch (tabId) {
      case FOLLOWERS_TAB:
        return (
          <FollowersProfileBlock
            users={followers}
            followingStatus={userFollowingStatus}
            followersNbFollowers={profilesFollowersCount}
            handleFollow={handleUserFollow}
            isFiltered={isFiltered}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={followersUsersHasNextPage}
            loadMore={loadMoreFollowers}
            noContentBody="Discover new artists and start following them!"
            noContentTitle="Nothing to display"
            setIsFiltered={setIsFiltered}
            updateKeywordSearch={updateKeywordSearch}
            user={user}
          />
        );
      case FOLLOWED_TAB:
        return (
          <FollowersProfileBlock
            users={followed}
            followingStatus={userFollowingStatus}
            followersNbFollowers={profilesFollowersCount}
            handleFollow={handleUserFollow}
            isFiltered={isFiltered}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={followedUsersHasNextPage}
            loadMore={loadMoreFollowed}
            noContentTitle="Nothing to display"
            setIsFiltered={setIsFiltered}
            updateKeywordSearch={updateKeywordSearch}
            user={user}
          />
        );
    }
  };

  const returnContent = (tabId: TabsIdType) => {
    if (tabId === FOLLOWERS_TAB || tabId === FOLLOWED_TAB) {
      return returnFollowers(tabId);
    }

    return returnNFTs(tabId);
  };

  useEffect(() => {
    if (profileDataLoaded) {
      initFollowersData();
    }
  }, [profileDataLoaded]);

  useEffect(() => {
    initCounts();
  }, [artist, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMoreFollowers(true);
      loadMoreFollowed(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue, isFiltered]);

  const { banner, bio, name, picture, twitterName, verified, walletId } =
    artist ?? user;

  return (
    <Container>
      <SBannerContainer>
        <SBannerIMG
          src={banner ?? '/defaultBanner.jpeg'}
          draggable="false"
          alt="banner"
        />
        {isTablet && canEditProfile && (
          <SEditButtonMobile
            color="invertedContrast"
            icon="edit"
            href="/edit"
            size="medium"
            variant="contained"
          />
        )}
      </SBannerContainer>
      <Wrapper>
        <SAvatarBannerContainer>
          <AvatarBanner
            bio={bio}
            isVerified={verified}
            name={name}
            picture={picture}
            twitterName={twitterName}
            walletId={walletId}
          />
          {!isTablet && canEditProfile && (
            <Button
              color="whiteBlur"
              icon="edit"
              href="/edit"
              text="Edit profile"
              size="small"
              variant="outlined"
            />
          )}
          {artist && (
            <SArtistStatsBannerContainer>
              {user?.walletId &&
                artist.walletId &&
                user.walletId !== artist.walletId && (
                  <Button
                    color={
                      userFollowingStatus[walletId]
                        ? 'contrast'
                        : 'invertedContrast'
                    }
                    disabled={followLoading}
                    onClick={() =>
                      handleUserFollow(
                        artist.walletId,
                        userFollowingStatus[walletId]
                          ? UNFOLLOW_ACTION
                          : FOLLOW_ACTION
                      )
                    }
                    size="medium"
                    text={userFollowingStatus[walletId] ? 'Unfollow' : 'Follow'}
                    variant={
                      userFollowingStatus[walletId] ? 'contained' : 'outlined'
                    }
                  />
                )}
              <SArtistStatsContainer>
                <SArtistStatsValue>{counts[FOLLOWERS_TAB]}</SArtistStatsValue>followers
                <SArtistStatsSeparator>·</SArtistStatsSeparator>
                <SArtistStatsValue>{counts[FOLLOWED_TAB]}</SArtistStatsValue>following
                <SArtistStatsSeparator>·</SArtistStatsSeparator>
                <SArtistStatsValue>{artist.viewsCount}</SArtistStatsValue>views
              </SArtistStatsContainer>
            </SArtistStatsBannerContainer>
          )}
        </SAvatarBannerContainer>
      </Wrapper>
      <Wrapper>
        <Tabs
          isTabsSelect={isTablet}
          tabs={tabs.reduce(
            (acc, id) => ({
              ...acc,
              [id]: {
                badge: counts[id],
                content: returnContent(id),
                label: id,
              },
            }),
            {}
          )}
        />
      </Wrapper>
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      <Footer />
    </Container>
  );
};

const SBannerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 22rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: 28rem;
  }
`;

const SBannerIMG = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const SEditButtonMobile = styled(Button)`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  z-index: 10;
`;

const SAvatarBannerContainer = styled.div`
  margin-top: -12rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
  }
`;

const SArtistStatsBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;

  > * {
    align-self: center;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0;

    > * {
      align-self: flex-end;
    }
  }
`;

const SArtistStatsContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.6rem;
  margin-top: 1.2rem;
`;

const SArtistStatsSeparator = styled.div`
  font-family: ${({ theme }) => theme.fonts.bold};
  margin: 0 1.2rem;
  font-size: 2.4rem;
`;

const SArtistStatsValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-right: 0.4rem;
`;

export default Profile;
