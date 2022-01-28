import React from 'react';
import Head from 'next/head';

import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import Wallet from 'components/pages/Wallet';

import { UserType } from 'interfaces';
import { useMarketplaceData } from 'redux/hooks';

export interface WalletPageProps {
  user: UserType;
  token: string;
}

const WalletPage = ({ user }: WalletPageProps) => {
  const { name } = useMarketplaceData();
  
  return <>
    <Head>
      <title>{name} - Wallet</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Ternoa Wallet" />
      <meta name="og:image" content="ternoa-social-banner.jpg" />
    </Head>
    <BetaBanner />
    <MainHeader />
    <Wallet user={user} />
    <Footer />
    <FloatingHeader />
  </>
}

export default WalletPage;
