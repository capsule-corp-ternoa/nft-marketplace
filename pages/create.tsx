import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Create from 'components/pages/Create';
import Provider from 'components/pages/Create/CreateNftContext';
import ModalMint from 'components/pages/Create/ModalMint';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';
import Router from 'next/router';
import mime from 'mime-types'
import { getUser } from 'actions/user';
import {
  NftEffectType,
  NFT_EFFECT_BLUR,
  NFT_EFFECT_DEFAULT,
  NFT_EFFECT_PROTECT,
  NFT_EFFECT_SECRET,
  UserType,
} from 'interfaces';
import { NextPageContext } from 'next';
import { imgToBlur, imgToWatermark } from 'utils/imageProcessing/image';
import { decryptCookie } from 'utils/cookie';
import { getFilehash, generateSeriesId, cryptAndUploadNFT, uploadIPFS } from '../utils/nftEncryption'

const initialCreateNftData = {
  blurredValue: '5',
};

export interface CreatePageProps {
  user: UserType;
}

export interface NFTProps {
  name: string;
  description: string;
  quantity: number;
}

const CreatePage: React.FC<CreatePageProps> = ({ user }) => {
  const isNftCreationEnabled = process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === undefined ? true : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true'
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [effect, setEffect] = useState<NftEffectType>(NFT_EFFECT_DEFAULT);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [NFT, setNFT] = useState<File | null>(null);
  const [secretNFT, setSecretNFT] = useState<File | null>(null);
  const [uploadSize, setUploadSize] = useState(0)
  const [NFTData, setNFTData] = useState<NFTProps>({
    name: '',
    description: '',
    quantity: 1,
  });
  const { name, description, quantity } = NFTData;
  const [QRData, setQRData] = useState({
    walletId: user ? user.walletId : '',
    quantity: quantity,
  });
  const [runNFTMintData, setRunNFTMintData] = useState<any>(null);

  useEffect(() => {
    if (!isNftCreationEnabled) {
      Router.push("/")
    }
  }, [isNftCreationEnabled])

  useEffect(() => {
    if (processed) {
      try {
        initMintingNFT();
      } catch (err) {
        console.log(err)
        setError(err as string);
      }
    }
  }, [processed]);

  useEffect(() => {
    if (NFT && quantity && Number(quantity) > 0) {
      const previewSize = secretNFT ? secretNFT.size : NFT.size
      const size = NFT.size * Number(quantity)
      setUploadSize(previewSize + size)
    }
  }, [quantity, NFT, secretNFT])

  async function processFile() {
    try {
      if (!NFT) {
        throw new Error();
      }
      setOutput([]);
      setError('');
      if (effect === NFT_EFFECT_BLUR && NFT.type.substr(0, 5) === 'image') {
        const processFile = new File([NFT], 'NFT', {
          type: NFT.type,
        });
        let res = await imgToBlur(processFile);
        const blob = await (await fetch(res as string)).blob();
        const file = new File([blob], NFT.name, {
          type: NFT.type,
        });
        setSecretNFT(file);
        setProcessed(true);
      } else if (
        effect === NFT_EFFECT_PROTECT &&
        NFT.type.substr(0, 5) === 'image'
      ) {
        const processFile = new File([NFT], 'NFT', {
          type: NFT.type,
        });
        let res = await imgToWatermark(processFile);
        const blob = await (await fetch(res as string)).blob();
        const file = new File([blob], NFT.name, {
          type: NFT.type,
        });
        setSecretNFT(file);
        setProcessed(true);
      }
    } catch (err) {
      setError('Please try again.');
      console.log(err);
    }
  }

  function initMintingNFT() {
    if (!user) throw new Error('Please login to create an NFT.')
    if (!NFT ||
      !name ||
      !description ||
      (effect === NFT_EFFECT_SECRET && !secretNFT) ||
      !(quantity && quantity > 0 && quantity <= 10))
      throw new Error('Elements are undefined');
    setQRData({
      ...QRData,
      quantity,
    });
    setOutput([quantity.toString()]);
    setProcessed(false);
  }

  async function uploadNFT(publicPGPs: string[], setProgressData?: Function) {
    try {
      if (!NFT) throw new Error();
      const { url: previewLink, mediaType } = await uploadIPFS(secretNFT ? secretNFT : NFT, setProgressData, 0);
      const fileHash = await getFilehash(NFT)
      const seriesId = generateSeriesId(fileHash)
      const cryptedMediaType = mime.lookup(NFT.name)
      //Parallel
      const cryptPromises = Array.from({ length: quantity }).map((_x, i) => {
        return cryptAndUploadNFT(NFT, cryptedMediaType as string, publicPGPs[i] as string, setProgressData, 1 + i)
      })
      const cryptResults = await Promise.all(cryptPromises);
      /* SEQUENTIAL
      const cryptResults = [] as any
      for (let i=0; i<quantity; i++){
        const singleResult = await cryptAndUploadNFT(secretNFT, cryptedMediaType as string, publicPGPs[i] as string, setProgressData, 1+i)
        cryptResults.push(singleResult)
      }*/
      const cryptNFTsJSONs = cryptResults.map((r: any) => r[0]);
      const publicPGPsIPFS = cryptResults.map((r: any) => r[1]);
      const results = cryptNFTsJSONs.map((result: any, i: number) => {
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
        const finalBlob = new Blob([JSON.stringify(data)], { type: 'application/json' })
        const finalFile = new File([finalBlob], "final json")
        return uploadIPFS(finalFile);
      });
      const JSONURLS = (await Promise.all(results));
      return { nftUrls: JSONURLS as any[], seriesId: (seriesId ? seriesId : 0) };
    } catch (err) {
      setError('Please try again.');
      console.log(err);
      return { nftUrls: [] as any[], seriesId: 0 };
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
      <Provider createNftData={initialCreateNftData} >
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
            uploadSize={uploadSize}
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
            NFT={NFT}
            setNFT={setNFT}
            secretNFT={secretNFT}
            setSecretNFT={setSecretNFT}
            NFTData={NFTData}
            setNFTData={setNFTData}
            effect={effect}
            setEffect={setEffect}
            processFile={processFile}
            setError={setError}
            setProcessed={setProcessed}
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
