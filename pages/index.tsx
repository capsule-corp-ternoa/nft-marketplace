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
import { getUser, getUsers } from 'actions/user';
import { getNFTs } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { appSetUser } from 'redux/app';
import { useMarketplaceData } from 'redux/hooks';
import { encryptCookie, decryptCookie } from 'utils/cookie';

export interface LandingProps {
  users: UserType[];
  capsDollarValue?: number;
  heroNFTs: NftType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  NFTCreators: NftType[];
  totalCountNFT: number;
}
const LandingPage = ({
  users,
  capsDollarValue,
  heroNFTs,
  popularNfts,
  bestSellingNfts,
  NFTCreators,
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
        users={users}
        capsDollarValue={capsDollarValue}
        heroNFTs={heroNFTs}
        popularNfts={popularNfts}
        bestSellingNfts={bestSellingNfts}
        NFTCreators={NFTCreators}
        totalCountNFT={totalCountNFT}
      />
      <Footer />
      <FloatingHeader />
    </>
  );
};
export async function getServerSideProps() {
  let users: UserType[] = [],
    regularNfts: NftType[] = [],
    capsDollarValue: number | null = null;
  const promises = [];
  promises.push(
    new Promise<void>((success) => {
      getUsers(undefined, true)
        .then((result) => {
          users = result.data;
          success();
        })
        .catch(success);
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getNFTs(undefined, '1', '19', undefined, true, true)
        .then((result) => {
          regularNfts = result.data;
          success();
        })
        .catch(success);
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getCapsValue()
        .then((_value) => {
          capsDollarValue = _value;
          success();
        })
        .catch(success);
    })
  );
  await Promise.all(promises);
  users = arrayShuffle(users);
  let popularNfts = arrayShuffle((regularNfts || []).slice(0, 8));
  let heroNFTs = popularNfts.length > 3 ? arrayShuffle(popularNfts).slice(0, 3) : popularNfts; // TODO: Fetch dedicated data
  let bestSellingNfts = arrayShuffle((regularNfts || []).slice(8, 16));
  let NFTCreators = arrayShuffle((regularNfts || []).slice(16, 19));
  let totalCountNFT = (regularNfts || []).length;
  return {
    props: {
      users,
      capsDollarValue,
      heroNFTs,
      popularNfts,
      bestSellingNfts,
      NFTCreators,
      totalCountNFT,
    },
  };
}

export default LandingPage;
