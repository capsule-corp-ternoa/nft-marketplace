import React, { useState, useEffect } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { getNFT } from 'actions/nft';
import { getCapsValue } from 'actions/caps';
import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import NFTPage from 'components/pages/NFT';
import { NftType, UserType } from 'interfaces';
import { useApp } from 'redux/hooks';
import { decryptCookie, setUserFromDApp } from 'utils/cookie';
import { getUserIp } from 'utils/functions';
import { MARKETPLACE_ID } from 'utils/constant';

export interface NFTPageProps {
  user: UserType;
  NFT: NftType;
  capsValue: number;
}

const NftPage = ({ user, NFT, capsValue }: NFTPageProps) => {
  const [type, setType] = useState<string | null>(null);
  const [walletUser, setWalletUser] = useState(user);
  const [isUserFromDappQR, setIsUserFromDappQR] = useState(false);

  const { name } = useApp();

  useEffect(() => {
    setUserFromDApp(setWalletUser, setIsUserFromDappQR);
  }, []);

  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(NFT.properties?.preview.ipfs!, { method: 'HEAD' });
        setType(res.headers.get('Content-Type'));
        return res;
      } catch (err) {
        console.log('Error :', err);
      }
    }

    callBack();
  }, []);

  return (
    <>
      <Head>
        <title>
          {NFT.title} - {name}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={NFT.description} />
        <meta name="og:image" content={NFT.properties?.preview.ipfs} />
        <meta property="og:image" content={NFT.properties?.preview.ipfs} />
      </Head>

      <BetaBanner />
      <MainHeader user={walletUser} />
      <NFTPage NFT={NFT} user={walletUser} type={type} capsValue={capsValue} isUserFromDappQR={isUserFromDappQR} />
      <Footer />
      <FloatingHeader user={user} />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user: UserType | null = null,
    NFT: NftType | null = null,
    capsValue: number = 0;
  const promises = [];
  let ip = getUserIp(ctx.req);
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token, true)
          .then((_user) => {
            user = _user;
            success();
          })
          .catch(success);
      })
    );
  }
  promises.push(
    new Promise<void>((success) => {
      getNFT(ctx.query.name as string, true, token ? token : null, ip, MARKETPLACE_ID, true)
        .then((_nft) => {
          NFT = _nft;
          success();
        })
        .catch(success);
    })
  );
  promises.push(
    new Promise<void>((success) => {
      getCapsValue()
        .then((_value) => {
          capsValue = _value;
          success();
        })
        .catch(success);
    })
  );
  await Promise.all(promises);
  if (!NFT) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user, NFT, capsValue },
  };
}

export default NftPage;
