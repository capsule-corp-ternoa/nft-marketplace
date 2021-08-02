import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import Landing from 'components/pages/Landing';
import TernoaWallet from 'components/base/TernoaWallet';
import NotAvailableModal from 'components/base/NotAvailable';

import arrayShuffle from 'array-shuffle';
import cookies from 'next-cookies';

import { getUser, getUsers } from 'actions/user';
import { getCategoryNFTs } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface LandingProps {
  user: UserType;
  users: UserType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  betaNfts: NftType[];
  NFTCreators: NftType[];
  totalCountNFT: number;
}

const LandingPage: React.FC<LandingProps> = ({
  user,
  users,
  popularNfts,
  bestSellingNfts,
  betaNfts,
  NFTCreators,
  totalCountNFT,
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
        <title>SecretNFT - Welcome</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
        <meta property="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <Landing
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        user={user}
        users={users}
        popularNfts={popularNfts}
        bestSellingNfts={bestSellingNfts}
        betaNfts={betaNfts}
        NFTCreators={NFTCreators}
        totalCountNFT={totalCountNFT}
      />
    </>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token;
  // category code for beta testers NFTs
  const BETA_CODE = '001';
  let users: any[] = [], user = null, regularNfts: any[] = [], betaNfts: any[] = [];
  const promises = [];
  promises.push(new Promise<any>((success) => {
    getUsers().then(_users => {
      users = _users
      success();
    }).catch(success);
  }));
  if (token) {
    promises.push(new Promise<any>((success) => {
      getUser(token).then(_user => {
        user = _user
        success();
      }).catch(success);
    }));
  }
  promises.push(new Promise<any>((success) => {
    getCategoryNFTs().then(_regularNfts => {
      regularNfts = _regularNfts
      success();
    }).catch(success);
  }));
  promises.push(new Promise<any>((success) => {
    getCategoryNFTs(BETA_CODE).then(_betaNfts => {
      betaNfts = _betaNfts
      success();
    }).catch(success);
  }));
  await Promise.all(promises);
  console.log('users, user, regularNfts, betaNfts', users, user, regularNfts, betaNfts)
  users = arrayShuffle(users);
  betaNfts = arrayShuffle(betaNfts || []).slice(0, 8);
  let popularNfts = arrayShuffle((regularNfts || []).slice(0, 8));
  let bestSellingNfts = arrayShuffle((regularNfts || []).slice(9, 17));
  let NFTCreators = arrayShuffle((regularNfts || []).slice(18, 21));
  let totalCountNFT = (regularNfts || []).length + (betaNfts || []).length;
  return {
    props: {
      user,
      users,
      popularNfts,
      bestSellingNfts,
      NFTCreators,
      betaNfts,
      totalCountNFT,
    },
  }
}

export default LandingPage;
