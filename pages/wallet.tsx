import React, { useState } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Wallet from 'components/pages/Wallet';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

export interface WalletPageProps {
  user: UserType;
  token: string;
}

const WalletPage = ({ user }: WalletPageProps) => {
  const [modalExpand, setModalExpand] = useState(false);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} - Wallet</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ternoa Wallet" />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      <BetaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Wallet
        user={user}
        setModalExpand={setModalExpand}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  if (token) user = await getUser(token).catch(() => null);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user },
  };
}

export default WalletPage;
