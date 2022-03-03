import React from 'react'
import Head from 'next/head'
import cookies from 'next-cookies'

import BetaBanner from 'components/base/BetaBanner'
import FloatingHeader from 'components/base/FloatingHeader'
import Footer from 'components/base/Footer'
import MainHeader from 'components/base/MainHeader'
import { Profile } from 'components/pages/Profile'
import { getOwnedNFTS } from 'actions/nft'
import { getUser } from 'actions/user'
import { NftType, UserType } from 'interfaces'
import { appSetUser } from 'redux/app'
import { useMarketplaceData } from 'redux/hooks'
import { wrapper } from 'redux/store'
import { decryptCookie } from 'utils/cookie'

export interface ProfilePageProps {
  owned: NftType[]
  ownedHasNextPage: boolean
  user: UserType
}

const ProfilePage = ({ owned, ownedHasNextPage, user }: ProfilePageProps) => {
  const { name } = useMarketplaceData()

  return (
    <>
      <Head>
        <title>{name} - My account</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ternoa - Your profile." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader />
      <Profile user={user} userOwnedlNfts={owned} userOwnedNftsHasNextPage={ownedHasNextPage} />
      <Footer />
      <FloatingHeader />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string)
  let user: UserType | null = null,
    owned: NftType[] = [],
    ownedHasNextPage = false
  const promises = []
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token, true)
          .then((_user) => {
            user = _user
            store.dispatch(appSetUser(_user))
            success()
          })
          .catch(success)
      })
    )
    promises.push(
      new Promise<void>((success) => {
        getOwnedNFTS(token, false, undefined, undefined, undefined)
          .then((result) => {
            owned = result.data
            ownedHasNextPage = result.hasNextPage || false
            success()
          })
          .catch(success)
      })
    )
  }
  await Promise.all(promises)

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
      owned,
      ownedHasNextPage,
    },
  }
})

export default ProfilePage
