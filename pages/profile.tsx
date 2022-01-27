import React from 'react';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Head from 'next/head';

import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import Profile, { USER_PERSONNAL_PROFILE_VARIANT } from 'components/pages/Profile';
import { getOwnedNFTS } from 'actions/nft';
import { getUser } from 'actions/user';
import {
  NftType,
  UserType,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
  NFT_OWNED_TAB,
} from 'interfaces';
import { useApp } from 'redux/hooks';
import { decryptCookie } from 'utils/cookie';


export interface ProfilePageProps {
  user: UserType;
  owned: NftType[];
  ownedHasNextPage: boolean;
  loading: boolean;
}

const ORDERED_TABS_ID = [
  NFT_OWNED_TAB,
  NFT_ON_SALE_TAB,
  NFT_NOT_FOR_SALE_TAB,
  NFT_CREATED_TAB,
  NFT_LIKED_TAB,
  FOLLOWERS_TAB,
  FOLLOWED_TAB,
] as const;

const ProfilePage = ({ user, owned, ownedHasNextPage }: ProfilePageProps) => {
  const { name } = useApp();

  return <>
    <Head>
      <title>{name} - My account</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Ternoa - Your profile." />
      <meta name="og:image" content="ternoa-social-banner.jpg" />
    </Head>
    <BetaBanner />
    <MainHeader user={user} />
    <Profile
      user={user}
      userOwnedlNfts={owned}
      userOwnedNftsHasNextPage={ownedHasNextPage}
      tabs={ORDERED_TABS_ID}
      variant={USER_PERSONNAL_PROFILE_VARIANT}
    />
    <Footer />
    <FloatingHeader user={user} />
  </>
};

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user = null,
    owned: NftType[] = [],
    ownedHasNextPage: boolean = false;
  const promises = [];
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token, true)
          .then((_user) => {
            user = _user;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getOwnedNFTS(token, false, undefined, undefined, undefined)
          .then((result) => {
            owned = result.data;
            ownedHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
  }
  await Promise.all(promises);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user,
      owned,
      ownedHasNextPage,
    },
  };
}

export default ProfilePage;
