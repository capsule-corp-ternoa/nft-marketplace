import React, { useState } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import cookies from 'next-cookies';

import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import SuccessPopup from 'components/base/SuccessPopup';
import TernoaWallet from 'components/base/TernoaWallet';
import Edit from 'components/pages/Edit';

import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { decryptCookie } from 'utils/cookie';

export interface EditPageProps {
  user: UserType;
  token: string;
}

const EditPage = ({ user }: EditPageProps) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_APP_NAME
            ? process.env.NEXT_PUBLIC_APP_NAME
            : 'SecretNFT'}{' '}
          - My account
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ternoa - Your profile." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {successPopup && <SuccessPopup setSuccessPopup={setSuccessPopup} />}
      <BetaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Edit user={user} setSuccessPopup={setSuccessPopup} />
      <Footer />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  const token =
    cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  if (token) user = await getUser(token).catch(() => null);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user },
  };
}

export default EditPage;
