/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './ModalBuy.module.scss';
import Close from 'components/assets/close';
import QRCode from 'components/base/QRCode';
import randomstring from 'randomstring';
import io from 'socket.io-client';
import Link from 'next/link';
import CheckMark from 'components/assets/checkmark';

export interface ModalBuyProps {
  setModalExpand: (b: boolean) => void;
  id: string;
}

const ModalBuy: React.FC<ModalBuyProps> = ({ setModalExpand, id }) => {
  const [session] = useState(randomstring.generate());
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRN, setIsRN] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsRN(window.isRNApp);
    console.log('socket connect on session',session);
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}/socket/buyNft`, {
      query: { session },
      transports: ['websocket'],
      forceNew: true
    });

    socket.on('CONNECTION_SUCCESS', () => {
      if (window.isRNApp) {
        const data = { session, nft_id: id };
        setLoading(true)
        setTimeout(function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'BUY', data }));
        }, 2000);
      } else {
        setShowQR(true);
      }
    });

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('NFT_BUY', (data) => {
      setLoading(false)
      console.log('NFT_BUY:' + data.success);
      if (data.success) setSuccess(true);
      else {
        setError('Something went wrong. Please try again.');
      }
      socket.emit('NFT_BUY_RECEIVED');
      setTimeout(() => {
        setModalExpand(false);
      }, 2000)
    });
    socket.on('disconnect', () => {
      setModalExpand(false);
    });
    return function cleanup() {
      socket.close();
    };
  }, []);

  function manageTransaction() {
    if (success) {
      return (
        <>
          <CheckMark className={style.CheckMark} />
          <div className={style.Text}>
            Congratulations ! NFT successfully bought.
          </div>
          <Link href="/explore">
            <a className={style.Button}>Back to explore</a>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <div className={style.Text}>
            {isRN
              ? 'Transaction in progress...'
              : 'Flash the QR Code on your mobile wallet to buy this NFT'}
          </div>
          <div className={style.QR}>
            {showQR &&
              <QRCode data={{ session, nft_id: id }} action={'BUY'} />
            }
            {loading && (
              <div className={style.Loading}>
                <span className={style.Dot}></span>
                <span className={style.Dot}></span>
                <span className={style.Dot}></span>
              </div>
            )}
          </div>
        </>
      );
    }
  }

  return (
    <div className={style.Background}>
      <div className={style.Container}>
        <Close onClick={() => setModalExpand(false)} className={style.Close} />
        <div className={style.Title}>Buy NFT</div>
        {manageTransaction()}
        {error && <div className={style.Error}>{error}</div>}
      </div>
    </div>
  );
};

export default ModalBuy;
