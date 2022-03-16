import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Banner as AvatarBanner } from 'components/base/Avatar'
import NftsGrid from 'components/base/NftsGrid'
import { getCreatorNFTS, getLikedNFTs, getOwnedNFTS, getUserNFTsStat } from 'actions/nft'
import { getFollowers, getFollowed } from 'actions/follower'
import { Container, Wrapper } from 'components/layout/Container'
import { AnchorButton } from 'components/ui/Button'
import Tabs from 'components/ui/Tabs'
import { NftType, UserType } from 'interfaces'
import { useApp } from 'redux/hooks'
import { loadMoreNfts } from 'utils/profile'
import {
  FOLLOW_ACTION,
  UNFOLLOW_ACTION,
  FOLLOW_ACTION_TYPE,
  LIKE_ACTION,
  LIKE_ACTION_TYPE,
  UNLIKE_ACTION,
} from 'utils/profile/constants'
import { loadMoreProfiles } from 'utils/profile/follow'
import { computeValue } from 'utils/strings'

import FollowersProfileBlock from './components/FollowersProfileBlock'
import {
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
} from './constants'
import { TabsIdType } from './interfaces'

const tabs = [
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
] as const

export interface ProfileProps {
  user: UserType
  userOwnedlNfts: NftType[]
  userOwnedNftsHasNextPage: boolean
}

