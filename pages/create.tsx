import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import Create from 'components/pages/Create';
// import ModalMint from 'components/pages/Create/ModalMint';
import cookies from 'next-cookies';
import Router from 'next/router';
import { getCategories } from 'actions/category';
import { getUser } from 'actions/user';
import { CategoryType, UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

import { WalletConnectContext } from 'components/providers'
import { cryptAndUploadNFT, uploadIPFS } from 'utils/nftEncryption';
import { generateVideoThumbnail } from 'utils/imageProcessing/image';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime-types';

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
  const [stateSocket, setStateSocket] = useState<any>(null)
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
  const [progressData, setProgressData] = useState([] as number[]);

  const walletConnect = useContext(WalletConnectContext);

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

  useEffect(() => {
    if (error !== '') {
      setModalCreate(true)
    }
  }, [error])

  useEffect(() => {
    if (!modalCreate) {
      setError('')
      if (stateSocket) stateSocket.close();
    }
  }, [modalCreate])

  useEffect(() => {
    if (output.length < 1) return;

    const requestMethod = 'nfts_mint';
    const requestParams = `${QRData.quantity}`;

    console.log('[MINTING]: SEND REQUEST')

    walletConnect.sendRequest(requestMethod, requestParams)
  }, [output]);

  // useEffect(() => {
  //   if (walletConnect.currentEvent)
  // }, [walletConnect.currentEvent])

  useEffect(() => {
    console.log('PGP_PGP_PGP')
    if (!walletConnect.publicPgpKeys) return;

    handleNFT();
  }, [walletConnect.publicPgpKeys]);

  const handleNFT = async () => {
    try {
      console.log('[MINTING]: UPLOAD NFT')

      const res = await uploadNFT(
        walletConnect.publicPgpKeys,
        QRData.quantity,
        originalNFT,
        previewNFT,
        NFTData,
        thumbnailTimecode,
        setProgressData,
      )

      // const res = {
      //   categories: [],
      //   nftUrls: [
      //     { hashOrURL: 'QmQDrDrMtp5L1bUBNwZ2gUW2NhMzxWFf39tTKMzEYANfG7', mediaType: false }
      //   ],
      //   seriesId: "223e2f03-61a7-4ab5-8ee2-06df59c8a22d"
      // }

      console.log('[MINTING]: NFT UPLOADED', res)
      const { categories, nftUrls, seriesId } = res

      console.log('categories, nftUrls, seriesId', categories, nftUrls, seriesId);
      if (nftUrls.length > 0) {
        walletConnect.sendRequest('RUN_NFT_MINT', JSON.stringify(res));
      } else {
        throw new Error("no nfts url")
      }

    } catch (err) {
      setError('Please try again.');
      walletConnect.sendRequest('RUN_NFT_MINT_ERROR')
    }
  };

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
        {/* {modalExpand && <WalletConnector setModalExpand={setModalExpand} />} */}
        {/* {modalCreate && (
          <ModalMint
            error={error}
            previewNFT={previewNFT}
            NFTData={NFTData}
            output={output}
            QRData={QRData}
            runNFTMintData={runNFTMintData}
            originalNFT={originalNFT}
            uploadSize={uploadSize}
            stateSocket={stateSocket}
            setStateSocket={setStateSocket}
            setError={setError}
            setModalCreate={setModalCreate}
            setRunNFTMintData={setRunNFTMintData}
            thumbnailTimecode={thumbnailTimecode}
          />
        )} */}
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


const uploadNFT = async (publicPGPs: string[], quantity: number, originalNFT: File | null, previewNFT: File | null, NFTData: NFTProps, thumbnailTimecode: number, setProgressData?: Function) => {
  if (!originalNFT) throw new Error();
  let uploadIndex = 0
  let videoThumbnailHash = ""
  //Upload preview
  const { hashOrURL: previewHash, mediaType } = await uploadIPFS(previewNFT ?? originalNFT, setProgressData, uploadIndex);
  //Upload thumbnail if video
  if (mediaType.toString().indexOf("video") !== -1) {
    uploadIndex += 1
    const videoThumbnailFile = await generateVideoThumbnail(previewNFT ?? originalNFT, thumbnailTimecode);
    const result = await uploadIPFS(videoThumbnailFile as File, setProgressData, uploadIndex);
    videoThumbnailHash = result.hashOrURL
  }
  const cryptedMediaType = mime.lookup(originalNFT.name)
  //Encrypt and upload secrets
  //Parallel
  const cryptPromises = Array.from({ length: quantity ?? 0 }).map((_x, i) => {
    return cryptAndUploadNFT(originalNFT, cryptedMediaType as string, publicPGPs[i] as string, setProgressData, uploadIndex + 1 + i)
  })
  const cryptResults = await Promise.all(cryptPromises);
  /* SEQUENTIAL
  const cryptResults = [] as any
  for (let i=0; i<quantity; i++){
    const singleResult = await cryptAndUploadNFT(originalNFT, cryptedMediaType as string, publicPGPs[i] as string, setProgressData, 1+i)
    cryptResults.push(singleResult)
  }*/
  const cryptNFTsJSONs = cryptResults.map((r: any) => r[0]);
  const publicPGPsIPFS = cryptResults.map((r: any) => r[1]);
  const { categories, description, name, seriesId } = NFTData;

  const results = cryptNFTsJSONs.map((result: any, i: number) => {
    const data = {
      title: name,
      description,
      image: videoThumbnailHash !== "" ? videoThumbnailHash : previewHash,
      properties: {
        publicPGP: publicPGPsIPFS[i].hashOrURL,
        preview: {
          ipfs: previewHash,
          mediaType
        },
        cryptedMedia: {
          ipfs: result.hashOrURL,
          cryptedMediaType
        }
      },
    }
    const finalBlob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const finalFile = new File([finalBlob], "final json")
    return uploadIPFS(finalFile);
  });
  const JSONHASHES = (await Promise.all(results));
  return {
    categories: categories.map((x) => x.code),
    nftUrls: JSONHASHES as any[],
    seriesId: seriesId ? seriesId : uuidv4(),
  };
}