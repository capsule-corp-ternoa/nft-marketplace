import React, { useEffect } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import FloatingHeader from 'components/base/FloatingHeader';
import Footer from 'components/base/Footer';
import MainHeader from 'components/base/MainHeader';
import cookies from 'next-cookies';
import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';
import { useRouter } from 'next/router';
import Success from 'components/pages/Success';
import { useApp } from 'redux/hooks';

export interface SuccessProps {
  user: UserType;
}

const SuccessPage = ({ user }: SuccessProps) => {
  const { name } = useApp();
  const router = useRouter();
  const { title, text, buttonText, returnUrl, isRedirect, subText } = router.query;
  useEffect(() => {
    if (!(title && buttonText && returnUrl && isRedirect !== undefined)) {
      router.push('/');
    }
  }, []);
  useEffect(() => {
    if (isRedirect === 'true') {
      setTimeout(() => {
        router.push(String(returnUrl));
      }, 5000);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Success page of SecretNFT, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader user={user} />
      <Success
        title={String(title)}
        text={text ? String(text) : undefined}
        buttonText={String(buttonText)}
        returnUrl={String(returnUrl)}
        subText={subText ? String(subText) : undefined}
      />
      <Footer />
      <FloatingHeader user={user} />
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
