/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import style from './ModalMint.module.scss';
import Close from 'components/assets/close';
import randomstring from 'randomstring';
import QRCode from 'components/base/QRCode';
import CheckMark from 'components/assets/checkmark';
import { useRouter } from 'next/router'
import { connect as connectIo } from 'utils/socket/socket.helper';

export interface ModalProps {
  setModalCreate: (b: boolean) => void;
  processed: boolean;
  error: string;
  setError: (s: string) => void;
  output: string[];
  QRData: any;
}

const ModalMint: React.FC<ModalProps> = ({
  setModalCreate,
  error,
  setError,
  output,
  QRData,
}) => {
  const [session] = useState(randomstring.generate());
  const [showQR, setShowQR] = useState(false);
  const [isRN, setIsRN] = useState(false);
  const [mintReponse, setMintResponse] = useState(null)
  const router = useRouter();
  const { walletId, price, links, fileHash } = QRData;

  useEffect(() => {
    setIsRN(window.isRNApp);
    console.log('socket connect on session', session);
    const socket = connectIo(`/socket/createNft`, { session }, undefined, 5 * 60 * 1000);

    socket.on('CONNECTION_SUCCESS', () => {
      if (isRN) {
        const data = { session, walletId, price, links, fileHash };
        setTimeout(function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'MINT', data }));
        }, 2000);
      } else {
        setShowQR(true);
      }
    });
    socket.on('connect_error', (e) => {
      console.error('connection error socket', e);
      setModalCreate(false);
    });

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('MINTING_NFT', ({ success }) => {
      console.log('MINTING_NFT:' + success);
      socket.emit('MINTING_NFT_RECEIVED')
      socket.close();
      setMintResponse(success)
      setTimeout(() => {
        setModalCreate(false);
        router.back()
      }, 4000)
    });
    socket.on('disconnect', () => {
      setModalCreate(false);
    });

    return () => {
      if (socket && socket.connected) {
        socket.close();
      }
    };
  }, []);

  function returnState() {
    if (output.length > 0) {
      return (
        <>
          { mintReponse === null && (
            <>
              <div className={style.Text}>
                Flash this QR Code on your mobile wallet app to mint your NFT on the
                Ternoa blockchain.
            </div>
              {showQR && (
                <div className={style.QR}>
                  <QRCode
                    data={{ session, walletId, price, links, fileHash }}
                    action={'MINT'}
                  />
                </div>
              )}
              {!showQR && (
                <div className={style.Loading}>
                  <span className={style.Dot}></span>
                  <span className={style.Dot}></span>
                  <span className={style.Dot}></span>
                </div>
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
    } else {
      return (
        <>
          <div className={style.Text}>
            Please wait while we are processing your files.
          </div>
          <div className={style.Status}>
            {output.length > 0 ? (
              <div className={style.Step}>
                Upload completed <CheckMark className={style.CheckMark} />
              </div>
            ) : (
                <div className={style.Waiting}>
                  <div className={style.Mess}>Minting NFT...</div>
                  <div className={style.Loading}>
                    <span className={style.Dot}></span>
                    <span className={style.Dot}></span>
                    <span className={style.Dot}></span>
                  </div>
                </div>
              )}
          </div>
        </>
      );
    }
  }
  return (
    <div id="createModal" className={style.Background}>
      <div className={style.Container}>
        <Close onClick={() => setModalCreate(false)} className={style.Close} />
        <div className={style.Title}>Create NFT</div>
        {error ? <div className={style.Error}>{error}</div> : returnState()}
      </div>
    </div>
  );
};

export default ModalMint;
