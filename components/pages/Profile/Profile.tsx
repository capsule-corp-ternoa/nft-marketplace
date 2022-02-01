import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Banner as AvatarBanner } from 'components/base/Avatar';
import NftsGrid from 'components/base/NftsGrid';
import { getCreatorNFTS, getLikedNFTs, getOwnedNFTS, getUserNFTsStat } from 'actions/nft';
import { getFollowers, getFollowed } from 'actions/follower';
import { Container, Wrapper } from 'components/layout/Container';
import Button from 'components/ui/Button';
import Tabs from 'components/ui/Tabs';
import { NftType, UserType } from 'interfaces';
import { useApp } from 'redux/hooks';
import { loadMoreNfts } from 'utils/profile';
import { LIKE_ACTION, LIKE_ACTION_TYPE, UNLIKE_ACTION } from 'utils/profile/constants';
import { loadMoreProfiles } from 'utils/profile/follow';

import FollowersProfileBlock from './components/FollowersProfileBlock';
import { NFT_OWNED_TAB, NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB, NFT_CREATED_TAB, NFT_LIKED_TAB, FOLLOWERS_TAB, FOLLOWED_TAB } from './constants';
import { TabsIdType } from './interfaces';

const tabs = [NFT_OWNED_TAB, NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB, NFT_CREATED_TAB, NFT_LIKED_TAB, FOLLOWERS_TAB, FOLLOWED_TAB] as const;

export interface ProfileProps {
  user: UserType;
  userOwnedlNfts: NftType[];
  userOwnedNftsHasNextPage: boolean;
}

