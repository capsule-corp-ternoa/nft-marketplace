import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Create from 'components/pages/Create';
import ModalMint from 'components/pages/Create/ModalMint';
import cookies from 'next-cookies';
import Router from 'next/router';
import { getCategories } from 'actions/category';
import { getUser } from 'actions/user';
import { CategoryType, UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

export interface CreatePageProps {
  categories: CategoryType[];
  user: UserType;
}

export interface NFTProps {
  categories: CategoryType[];
  description: string;
  name: string;
  quantity: number;
  royalties: number;
  seriesId: string;
}

const CreatePage = ({ categories, user }: CreatePageProps) => {
  const isNftCreationEnabled =
    process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === undefined
      ? true
      : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true';

  const [error, setError] = useState('');
  const [modalExpand, setModalExpand] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [previewNFT, setPreviewNFT] = useState<File | null>(null); // Public NFT media
  const [output, setOutput] = useState<string[]>([]);
  const [originalNFT, setOriginalNFT] = useState<File | null>(null); // Crypted NFT media
  const [uploadSize, setUploadSize] = useState(0);
  const [thumbnailTimecode, setThumbnailTimecode] = useState(0)
  const [NFTData, setNFTData] = useState<NFTProps>({
    categories: [],
    description: '',
    name: '',
    quantity: 1,
    royalties: 0,
    seriesId: '',
  });
  const { quantity } = NFTData;
  const [QRData, setQRData] = useState({
    walletId: user ? user.walletId : '',
    quantity: quantity,
  });
  const [runNFTMintData, setRunNFTMintData] = useState<any>(null);
  useEffect(() => {
    if (!isNftCreationEnabled) {
      Router.push('/');
    }
  }, [isNftCreationEnabled]);

  useEffect(() => {
    if (originalNFT && quantity && Number(quantity) > 0) {
      const previewSize = previewNFT ? previewNFT.size : originalNFT.size;
      const originalSize = originalNFT.size * Number(quantity);
      setUploadSize(previewSize + originalSize);
    }
  }, [quantity, previewNFT, originalNFT]);

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_APP_NAME
            ? process.env.NEXT_PUBLIC_APP_NAME
            : 'SecretNFT'}{' '}
          - Create your NFT
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <>
        {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
        {modalCreate && (
          <ModalMint
            error={error}
            previewNFT={previewNFT}
            NFTData={NFTData}
            output={output}
            QRData={QRData}
            runNFTMintData={runNFTMintData}
            originalNFT={originalNFT}
            uploadSize={uploadSize}
            setError={setError}
            setModalCreate={setModalCreate}
            setRunNFTMintData={setRunNFTMintData}
            thumbnailTimecode={thumbnailTimecode}
          />
        )}
        <BetaBanner />
        <MainHeader user={user} setModalExpand={setModalExpand} />
        {isNftCreationEnabled && (
          <Create
            categoriesOptions={categories}
            NFTData={NFTData}
            originalNFT={originalNFT}
            QRData={QRData}
            user={user}
            setError={setError}
            setModalExpand={setModalExpand}
            setModalCreate={setModalCreate}
            setNFTData={setNFTData}
            setOutput={setOutput}
            setOriginalNFT={setOriginalNFT}
            setPreviewNFT={setPreviewNFT}
            setQRData={setQRData}
            thumbnailTimecode={thumbnailTimecode}
            setThumbnailTimecode={setThumbnailTimecode}
          />
        )}
      </>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let categories: CategoryType[] = [];
  let user = null;

  const promises = [];

  const token =
    cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token)
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
      getCategories()
        .then((result) => {
          categories = result;
          success();
        })
        .catch(success);
    })
  );

  await Promise.all(promises);
  return {
    props: { categories, user },
  };
}

export default CreatePage;
