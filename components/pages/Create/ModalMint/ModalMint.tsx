/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import style from './ModalMint.module.scss';
import Close from 'components/assets/close';
import randomstring from 'randomstring';
import io from 'socket.io-client';
import QRCode from 'components/base/QRCode';
import CheckMark from 'components/assets/checkmark';

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
  const { walletId, price, links, fileHash } = QRData;

  useEffect(() => {
    const socket = io(
      `${process.env.NEXT_PUBLIC_SOCKETIO_URL}/socket/createNft`,
      {
        query: { session },
        transports: ['websocket'],
      }
    );

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('MINTING_NFT', (data) => {
      console.log(data), setModalCreate(false);
    });

    return () => {
      socket.close();
    };
  }, []);

  function returnState() {
    if (output.length > 0) {
      return (
        <>
          <div className={style.Text}>
            Flash this QR Code on your mobile wallet app to mint your NFT on the
            Ternoa blockchain.
          </div>
          <div className={style.QR}>
            <QRCode
              data={{ session, walletId, price, links, fileHash }}
              action={'MINT'}
            />
          </div>
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
