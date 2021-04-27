/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './ModalBuy.module.scss';
import Close from 'components/assets/close';
import QRCode from 'components/base/QRCode';
import randomstring from 'randomstring';
import io from 'socket.io-client';

export interface ModalBuyProps {
  setModalExpand: (b: boolean) => void;
  id: string;
}

const ModalBuy: React.FC<ModalBuyProps> = ({ setModalExpand, id }) => {
  const [session] = useState(randomstring.generate());
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}/socket/buyNft`, {
      query: { session },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      setShowQR(true);
    });

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('BUYING_NFT', (data) => {
      console.log(data), setModalExpand(false);
    });

    return function cleanup() {
      socket.close();
    };
  }, []);

  return (
    <div className={style.Background}>
      <div className={style.Container}>
        <Close onClick={() => setModalExpand(false)} className={style.Close} />
        <div className={style.Title}>Wallet connect</div>
        <div className={style.Text}>
          Flash this QR Code on your mobile wallet to buy this NFT.
        </div>
        <div className={style.QR}>
          {showQR && <QRCode data={{ session, nft_id: id }} action={'BUY'} />}
        </div>
        {error && <div className={style.Error}>{error}</div>}
      </div>
    </div>
  );
};

export default ModalBuy;
