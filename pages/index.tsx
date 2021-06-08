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
import { getNFTS } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface LandingProps {
  user: UserType;
  users: UserType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  betaNfts: NftType[];
  NFTCreators: NftType[];
  series: { [serieId: string]: number };
}

const LandingPage: React.FC<LandingProps> = ({
  user,
  users,
  popularNfts,
  bestSellingNfts,
  betaNfts,
  NFTCreators,
  series,
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
        series={series}
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

  let [data, series] = await getNFTS().catch(() => [[], {}]);

  users = arrayShuffle(users);

  let betaNfts: NftType[] = [];
  let regularNfts: NftType[] = [];

  data.forEach((nft: NftType) => {
    if (nft.price === '2000000000000000000') betaNfts.push(nft);
    else regularNfts.push(nft);
  });

  betaNfts = arrayShuffle(betaNfts).slice(0, 8);

  let popularNfts = arrayShuffle(regularNfts.slice(0, 8));
  let bestSellingNfts = arrayShuffle(regularNfts.slice(9, 17));

  let NFTCreators = arrayShuffle(regularNfts.slice(18, 21));

  return {
    props: {
      user,
      users,
      popularNfts,
      bestSellingNfts,
      NFTCreators,
      betaNfts,
      series,
    },
  };
}

export default LandingPage;
