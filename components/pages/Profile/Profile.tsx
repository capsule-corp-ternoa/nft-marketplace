import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
// import Link from 'next/link';
import { Banner as AvatarBanner } from 'components/base/Avatar';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import { getCreatorNFTS, getLikedNFTs, getOwnedNFTS, getUserNFTsStat } from 'actions/nft';
import { follow, getFollowers, getFollowed, unfollow } from 'actions/follower';
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
import { loadMoreNfts } from 'utils/profile';
import { FOLLOW_ACTION, FOLLOW_ACTION_TYPE, UNFOLLOW_ACTION } from 'utils/profile/constants';
import { getFollowingStatus, getProfilesFollowersCount, loadMoreProfiles } from 'utils/profile/follow';

import FollowersProfileBlock from './components/FollowersProfileBlock';
import NftsProfileBlock from './components/NftsProfileBlock';

export const ARTIST_PROFILE_VARIANT = 'artist_profile';
export const USER_PERSONNAL_PROFILE_VARIANT = 'user_personnal_profile';

export interface ProfileProps {
  setModalExpand: (b: boolean) => void;
  artist?: UserType;
  user: UserType;
  userOwnedlNfts?: NftType[];
  userOwnedNftsHasNextPage?: boolean;
  tabs: readonly TabsIdType[];
  variant: typeof ARTIST_PROFILE_VARIANT | typeof USER_PERSONNAL_PROFILE_VARIANT;
}

