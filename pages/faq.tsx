import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import NotAvailableModal from 'components/base/NotAvailable';
import FAQ from 'components/pages/FAQ';
import cookies from 'next-cookies';
import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface FAQProps {
  user: UserType;
}

const FAQPage: React.FC<FAQProps> = ({ user }) => {
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
        <title>SecretNFT - FAQ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="FAQ page of SecretNFT, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <FAQ
        user={walletUser}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  const token = cookies(ctx).token || ctx.query.walletId as string;
  if (token) user = await getUser(token).catch(() => null);
  return {
    props: { user },
  };
}

export default FAQPage;
