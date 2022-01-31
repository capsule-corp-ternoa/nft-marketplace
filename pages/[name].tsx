import React from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import cookies from 'next-cookies';

import { getProfile } from 'actions/user';
import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import Profile, { ARTIST_PROFILE_VARIANT } from 'components/pages/Profile';
import { UserType, FOLLOWERS_TAB, FOLLOWED_TAB, NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB } from 'interfaces';
import { useMarketplaceData } from 'redux/hooks';
import { decryptCookie } from 'utils/cookie';
import { getUserIp } from 'utils/functions';
import { middleEllipsis } from 'utils/strings';

export interface PublicProfileProps {
  profile: UserType;
}

const ORDERED_TABS_ID = [NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB, FOLLOWERS_TAB, FOLLOWED_TAB] as const;

const PublicProfilePage = ({ profile }: PublicProfileProps) => {
  const { name: appName } = useMarketplaceData();
  const { name, walletId } = profile;

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
      <Profile artist={profile} tabs={ORDERED_TABS_ID} variant={ARTIST_PROFILE_VARIANT} />
      <Footer />
      <FloatingHeader />
    </>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  const ip = getUserIp(ctx.req);
  let profile: UserType | null = null;

  try {
    profile = await getProfile(ctx.query.name as string, token ? token : null, ip);
  } catch (error) {
    console.log(error);
  }

  if (!profile) {
    return {
      notFound: true,
    };
  }
  return {
    props: { profile },
  };
}

export default PublicProfilePage;
