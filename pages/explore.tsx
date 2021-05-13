import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import Explore from 'components/pages/Explore';
import TernoaWallet from 'components/base/TernoaWallet';
import NotAvailableModal from 'components/base/NotAvailable';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { getNFTS } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface ExplorePage {
  user: UserType;
  data: NftType[];
}

const ExplorePage: React.FC<ExplorePage> = ({ user, data }) => {
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
        <title>SecretNFT - Explore</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
        <meta property="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <Explore NFTS={data} />
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={walletUser} setModalExpand={setModalExpand} />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  try {
    const token = cookies(ctx).token;
    if (token) {
      user = await getUser(token);
    }
  } catch (error) {
    console.error(error);
  }
  let data = await getNFTS().catch(() => []);

  data = data.filter((item: NftType) => item.listed === 1);

  return {
    props: { user, data },
  };
}

export default ExplorePage;
