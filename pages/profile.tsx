import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile from 'components/pages/Profile';
import Creators from 'utils/mocks/mockCreators';
import NotAvailableModal from 'components/base/NotAvailable';

import { getUser } from 'actions/user';
import { getNFTS } from 'actions/nft';

const ProfilePage = ({ user, data }: any) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  return (
    <>
      <Head>
        <title>SecretNFT - {user.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:description" content="Ternoa - Your profile." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Profile
        user={user}
        NFTS={data}
        creators={Creators}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
      />
    </>
  );
};

export async function getServerSideProps() {
  const user = await getUser();
  const res = await getNFTS();
  let data = await res.json();

  data = data.filter((item: any) => item.media);

  return {
    props: { user, data },
  };
}

export default ProfilePage;
