import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Banner } from 'components/base/Avatar';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NftCard, { NftChips } from 'components/base/NftCard';
import NoNFTComponent from 'components/base/NoNFTComponent';
import Creator from 'components/base/Creator';
import TwitterErrorModal from './TwitterErrorModal';
import FloatingMenu from './FloatingMenu';
import Switch from 'react-switch';
import { NftType, UserType } from 'interfaces';
import { follow, unfollow, isUserFollowing, getFollowersCount } from 'actions/follower';
import { getUserNFTsStat } from 'actions/nft';
import { Wrapper } from 'components/layout/Container';
import Button from 'components/ui/Button';
import Tabs from 'components/ui/Tabs';
import { breakpointMap } from 'style/theme/base';

import style from './Profile.module.scss';

const NFT_OWNED_TAB = 'My NFTs'
const NFT_ON_SALE_TAB = 'On sale';
const NFT_NOT_FOR_SALE_TAB = 'Not for sale';
const NFT_CREATED_TAB = 'Created';
const NFT_LIKED_TAB = 'Liked';
const FOLLOWERS_TAB = 'Followers';
const FOLLOWED_TAB = 'Following';

const ALL_TABS_ID = [
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
] as const;

const ORDERED_TABS_ID = [
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
] as const;

type TabsIdType = typeof ALL_TABS_ID[number];

export interface ProfileProps {
  setModalExpand: (b: boolean) => void;
  setSuccessPopup: (b: boolean) => void;
  user: UserType;
  setUser: (u: UserType) => void;
  loading: boolean;
  isFiltered: boolean;
  setIsFiltered:(b: boolean) => void;
  searchValue: string;
  setSearchValue:(s: string)=>void;
  //Owned
  ownedNfts: NftType[];
  ownedNftsTotal: number;
  loadMoreOwnedNfts: () => void;
  ownedNftsHasNextPage: boolean;
  //Owned listed
  ownedNftsListed: NftType[];
  ownedNftsListedTotal: number;
  ownedNftsListedHasNextPage: boolean;
  loadMoreOwnedListedNfts: () => void;
  //Owned not listed
  ownedNftsUnlisted: NftType[];
  ownedNftsUnlistedTotal: number;
  ownedNftsUnlistedHasNextPage: boolean;
  loadMoreOwnedUnlistedNfts: () => void;
  //created
  createdNfts: NftType[];
  createdNftsTotal: number;
  loadMoreCreatedNfts: () => void;
  createdNftsHasNextPage: boolean;
  //liked
  likedNfts: NftType[];
  likedNftsTotal: number;
  setLikedNfts: (nfts: NftType[]) => void;
  likedNftsHasNextPage: boolean;
  loadMoreLikedNfts: () => void;
  //followers
  followers: UserType[];
  followersTotal: number;
  followersUsersHasNextPage: boolean;
  loadMoreFollowers: (forceLoad?: boolean)=>void;
  //followed
  followed: UserType[];
  followedTotal: number;
  setFollowed: (users: UserType[]) => void;
  followedUsersHasNextPage: boolean;
  loadMoreFollowed: (forceLoad?: boolean)=>void;
}

