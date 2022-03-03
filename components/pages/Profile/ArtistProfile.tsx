import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Banner as AvatarBanner } from 'components/base/Avatar'
import NftsGrid from 'components/base/NftsGrid'
import { getOwnedNFTS, getUserNFTsStat } from 'actions/nft'
import { getFollowers, getFollowed } from 'actions/follower'
import { Container, Wrapper } from 'components/layout/Container'
import Tabs from 'components/ui/Tabs'
import { NftType, UserType } from 'interfaces'
import { loadMoreNfts } from 'utils/profile'
import { loadMoreProfiles } from 'utils/profile/follow'
import { computeValue } from 'utils/strings'

import ArtistStatsBlock from './components/ArtistStatsBlock'
import FollowersProfileBlock from './components/FollowersProfileBlock'
import { FOLLOWERS_TAB, FOLLOWED_TAB, NFT_OWNED_TAB, NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB } from './constants'
import { TabsIdType } from './interfaces'

const tabs = [NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB, FOLLOWERS_TAB, FOLLOWED_TAB] as const

export interface ProfileProps {
  artist: UserType
}

const Profile = ({ artist }: ProfileProps) => {
  const { banner, bio, name, picture, twitterName, verified, viewsCount, walletId } = artist

  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false)
  const [isProfileDataLoaded, setIsProfileDataLoaded] = useState(false)
  const [resetTabId, toggleResetTabId] = useState(false)

  // Artist owned listed NFTs
  const [ownedNftsListed, setOwnedNftsListed] = useState<NftType[]>([])
  const [ownedNftsListedHasNextPage, setOwnedNftsListedHasNextPage] = useState(false)
  const [ownedNftsListedCurrentPage, setOwnedNftsListedCurrentPage] = useState(1)
  // Artist owned not listed NFTs
  const [ownedNftsUnlisted, setOwnedNftsUnlisted] = useState<NftType[]>([])
  const [ownedNftsUnlistedHasNextPage, setOwnedNftsUnlistedHasNextPage] = useState(false)
  const [ownedNftsUnlistedCurrentPage, setOwnedNftsUnlistedCurrentPage] = useState(1)
  // Artist followers
  const [followers, setFollowers] = useState<UserType[]>([])
  const [followersHasNextPage, setFollowersHasNextPage] = useState(false)
  const [followersCurrentPage, setFollowersCurrentPage] = useState(1)
  // Artist followed
  const [followed, setFollowed] = useState<UserType[]>([])
  const [followedHasNextPage, setFollowedHasNextPage] = useState(false)
  const [followedCurrentPage, setFollowedCurrentPage] = useState(1)

  // Artist stats
  const [counts, setCounts] = useState<{ [key in TabsIdType]: number }>(
    tabs.reduce((acc, id) => ({ ...acc, [id]: 0 }), {} as { [key in TabsIdType]: number })
  )

  // Followers search
  const [isFilterVerified, setIsFilterVerified] = useState<boolean | undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }

  const returnNFTs = (tabId: TabsIdType) => {
    switch (tabId) {
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
      case NFT_ON_SALE_TAB:
      default: {
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
          <NftsGrid
            NFTs={ownedNftsListed}
            isLoading={!isProfileDataLoaded}
            isLoadMore={ownedNftsListedHasNextPage}
            isLoadMoreLoading={isLoadMoreLoading}
            loadMore={loadMoreOwnedListedNfts}
            noNftHref="/"
            noNftLinkLabel="Sell your NFT"
            noNftTitle="Nothing to display"
            tabId={tabId}
          />
        )
      }
    }
  }

  const returnFollowers = (tabId: TabsIdType) => {
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

        return (
          <FollowersProfileBlock
            users={followed}
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
            const { countOwned, countOwnedListed, countOwnedUnlisted, countFollowers, countFollowed } = stats

            if (shouldUpdate) {
              setCounts((prevCounts) => ({
                ...prevCounts,
                [NFT_OWNED_TAB]: countOwned,
                [NFT_ON_SALE_TAB]: countOwnedListed,
                [NFT_NOT_FOR_SALE_TAB]: countOwnedUnlisted,
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
      // Followers
      const followers = await getFollowers(walletId)
      if (shouldUpdate) {
        setFollowers(followers.data)
        setFollowersHasNextPage(followers.hasNextPage)
      }
      // Followed
      const followed = await getFollowed(walletId)
      if (shouldUpdate) {
        setFollowed(followed.data)
        setFollowedHasNextPage(followed.hasNextPage)
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
  }, [walletId])

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
          <SArtistStatsBannerContainer>
            <ArtistStatsBlock
              artistWalletId={walletId}
              followedCount={counts[FOLLOWED_TAB]}
              followersCount={counts[FOLLOWERS_TAB]}
              setCounts={setCounts}
              setFollowers={setFollowers}
              viewsCount={viewsCount ?? 0}
            />
          </SArtistStatsBannerContainer>
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

const SAvatarBannerContainer = styled.div`
  margin-top: -12rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
  }
`

const SArtistStatsBannerContainer = styled.div`
  margin-top: 2.4rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0;
  }
`

export default Profile
