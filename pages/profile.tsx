import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile from 'components/pages/Profile';
import Creators from 'utils/mocks/mockCreators';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { getProfileNFTS, getCreatorNFTS } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface ProfilePageProps {
  user: UserType;
  created: NftType[];
  owned: NftType[];
  ownedSeries: { [serieId: string]: number };
  createdSeries: { [serieId: string]: number };
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  created,
  owned,
  ownedSeries,
  createdSeries,
}) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [walletUser, setWalletUser] = useState(user);

  useEffect(() => {
    async function callBack() {
      try {
        let res = await getUser(window.walletId);
        setWalletUser(res);
      } catch (error) {
        console.error(error);
      }
    }
    if (window.isRNApp && window.walletId) callBack();
  }, []);

  return (
    <>
      <Head>
        <title>SecretNFT - My account</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ternoa - Your profile." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <Profile
        user={user}
        createdNFTS={created}
        ownedNFTS={owned}
        creators={Creators}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        ownedSeries={ownedSeries}
        createdSeries={createdSeries}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  let created: NftType[] = [];
  let owned: NftType[] = [];
  let createdSeries = {};
  let ownedSeries = {};
  try {
    const token = cookies(ctx).token;
    if (token) {
      user = await getUser(token);
      created = await getCreatorNFTS(token).catch(() => []);
      created = created.filter((item: NftType) => item.listed === 1);

      [owned, ownedSeries] = await getProfileNFTS(token).catch(() => []);
      owned = owned.filter((item: NftType) => item.listed === 1);
    }
  } catch (error) {
    console.error(error);
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: { user, created, owned, ownedSeries, createdSeries },
  };
}

export default ProfilePage;