const Profile = ({ user, userOwnedlNfts, userOwnedNftsHasNextPage }: ProfileProps) => {
  const { user: reduxUser } = useApp();
  const { banner, bio, likedNFTs, name, picture, twitterName, verified, walletId } = reduxUser ?? user;

  const [isLoading, setIsLoading] = useState(false);
  const [profileDataLoaded, setProfileDataLoaded] = useState(false);
  const [resetTabId, toggleResetTabId] = useState(false);

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
  const [counts, setCounts] = useState<{ [key in TabsIdType]: number }>(tabs.reduce((acc, id) => ({ ...acc, [id]: 0 }), {} as { [key in TabsIdType]: number }));

  // Followers search
  const [isFilterVerified, setIsFilterVerified] = useState<boolean | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

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
    try {
      if (walletId) {
        const stats = await getUserNFTsStat(walletId, true);
        if (stats) {
          const { countOwned, countOwnedListed, countOwnedUnlisted, countCreated, countFollowers, countFollowed } = stats;

          setCounts((prevCounts) => ({
            ...prevCounts,
            [NFT_OWNED_TAB]: countOwned,
            [NFT_ON_SALE_TAB]: countOwnedListed,
            [NFT_NOT_FOR_SALE_TAB]: countOwnedUnlisted,
            [NFT_CREATED_TAB]: countCreated,
            [NFT_LIKED_TAB]: likedNFTs?.length || 0,
            [FOLLOWERS_TAB]: countFollowers,
            [FOLLOWED_TAB]: countFollowed,
          }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleLikeCount = (action: LIKE_ACTION_TYPE): void => {
    setCounts((prevCounts) => {
      const prevLikedCount = prevCounts[NFT_LIKED_TAB];
      switch (action) {
        case LIKE_ACTION:
          return {
            ...prevCounts,
            [NFT_LIKED_TAB]: prevLikedCount + 1,
          };
        case UNLIKE_ACTION:
          return {
            ...prevCounts,
            [NFT_LIKED_TAB]: prevLikedCount - 1,
          };
      }
    });
  };

  const returnNFTs = (tabId: TabsIdType) => {
    switch (tabId) {
      case NFT_CREATED_TAB: {
        const loadMoreCreatedNfts = async () => {
          setIsLoading(true);
          await loadMoreNfts(walletId, createdCurrentPage, setCreatedCurrentPage, setCreatedNftsHasNextPage, setCreatedNfts, tabId);
          setIsLoading(false);
        };

        return (
          <NftsGrid
            NFTs={createdNfts}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={!!createdNftsHasNextPage}
            loadMore={loadMoreCreatedNfts}
            noNftHref="/create"
            noNftLinkLabel="Create your NFT"
            noNftTitle="Nothing to display"
            handleNftLike={handleLikeCount}
            tabId={tabId}
          />
        );
      }
      case NFT_LIKED_TAB: {
        const loadMoreLikedNfts = async () => {
          setIsLoading(true);
          await loadMoreNfts(walletId, likedCurrentPage, setLikedCurrentPage, setLikedNftsHasNextPage, setLikedNfts, tabId);
          setIsLoading(false);
        };

        const handleNftLiked = async (action: LIKE_ACTION_TYPE, nft?: NftType): Promise<void> => {
          if (nft !== undefined) {
            const isMoreLikedNfts = likedNfts.length < counts[NFT_LIKED_TAB];
            const { data, hasNextPage } = isMoreLikedNfts ? await getLikedNFTs(walletId, (likedNfts.length).toString(), '1') : { data: [], hasNextPage: false };
            setLikedNfts((prevState) => prevState.filter(({ id }) => id !== nft.id).concat(data));
            setLikedNftsHasNextPage(Boolean(hasNextPage));
          }
          handleLikeCount(action);
        };

        return (
          <NftsGrid
            NFTs={likedNfts}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={likedNftsHasNextPage}
            loadMore={loadMoreLikedNfts}
            noNftBody="The NFTs you liked are displayed here"
            noNftTitle="Nothing to display"
            handleNftLike={handleNftLiked}
            tabId={tabId}
          />
        );
      }
      case NFT_ON_SALE_TAB: {
        const loadMoreOwnedListedNfts = async () => {
          setIsLoading(true);
          await loadMoreNfts(walletId, ownedNftsListedCurrentPage, setOwnedNftsListedCurrentPage, setOwnedNftsListedHasNextPage, setOwnedNftsListed, tabId);
          setIsLoading(false);
        };

        return (
          <>
            {/* TODO: add this when NFT sale if available and remove react-responsive */}
            {/* {isTablet && <NftSaleLink />} */}
            <NftsGrid
              NFTs={ownedNftsListed}
              isLoading={!profileDataLoaded || isLoading}
              isLoadMore={ownedNftsListedHasNextPage}
              loadMore={loadMoreOwnedListedNfts}
              noNftHref="/"
              noNftLinkLabel="Sell your NFT"
              noNftTitle="Nothing to display"
              handleNftLike={handleLikeCount}
              tabId={tabId}
            >
              {/* TODO: add this when NFT sale if available and remove react-responsive */}
              {/* {!isTablet && <NftSaleLink />} */}
            </NftsGrid>
          </>
        );
      }
      case NFT_NOT_FOR_SALE_TAB: {
        const loadMoreOwnedUnlistedNfts = async () => {
          setIsLoading(true);
          await loadMoreNfts(
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
          <NftsGrid
            NFTs={ownedNftsUnlisted}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={ownedNftsUnlistedHasNextPage}
            loadMore={loadMoreOwnedUnlistedNfts}
            noNftBody="The NFTs you owned and are not for sale are displayed here"
            noNftTitle="Nothing to display"
            handleNftLike={handleLikeCount}
            tabId={tabId}
          />
        );
      }
      case NFT_OWNED_TAB:
      default: {
        const loadMoreOwnedNfts = async () => {
          setIsLoading(true);
          await loadMoreNfts(walletId, ownedNftsCurrentPage, setOwnedNftsCurrentPage, setOwnedNftsHasNextPage, setOwnedNfts, tabId);
          setIsLoading(false);
        };

        return (
          <NftsGrid
            NFTs={ownedNfts}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={!!ownedNftsHasNextPage}
            loadMore={loadMoreOwnedNfts}
            noNftBody="The NFTs you owned are displayed here"
            noNftHref="/explore"
            noNftLinkLabel="Explore NFTs"
            noNftTitle="Nothing to display"
            handleNftLike={handleLikeCount}
            tabId={tabId}
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

          await loadMoreProfiles(
            walletId,
            followersCurrentPage,
            setFollowersCurrentPage,
            setFollowersHasNextPage,
            setFollowers,
            tabId,
            false,
            searchValue,
            isFilterVerified
          );

          setIsLoading(false);
        };

        return (
          <FollowersProfileBlock
            users={followers}
            isFilterVerified={isFilterVerified ?? false}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={followersHasNextPage}
            loadMore={loadMoreFollowers}
            noContentBody="Discover new artists and start following them!"
            noContentTitle="Nothing to display"
            setCounts={setCounts}
            setFollowed={setFollowed}
            setIsFilterVerified={setIsFilterVerified}
            updateKeywordSearch={updateKeywordSearch}
          />
        );
      }
      case FOLLOWED_TAB: {
        const loadMoreFollowed = async () => {
          setIsLoading(true);

          await loadMoreProfiles(
            walletId,
            followedCurrentPage,
            setFollowedCurrentPage,
            setFollowedHasNextPage,
            setFollowed,
            tabId,
            false,
            searchValue,
            isFilterVerified
          );

          setIsLoading(false);
        };

        return (
          <FollowersProfileBlock
            users={followed}
            isFilterVerified={isFilterVerified ?? false}
            isLoading={!profileDataLoaded || isLoading}
            isLoadMore={followedHasNextPage}
            loadMore={loadMoreFollowed}
            noContentTitle="Nothing to display"
            setCounts={setCounts}
            setFollowed={setFollowed}
            setIsFilterVerified={setIsFilterVerified}
            updateKeywordSearch={updateKeywordSearch}
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
    const resetPaginationLikedNFTs = async () => {
      setIsLoading(true);
      try {
        const liked = await getLikedNFTs(walletId, undefined, undefined);
        setLikedCurrentPage(1);
        setLikedNfts(liked.data);
        setLikedNftsHasNextPage(liked.hasNextPage);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    resetPaginationLikedNFTs();
  }, [likedNFTs]);

  useEffect(() => {
    setProfileDataLoaded(false);
    toggleResetTabId((prevState) => !prevState);
    try {
      initCounts();
      populateProfileData(walletId);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (searchValue !== undefined || isFilterVerified !== undefined) {
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
          isFilterVerified
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
          isFilterVerified
        );
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchValue, isFilterVerified]);

  return (
    <Container>
      <SBannerContainer>
        <SBannerIMG src={banner ?? '/defaultBanner.jpeg'} draggable="false" alt="banner" />
        <SEditButtonMobileWrapper>
          <Button color="invertedContrast" icon="edit" href="/edit" size="medium" variant="contained" />
        </SEditButtonMobileWrapper>
      </SBannerContainer>
      <Wrapper>
        <SAvatarBannerContainer>
          <AvatarBanner bio={bio} isVerified={verified} name={name} picture={picture} twitterName={twitterName} walletId={walletId} />
          <SEditButtonDesktopWrapper>
            <Button color="neutral600" icon="edit" href="/edit" text="Edit profile" size="small" variant="outlined" />
          </SEditButtonDesktopWrapper>
        </SAvatarBannerContainer>
      </Wrapper>
      <Wrapper>
        <Tabs
          isTabsSelect
          resetTabId={resetTabId}
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

const SEditButtonMobileWrapper = styled.div`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const SEditButtonDesktopWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
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

export default Profile;
