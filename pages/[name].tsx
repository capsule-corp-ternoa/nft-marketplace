import React, { useState } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import cookies from 'next-cookies';

import { getUser, getProfile } from 'actions/user';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile, { ARTIST_PROFILE_VARIANT } from 'components/pages/Profile';
import { UserType, FOLLOWERS_TAB, FOLLOWED_TAB, NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB } from 'interfaces';
import { decryptCookie } from 'utils/cookie';
import { getUserIp } from 'utils/functions';
import { middleEllipsis } from 'utils/strings';

export interface PublicProfileProps {
  user: UserType;
  profile: UserType;
}

const ORDERED_TABS_ID = [NFT_ON_SALE_TAB, NFT_NOT_FOR_SALE_TAB, FOLLOWERS_TAB, FOLLOWED_TAB] as const;

const PublicProfilePage = ({ user, profile }: PublicProfileProps) => {
  const { name, walletId } = profile;
  const [modalExpand, setModalExpand] = useState(false);

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : 'SecretNFT'} -{' '}
          {name || middleEllipsis(walletId, 10)}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Ternoart - ${name || middleEllipsis(walletId, 10)} profile page.`}
        />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      <BetaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Profile
        artist={profile}
        user={user}
        setModalExpand={setModalExpand}
        tabs={ORDERED_TABS_ID}
        variant={ARTIST_PROFILE_VARIANT}
      />
    </>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user: UserType | null = null,
    profile: UserType | null = null;
  const promises = [];
  let ip = getUserIp(ctx.req);
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
  }
  promises.push(
    new Promise<void>((success) => {
      getProfile(ctx.query.name as string, token ? token : null, ip)
        .then((_profile) => {
          profile = _profile;
          success();
        })
        .catch(success);
    })
  );
  await Promise.all(promises);
  if (!profile) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user, profile },
  };
}

export default PublicProfilePage;
