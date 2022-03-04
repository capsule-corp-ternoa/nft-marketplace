import React, { useEffect } from 'react'
import Head from 'next/head'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

import BetaBanner from 'components/base/BetaBanner'
import FloatingHeader from 'components/base/FloatingHeader'
import Footer from 'components/base/Footer'
import MainHeader from 'components/base/MainHeader'
import Landing from 'components/pages/Landing'

import { getCapsValue } from 'actions/caps'
import { getUser, getMostFollowedUsers, getTopSellersUsers } from 'actions/user'
import { getMostLikedNFTs, getMostSoldSeries, getNFTs, getTotalOnSaleOnMarketplace } from 'actions/nft'
import { NftType, UserType } from 'interfaces'
import { appSetUser } from 'redux/app'
import { useMarketplaceData } from 'redux/hooks'
import { encryptCookie, decryptCookie } from 'utils/cookie'

export interface LandingProps {
  capsDollarValue?: number
  recentNFTs: NftType[]
  mostFollowedUsers: UserType[]
  popularNfts: NftType[]
  bestSellingNfts: NftType[]
  topSellersUsers: UserType[]
  totalCountNFT: number
}
const LandingPage = ({
  capsDollarValue,
  recentNFTs,
  mostFollowedUsers,
  popularNfts,
  bestSellingNfts,
  topSellersUsers,
  totalCountNFT,
}: LandingProps) => {
  const dispatch = useDispatch()
  const { name } = useMarketplaceData()

  useEffect(() => {
    let shouldUpdate = true
    const params = new URLSearchParams(window.location.search)
    if (
      Boolean(window.isRNApp) &&
      Boolean(window.walletId) &&
      (!Cookies.get('token') || decryptCookie(Cookies.get('token') as string) !== window.walletId)
    ) {
      if (params.get('walletId') && params.get('walletId') !== window.walletId) {
        dispatch(appSetUser(null))
      }
      Cookies.remove('token')
      getUser(window.walletId, true)
        .then((user) => {
          if (shouldUpdate) {
            dispatch(appSetUser(user))
            Cookies.set('token', encryptCookie(window.walletId), { expires: 1 })
          }
        })
        .catch((error) => console.log({ error }))
    }
    if (!Boolean(window.isRNApp) && params.get('walletId')) {
      dispatch(appSetUser(null))
    }

    return () => {
      shouldUpdate = false
    }
  }, [dispatch])

  return (
    <>
      <Head>
        <title>{name} - Welcome</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
        <meta property="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader />
      <Landing
        capsDollarValue={capsDollarValue}
        recentNFTs={recentNFTs}
        mostFollowedUsers={mostFollowedUsers}
        popularNfts={popularNfts}
        bestSellingNfts={bestSellingNfts}
        topSellersUsers={topSellersUsers}
        totalCountNFT={totalCountNFT}
      />
      <Footer />
      <FloatingHeader />
    </>
  )
}
export async function getServerSideProps() {
  let mostFollowedUsers: UserType[] = [],
    recentNFTs: NftType[] = [],
    bestSellingNfts: NftType[] = [],
    topSellersUsers: UserType[] = [],
    popularNfts: NftType[] = [],
    totalCountNFT = 0,
    capsDollarValue: number | null = null
  const promises = []

  promises.push(
    new Promise<void>((success) => {
      getMostFollowedUsers('1', '12', true)
        .then((result) => {
          mostFollowedUsers = result.data
          success()
        })
        .catch((error) => console.log(error))
    })
  )
  promises.push(
    new Promise<void>((success) => {
      getTopSellersUsers('1', '12', true)
        .then((result) => {
          topSellersUsers = result.data
          success()
        })
        .catch((error) => console.log(error))
    })
  )
  promises.push(
    new Promise<void>((success) => {
      getNFTs('1', '6', { listed: true }, undefined, true)
        .then((result) => {
          recentNFTs = result.data
          success()
        })
        .catch((error) => console.log(error))
    })
  )
  promises.push(
    new Promise<void>((success) => {
      getMostLikedNFTs('1', '6', true)
        .then((result) => {
          popularNfts = result.data
          success()
        })
        .catch((error) => console.log(error))
    })
  )
  promises.push(
    new Promise<void>((success) => {
      getMostSoldSeries('1', '6', true)
        .then((result) => {
          bestSellingNfts = result.data
          success()
        })
        .catch((error) => console.log(error))
    })
  )
  promises.push(
    new Promise<void>((success) => {
      getCapsValue()
        .then((value) => {
          capsDollarValue = value
          success()
        })
        .catch((error) => console.log(error))
    })
  )
  promises.push(
    new Promise<void>((success) => {
      getTotalOnSaleOnMarketplace()
        .then((value) => {
          totalCountNFT = value
          success()
        })
        .catch((error) => console.log(error))
    })
  )
  await Promise.all(promises)

  return {
    props: {
      capsDollarValue,
      recentNFTs,
      mostFollowedUsers,
      popularNfts,
      bestSellingNfts,
      topSellersUsers,
      totalCountNFT,
    },
  }
}

export default LandingPage
