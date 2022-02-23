import React, { useEffect } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import Landing from 'components/pages/Landing';
import arrayShuffle from 'array-shuffle';

import { getCapsValue } from 'actions/caps';
import { getUser, getMostFollowedUsers, getTopSellersUsers } from 'actions/user';
import { getMostLikedNFTs, getMostSoldSeries, getTotalOnSaleOnMarketplace } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { appSetUser } from 'redux/app';
import { useMarketplaceData } from 'redux/hooks';
import { encryptCookie, decryptCookie } from 'utils/cookie';

export interface LandingProps {
  capsDollarValue?: number;
  heroNFTs: NftType[];
  mostFollowedUsers: UserType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  topSellersUsers: UserType[];
  totalCountNFT: number;
}
const LandingPage = ({
  capsDollarValue,
  heroNFTs,
  mostFollowedUsers,
  popularNfts,
  bestSellingNfts,
  topSellersUsers,
  totalCountNFT,
}: LandingProps) => {
  const dispatch = useDispatch();
  const { name } = useMarketplaceData();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      Boolean(window.isRNApp) &&
      Boolean(window.walletId) &&
      (!Cookies.get('token') || decryptCookie(Cookies.get('token') as string) !== window.walletId)
    ) {
      if (params.get('walletId') && params.get('walletId') !== window.walletId) {
        dispatch(appSetUser(null));
      }
      Cookies.remove('token');
      getUser(window.walletId, true)
        .then((user) => {
          dispatch(appSetUser(user));
          Cookies.set('token', encryptCookie(window.walletId), { expires: 1 });
        })
        .catch((error) => console.log({ error }));
    }
    if (!Boolean(window.isRNApp) && params.get('walletId')) {
      dispatch(appSetUser(null));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{name} - Welcome</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
        <meta property="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader />
      <Landing
        capsDollarValue={capsDollarValue}
        heroNFTs={heroNFTs}
        mostFollowedUsers={mostFollowedUsers}
        popularNfts={popularNfts}
        bestSellingNfts={bestSellingNfts}
        topSellersUsers={topSellersUsers}
        totalCountNFT={totalCountNFT}
      />
      <Footer />
      <FloatingHeader />
    </>
  );
};
export async function getServerSideProps() {
  let mostFollowedUsers: UserType[] = [],
    bestSellingNfts: NftType[] = [],
    topSellersUsers: UserType[] = [],
    popularNfts: NftType[] = [],
    totalCountNFT: number = 0,
    capsDollarValue: number | null = null;
  const promises = [];

  promises.push(
    new Promise<void>((success) => {
      getMostFollowedUsers()
        .then((result) => {
          mostFollowedUsers = result.data;
          success();
        })
        .catch(error => console.log(error));
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getTopSellersUsers()
        .then((result) => {
          topSellersUsers = result.data;
          success();
        })
        .catch(error => console.log(error));
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getMostLikedNFTs("1", "6")
        .then((result) => {
          popularNfts = result.data;
          success();
        })
        .catch(error => console.log(error));
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getMostSoldSeries("1", "6")
        .then((result) => {
          bestSellingNfts = result.data;
          success();
        })
        .catch(error => console.log(error));
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getCapsValue()
        .then((value) => {
          capsDollarValue = value;
          success();
        })
        .catch(error => console.log(error));
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getTotalOnSaleOnMarketplace()
        .then((value) => {
          totalCountNFT = value;
          success();
        })
        .catch(error => console.log(error));
    })
  );
  await Promise.all(promises);
  
  const heroNFTs = popularNfts.length > 3 ? arrayShuffle(popularNfts).slice(0, 3) : popularNfts; // TODO: Fetch dedicated data when bid is implemented

  return {
    props: {
      capsDollarValue,
      heroNFTs,
      mostFollowedUsers,
      popularNfts,
      bestSellingNfts,
      topSellersUsers,
      totalCountNFT,
    },
  };
}

export default LandingPage;
