import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import PublicProfile from 'components/pages/PublicProfile';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';

import { getUser, getProfile } from 'actions/user';
import { getProfileNFTS } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface PublicProfileProps {
  user: UserType;
  profile: UserType;
  data: NftType[];
}

const PublicProfilePage: React.FC<PublicProfileProps> = ({
  user,
  data,
  profile,
}) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [walletUser, setWalletUser] = useState(user);
  const [viewProfile, setViewProfile] = useState(profile);

  return (
    <>
      <Head>
        <title>SecretNFT - {viewProfile.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Ternoart - ${viewProfile.name} profile page.`}
        />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <PublicProfile
        user={walletUser}
        setUser={setWalletUser}
        profile={viewProfile}
        setProfile={setViewProfile}
        NFTS={data}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
      />
    </>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token || ctx.query.walletId as string;
  let user: UserType | null = null, profile: UserType | null = null, data: NftType[] = []
  const promises = [];
  if (token) {
    promises.push(new Promise<void>((success) => {
      getUser(token).then(_user => {
        user = _user
        success();
      }).catch(success);
    }));
  }
  promises.push(new Promise<void>((success) => {
    getProfile(ctx.query.name as string, token ? token : null).then(_profile => {
      profile = _profile
      success();
    }).catch(success);
  }));
  promises.push(new Promise<void>((success) => {
    getProfileNFTS(ctx.query.name as string).then(_nfts => {
      data = _nfts
      success();
    }).catch(success);
  }));
  await Promise.all(promises)
  if (!profile) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: { user, profile, data },
  };
}

export default PublicProfilePage;
