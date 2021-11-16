import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';
import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';
import { useRouter } from 'next/router';
import Success from 'components/pages/Success';

export interface SuccessProps {
  user: UserType
}

const SuccessPage: React.FC<SuccessProps> = ({ user }) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const router = useRouter();
  const {title, text, buttonText, returnUrl, isRedirect} = router.query
  console.log(title, text, buttonText, returnUrl, isRedirect)
  console.log(typeof isRedirect)
  useEffect(() => {
    if (!(title && buttonText && returnUrl && isRedirect!==undefined)){
      router.push("/")
    }
  }, [])
  useEffect(() => {
    if (isRedirect === "true"){
      setTimeout(() => {
        router.push(String(returnUrl))
      }, 5000)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Success page of SecretNFT, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <BetaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Success
        user={user}
        title={String(title)}
        text={text ? String(text) : undefined}
        buttonText={String(buttonText)}
        returnUrl={String(returnUrl)}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  if (token) user = await getUser(token).catch(() => null);
  return {
    props: { user },
  };
}

export default SuccessPage;
