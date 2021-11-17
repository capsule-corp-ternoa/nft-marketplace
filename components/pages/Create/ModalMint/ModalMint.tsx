/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import style from './ModalMint.module.scss';
import Close from 'components/assets/close';
import randomstring from 'randomstring';
import QRCode from 'components/base/QRCode';
import mime from 'mime-types';
import { useRouter } from 'next/router'
import { connect as connectIo, socketWaitForEvent } from 'utils/socket/socket.helper';
import { SOCKET_URL } from 'utils/constant';
import { getFilehash, generateSeriesId, cryptAndUploadNFT, uploadIPFS } from 'utils/nftEncryption';
import { Circle } from 'rc-progress';

import { NFTProps } from 'pages/create';

export interface ModalProps {
  error: string;
  NFT: File | null;
  NFTData: NFTProps;
  output: string[];
  QRData: any;
  runNFTMintData: any,
  secretNFT: File | null;
  uploadSize: number;
  setError: (s: string) => void;
  setModalCreate: (b: boolean) => void;
  setRunNFTMintData: (data: any) => void;
}

const ModalMint: React.FC<ModalProps> = ({
  error,
  NFT,
  NFTData,
  output,
  QRData,
  runNFTMintData,
  secretNFT,
  uploadSize,
  setError,
  setModalCreate,
  setRunNFTMintData
}) => {
  const [session] = useState(randomstring.generate());
  const { walletId, quantity } = QRData;
  const [showQR, setShowQR] = useState(false);
  const [qrAction, setQrAction] = useState('MINT')
  const [qrRetry, setQrRetry] = useState(false)
  const [showProgress, setShowProgress] = useState(false);
  const [progressData, setProgressData] = useState([] as number[]);
  const [isRN, setIsRN] = useState(false);
  const [mintReponse, setMintResponse] = useState<boolean | null>(null)
  const [startUploadTime, setStartUploadTime] = useState<any>(null)
  const [alreadySentSocketTimeout, setAlreadySentSocketTimeout] = useState(false)
  const [stateSocket, setStateSocket] = useState<any>(null)
  const router = useRouter();
  const { description, name } = NFTData;
  const progressQuantity = 1 + Number(quantity)
  const elapsedUploadTime = (startUploadTime && startUploadTime instanceof Date) ? (+new Date() - +startUploadTime) : 0
  const generalPercentage = () => {
    let percentage = 0
    if (progressData.length === progressQuantity) {
      percentage = progressData.reduce((a, b) => a + b) / progressData.length
    } else {
      const missingProgressArray = Array.from({ length: progressQuantity - progressData.length }).fill(0) as number[]
      const mergedArray = [...progressData, ...missingProgressArray]
      percentage = mergedArray.reduce((a, b) => a + b) / mergedArray.length
    }
    return Math.ceil(percentage)
  }
  const speed = Math.floor((uploadSize * (generalPercentage() / 100)) / elapsedUploadTime)
  const remainingTime = Math.ceil(((elapsedUploadTime / generalPercentage()) * (100 - generalPercentage())))
  const handleMintSocketProcess = () => {
    const socket = connectIo(`/socket/createNft`, { session, socketUrl: SOCKET_URL }, undefined, 20 * 60 * 1000);
    setStateSocket(socket)
    socket.once('CONNECTION_SUCCESS', () => {
      if (isRN) {
        const data = { session, socketUrl: SOCKET_URL, walletId, quantity, uploadSize };
        setTimeout(function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({ action: qrAction, data }));
        }, 2000);
      } else {
        setShowQR(true);
      }
    });
    socket.once('connect_error', (e: any) => {
      console.error('connection error socket', e);
      setModalCreate(false);
    });

    socket.once('CONNECTION_FAILURE', (data: any) => {
      console.error('connection failure socket', data)
      setError(data.msg)
    });
    socket.once('PGPS_READY', async ({ publicPgpKeys }: { publicPgpKeys: string[] }) => {
      socket.emit('PGPS_READY_RECEIVED')
      console.log(publicPgpKeys)
      setShowQR(false)
      setShowProgress(true)
      setStartUploadTime(new Date())
      const { nftUrls, seriesId } = await uploadNFT(publicPgpKeys, setProgressData)
      if (nftUrls.length > 0){
        setRunNFTMintData({ nftUrls, seriesId })
        socket.emit('RUN_NFT_MINT', { nftUrls, seriesId })
        setShowProgress(false)
        setProgressData([])
        try {
          await socketWaitForEvent(socket, 'RUN_NFT_MINT_RECEIVED')
          // all ok
        } catch (err) {
          //The wallet timeout
          setQrAction('MINT_RETRY')
          setQrRetry(true)
          if (isRN) {
            setTimeout(function () {
              window.ReactNativeWebView.postMessage(JSON.stringify({ action: qrAction, data: { session, socketUrl: SOCKET_URL, walletId, quantity, uploadSize } }));
            }, 2000);
          } else {
            setShowQR(true);
          }
        }
      }else{
        setError('Please try again.');
      }
    });
    socket.once('MINTING_NFT', ({ success }: { success: boolean }) => {
      socket.emit('MINTING_NFT_RECEIVED')
      socket.close();
      setMintResponse(success)
      setTimeout(() => {
        setModalCreate(false);
        router.reload()
      }, 1500)
    });
    socket.once('disconnect', () => {
      setModalCreate(false);
    });
    return () => {
      if (socket && socket.connected) {
        socket.close();
      }
    };
  }

  async function uploadNFT(publicPGPs: string[], setProgressData?: Function) {
    try {
      if (!secretNFT) throw new Error();
      const { hashOrURL: previewHash, mediaType } = await uploadIPFS(NFT ? NFT : secretNFT, setProgressData, 0);
      const fileHash = await getFilehash(secretNFT)
      const seriesId = generateSeriesId(fileHash)
      const cryptedMediaType = mime.lookup(secretNFT.name)
      //Parallel
      const cryptPromises = Array.from({ length: quantity ?? 0 }).map((_x, i) => {
        return cryptAndUploadNFT(secretNFT, cryptedMediaType as string, publicPGPs[i] as string, setProgressData, 1 + i)
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
          title: name,
          description,
          image: previewHash,
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
      return { nftUrls: JSONHASHES as any[], seriesId: (seriesId ? seriesId : null) };
    } catch (err) {
      if (setError !== undefined) setError('Please try again.');
      console.log(err);
      return { nftUrls: [] as any[], seriesId: 0 };
    }
  }

  useEffect(() => {
    setIsRN(window.isRNApp);
  }, []);

  useEffect(() => {
    if (output.length > 0) {
      handleMintSocketProcess();
    }
  }, [output])

  useEffect(() => {
    if (stateSocket && runNFTMintData) {
      stateSocket.once('WALLET_READY', () => {
        stateSocket.emit('RUN_NFT_MINT', runNFTMintData)
        setShowQR(false)
      })
    }
  }, [runNFTMintData])

  useEffect(() => {
    if (!alreadySentSocketTimeout && speed && stateSocket && stateSocket.connected && elapsedUploadTime>5000) {
      stateSocket.emit('UPLOAD_REMAINING_TIME', { remainingTime })
      setAlreadySentSocketTimeout(true)
    }
  }, [speed])

  function returnState() {
    return (
      <>
        { mintReponse === null && (
          <>
            {showQR ?
              !qrRetry ?
                <div className={style.Text}>
                  Flash this QR Code on your mobile wallet app to mint your NFT on the
                  Ternoa blockchain.
                </div>
                :
                <div className={style.Text}>
                  Flash this QR Code on your mobile wallet app to finish the minting process to the blockchain.
                </div>
              :
              <div className={style.Text}>
                Your media is being encrypted and uploaded. Please wait...
              </div>
            }

            {showQR && (
              <div className={style.QR}>
                <QRCode
                  data={{ session, socketUrl: SOCKET_URL, walletId, quantity, uploadSize }}
                  action={qrAction}
                />
              </div>
            )}
            {(!showQR && !showProgress) && (
              <div className={style.Loading}>
                <span className={style.Dot}></span>
                <span className={style.Dot}></span>
                <span className={style.Dot}></span>
              </div>
            )}
            {(!showQR && showProgress) && (
              <>
                <Circle percent={generalPercentage()} strokeWidth={3} strokeColor="#7417ea" className={style.ProgressBar} />
                <div className={style.Text}>{`Progress : ${generalPercentage()}%`}</div>
                <div className={style.Text}>{`Speed : ${speed} kb/sec`}</div>
              </>
            )}
          </>
        )}
        {(mintReponse === true) && <div className={style.Text}>
          Mint was added to the blockchain.
        </div>}
        {(mintReponse === false) && <div className={style.Text}>
          Mint was not added to the blockchain.
        </div>}
      </>
    );
  }
  return (
    <div id="createModal" className={style.Background}>
      <div className={style.Container}>
        <Close onClick={() => setModalCreate(false)} className={style.Close} />
        <div className={style.Title}>
          {!qrRetry ? "Create NFT" : "Finish the process"}
        </div>
        {error ? <div className={style.Error}>{error}</div> : returnState()}
      </div>
    </div>
  );
};

export default ModalMint;