const Profile = ({ user, userOwnedlNfts, userOwnedNftsHasNextPage }: ProfileProps) => {
  const { user: reduxUser } = useApp()
  const { banner, bio, likedNFTs: userLikedNFTs, name, picture, twitterName, verified, walletId } = reduxUser ?? user

  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false)
  const [isProfileDataLoaded, setIsProfileDataLoaded] = useState(false)
  const [resetTabId, toggleResetTabId] = useState(false)

  //Owned NFTs
  const [ownedNfts, setOwnedNfts] = useState<NftType[]>(userOwnedlNfts ?? [])
  const [ownedNftsHasNextPage, setOwnedNftsHasNextPage] = useState(userOwnedNftsHasNextPage ?? false)
  const [ownedNftsCurrentPage, setOwnedNftsCurrentPage] = useState(1)
  //Created NFTs
  const [createdNfts, setCreatedNfts] = useState<NftType[]>([])
  const [createdNftsHasNextPage, setCreatedNftsHasNextPage] = useState(false)
  const [createdCurrentPage, setCreatedCurrentPage] = useState(1)
  //Owned listed NFTs
  const [ownedNftsListed, setOwnedNftsListed] = useState<NftType[]>([])
  const [ownedNftsListedHasNextPage, setOwnedNftsListedHasNextPage] = useState(false)
  const [ownedNftsListedCurrentPage, setOwnedNftsListedCurrentPage] = useState(1)
  //Owned not listed NFTs
  const [ownedNftsUnlisted, setOwnedNftsUnlisted] = useState<NftType[]>([])
  const [ownedNftsUnlistedHasNextPage, setOwnedNftsUnlistedHasNextPage] = useState(false)
  const [ownedNftsUnlistedCurrentPage, setOwnedNftsUnlistedCurrentPage] = useState(1)
  //Liked NFTs
  const [likedNfts, setLikedNfts] = useState<NftType[]>([])
  const [likedNftsHasNextPage, setLikedNftsHasNextPage] = useState(false)
  const [likedCurrentPage, setLikedCurrentPage] = useState(1)
  //profile followers
  const [followers, setFollowers] = useState<UserType[]>([])
  const [followersHasNextPage, setFollowersHasNextPage] = useState(false)
  const [followersCurrentPage, setFollowersCurrentPage] = useState(1)
  //profile followed
  const [followed, setFollowed] = useState<UserType[]>([])
  const [followedHasNextPage, setFollowedHasNextPage] = useState(false)
  const [followedCurrentPage, setFollowedCurrentPage] = useState(1)

  // Stats
  const [counts, setCounts] = useState<{ [key in TabsIdType]: number }>(
    tabs.reduce((acc, id) => ({ ...acc, [id]: 0 }), {} as { [key in TabsIdType]: number })
  )

  // Followers search
  const [isFilterVerified, setIsFilterVerified] = useState<boolean | undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const populateTabData = async (tabId: TabsIdType) => {
    setIsProfileDataLoaded(false)
    try {
      switch (tabId) {
        case NFT_LIKED_TAB: {
          const { data, hasNextPage } = await getLikedNFTs(walletId)
          setLikedCurrentPage(1)
          setLikedNfts(data)
          setLikedNftsHasNextPage(hasNextPage)
          break
        }
        case FOLLOWERS_TAB: {
          const { data, hasNextPage } = await getFollowers(walletId)
          setFollowersCurrentPage(1)
          setFollowers(data)
          setFollowersHasNextPage(hasNextPage)
          setSearchValue(undefined)
          setIsFilterVerified(undefined)
          break
        }
        case FOLLOWED_TAB: {
          const { data, hasNextPage } = await getFollowed(walletId)
          setFollowedCurrentPage(1)
          setFollowed(data)
          setFollowedHasNextPage(hasNextPage)
          setSearchValue(undefined)
          setIsFilterVerified(undefined)
          break
        }
      }
      setIsProfileDataLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }

  const returnNFTs = (tabId: TabsIdType) => {
    const handleLikeCount = (action: LIKE_ACTION_TYPE): void => {
      setCounts((prevCounts) => {
        const prevLikedCount = prevCounts[NFT_LIKED_TAB]
        switch (action) {
          case LIKE_ACTION:
            return {
              ...prevCounts,
              [NFT_LIKED_TAB]: prevLikedCount + 1,
            }
          case UNLIKE_ACTION:
            return {
              ...prevCounts,
              [NFT_LIKED_TAB]: prevLikedCount - 1,
            }
        }
      })
    }

    switch (tabId) {
      case NFT_CREATED_TAB: {
        const loadMoreCreatedNfts = async () => {
          setIsLoadMoreLoading(true)
          await loadMoreNfts(
            walletId,
            createdCurrentPage,
            setCreatedCurrentPage,
            setCreatedNftsHasNextPage,
            setCreatedNfts,
            tabId
          )
          setIsLoadMoreLoading(false)
        }

        return (
          <NftsGrid
            NFTs={createdNfts}
            handleNftLike={handleLikeCount}
            isLoading={!isProfileDataLoaded}
            isLoadMore={!!createdNftsHasNextPage}
            isLoadMoreLoading={isLoadMoreLoading}
            loadMore={loadMoreCreatedNfts}
            noNftHref="/create"
            noNftLinkLabel="Create your NFT"
            noNftTitle="Nothing to display"
            tabId={tabId}
          />
        )
      }
      case NFT_LIKED_TAB: {
        const loadMoreLikedNfts = async () => {
          setIsLoadMoreLoading(true)
          await loadMoreNfts(
            walletId,
            likedCurrentPage,
            setLikedCurrentPage,
            setLikedNftsHasNextPage,
            setLikedNfts,
            tabId
          )
          setIsLoadMoreLoading(false)
        }

        const handleNftLiked = async (action: LIKE_ACTION_TYPE, nft?: NftType): Promise<void> => {
          if (nft !== undefined) {
            const isMoreLikedNfts = likedNfts.length < counts[NFT_LIKED_TAB]
            const { data, hasNextPage } = isMoreLikedNfts
              ? await getLikedNFTs(walletId, likedNfts.length.toString(), '1')
              : { data: [], hasNextPage: false }
            setLikedNfts((prevState) => prevState.filter(({ id }) => id !== nft.id).concat(data))
            setLikedNftsHasNextPage(Boolean(hasNextPage))
          }
          handleLikeCount(action)
        }

        return (
          <NftsGrid
            NFTs={likedNfts}
            handleNftLike={handleNftLiked}
            isLoading={!isProfileDataLoaded}
            isLoadMore={likedNftsHasNextPage}
            isLoadMoreLoading={isLoadMoreLoading}
            loadMore={loadMoreLikedNfts}
            noNftBody="The NFTs you liked are displayed here"
            noNftTitle="Nothing to display"
            tabId={tabId}
          />
        )
      }
      case NFT_ON_SALE_TAB: {
        const loadMoreOwnedListedNfts = async () => {
          setIsLoadMoreLoading(true)
          await loadMoreNfts(
            walletId,
            ownedNftsListedCurrentPage,
            setOwnedNftsListedCurrentPage,
            setOwnedNftsListedHasNextPage,
            setOwnedNftsListed,
            tabId
          )
          setIsLoadMoreLoading(false)
        }

        return (
          <>
            {/* TODO: add this when NFT sale if available and remove react-responsive */}
            {/* {isTablet && <NftSaleLink />} */}
            <NftsGrid
              NFTs={ownedNftsListed}
              handleNftLike={handleLikeCount}
              isLoading={!isProfileDataLoaded}
              isLoadMore={ownedNftsListedHasNextPage}
              loadMore={loadMoreOwnedListedNfts}
              isLoadMoreLoading={isLoadMoreLoading}
              noNftHref="/"
              noNftLinkLabel="Sell your NFT"
              noNftTitle="Nothing to display"
              tabId={tabId}
            >
              {/* TODO: add this when NFT sale if available and remove react-responsive */}
              {/* {!isTablet && <NftSaleLink />} */}
            </NftsGrid>
          </>
        )
      }
      case NFT_NOT_FOR_SALE_TAB: {
        const loadMoreOwnedUnlistedNfts = async () => {
          setIsLoadMoreLoading(true)
          await loadMoreNfts(
            walletId,
            ownedNftsUnlistedCurrentPage,
            setOwnedNftsUnlistedCurrentPage,
            setOwnedNftsUnlistedHasNextPage,
            setOwnedNftsUnlisted,
            tabId
          )
          setIsLoadMoreLoading(false)
        }

        return (
          <NftsGrid
            NFTs={ownedNftsUnlisted}
            handleNftLike={handleLikeCount}
            isLoading={!isProfileDataLoaded}
            isLoadMore={ownedNftsUnlistedHasNextPage}
            isLoadMoreLoading={isLoadMoreLoading}
            loadMore={loadMoreOwnedUnlistedNfts}
            noNftBody="The NFTs you owned and are not for sale are displayed here"
            noNftTitle="Nothing to display"
            tabId={tabId}
          />
        )
      }
      case NFT_OWNED_TAB:
      default: {
        const loadMoreOwnedNfts = async () => {
          setIsLoadMoreLoading(true)
          await loadMoreNfts(
            walletId,
            ownedNftsCurrentPage,
            setOwnedNftsCurrentPage,
            setOwnedNftsHasNextPage,
            setOwnedNfts,
            tabId
          )
          setIsLoadMoreLoading(false)
        }

        return (
          <NftsGrid
            NFTs={ownedNfts}
            handleNftLike={handleLikeCount}
            isLoading={!isProfileDataLoaded}
            isLoadMore={!!ownedNftsHasNextPage}
            isLoadMoreLoading={isLoadMoreLoading}
            loadMore={loadMoreOwnedNfts}
            noNftBody="The NFTs you owned are displayed here"
            noNftHref="/explore"
            noNftLinkLabel="Explore NFTs"
            noNftTitle="Nothing to display"
            tabId={tabId}
          />
        )
      }
    }
  }

  const returnFollowers = (tabId: TabsIdType) => {
    const handleFollowCount = async (action: FOLLOW_ACTION_TYPE): Promise<void> => {
      setCounts((prevCounts) => {
        const prevFollowedCount = prevCounts[FOLLOWED_TAB]
        switch (action) {
          case FOLLOW_ACTION:
            return {
              ...prevCounts,
              [FOLLOWED_TAB]: prevFollowedCount + 1,
            }
          case UNFOLLOW_ACTION:
            return {
              ...prevCounts,
              [FOLLOWED_TAB]: prevFollowedCount - 1,
            }
        }
      })
    }

    switch (tabId) {
      case FOLLOWERS_TAB: {
        const loadMoreFollowers = async () => {
          setIsLoadMoreLoading(true)

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
          )

          setIsLoadMoreLoading(false)
        }

        return (
          <FollowersProfileBlock
            users={followers}
            handleFollow={handleFollowCount}
            isFilterVerified={isFilterVerified ?? false}
            isLoading={!isProfileDataLoaded}
            isLoadMore={followersHasNextPage}
            isLoadMoreLoading={isLoadMoreLoading}
            loadMore={loadMoreFollowers}
            noContentBody="Discover new artists and start following them!"
            noContentTitle="Nothing to display"
            setIsFilterVerified={setIsFilterVerified}
            updateKeywordSearch={updateKeywordSearch}
          />
        )
      }
      case FOLLOWED_TAB: {
        const loadMoreFollowed = async () => {
          setIsLoadMoreLoading(true)

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
          )

          setIsLoadMoreLoading(false)
        }

        const handleFollow = async (action: FOLLOW_ACTION_TYPE, profile?: UserType): Promise<void> => {
          if (profile !== undefined) {
            const isMoreFollowed = followed.length < counts[FOLLOWED_TAB]
            const { data, hasNextPage } = isMoreFollowed
              ? await getFollowed(walletId, followed.length.toString(), '1', searchValue, isFilterVerified)
              : { data: [], hasNextPage: false }
            setFollowed((prevState) => prevState.filter(({ walletId }) => walletId !== profile.walletId).concat(data))
            setFollowersHasNextPage(Boolean(hasNextPage))
          }
          handleFollowCount(action)
        }

        return (
          <FollowersProfileBlock
            users={followed}
            handleFollow={handleFollow}
            isFilterVerified={isFilterVerified ?? false}
            isLoading={!isProfileDataLoaded}
            isLoadMore={followedHasNextPage}
            isLoadMoreLoading={isLoadMoreLoading}
            loadMore={loadMoreFollowed}
            noContentTitle="Nothing to display"
            setIsFilterVerified={setIsFilterVerified}
            updateKeywordSearch={updateKeywordSearch}
          />
        )
      }
    }
  }

  const returnContent = (tabId: TabsIdType) => {
    if (tabId === FOLLOWERS_TAB || tabId === FOLLOWED_TAB) {
      return returnFollowers(tabId)
    }

    return returnNFTs(tabId)
  }

  useEffect(() => {
    let shouldUpdate = true

    const initCounts = async () => {
      try {
        if (walletId) {
          const stats = await getUserNFTsStat(walletId, true)
          if (stats) {
            const { countOwned, countOwnedListed, countOwnedUnlisted, countCreated, countFollowers, countFollowed } =
              stats

            if (shouldUpdate) {
              setCounts((prevCounts) => ({
                ...prevCounts,
                [NFT_OWNED_TAB]: countOwned,
                [NFT_ON_SALE_TAB]: countOwnedListed,
                [NFT_NOT_FOR_SALE_TAB]: countOwnedUnlisted,
                [NFT_CREATED_TAB]: countCreated,
                [NFT_LIKED_TAB]: userLikedNFTs?.length || 0,
                [FOLLOWERS_TAB]: countFollowers,
                [FOLLOWED_TAB]: countFollowed,
              }))
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    }

    const populateProfileData = async () => {
      // Created nfts
      const createdNfts = await getCreatorNFTS(walletId)
      if (shouldUpdate) {
        setCreatedNfts(createdNfts.data)
        setCreatedNftsHasNextPage(createdNfts.hasNextPage)
      }
      // Owned listed NFTs
      const ownedListed = await getOwnedNFTS(walletId, true, true, undefined, undefined)
      if (shouldUpdate) {
        setOwnedNftsListed(ownedListed.data)
        setOwnedNftsListedHasNextPage(ownedListed.hasNextPage)
      }
      // Owned not listed NFTs
      const ownedUnlisted = await getOwnedNFTS(walletId, false, false, undefined, undefined)
      if (shouldUpdate) {
        setOwnedNftsUnlisted(ownedUnlisted.data)
        setOwnedNftsUnlistedHasNextPage(ownedUnlisted.hasNextPage)
      }
    }

    setIsProfileDataLoaded(false)
    toggleResetTabId((prevState) => !prevState)
    initCounts()
    populateProfileData()
    if (shouldUpdate) setIsProfileDataLoaded(true)

    return () => {
      shouldUpdate = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        )
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
        )
      }, 1000)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, isFilterVerified])

  return (
    <Container>
      <SBannerContainer>
        <SBannerIMG src={banner ?? '/defaultBanner.jpeg'} draggable="false" alt="banner" />
        <SEditButtonMobileWrapper>
          <AnchorButton color="invertedContrast" icon="edit" href="/edit" size="medium" variant="contained" />
        </SEditButtonMobileWrapper>
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
          <SEditButtonDesktopWrapper>
            <AnchorButton
              color="neutral600"
              icon="edit"
              href="/edit"
              text="Edit profile"
              size="small"
              variant="outlined"
            />
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
                badge: computeValue(counts[id]),
                content: returnContent(id),
                populateTabData,
                label: id,
              },
            }),
            {}
          )}
        />
      </Wrapper>
    </Container>
  )
}

const SBannerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 22rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.xxl} {
    height: 28rem;
  }
`

const SBannerIMG = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const SEditButtonMobileWrapper = styled.div`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const SEditButtonDesktopWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`

const SAvatarBannerContainer = styled.div`
  margin-top: -12rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
  }
`

export default Profile
