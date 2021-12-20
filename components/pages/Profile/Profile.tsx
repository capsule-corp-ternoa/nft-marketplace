import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import Avatar, { Banner as AvatarBanner } from 'components/base/Avatar';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NftCard, { NftChips } from 'components/base/NftCard';
import NoNFTComponent from 'components/base/NoNFTComponent';
import TwitterErrorModal from './TwitterErrorModal';
import Switch from 'react-switch';
import { NftType, UserType } from 'interfaces';
import {
  follow,
  unfollow,
  isUserFollowing,
  getFollowersCount,
} from 'actions/follower';
import { Container, Wrapper } from 'components/layout/Container';
import Button from 'components/ui/Button';
import Tabs from 'components/ui/Tabs';
import { breakpointMap } from 'style/theme/base';

const NFT_OWNED_TAB = 'My NFTs';
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
  setIsFiltered: (b: boolean) => void;
  searchValue: string;
  setSearchValue: (s: string) => void;
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
  loadMoreFollowers: (forceLoad?: boolean) => void;
  //followed
  followed: UserType[];
  followedTotal: number;
  setFollowed: (users: UserType[]) => void;
  followedUsersHasNextPage: boolean;
  loadMoreFollowed: (forceLoad?: boolean) => void;
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
  const [twitterErrorModal, setTwitterErrorModal] = useState(false);
  const [followBacks, setFollowBacks] = useState(
    Array(followers.length).fill(false)
  );
  const [countFollowed, setCountFollowed] = useState(0);
  const [followersNbFollowers, setFollowersNbFollowers] = useState({} as any);

  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });

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

  useEffect(() => {
    if (router.query?.twitterValidated === 'false') {
      setTwitterErrorModal(true);
      router.query = {};
    }
  }, [router.query]);

  useEffect(() => {
    initFollowerStat();
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

  const returnNFTs = (tabId: TabsIdType) => {
    let displayNFTs: NftType[] = [];
    let isLoadMore = false;
    let loadMore = () => {};

    let noNftTitle = 'Nothing to display';
    let noNftBody;
    let noNftHref;
    let noNftLinkLabel;

    switch (tabId) {
      case NFT_CREATED_TAB:
        displayNFTs = createdNfts;
        isLoadMore = createdNftsHasNextPage;
        loadMore = loadMoreCreatedNfts;
        noNftHref = '/create';
        noNftLinkLabel = 'Create your NFT';
        break;
      case NFT_LIKED_TAB:
        displayNFTs = likedNfts;
        isLoadMore = likedNftsHasNextPage;
        loadMore = loadMoreLikedNfts;
        noNftBody = 'The NFTs you liked are displayed here';
        break;
      case NFT_ON_SALE_TAB:
        displayNFTs = ownedNftsListed;
        isLoadMore = ownedNftsListedHasNextPage;
        loadMore = loadMoreOwnedListedNfts;
        noNftHref = '/';
        noNftLinkLabel = 'Sell your NFT';
        break;
      case NFT_NOT_FOR_SALE_TAB:
        displayNFTs = ownedNftsUnlisted;
        isLoadMore = ownedNftsUnlistedHasNextPage;
        loadMore = loadMoreOwnedUnlistedNfts;
        noNftBody =
          'The NFTs you owned and are not for sale are displayed here';
        break;
      case NFT_OWNED_TAB:
      default:
        displayNFTs = ownedNfts;
        isLoadMore = ownedNftsHasNextPage;
        loadMore = loadMoreOwnedNfts;
        noNftBody = 'The NFTs you owned are displayed here';
        noNftHref = '/explore';
        noNftLinkLabel = 'Explore NFTs';
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
        {/* TODO: Add this when sell modal is implemented */}
        {/* {tabId === NFT_ON_SALE_TAB && isTablet && (
          <SSaleLinkWrapper>
            <Link href="/" passHref>
              <>
                <SSaleContainer href="/">
                  <SSaleIcon>
                    <span>+</span>
                  </SSaleIcon>
                  <SSaleLabel>Sell your NFT</SSaleLabel>
                </SSaleContainer>
              </>
            </Link>
          </SSaleLinkWrapper>
        )} */}
        <SNFTsContainer>
          {displayNFTs.map((item: NftType) => (
            <SNftCard key={item.id} mode="profile" item={item}>
              <NftChips
                NFT={item}
                mode="profile"
                noAvailableChip={tabId !== NFT_ON_SALE_TAB}
                noPriceChip={tabId !== NFT_ON_SALE_TAB}
                quantity={returnQuantityNFTsAvailable(item, tabId)}
              />
            </SNftCard>
          ))}
          {/* {tabId === NFT_ON_SALE_TAB && !isTablet && (
            <SSaleLinkWrapper>
              <Link href="/" passHref>
                <>
                  <SSaleContainer href="/">
                    <SSaleIcon>
                      <span>+</span>
                    </SSaleIcon>
                    <SSaleLabel>Sell your NFT</SSaleLabel>
                  </SSaleContainer>
                </>
              </Link>
            </SSaleLinkWrapper>
          )} */}
        </SNFTsContainer>
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
  };

  const returnFollowers = (tabId: TabsIdType) => {
    let users: UserType[] = [];
    let isLoadMore = false;
    let loadMore = () => {};

    let noNftTitle = 'Nothing to display';
    let noNftBody;

    switch (tabId) {
      case FOLLOWERS_TAB:
        users = followers;
        isLoadMore = followersUsersHasNextPage;
        loadMore = loadMoreFollowers;
        noNftBody = 'Discover new artists and start following them!';
        break;
      case FOLLOWED_TAB:
        users = followed;
        isLoadMore = followedUsersHasNextPage;
        loadMore = loadMoreFollowed;
        break;
    }

    return (
      <>
        <SSearchContainer>
          <SSearchLabel>
            <SSearchInput
              type="search"
              onChange={updateKeywordSearch}
              placeholder="Search"
            />
          </SSearchLabel>
          <SToggle>
            <SCertifiedLabel>Verified only</SCertifiedLabel>
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
              />
            </label>
          </SToggle>
        </SSearchContainer>

        {users.length < 1 ? (
          <SNoNFTContainer>
            <NoNFTComponent body={noNftBody} title={noNftTitle} />
          </SNoNFTContainer>
        ) : (
          <>
            <SFollowersContainer>
              {users.map(
                (
                  { _id, name, picture, verified, walletId }: UserType,
                  idx: number
                ) => {
                  const isUnfollow =
                    tabId === FOLLOWERS_TAB ? followBacks[idx] : true;

                  return (
                    <Avatar
                      key={_id}
                      followers={followersNbFollowers[walletId] ?? 0}
                      handleFollow={() => handleFollow(walletId, isUnfollow)}
                      isClickable
                      isFollowButton
                      isUnfollow
                      isVerified={verified}
                      name={name}
                      picture={picture}
                      walletId={walletId}
                    />
                  );
                }
              )}
            </SFollowersContainer>
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
        )}
      </>
    );
  };

  const returnContent = (tabId: TabsIdType) => {
    if (tabId === FOLLOWERS_TAB || tabId === FOLLOWED_TAB) {
      return returnFollowers(tabId);
    }

    return returnNFTs(tabId);
  };

  return (
    <Container>
      <SBannerContainer>
        <SBannerIMG
          src={user.banner ?? '/defaultBanner.jpeg'}
          draggable="false"
          alt="banner"
        />
        {isTablet && (
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
          {!isTablet && (
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
      {twitterErrorModal && (
        <TwitterErrorModal setModalExpand={setTwitterErrorModal} />
      )}
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

const SNoNFTContainer = styled.div`
  margin-top: 8rem;
`;

// const SSaleLinkWrapper = styled.div`
//   max-width: 26rem;
//   border: 0.2rem dashed;
//   border-color: ${({ theme }) => theme.colors.contrast};
//   border-radius: 1.2rem;
//   margin: 6.4rem auto 0;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     border-radius: 2.4rem;
//     max-width: none;
//     margin: 0 0 0 -0.8rem;
//     padding: 0.8rem;
//   }
// `;

// const SSaleContainer = styled.a`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   margin: 1.6rem 0;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     height: ${({ theme }) => theme.sizes.cardHeight.sm};
//     width: ${({ theme }) => theme.sizes.cardWidth.sm};
//     flex-direction: column;
//     justify-content: center;
//     margin: 0;
//   }
// `;

// const SSaleIcon = styled.div`
//   width: 5rem;
//   height: 5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: ${({ theme }) => theme.colors.contrast};
//   border-radius: 50%;
//   padding: 1rem;

//   > span {
//     color: ${({ theme }) => theme.colors.invertedContrast};
//     font-size: 5.4rem;
//     transform: translate(4%, -5%);
//   }
// `;

// const SSaleLabel = styled.span`
//   color: ${({ theme }) => theme.colors.contrast};
//   font-size: 1.6rem;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     margin-top: 2.4rem;
//   }
// `;

const SSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5.6rem;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`;

const SSearchLabel = styled.label`
  position: relative;

  :before {
    content: '';
    position: absolute;
    left: 2.4rem;
    top: 0;
    bottom: 0;
    width: 2rem;
    background: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.3 10.8C8.78528 10.8 10.8 8.78528 10.8 6.3C10.8 3.81472 8.78528 1.8 6.3 1.8C3.81472 1.8 1.8 3.81472 1.8 6.3C1.8 8.78528 3.81472 10.8 6.3 10.8ZM6.3 12.6C9.77939 12.6 12.6 9.77939 12.6 6.3C12.6 2.82061 9.77939 0 6.3 0C2.82061 0 0 2.82061 0 6.3C0 9.77939 2.82061 12.6 6.3 12.6Z' fill='%23686464'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.3712 14.3712C14.024 14.7185 13.461 14.7185 13.1137 14.3712L9.62877 10.8863C9.28151 10.539 9.28151 9.97603 9.62877 9.62877C9.97603 9.28151 10.539 9.28151 10.8863 9.62877L14.3712 13.1137C14.7185 13.461 14.7185 14.024 14.3712 14.3712Z' fill='%23686464'/%3E%3C/svg%3E%0A")
      center / contain no-repeat;
  }
`;

const SSearchInput = styled.input`
  width: 28rem;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 3.2rem;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.6rem;
  outline: none;
  padding: 1.2rem 5.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 32rem;
  }
`;

const SToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.2rem 0 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0 0 0 1.6rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0 0 0 2.4rem;
  }
`;

const SCertifiedLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.neutral200};
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  text-align: right;
  margin-right: 0.8rem;
`;

const SNFTsContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 3.2rem 0;
  width: 100%;
  margin-bottom: 3.2rem;
  gap: 3.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 3.2rem 0;
    margin-top: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: repeat(6, 1fr);
    gap: 3.2rem;
  }
`;

const SNftCard = styled(NftCard)`
  margin: 0 auto;
`;

const SFollowersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  gap: 3.2rem;
  max-width: 40rem;
  margin: 5.6rem auto;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    max-width: none;
    gap: 2.4rem 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 4.8rem;
    margin-top: 8.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const SLoadButtonWrapper = styled.div`
  button {
    margin: 5.6rem auto 11.6rem;
  }
`;

export default Profile;