const Profile = ({
  setModalExpand,
  artist,
  user,
  userOwnedlNfts,
  userOwnedNftsHasNextPage,
  tabs,
  variant,
}: ProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileDataLoaded, setProfileDataLoaded] = useState(false);

  //Owned NFTs
  const [ownedNfts, setOwnedNfts] = useState<NftType[]>(userOwnedlNfts ?? []);
  const [ownedNftsHasNextPage, setOwnedNftsHasNextPage] = useState(userOwnedNftsHasNextPage ?? false);
  const [ownedNftsCurrentPage, setOwnedNftsCurrentPage] = useState(1);
  //Created NFTs
  const [createdNfts, setCreatedNfts] = useState<NftType[]>([]);
  const [createdNftsHasNextPage, setCreatedNftsHasNextPage] = useState(false);
  const [createdCurrentPage, setCreatedCurrentPage] = useState(1);
  //Owned listed NFTs
  const [ownedNftsListed, setOwnedNftsListed] = useState<NftType[]>([]);
  const [ownedNftsListedHasNextPage, setOwnedNftsListedHasNextPage] = useState(false);
  const [ownedNftsListedCurrentPage, setOwnedNftsListedCurrentPage] = useState(1);
  //Owned not listed NFTs
  const [ownedNftsUnlisted, setOwnedNftsUnlisted] = useState<NftType[]>([]);
  const [ownedNftsUnlistedHasNextPage, setOwnedNftsUnlistedHasNextPage] = useState(false);
  const [ownedNftsUnlistedCurrentPage, setOwnedNftsUnlistedCurrentPage] = useState(1);
  //Liked NFTs
  const [likedNfts, setLikedNfts] = useState<NftType[]>([]);
  const [likedNftsHasNextPage, setLikedNftsHasNextPage] = useState(false);
  const [likedCurrentPage, setLikedCurrentPage] = useState(1);
  //profile followers
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [followersHasNextPage, setFollowersHasNextPage] = useState(false);
  const [followersCurrentPage, setFollowersCurrentPage] = useState(1);
  //profile followed
  const [followed, setFollowed] = useState<UserType[]>([]);
  const [followedHasNextPage, setFollowedHasNextPage] = useState(false);
  const [followedCurrentPage, setFollowedCurrentPage] = useState(1);

  // Stats
  const [followLoading, setFollowLoading] = useState(false);
  const [userFollowingStatus, setUserFollowingStatus] = useState<{ [key: string]: boolean }>({});
  const [profilesFollowersCount, setProfilesFollowersCount] = useState<{ [key: string]: number }>({});
  const [counts, setCounts] = useState<{ [key in TabsIdType]: number }>(
    tabs.reduce((acc, id) => ({ ...acc, [id]: 0 }), {} as { [key in TabsIdType]: number })
  );

  // Followers search
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { banner, bio, name, picture, twitterName, verified, walletId } = artist ?? user;
  const isTablet = useMediaQuery({ query: `(max-width: ${breakpointMap.lg - 1}px)` });
  const isMyProfile =
    variant === USER_PERSONNAL_PROFILE_VARIANT ||
    (variant === ARTIST_PROFILE_VARIANT && artist?.walletId === user?.walletId);

  const populateProfileData = async (token: string) => {
    // Created nfts
    const createdNfts = await getCreatorNFTS(token, undefined, undefined);
    setCreatedNfts(createdNfts.data);
    setCreatedNftsHasNextPage(createdNfts.hasNextPage);
    // Liked NFTs
    const liked = await getLikedNFTs(token, undefined, undefined);
    setLikedNfts(liked.data);
    setLikedNftsHasNextPage(liked.hasNextPage);
    // Owned listed NFTs
    const ownedListed = await getOwnedNFTS(token, true, true, undefined, undefined);
    setOwnedNftsListed(ownedListed.data);
    setOwnedNftsListedHasNextPage(ownedListed.hasNextPage);
    // Owned not listed NFTs
    const ownedUnlisted = await getOwnedNFTS(token, false, false, undefined, undefined);
    setOwnedNftsUnlisted(ownedUnlisted.data);
    setOwnedNftsUnlistedHasNextPage(ownedUnlisted.hasNextPage);
    // Followers
    const followers = await getFollowers(token);
    setFollowers(followers.data);
    setFollowersHasNextPage(followers.hasNextPage);
    // Followed
    const followed = await getFollowed(token);
    setFollowed(followed.data);
    setFollowedHasNextPage(followed.hasNextPage);

    setProfileDataLoaded(true);
  };

  const initCounts = async () => {
    const { walletId } = artist ?? user;
    try {
      if (walletId) {
        const stats = await getUserNFTsStat(walletId, true);
        if (stats) {
          const { countOwned, countOwnedListed, countOwnedUnlisted, countCreated, countFollowers, countFollowed } =
            stats;

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
    const profileWalletIds = [...followers, ...followed].map(({ walletId }) => walletId);

    if (artist !== undefined) {
      profileWalletIds.push(artist.walletId);
    }

    setFollowLoading(true);
    if (user) {
      const status = (await getFollowingStatus(profileWalletIds, user.walletId)) ?? {};
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
    action: FOLLOW_ACTION_TYPE,
    iArtistProfileFollowButton: boolean = false
  ) => {
    if (user) {
      setFollowLoading(true);
      try {
        switch (action) {
          case FOLLOW_ACTION: {
            const res = await follow(profileWalletId, user.walletId);
            if (isMyProfile) {
              setFollowed((prevState) => [...prevState, res]);
              setCounts((prevCounts) => ({
                ...prevCounts,
                [FOLLOWED_TAB]: prevCounts[FOLLOWED_TAB] + 1,
              }));
            } else if (iArtistProfileFollowButton) {
              setFollowers((prevState) => [...prevState, user]);
              setCounts((prevCounts) => ({
                ...prevCounts,
                [FOLLOWERS_TAB]: prevCounts[FOLLOWERS_TAB] + 1,
              }));
            }

            setProfilesFollowersCount((prevState) => ({
              ...prevState,
              [profileWalletId]: prevState[profileWalletId] + 1,
            }));

            setFollowLoading(false);
            break;
          }
          case UNFOLLOW_ACTION: {
            await unfollow(profileWalletId, user.walletId);
            if (isMyProfile) {
              setFollowed((prevState) => prevState.filter(({ walletId }) => walletId !== profileWalletId));
              setCounts((prevCounts) => ({
                ...prevCounts,
                [FOLLOWED_TAB]: prevCounts[FOLLOWED_TAB] - 1,
              }));
            } else if (iArtistProfileFollowButton) {
              setFollowers((prevState) => prevState.filter(({ walletId }) => walletId !== user.walletId));
              setCounts((prevCounts) => ({
                ...prevCounts,
                [FOLLOWERS_TAB]: prevCounts[FOLLOWERS_TAB] - 1,
              }));
            }

            setProfilesFollowersCount((prevState) => ({
              ...prevState,
              [profileWalletId]: prevState[profileWalletId] - 1,
            }));

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
      case NFT_CREATED_TAB: {
        const loadMoreCreatedNfts = () => {
          setIsLoading(true);
          loadMoreNfts(
            walletId,
            createdCurrentPage,
            setCreatedCurrentPage,
            setCreatedNftsHasNextPage,
            setCreatedNfts,
            tabId
          );
          setIsLoading(false);
        };

        return (
          <NftsProfileBlock
            NFTs={createdNfts}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={!!createdNftsHasNextPage}
            loadMore={loadMoreCreatedNfts}
            noNftHref="/create"
            noNftLinkLabel="Create your NFT"
            noNftTitle="Nothing to display"
            setLikedNfts={setLikedNfts}
            tabId={tabId}
            user={user}
          />
        );
      }
      case NFT_LIKED_TAB: {
        const loadMoreLikedNfts = () => {
          setIsLoading(true);
          loadMoreNfts(walletId, likedCurrentPage, setLikedCurrentPage, setLikedNftsHasNextPage, setLikedNfts, tabId);
          setIsLoading(false);
        };
        return (
          <NftsProfileBlock
            NFTs={likedNfts}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={!!likedNftsHasNextPage}
            loadMore={loadMoreLikedNfts}
            noNftBody="The NFTs you liked are displayed here"
            noNftTitle="Nothing to display"
            setLikedNfts={setLikedNfts}
            tabId={tabId}
            user={user}
          />
        );
      }
      case NFT_ON_SALE_TAB: {
        const loadMoreOwnedListedNfts = () => {
          setIsLoading(true);
          loadMoreNfts(
            walletId,
            ownedNftsListedCurrentPage,
            setOwnedNftsListedCurrentPage,
            setOwnedNftsListedHasNextPage,
            setOwnedNftsListed,
            tabId
          );
          setIsLoading(false);
        };

        return (
          <NftsProfileBlock
            NFTs={ownedNftsListed}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={ownedNftsListedHasNextPage}
            loadMore={loadMoreOwnedListedNfts}
            noNftHref="/"
            noNftLinkLabel="Sell your NFT"
            noNftTitle="Nothing to display"
            setLikedNfts={setLikedNfts}
            tabId={tabId}
            user={user}
          />
        );
      }
      case NFT_NOT_FOR_SALE_TAB: {
        const loadMoreOwnedUnlistedNfts = () => {
          setIsLoading(true);
          loadMoreNfts(
            walletId,
            ownedNftsUnlistedCurrentPage,
            setOwnedNftsUnlistedCurrentPage,
            setOwnedNftsUnlistedHasNextPage,
            setOwnedNftsUnlisted,
            tabId
          );
          setIsLoading(false);
        };

        return (
          <NftsProfileBlock
            NFTs={ownedNftsUnlisted}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={ownedNftsUnlistedHasNextPage}
            loadMore={loadMoreOwnedUnlistedNfts}
            noNftBody="The NFTs you owned and are not for sale are displayed here"
            noNftTitle="Nothing to display"
            setLikedNfts={setLikedNfts}
            tabId={tabId}
            user={user}
          />
        );
      }
      case NFT_OWNED_TAB:
      default: {
        const loadMoreOwnedNfts = () => {
          setIsLoading(true);
          loadMoreNfts(
            walletId,
            ownedNftsCurrentPage,
            setOwnedNftsCurrentPage,
            setOwnedNftsHasNextPage,
            setOwnedNfts,
            tabId
          );
          setIsLoading(false);
        };

        return (
          <NftsProfileBlock
            NFTs={ownedNfts}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={!!ownedNftsHasNextPage}
            loadMore={loadMoreOwnedNfts}
            noNftBody="The NFTs you owned are displayed here"
            noNftHref="/explore"
            noNftLinkLabel="Explore NFTs"
            noNftTitle="Nothing to display"
            setLikedNfts={setLikedNfts}
            tabId={tabId}
            user={user}
          />
        );
      }
    }
  };

  const returnFollowers = (tabId: TabsIdType) => {
    switch (tabId) {
      case FOLLOWERS_TAB: {
        const loadMoreFollowers = async () => {
          setIsLoading(true);
          setFollowLoading(true);

          const newProfiles = await loadMoreProfiles(
            walletId,
            followersCurrentPage,
            setFollowersCurrentPage,
            setFollowersHasNextPage,
            setFollowers,
            tabId,
            false,
            searchValue,
            isFiltered
          );

          if (user) {
            const newProfileWalletIds = newProfiles.map(({ walletId }) => walletId);
            const status = (await getFollowingStatus(newProfileWalletIds, user.walletId)) ?? {};
            setUserFollowingStatus((prevStatus) => ({ ...prevStatus, ...status }));

            const counts = (await getProfilesFollowersCount(newProfileWalletIds)) ?? {};
            setProfilesFollowersCount((prevCounts) => ({ ...prevCounts, ...counts }));
          }
          setIsLoading(false);
          setFollowLoading(false);
        };

        return (
          <FollowersProfileBlock
            users={followers}
            followingStatus={userFollowingStatus}
            followersNbFollowers={profilesFollowersCount}
            handleFollow={handleUserFollow}
            isFiltered={isFiltered}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={followersHasNextPage}
            loadMore={loadMoreFollowers}
            noContentBody="Discover new artists and start following them!"
            noContentTitle="Nothing to display"
            setIsFiltered={setIsFiltered}
            updateKeywordSearch={updateKeywordSearch}
            user={user}
          />
        );
      }
      case FOLLOWED_TAB: {
        const loadMoreFollowed = async () => {
          setIsLoading(true);
          setFollowLoading(true);

          const newProfiles = await loadMoreProfiles(
            walletId,
            followedCurrentPage,
            setFollowedCurrentPage,
            setFollowedHasNextPage,
            setFollowed,
            tabId,
            false,
            searchValue,
            isFiltered
          );
          
          if (user) {
            const newProfileWalletIds = newProfiles.map(({ walletId }) => walletId);
            const status = (await getFollowingStatus(newProfileWalletIds, user.walletId)) ?? {};
            setUserFollowingStatus((prevStatus) => ({ ...prevStatus, ...status }));

            const counts = (await getProfilesFollowersCount(newProfileWalletIds)) ?? {};
            setProfilesFollowersCount((prevCounts) => ({ ...prevCounts, ...counts }));
          }
          setIsLoading(false);
          setFollowLoading(false);
        };

        return (
          <FollowersProfileBlock
            users={followed}
            followingStatus={userFollowingStatus}
            followersNbFollowers={profilesFollowersCount}
            handleFollow={handleUserFollow}
            isFiltered={isFiltered}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={followedHasNextPage}
            loadMore={loadMoreFollowed}
            noContentTitle="Nothing to display"
            setIsFiltered={setIsFiltered}
            updateKeywordSearch={updateKeywordSearch}
            user={user}
          />
        );
      }
    }
  };

  const returnContent = (tabId: TabsIdType) => {
    if (tabId === FOLLOWERS_TAB || tabId === FOLLOWED_TAB) {
      return returnFollowers(tabId);
    }

    return returnNFTs(tabId);
  };

  useEffect(() => {
    try {
      initCounts();
      populateProfileData(walletId);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (profileDataLoaded) {
      initFollowersData();
    }
  }, [profileDataLoaded]);

  useEffect(() => {
    if (profileDataLoaded) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [NFT_LIKED_TAB]: likedNfts?.length || 0,
      }));
    }
  }, [likedNfts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMoreProfiles(
        walletId,
        followersCurrentPage,
        setFollowersCurrentPage,
        setFollowersHasNextPage,
        setFollowers,
        FOLLOWERS_TAB,
        true,
        searchValue,
        isFiltered
      );
      loadMoreProfiles(
        walletId,
        followedCurrentPage,
        setFollowedCurrentPage,
        setFollowedHasNextPage,
        setFollowed,
        FOLLOWED_TAB,
        true,
        searchValue,
        isFiltered
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue, isFiltered]);

  return (
    <Container>
      <SBannerContainer>
        <SBannerIMG src={banner ?? '/defaultBanner.jpeg'} draggable="false" alt="banner" />
        {isTablet && variant === USER_PERSONNAL_PROFILE_VARIANT && (
          <SEditButtonMobile color="invertedContrast" icon="edit" href="/edit" size="medium" variant="contained" />
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
          {!isTablet && variant === USER_PERSONNAL_PROFILE_VARIANT && (
            <Button color="whiteBlur" icon="edit" href="/edit" text="Edit profile" size="small" variant="outlined" />
          )}
          {artist && (
            <SArtistStatsBannerContainer>
              {user?.walletId && artist.walletId && user.walletId !== artist.walletId && (
                <Button
                  color={userFollowingStatus[walletId] ? 'contrast' : 'invertedContrast'}
                  disabled={followLoading}
                  onClick={() =>
                    handleUserFollow(
                      artist.walletId,
                      userFollowingStatus[walletId] ? UNFOLLOW_ACTION : FOLLOW_ACTION,
                      true
                    )
                  }
                  size="medium"
                  text={userFollowingStatus[walletId] ? 'Unfollow' : 'Follow'}
                  variant={userFollowingStatus[walletId] ? 'contained' : 'outlined'}
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
