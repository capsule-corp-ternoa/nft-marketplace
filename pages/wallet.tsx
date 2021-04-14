import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Wallet from 'components/pages/Wallet';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';

const WalletPage = ({ user }: any) => {
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

export async function getServerSideProps(ctx: any) {
  let user = null;
  try {
    const token = cookies(ctx).token;
    if (token) {
      user = await getUser(token);
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
    props: { user },
  };
}

export default WalletPage;
