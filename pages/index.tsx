import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import Landing from 'components/pages/Landing';
import TernoaWallet from 'components/base/TernoaWallet';
import NotAvailableModal from 'components/base/NotAvailable';

import arrayShuffle from 'array-shuffle';

import { getUser, getUsers } from 'actions/user';
import { getNFTS } from 'actions/nft';

const LandingPage: React.FC<any> = ({
  user,
  users,
  NFTSET1,
  NFTSET2,
  NFTCreators,
}) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
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
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Landing
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        user={user}
        users={users}
        NFTSET1={NFTSET1}
        NFTSET2={NFTSET2}
        NFTCreators={NFTCreators}
      />
    </>
  );
};

export async function getServerSideProps() {
  let users = await getUsers().catch(() => []);

  const user = await getUser();
  let data = await getNFTS().catch(() => []);

  users = arrayShuffle(users);

  data = data.filter((item: any) => item.media);
  data = data.filter((item: any) => item.listed === 1);

  let NFTSET1 = arrayShuffle(data.slice(0, 8));
  let NFTSET2 = arrayShuffle(data.slice(9, 17));

  let NFTCreators = arrayShuffle(data.slice(18, 21));

  return {
    props: { user, users, NFTSET1, NFTSET2, NFTCreators },
  };
}

export default LandingPage;
