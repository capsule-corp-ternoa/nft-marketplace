import React from 'react'
import { NextPageContext } from 'next'
import Head from 'next/head'
import cookies from 'next-cookies'

import { getProfile } from 'actions/user'
import BetaBanner from 'components/base/BetaBanner'
import FloatingHeader from 'components/base/FloatingHeader'
import Footer from 'components/base/Footer'
import MainHeader from 'components/base/MainHeader'
import { ArtistProfile } from 'components/pages/Profile'
import { UserType } from 'interfaces'
import { useMarketplaceData } from 'redux/hooks'
import { decryptCookie } from 'utils/cookie'
import { getUserIp } from 'utils/functions'
import { middleEllipsis } from 'utils/strings'

export interface PublicProfileProps {
  profile: UserType
}

const PublicProfilePage = ({ profile }: PublicProfileProps) => {
  const { name: appName } = useMarketplaceData()
  const { name, walletId } = profile

  return (
    <>
      <Head>
        <title>
          {appName} - {name || middleEllipsis(walletId, 10)}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Ternoart - ${name || middleEllipsis(walletId, 10)} profile page.`} />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader />
      <ArtistProfile artist={profile} />
      <Footer />
      <FloatingHeader />
    </>
  )
}
export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string)
  const ip = getUserIp(ctx.req)
  let profile: UserType | null = null

  try {
    profile = await getProfile(ctx.query.name as string, token ? token : null, ip)
  } catch (error) {
    console.log(error)
  }

  if (!profile) {
    return {
      notFound: true,
    }
  }
  return {
    props: { profile },
  }
}

export default PublicProfilePage
