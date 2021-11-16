import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Create from 'components/pages/Create';
import Provider from 'components/pages/Create/CreateNftContext';
import { CreateNftStateType } from 'components/pages/Create/CreateNftContext/types';
import ModalMint from 'components/pages/Create/ModalMint';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';
import Router from 'next/router';
import { getUser } from 'actions/user';
import {
  NFT_EFFECT_DEFAULT,
  UserType,
} from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

const initialCreateNftData: CreateNftStateType = {
  blurredValue: 5,
  effect: NFT_EFFECT_DEFAULT,
  error: '',
  isRN: false,
  NFT: null,
  output: [],
  QRData: {
    walletId: '',
    quantity: 1,
  },
  secretNFT: null,
  uploadSize: 0,
};

export interface CreatePageProps {
  user: UserType;
}

export interface NFTProps {
  category?: string;
  description: string;
  name: string;
  quantity: number;
  royalties: number;
  seriesId: string;
}

const CreatePage: React.FC<CreatePageProps> = ({ user }) => {
  const isNftCreationEnabled = process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === undefined ? true : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true'
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [NFTData, setNFTData] = useState<NFTProps>({
    category: undefined,
    description: '',
    name: '',
    quantity: 1,
    royalties: 0,
    seriesId: '',
  });
  const [runNFTMintData, setRunNFTMintData] = useState<any>(null);

  useEffect(() => {
    if (!isNftCreationEnabled) {
      Router.push("/")
    }
  }, [isNftCreationEnabled])

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} - Create your NFT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <Provider createNftData={initialCreateNftData} >
        {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
        {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
        {modalCreate &&  (
          <ModalMint
            NFTData={NFTData}
            setModalCreate={setModalCreate}
            runNFTMintData={runNFTMintData}
            setRunNFTMintData={setRunNFTMintData}
          />
        )}
        <BetaBanner />
        <MainHeader user={user} setModalExpand={setModalExpand} />
        {isNftCreationEnabled &&
          <Create
            setModalExpand={setModalExpand}
            setNotAvailable={setNotAvailable}
            setModalCreate={setModalCreate}
            user={user}
            NFTData={NFTData}
            setNFTData={setNFTData}
          />
        }
      </Provider>
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

export default CreatePage;
