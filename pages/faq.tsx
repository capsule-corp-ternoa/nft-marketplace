import React from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import MainHeader from 'components/base/MainHeader';
import FAQ from 'components/pages/FAQ';
import cookies from 'next-cookies';
import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { useApp } from 'redux/hooks';
import { decryptCookie } from 'utils/cookie';

export interface FAQProps {
  user: UserType;
}

const FAQPage = ({ user }: FAQProps) => {
  const { name } = useApp();

  return <>
    <Head>
      <title>{name} - FAQ</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="FAQ page of SecretNFT, by Ternoa." />
      <meta name="og:image" content="ternoa-social-banner.jpg" />
    </Head>
    <BetaBanner />
    <MainHeader user={user} />
    <FAQ />
    <Footer />
    <FloatingHeader user={user} />
  </>
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  if (token) user = await getUser(token).catch(() => null);
  return {
    props: { user },
  };
}

export default FAQPage;
