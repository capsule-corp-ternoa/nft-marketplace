import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import Landing from 'components/pages/Landing';
import TernoaWallet from 'components/base/TernoaWallet';
import NotAvailableModal from 'components/base/NotAvailable';

import arrayShuffle from 'array-shuffle';
import cookies from 'next-cookies';

import { getUser, getUsers } from 'actions/user';
import { getNFTS } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface LandingProps {
  user: UserType;
  users: UserType[];
  NFTSET1: NftType[];
  NFTSET2: NftType[];
  NFTCreators: NftType[];
}

const LandingPage: React.FC<LandingProps> = ({
  user,
  users,
  NFTSET1,
  NFTSET2,
  NFTCreators,
}) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  return (
    <>
      <Head>
        <title>SecretNFT - Welcome</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
        <meta property="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Landing
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        user={user}
        users={users}
        NFTSET1={NFTSET1}
        NFTSET2={NFTSET2}
        NFTCreators={NFTCreators}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  let users = await getUsers().catch(() => []);

  try {
    const token = cookies(ctx).token;
    if (token) {
      user = await getUser(token);
    }
  } catch (error) {
    console.error(error);
  }

  let data = await getNFTS().catch(() => []);

  users = arrayShuffle(users);

  data = data.filter((item: NftType) => item.listed === 1);

  let NFTSET1 = arrayShuffle(data.slice(0, 8));
  let NFTSET2 = arrayShuffle(data.slice(9, 17));

  let NFTCreators = arrayShuffle(data.slice(18, 21));

  return {
    props: { user, users, NFTSET1, NFTSET2, NFTCreators },
  };
}

export default LandingPage;
