import React from 'react'
import Head from 'next/head'
import BetaBanner from 'components/base/BetaBanner'
import Footer from 'components/base/Footer'
import FloatingHeader from 'components/base/FloatingHeader'
import MainHeader from 'components/base/MainHeader'
import FAQ from 'components/pages/FAQ'
import { useMarketplaceData } from 'redux/hooks'

const FAQPage = () => {
  const { name } = useMarketplaceData()

  return (
    <>
      <Head>
        <title>{name} - FAQ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="FAQ page of SecretNFT, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader />
      <FAQ />
      <Footer />
      <FloatingHeader />
    </>
  )
}

export default FAQPage
