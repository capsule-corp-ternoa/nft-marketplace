import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Create from 'components/pages/Create';
import ModalMint from 'components/pages/Create/ModalMint';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface CreatePageProps {
  user: UserType;
}

const CreatePage: React.FC<CreatePageProps> = ({ user }) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [payload, setPayload] = useState(null);

  return (
    <>
      <Head>
        <title>SecretNFT - Create your NFT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      {modalCreate && (
        <ModalMint
          setPayload={setPayload}
          payload={payload}
          setModalCreate={setModalCreate}
        />
      )}
      <AlphaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      <Create
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        setModalCreate={setModalCreate}
        setPayload={setPayload}
        user={user}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  try {
    const token = cookies(ctx).token;
    if (token) {
      user = await getUser();
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: { user },
  };
}

export default CreatePage;
