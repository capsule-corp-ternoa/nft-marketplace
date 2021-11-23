/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './ModalBuy.module.scss';
import Close from 'components/assets/close';
import QRCode from 'components/base/QRCode';
import randomstring from 'randomstring';
import { connect as connectIo } from 'utils/socket/socket.helper';
import { SOCKET_URL } from 'utils/constant';
import { navigateToSuccess } from 'utils/functions';
import { useRouter } from 'next/router';

export interface ModalBuyProps {
  setModalExpand: (b: boolean) => void;
  id: string;
}

const ModalBuy: React.FC<ModalBuyProps> = ({ setModalExpand, id }) => {
  const [session] = useState(randomstring.generate());
  const router = useRouter()
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [isRN, setIsRN] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsRN(window.isRNApp);
    console.log('socket connect on session',session);
    const socket = connectIo(`/socket/buyNft`, { session, socketUrl: SOCKET_URL });
    socket.on('connect_error', (e) => {
      console.error('connection error socket', e);
      setModalExpand(false);
    });

    socket.on('CONNECTION_SUCCESS', () => {
      if (window.isRNApp) {
        const data = { session, socketUrl: SOCKET_URL, nft_id: id };
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
      if (!data.success){
        setError('Something went wrong. Please try again.');
      }
      socket.emit('NFT_BUY_RECEIVED');
      socket.close();
      if (data.success){
        setTimeout(() => {
          navigateToSuccess(
            router, 
            "NFT(s) purchased !", 
            "Go back to your profile page", 
            "/profile", 
            false, 
            "The NFT(s) will soon appear in your profile page")
        }, 1000)
      }
    });
    socket.on('disconnect', () => {
      setModalExpand(false);
    });
    return function cleanup() {
      socket.close();
    };
  }, []);

  function manageTransaction() {
    return (
      <>
        <div className={style.Text}>
          {isRN
            ? 'Transaction in progress...'
            : 'Flash the QR Code on your mobile wallet to buy this NFT'}
        </div>
        <div className={style.QR}>
          {showQR &&
            <QRCode data={{ session, socketUrl: SOCKET_URL, nft_id: id }} action={'BUY'} />
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
