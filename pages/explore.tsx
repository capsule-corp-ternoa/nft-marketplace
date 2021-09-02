import React, { useState } from 'react';
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
import { getCategoryNFTs } from 'actions/nft';
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
      <Explore NFTS={data} user={walletUser} setUser={setWalletUser} />
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={walletUser} setModalExpand={setModalExpand} />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token || ctx.query.walletId as string;
  let user: UserType | null = null, data : NftType[] = [];
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
    getCategoryNFTs().then(_nfts => {
      data = _nfts
      success();
    }).catch(success);
  }));
  await Promise.all(promises);
  return {
    props: { user, data },
  };
}

export default ExplorePage;
