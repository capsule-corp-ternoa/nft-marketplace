import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Create from 'components/pages/Create';
import ModalMint from 'components/pages/Create/ModalMint';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';
import Router from 'next/router';
import mime from 'mime-types'
import { getUser } from 'actions/user';
import { UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { imgToBlur, imgToWatermark } from 'utils/imageProcessing/image';
import { decryptCookie } from 'utils/cookie';
import {getFilehash, generateSeriesId, cryptAndUploadNFT, uploadIPFS} from '../utils/nftEncryption'

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
  const [error, setError] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const isNftCreationEnabled = process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED===undefined ? true : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true'

  const [NFTData, setNFTData] = React.useState<NFTProps>({
    name: '',
    description: '',
    quantity: 1,
  });

  useEffect(() => {
    if (!isNftCreationEnabled){
      Router.push("/")
    }
  }, [isNftCreationEnabled])

  const [NFT, setNFT] = useState<File | null>(null);
  const [secretNFT, setSecretNFT] = useState<File | null>(null);
  const { name, description, quantity } = NFTData;
  const [QRData, setQRData] = useState({
    walletId: user ? user.walletId : '',
    quantity: quantity,
  });

  useEffect(() => {
    if (processed) {
      try{
        initMintingNFT();
      }catch(err){
        console.log(err)
        setError(err as string);
      }
    }
  }, [processed]);

  async function processFile() {
    try {
      if (!secretNFT) {
        throw new Error();
      }
      setOutput([]);
      setError('');
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

  function initMintingNFT(){
    if (!user) throw new Error('Please login to create an NFT.')
    if (!secretNFT || 
        !name || 
        !description || 
        (!NFT && !(select === 'Select NFT Option' || select === 'None')) || 
        !(quantity && quantity > 0 && quantity <= 10)) 
        throw new Error('Elements are undefined');
    setQRData({
      ...QRData,
      quantity,
    });
    setOutput([quantity.toString()]);
    setProcessed(false);
  }

  async function uploadNFT(publicPGPs: string[]) {
    try {
      if (!secretNFT) throw new Error();
      const { url: previewLink, mediaType } = await uploadIPFS(NFT ? NFT : secretNFT);
      const fileHash = await getFilehash(secretNFT)
      const seriesId = generateSeriesId(fileHash)
      const cryptedMediaType = mime.lookup(secretNFT.name)
      const cryptPromises = Array.from({ length: quantity }).map((_x,i) => {
        return cryptAndUploadNFT(secretNFT, cryptedMediaType as string, publicPGPs[i] as string)
      })
      const cryptResults = await Promise.all(cryptPromises);
      const cryptNFTsJSONs = cryptResults.map((r: any) => r[0]);
      const publicPGPsIPFS = cryptResults.map((r: any) => r[1]);
      const results = cryptNFTsJSONs.map((result, i) => {
        const data = {
          name,
          description,
          publicPGP: publicPGPsIPFS[i].url,
          media: {
            url: previewLink,
            mediaType: mediaType
          },
          cryptedMedia: {
            url: result.url,
            cryptedMediaType: cryptedMediaType,
          },
        }
        const finalBlob = new Blob([JSON.stringify(data)], {type:'application/json'})
        const finalFile = new File([finalBlob], "final json")
        return uploadIPFS(finalFile);
      });
      const JSONURLS = (await Promise.all(results));
      return {nftUrls: JSONURLS as any[], seriesId:(seriesId ? seriesId : 0)};
    } catch (err) {
      setError('Please try again.');
      console.log(err);
      return {nftUrls: [] as any[], seriesId:0};
    }
  }

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} - Create your NFT</title>
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
          uploadNFT={uploadNFT}
        />
      )}
      <AlphaBanner />
      <MainHeader user={user} setModalExpand={setModalExpand} />
      {isNftCreationEnabled && 
        <Create
          setModalExpand={setModalExpand}
          setNotAvailable={setNotAvailable}
          setModalCreate={setModalCreate}
          user={user}
          NFT={NFT}
          setNFT={setNFT}
          secretNFT={secretNFT}
          setSecretNFT={setSecretNFT}
          NFTData={NFTData}
          setNFTData={setNFTData}
          select={select}
          setSelect={setSelect}
          processFile={processFile}
          setError={setError}
          setProcessed={setProcessed}
        />
      }
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
