import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import ModalBuy from 'components/pages/NFT/ModalBuy';
import TernoaWallet from 'components/base/TernoaWallet';
import NFTPage from 'components/pages/NFT';
import ModalShowcase from 'components/pages/NFT/ModalShowcase';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { getNFT } from 'actions/nft';
import { getCapsValue } from 'actions/caps';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

import { onModelClose, onModelOpen } from '../../utils/model-helpers';
import { decryptCookie, setUserFromDApp } from 'utils/cookie';
import { getUserIp } from 'utils/functions';
import { MARKETPLACE_ID } from 'utils/constant';

export interface NFTPageProps {
  user: UserType;
  NFT: NftType;
  capsValue: number;
}

const NftPage = ({ user, NFT, capsValue }: NFTPageProps) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [exp, setExp] = useState(0);
  const [nftToBuy, setNftToBuy] = useState(NFT)
  const [type, setType] = useState<string | null>(null);
  const [walletUser, setWalletUser] = useState(user);
  const [isUserFromDappQR, setIsUserFromDappQR] = useState(false);

  useEffect(() => {
    setUserFromDApp(setWalletUser, setIsUserFromDappQR)
  }, []);

  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(NFT.image!, { method: 'HEAD' });
        setType(res.headers.get('Content-Type'));
        return res;
      } catch (err) {
        console.log('Error :', err);
      }
    }

    callBack();
  }, []);

  useEffect(() => {
    if (exp === 1 || exp === 2) {
      // we are showing a modal;
      onModelOpen();
    } else {
      onModelClose();
    }
  }, [exp]);

  return (
    <>
      <Head>
        <title>{NFT.title} - {process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={NFT.description} />
        <meta name="og:image" content={NFT.image} />
        <meta property="og:image" content={NFT.image} />
      </Head>
      {(exp===1 || exp===2) && (
        <ModalShowcase
          NFT={exp === 1 ? NFT : nftToBuy}
          setExp={setExp}
          exp={exp}
          setModalExpand={() => setExp(3)}
          type={type}
          user={walletUser}
        />
      )}
      {exp === 3 && <ModalBuy setModalExpand={() => setExp(0)} id={nftToBuy.id} />}
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}

      <BetaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <NFTPage
        NFT={NFT}
        setExp={setExp}
        setNftToBuy={setNftToBuy}
        setModalExpand={setModalExpand}
        user={walletUser}
        setUser={setWalletUser}
        type={type}
        capsValue={capsValue}
        isUserFromDappQR={isUserFromDappQR}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user: UserType | null = null, NFT: NftType | null = null, capsValue: number = 0
  const promises = [];
  let ip = getUserIp(ctx.req)
  if (token) {
    promises.push(new Promise<void>((success) => {
      getUser(token).then(_user => {
        user = _user
        success();
      }).catch(success);
    }));
  }
  promises.push(new Promise<void>((success) => {
    getNFT(ctx.query.name as string, true, token ? token : null, ip, false, MARKETPLACE_ID).then(_nft => {
      NFT = _nft
      success();
    }).catch(success);
  }));
  promises.push(new Promise<void>((success) => {
    getCapsValue().then(_value => {
      capsValue = _value
      success();
    }).catch(success);
  }));
  await Promise.all(promises);
  if (!NFT) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: { user, NFT, capsValue },
  };
}

export default NftPage;
