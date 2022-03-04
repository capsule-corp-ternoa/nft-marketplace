import React from 'react'
import Head from 'next/head'
import cookies from 'next-cookies'

import BetaBanner from 'components/base/BetaBanner'
import FloatingHeader from 'components/base/FloatingHeader'
import Footer from 'components/base/Footer'
import MainHeader from 'components/base/MainHeader'
import Edit from 'components/pages/Edit'

import { getUser } from 'actions/user'
import { UserType } from 'interfaces'
import { appSetUser } from 'redux/app'
import { useMarketplaceData } from 'redux/hooks'
import { wrapper } from 'redux/store'
import { decryptCookie } from 'utils/cookie'

interface EditPageProps {
  user: UserType
}

const EditPage = ({ user }: EditPageProps) => {
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
      <Edit user={user} />
      <Footer />
      <FloatingHeader />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string)
  let user: UserType | null = null

  if (token) {
    try {
      user = await getUser(token, true)
      store.dispatch(appSetUser(user))
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) {
    return {
      notFound: true,
    }
  }

  return { props: { user } }
})

export default EditPage
