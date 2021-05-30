import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import ModalBuy from 'components/pages/NFT/ModalBuy';
import TernoaWallet from 'components/base/TernoaWallet';
import NFTPage from 'components/pages/NFT';
import ModalShowcase from 'components/pages/NFT/ModalShowcase';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { getNFT } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface NFTPageProps {
  user: UserType;
  NFT: NftType;
}

const NftPage: React.FC<NFTPageProps> = ({ user, NFT }) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [exp, setExp] = useState(0);
  const [notAvailable, setNotAvailable] = useState(false);
  const [type, setType] = useState<string | null>(null);
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

  useEffect(() => {
    async function callBack() {
      try {
        let res = await fetch(NFT.media!.url, { method: 'HEAD' });
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
      document.body.classList.add('model-open');
    } else {
      document.body.classList.remove('model-open');
    }
  }, [exp]);

  return (
    <>
      <Head>
        <title>{NFT.name} - SecretNFT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={NFT.description} />
        <meta name="og:image" content={NFT.media.url} />
        <meta property="og:image" content={NFT.media.url} />
      </Head>
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      {[1, 2].indexOf(exp) !== -1 && (
        <ModalShowcase
          NFT={NFT}
          setExp={setExp}
          exp={exp}
          setModalExpand={() => setExp(3)}
          type={type}
          user={user}
        />
      )}
      {exp === 3 && <ModalBuy setModalExpand={() => setExp(0)} id={NFT.id} />}
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}

      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <NFTPage
        NFT={NFT}
        setExp={setExp}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        user={walletUser}
        type={type}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  try {
    let user = null;
    try {
      const token = cookies(ctx).token;
      if (token) {
        user = await getUser(token);
      }
    } catch (error) {
      console.error(error);
    }
    let NFT = await getNFT(ctx.query.name as string);

    return {
      props: { user, NFT },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}

export default NftPage;
