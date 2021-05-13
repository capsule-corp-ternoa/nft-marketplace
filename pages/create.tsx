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

import {
  cryptFile,
  useSkynetUpload,
  getNftJsons,
} from 'utils/nftCreation/siasky';

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
  const [, statusMedia, uploadFileMedia] = useSkynetUpload();
  const [, statusSecret, uploadFileSecret] = useSkynetUpload();
  const [, statusJSON, uploadFileJSON] = useSkynetUpload();
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
        const file = new File([blob], 'NFT', { type: secretNFT.type });
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
        const file = new File([blob], 'NFT', { type: secretNFT.type });
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
      if (
        !secretNFT ||
        !name ||
        !description ||
        (!NFT && !(select === 'Select NFT Option' || select === 'None'))
      ) {
        throw new Error('Elements are undefined');
      }
      const link1 = await uploadFileMedia(NFT ? NFT : secretNFT);

      const { cryptedFile, gpgkhash } = await cryptFile(NFT ? NFT : secretNFT);
      if (!cryptedFile) throw new Error('encryption error');

      const link2 = await uploadFileSecret(cryptedFile);

      //fix media when NFT doesn't exist
      const jsons = getNftJsons({
        name,
        description,
        media: link1,
        itemTotal: quantity,
        mediaType: secretNFT.type,
        cryptedMedia: NFT ? link2 : link1,
        cryptedMediaType: secretNFT.type,
        gpgkhash,
      });

      const links = await Promise.all(jsons.map((j) => uploadFileJSON(j)));
      setOutput(links);

      return links;
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
          statusMedia={statusMedia}
          statusSecret={statusSecret}
          statusJSON={statusJSON}
          error={error}
          setError={setError}
          output={output}
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
