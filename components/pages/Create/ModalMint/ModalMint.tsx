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
  statusMedia: string;
  statusSecret: string;
  statusJSON: string;
  error: string;
  setError: (s: string) => void;
  output: string[];
}

const ModalMint: React.FC<ModalProps> = ({
  setModalCreate,
  processed,
  statusSecret,
  statusMedia,
  statusJSON,
  error,
  setError,
  output,
}) => {
  const [session] = useState(randomstring.generate());

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
            <QRCode data={{ links: output }} action={'MINT'} />
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
            <span>
              {!processed ? (
                <div className={style.Step}>Processing media...</div>
              ) : (
                <div className={style.Step}>
                  Media processing completed
                  <CheckMark className={style.CheckMark} />
                </div>
              )}
            </span>

            {statusMedia && (
              <span>
                {statusMedia === 'processing' ? (
                  'Encrypting your NFT...'
                ) : (
                  <div className={style.Step}>
                    Encryption completed
                    <CheckMark className={style.CheckMark} />
                  </div>
                )}
              </span>
            )}

            {statusSecret && (
              <span>
                {statusSecret === 'processing' ? (
                  'Uploading your NFT...'
                ) : (
                  <div className={style.Step}>
                    Upload completed <CheckMark className={style.CheckMark} />
                  </div>
                )}
              </span>
            )}

            {statusJSON && (
              <span>
                {statusJSON === 'processing' ? (
                  'Uploading JSON File...'
                ) : (
                  <div className={style.Step}>
                    JSON File upload completed{' '}
                    <CheckMark className={style.CheckMark} />
                  </div>
                )}
              </span>
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
