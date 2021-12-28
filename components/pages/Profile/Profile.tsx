import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
// import Link from 'next/link';
import { Banner as AvatarBanner } from 'components/base/Avatar';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import {
  follow,
  unfollow,
  isUserFollowing,
  getFollowersCount,
} from 'actions/follower';
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

import FollowersProfileBlock from './components/FollowersProfileBlock';
import NftsProfileBlock from './components/NftsProfileBlock';

export interface ProfileProps {
  setModalExpand: (b: boolean) => void;
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
  //followed
  followed: UserType[];
  setFollowed: (users: UserType[]) => void;
  followedUsersHasNextPage: boolean;
  loadMoreFollowed: (forceLoad?: boolean) => void;
  canEditProfile: boolean;
  tabs: readonly TabsIdType[];
  profileDataLoaded: boolean;
}

const Profile = ({
  setModalExpand,
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
  followed,
  followedUsersHasNextPage,
  loadMoreFollowed,
  setFollowed,
  canEditProfile,
  tabs,
  profileDataLoaded,
}: ProfileProps) => {
  const [followBacks, setFollowBacks] = useState(
    Array(followers.length).fill(false)
  );
  const [followersNbFollowers, setFollowersNbFollowers] = useState({} as any);
  const [countOwned, setCountOwned] = useState(0);
  const [countOwnedListed, setCountOwnedListed] = useState(0);
  const [countOwnedUnlisted, setCountOwnedUnlisted] = useState(0);
  const [countCreated, setCountOwnedCreated] = useState(0);
  const [countFollowers, setCountFollowers] = useState(0);
  const [countFollowed, setCountFollowed] = useState(0);

  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });

  const setCounts = async () => {
    try{
      if (user){
        let userStat = await getUserNFTsStat(user.walletId, true)
        if (userStat){
          setCountOwned(userStat.countOwned)
          setCountOwnedListed(userStat.countOwnedListed)
          setCountOwnedUnlisted(userStat.countOwnedUnlisted)
          setCountOwnedCreated(userStat.countCreated)
          setCountFollowers(userStat.countFollowers)
          setCountFollowed(userStat.countFollowed)
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  const getFollowBacks = async () => {
    try {
      const followBacksTemp = [...followBacks];
      const promises = [] as Promise<{ isFollowing: boolean }>[];
      followers.forEach((x) => {
        promises.push(isUserFollowing(x.walletId, user.walletId));
      });
      const results = await Promise.all(promises);
      results.forEach((res, i) => {
        followBacksTemp[i] = res.isFollowing;
      });
      setFollowBacks(followBacksTemp);
    } catch (err) {
      console.log(err);
    }
  };

  const initFollowerStat = async () => {
    try {
      const followersCountTemp = { ...followersNbFollowers };
      followers.forEach(async (x) => {
        const followersCount = await getFollowersCount(x.walletId);
        followersCountTemp[x.walletId] = followersCount ? followersCount : 0;
      });
      followed.forEach(async (x) => {
        const followersCount = await getFollowersCount(x.walletId);
        followersCountTemp[x.walletId] = followersCount ? followersCount : 0;
      });
      setFollowersNbFollowers(followersCountTemp);
    } catch (err) {
      console.log(err);
    }
  };

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleFollow = async (
    profileWalletId: string,
    isUnfollow: boolean = false
  ) => {
    try {
      let res = !isUnfollow
        ? await follow(profileWalletId, user.walletId)
        : await unfollow(profileWalletId, user.walletId);
      if (res) {
        if (isUnfollow) {
          setFollowed(followed.filter((x) => x.walletId !== res.walletId));
          setCountFollowed(countFollowed - 1);
        } else {
          setFollowed(
            followed.findIndex((x) => x.walletId === res.walletId) !== -1
              ? followed.map((x) => (x.walletId === res.walletId ? res : x))
              : [...followed, res]
          );
          setCountFollowed(countFollowed + 1);
        }
        await getFollowBacks();
        if (res.walletId) {
          const newNbFollowers = await getFollowersCount(res.walletId);
          const newFollowersNbFollowers = { ...followersNbFollowers };
          newFollowersNbFollowers[res.walletId] = !isNaN(newNbFollowers)
            ? newNbFollowers
            : 0;
          setFollowersNbFollowers(newFollowersNbFollowers);
        }
      }
    } catch (err) {
      console.error(err);
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

  const returnQuantity = (tabId: TabsIdType) => {
    switch (tabId) {
      case NFT_CREATED_TAB:
        return countCreated;
      case NFT_LIKED_TAB:
        return user.likedNFTs?.length || 0;
      case NFT_ON_SALE_TAB:
        return countOwnedListed;
      case NFT_NOT_FOR_SALE_TAB:
        return countOwnedUnlisted;
      case FOLLOWERS_TAB:
        return countFollowers;
      case FOLLOWED_TAB:
        return countFollowed;
      case NFT_OWNED_TAB:
      default:
        return countOwned;
    }
  };

  const returnFollowers = (tabId: TabsIdType) => {
    switch (tabId) {
      case FOLLOWERS_TAB:
        return (
          <FollowersProfileBlock
            users={followers}
            followBacks={followBacks}
            followersNbFollowers={followersNbFollowers}
            handleFollow={handleFollow}
            isFiltered={isFiltered}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={followersUsersHasNextPage}
            loadMore={loadMoreFollowers}
            noContentBody="Discover new artists and start following them!"
            noContentTitle="Nothing to display"
            setIsFiltered={setIsFiltered}
            tabId={tabId}
            updateKeywordSearch={updateKeywordSearch}
          />
        );
      case FOLLOWED_TAB:
        return (
          <FollowersProfileBlock
            users={followed}
            followBacks={followBacks}
            followersNbFollowers={followersNbFollowers}
            handleFollow={handleFollow}
            isFiltered={isFiltered}
            isLoading={!profileDataLoaded || loading}
            isLoadMore={followedUsersHasNextPage}
            loadMore={loadMoreFollowed}
            noContentTitle="Nothing to display"
            setIsFiltered={setIsFiltered}
            tabId={tabId}
            updateKeywordSearch={updateKeywordSearch}
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
    if (profileDataLoaded){
      initFollowerStat();
    }
  }, [profileDataLoaded]);

  useEffect(() => {
    setCounts();
  }, []);

  useEffect(() => {
    getFollowBacks();
  }, [followers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMoreFollowers(true);
      loadMoreFollowed(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchValue, isFiltered]);

  return (
    <Container>
      <SBannerContainer>
        <SBannerIMG
          src={user.banner ?? '/defaultBanner.jpeg'}
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
            bio={user.bio}
            isVerified={user.verified}
            name={user.name}
            picture={user.picture}
            twitterName={user.twitterName}
            walletId={user.walletId}
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
        </SAvatarBannerContainer>
      </Wrapper>
      <Wrapper>
        <Tabs
          isTabsSelect={isTablet}
          tabs={tabs.reduce(
            (acc, id) => ({
              ...acc,
              [id]: {
                badge: returnQuantity(id),
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

export default Profile;
