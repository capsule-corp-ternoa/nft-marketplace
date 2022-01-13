import React, { useState } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile, { USER_PERSONNAL_PROFILE_VARIANT } from 'components/pages/Profile';
import SuccessPopup from 'components/base/SuccessPopup';
import { getOwnedNFTS } from 'actions/nft';
import cookies from 'next-cookies';
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
import { NextPageContext } from 'next';
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
  const [modalExpand, setModalExpand] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : 'SecretNFT'} - My account</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ternoa - Your profile." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {successPopup && <SuccessPopup setSuccessPopup={setSuccessPopup} />}
      <BetaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Profile
        user={user}
        userOwnedlNfts={owned}
        userOwnedNftsHasNextPage={ownedHasNextPage}
        tabs={ORDERED_TABS_ID}
        variant={USER_PERSONNAL_PROFILE_VARIANT}
      />
      <Footer />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </>
  );
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