const Profile = ({
  setModalExpand,
  user,
  loading,
  isFiltered,
  setIsFiltered,
  searchValue,
  setSearchValue,
  ownedNfts,
  ownedNftsTotal,
  loadMoreOwnedNfts,
  ownedNftsHasNextPage,
  ownedNftsListed,
  ownedNftsListedTotal,
  ownedNftsListedHasNextPage,
  loadMoreOwnedListedNfts,
  ownedNftsUnlisted,
  ownedNftsUnlistedTotal,
  ownedNftsUnlistedHasNextPage,
  loadMoreOwnedUnlistedNfts,
  createdNfts,
  createdNftsTotal,
  createdNftsHasNextPage,
  loadMoreCreatedNfts,
  likedNfts,
  likedNftsTotal,
  likedNftsHasNextPage,
  loadMoreLikedNfts,
  followers,
  followersTotal,
  followersUsersHasNextPage,
  loadMoreFollowers,
  followed,
  followedTotal,
  followedUsersHasNextPage,
  loadMoreFollowed,
  setFollowed,
}: ProfileProps) => {
  const router = useRouter();
  const [scope, setScope] = useState(
    router.query?.scope === 'edit' ? 'edit' : 'My NFTs'
  );
  const [expand, setExpand] = useState(false);
  const [twitterErrorModal, setTwitterErrorModal] = useState(false);
  const [banner, _setBanner] = useState(
    user.banner ??
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
  );
  const [followBacks, setFollowBacks] = useState(Array(followers.length).fill(false))
  const [countOwned, setCountOwned] = useState(0)
  const [countOwnedListed, setCountOwnedListed] = useState(0)
  const [countOwnedUnlisted, setCountOwnedUnlisted] = useState(0)
  const [countCreated, setCountOwnedCreated] = useState(0)
  const [countFollowers, setCountFollowers] = useState(0)
  const [countFollowed, setCountFollowed] = useState(0)
  const [followersNbFollowers, setFollowersNbFollowers] = useState({} as any)

  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });

  const setCounts = async () => {
    try{
      if (user){
        let userStat = await getUserNFTsStat(user.walletId, true)
        if (userStat){
          userStat.countOwned && setCountOwned(userStat.countOwned)
          userStat.countOwnedListed && setCountOwnedListed(userStat.countOwnedListed)
          userStat.countOwnedUnlisted && setCountOwnedUnlisted(userStat.countOwnedUnlisted)
          userStat.countCreated && setCountOwnedCreated(userStat.countCreated)
          userStat.countFollowers && setCountFollowers(userStat.countFollowers)
          userStat.countFollowed && setCountFollowed(userStat.countFollowed)
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  const getFollowBacks = async () => {
    try{
      const followBacksTemp = [...followBacks]
      const promises = [] as Promise<{ isFollowing: boolean }>[]
      followers.forEach((x)=>{
        promises.push(isUserFollowing(x.walletId, user.walletId))
      })
      const results = await Promise.all(promises)
      results.forEach((res,i)=>{
        followBacksTemp[i] = res.isFollowing
      })
      setFollowBacks(followBacksTemp)
    }catch(err){
      console.log(err)
    }
  }

  const initFollowerStat = async () => {
    try{
      const followersCountTemp = {...followersNbFollowers}
      followers.forEach(async (x)=>{
        const followersCount = await getFollowersCount(x.walletId)
        followersCountTemp[x.walletId] = followersCount ? followersCount : 0
      })
      followed.forEach(async (x)=>{
        const followersCount = await getFollowersCount(x.walletId)
        followersCountTemp[x.walletId] = followersCount ? followersCount : 0
      })
      setFollowersNbFollowers(followersCountTemp)
    }catch(err){
      console.log(err)
    }
  }

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
          setCountFollowed(countFollowed-1)
        } else {
          setFollowed(
            followed.findIndex((x) => x.walletId === res.walletId) !== -1
              ? followed.map((x) => (x.walletId === res.walletId ? res : x))
              : [...followed, res]
          );
          setCountFollowed(countFollowed+1)
        }
        await getFollowBacks()
        if (res.walletId){
          const newNbFollowers = await getFollowersCount(res.walletId)
          const newFollowersNbFollowers = {...followersNbFollowers }
          newFollowersNbFollowers[res.walletId] = !isNaN(newNbFollowers) ? newNbFollowers : 0
          setFollowersNbFollowers(newFollowersNbFollowers)
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (router.query?.twitterValidated === 'false') {
      setTwitterErrorModal(true);
      router.query = {};
    }
  }, [router.query]);

  useEffect(() => {
    setCounts()
    initFollowerStat()
  }, []);

  useEffect(() => {
    getFollowBacks()
  }, [followers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMoreFollowers(true)
      loadMoreFollowed(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [searchValue, isFiltered])

  const returnNFTs = (tabId: TabsIdType) => {
    let displayNFTs: NftType[] = [];
    let isLoadMore = false;
    let loadMore = () => {};

    let noNftTitle = "Nothing to display";
    let noNftBody;
    let noNftHref;
    let noNftLinkLabel;

    switch (tabId) {
      case NFT_CREATED_TAB:
        displayNFTs = createdNfts;
        isLoadMore = createdNftsHasNextPage;
        loadMore = loadMoreCreatedNfts;
        noNftHref = "/create";
        noNftLinkLabel = "Create your NFT";
        break;
      case NFT_LIKED_TAB:
        displayNFTs = likedNfts;
        isLoadMore = likedNftsHasNextPage;
        loadMore = loadMoreLikedNfts;
        noNftBody="The NFTs you liked are displayed here"
        break;
      case NFT_ON_SALE_TAB:
        displayNFTs = ownedNftsListed;
        isLoadMore = ownedNftsListedHasNextPage;
        loadMore = loadMoreOwnedListedNfts;
        noNftHref = "/";
        noNftLinkLabel = "Sell your NFT";
        break;
      case NFT_NOT_FOR_SALE_TAB:
        displayNFTs = ownedNftsUnlisted;
        isLoadMore = ownedNftsUnlistedHasNextPage;
        loadMore = loadMoreOwnedUnlistedNfts;
        noNftBody="The NFTs you owned and are not for sale are displayed here"
        break;
      case NFT_OWNED_TAB:
      default:
        displayNFTs = ownedNfts;
        isLoadMore = ownedNftsHasNextPage;
        loadMore = loadMoreOwnedNfts;
        noNftBody="The NFTs you owned are displayed here"
        noNftHref = "/explore";
        noNftLinkLabel = "Explore NFTs";
        break;
    }

    if (displayNFTs.length < 1) {
      return (
        <SNoNFTContainer>
          <NoNFTComponent
            body={noNftBody}
            href={noNftHref}
            linkLabel={noNftLinkLabel}
            title={noNftTitle}
          />
        </SNoNFTContainer>
      );
    }

    return (
      <>
        <div className={style.NFTsContainer}>
          {displayNFTs.map((item: NftType) => (
            <NftCard key={item.id} mode="profile" item={item}>
              <NftChips
                NFT={item}
                mode="profile"
                noAvailableChip={tabId !== NFT_ON_SALE_TAB}
                noPriceChip={tabId !== NFT_ON_SALE_TAB}
                quantity={returnQuantityNFTsAvailable(item, tabId)}
              />
            </NftCard>
          ))}
        </div>
        {isLoadMore && (
          <SLoadButtonWrapper>
            <Button
              color="invertedContrast"
              disabled={loading}
              onClick={() => loadMore()}
              size="medium"
              text={loading ? 'Loading...' : 'Load more'}
              variant="outlined"
            />
          </SLoadButtonWrapper>
        )}
      </>
    );
  };

  const returnQuantityNFTsAvailable = (NFT: NftType, tabId: TabsIdType) => {
    const { serieData, totalNft, totalOwnedByRequestingUser } = NFT;

    switch (tabId) {
      case NFT_CREATED_TAB:
        return totalNft ?? 1;
      case NFT_LIKED_TAB:
        return 0;
      case NFT_ON_SALE_TAB:
        return (
          serieData?.filter(
            ({ listed, owner }) => owner === user?.walletId && listed === 1
          ).length ?? 1
        );
      case NFT_NOT_FOR_SALE_TAB:
        return (
          serieData?.filter(
            ({ listed, owner }) => owner === user?.walletId && listed === 0
          ).length ?? 1
        );
      case NFT_OWNED_TAB:
      default:
        return totalOwnedByRequestingUser ?? 1;
    }
  };

  const returnQuantity = (tabId: TabsIdType) => {
    switch (tabId) {
      case NFT_CREATED_TAB:
        return createdNftsTotal;
      case NFT_LIKED_TAB:
        return likedNftsTotal;
      case NFT_ON_SALE_TAB:
        return ownedNftsListedTotal;
      case NFT_NOT_FOR_SALE_TAB:
        return ownedNftsUnlistedTotal;
      case FOLLOWERS_TAB:
        return followersTotal;
      case FOLLOWED_TAB:
        return followedTotal;
      case NFT_OWNED_TAB:
      default:
        return ownedNftsTotal;
    }
  }

  const returnContent = (tabId: TabsIdType) => {
    if (tabId === FOLLOWERS_TAB || tabId === FOLLOWED_TAB) {
      return (
        <div className={style.NFTs}>
          <div className={style.Top}>
            <h3 className={style.NFTTitle}>{scope}</h3>
            <div className={style.SearchContainer}>
              <div className={style.SearchBar}>
                <input
                  type="search"
                  onChange={updateKeywordSearch}
                  className={style.Input}
                  placeholder="Search"
                />
              </div>
              <div className={style.Toggle}>
                <label>
                  <Switch
                    checked={isFiltered}
                    onChange={() => setIsFiltered(!isFiltered)}
                    offColor="#000000"
                    onColor="#7417ea"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    width={46}
                    handleDiameter={23}
                    className={style.SwitchShell}
                  />
                </label>
                <span className={style.Label}>Certified only</span>
              </div>
            </div>
          </div>
          <div className={style.FollowsContainer}>{returnFollowers()}</div>
          {scope === 'Followers' && followersUsersHasNextPage && (
            <Button
              color="invertedContrast"
              disabled={loading}
              onClick={() => loadMoreFollowers()}
              size="medium"
              text={loading ? 'Loading...' : 'Load more'}
              variant="outlined"
            />
          )}
          {scope === 'Followed' && followedUsersHasNextPage && (
            <Button
              color="invertedContrast"
              disabled={loading}
              onClick={() => loadMoreFollowed()}
              size="medium"
              text={loading ? 'Loading...' : 'Load more'}
              variant="outlined"
            />
          )}
        </div>
      
      );
    }
    
    return returnNFTs(tabId);
  }

  const returnFollowers = () => {
    const creators = scope === 'Followers' ? followers : followed;

    if (creators.length < 1) {
      return (
        <SNoNFTContainer>
          <NoNFTComponent
            body={scope === 'Followers' ? undefined : 'Discover new artists and start following them!'}
            title="Nothing to display"
          />
        </SNoNFTContainer>
      );
    }

    return creators.map((item: UserType, i: number) => {
      return (
        <div key={item._id} className={style.CreatorShell}>
              <Creator user={item} walletId={item.walletId} size="small" showTooltip={false}/>
          <div className={style.CreatorInfos}>
            <Link href={`/${item.walletId}`}>
              <a>
                <h2 className={style.CreatorName}>{item.name}</h2>
              </a>
            </Link>
            <span className={style.CreatorFollowers}>
              {followersNbFollowers[item.walletId] ? followersNbFollowers[item.walletId] : 0} followers
            </span>
            {scope === 'Followers' ? (
              <div
                onClick={() => handleFollow(item.walletId, followBacks[i])}
                className={style.Unfollow}
              >
                {followBacks[i] ? 'Unfollow' : 'Follow'}
              </div>
            ) : (
              <div
                onClick={() => handleFollow(item.walletId, true)}
                className={style.Unfollow}
              >
                Unfollow
              </div>
            )}
          </div>
        </div>
      );
    });
  }

  return (
    <div className={style.Container}>
      <div className={style.Banner}>
        <img
          className={style.BannerIMG}
          src={banner}
          draggable="false"
          alt="banner"
        />
      </div>
      <Wrapper>
        <SBannerContainer>
          <Banner
            bio={user.bio}
            isVerified={user.verified}
            name={user.name}
            picture={user.picture}
            twitterName={user.twitterName}
            walletId={user.walletId}
          />
          {!isTablet && <Button
            color="whiteBlur"
            icon='edit'
            text="Edit profile"
            size="small"
            variant="outlined"
          />}
        </SBannerContainer>
      </Wrapper>
      <Wrapper>
        <Tabs
          isTabsSelect={isTablet}
          tabs={ORDERED_TABS_ID.reduce(
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
      {expand && (
        <FloatingMenu
          setScope={setScope}
          scope={scope}
          setExpand={setExpand}
          ownedAmount={countOwned}
          createdAmount={countCreated}
          listedOwnedAmount={countOwnedListed}
          unlistedOwnedAmount={countOwnedUnlisted}
          likedAmount={user.likedNFTs?.length || 0}
          followersAmount={countFollowers}
          followedAmount={countFollowed}
        />
      )}
      {twitterErrorModal && (
        <TwitterErrorModal setModalExpand={setTwitterErrorModal} />
      )}
    </div>
  );
};

const SBannerContainer = styled.div`
  margin-top: -12rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
  }
`;

const SNoNFTContainer = styled.div`
  margin-top: 8rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 15.4rem;
  }
`;

const SLoadButtonWrapper = styled.div`
  button {
    margin: 0 auto;
  }
`;

export default Profile;
