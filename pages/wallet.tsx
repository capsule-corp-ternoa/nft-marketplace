import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Wallet from 'components/pages/Wallet';
import NotAvailableModal from 'components/base/NotAvailable';

import { getUser } from 'actions/user';
import { UserType } from 'interfaces';

export interface WalletPageProps {
  user: UserType;
}

const WalletPage: React.FC<WalletPageProps> = ({ user }) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  return (
    <>
      <Head>
        <title>SecretNFT - Wallet</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ternoa Wallet" />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Wallet
        user={user}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
      />
    </>
  );
};

export async function getServerSideProps() {
  const user = await getUser();
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: { user },
  };
}

export default WalletPage;
