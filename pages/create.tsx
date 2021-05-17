import React, { useState, useEffect } from 'react';
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

import { imgToBlur, imgToWatermark } from 'utils/imageProcessing/image';

export interface CreatePageProps {
  user: UserType;
}

export interface NFTProps {
  name: string;
  description: string;
  quantity: number;
}

const CreatePage: React.FC<CreatePageProps> = ({ user }) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [select, setSelect] = useState('Select NFT Option');
  const [processed, setProcessed] = useState(false);
  //
  const [error, setError] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const [NFTData, setNFTData] = React.useState<NFTProps>({
    name: '',
    description: '',
    quantity: 1,
  });
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

  const [NFT, setNFT] = useState<File | null>(null);
  const [secretNFT, setSecretNFT] = useState<File | null>(null);
  const { name, description, quantity } = NFTData;
  const [QRData, setQRData] = useState({
    links: output,
    walletId: user ? user.walletId : '',
    fileHash: '',
    price: 1,
  });

  useEffect(() => {
    if (processed) {
      uploadNFT();
    }
  }, [processed]);

  async function processFile() {
    try {
      if (!secretNFT) {
        throw new Error();
      }
      if (select === 'Blur' && secretNFT.type.substr(0, 5) === 'image') {
        const processFile = new File([secretNFT], 'NFT', {
          type: secretNFT.type,
        });
        let res = await imgToBlur(processFile);
        const blob = await (await fetch(res as string)).blob();
        const file = new File([blob], secretNFT.name, {
          type: secretNFT.type,
        });
        setNFT(file);
        setProcessed(true);
      } else if (
        select === 'Protect' &&
        secretNFT.type.substr(0, 5) === 'image'
      ) {
        const processFile = new File([secretNFT], 'NFT', {
          type: secretNFT.type,
        });
        let res = await imgToWatermark(processFile);
        const blob = await (await fetch(res as string)).blob();
        const file = new File([blob], secretNFT.name, {
          type: secretNFT.type,
        });
        setNFT(file);
        setProcessed(true);
      }
    } catch (err) {
      setError('Please try again.');
      console.log(err);
    }
  }

  async function uploadNFT() {
    try {
      if (!user) {
        setError('Please login to create an NFT.');
      }
      if (
        !secretNFT ||
        !name ||
        !description ||
        (!NFT && !(select === 'Select NFT Option' || select === 'None'))
      ) {
        throw new Error('Elements are undefined');
      }

      const data = new FormData();
      {
        NFT ? data.append('file', NFT) : data.append('file', secretNFT);
      }

      const resUpload = await fetch(
        `${process.env.NEXT_PUBLIC_SDK_URL}/api/uploadIM`,
        {
          method: 'POST',
          body: data,
        }
      );

      const previewLink = (await resUpload.json()).url;

      let cryptPromises = [];
      for (let i = 0; i < quantity; i++) {
        const formData = new FormData();
        formData.append('file', secretNFT);
        cryptPromises.push(
          fetch(`${process.env.NEXT_PUBLIC_SDK_URL}/api/cryptFile`, {
            method: 'POST',
            body: formData,
          })
        );
      }
      try {
        const cryptResults = await Promise.all(cryptPromises);
        const cryptJSONs = await Promise.all(cryptResults.map((r) => r.json()));

        const results = cryptJSONs.map((result, index) => {
          return fetch(`${process.env.NEXT_PUBLIC_SDK_URL}/api/uploadEx`, {
            method: 'POST',
            body: new URLSearchParams({
              name,
              description,
              fileHash: result.fileHash,
              keyPath: result.keyPath,
              media: previewLink,
              mediaType: secretNFT.type,
              cryptedMedia: result.file,
              cryptedMediaType: secretNFT.type,
              itemTotal: quantity + '',
              itemId: index + 1 + '',
            }),
          });
        });
        const JSONPromises = await Promise.all(results);
        const JSONURLS = await Promise.all(JSONPromises.map((r) => r.json()));
        setOutput(JSONURLS);
        setQRData({
          ...QRData,
          links: JSONURLS,
          fileHash: cryptJSONs[0].fileHash,
        });
      } catch (err) {
        console.error(err);
      }
      return output;
    } catch (err) {
      setError('Please try again.');
      console.log(err);
      return [];
    }
  }

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
          setModalCreate={setModalCreate}
          processed={processed}
          error={error}
          setError={setError}
          output={output}
          QRData={QRData}
        />
      )}
      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <Create
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        setModalCreate={setModalCreate}
        user={walletUser}
        NFT={NFT}
        setNFT={setNFT}
        secretNFT={secretNFT}
        setSecretNFT={setSecretNFT}
        NFTData={NFTData}
        setNFTData={setNFTData}
        select={select}
        setSelect={setSelect}
        uploadNFT={uploadNFT}
        processFile={processFile}
        setError={setError}
        setProcessed={setProcessed}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null;
  try {
    const token = cookies(ctx).token;
    if (token) {
      user = await getUser(token);
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: { user },
  };
}

export default CreatePage;
