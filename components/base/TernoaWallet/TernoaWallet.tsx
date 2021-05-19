/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './TernoaWallet.module.scss';
import Close from 'components/assets/close';
import QRCode from 'components/base/QRCode';
import randomstring from 'randomstring';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

export interface TernoaWalletProps {
  setModalExpand: (b: boolean) => void;
}

const TernoaWallet: React.FC<TernoaWalletProps> = ({ setModalExpand }) => {
  const [session] = useState(randomstring.generate());
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}/socket/login`, {
      query: { session },
      transports: ['websocket'],
    });

    socket.on('CONNECTION_SUCCESS', () => {
      setShowQR(true);
    });
    socket.on('connect_error', (e) => {
      console.error('connection error socket', e)
    });
    socket.on('disconnect', (data) => console.log('deco', data));

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('RECEIVE_WALLET_ID', (data) => {
      console.log('SEND_WALLET_ID',data);      
      Cookies.set('token', data.walletId, {
        sameSite: 'strict',
        expires: 1,
      });
      socket.emit('RECEIVED_WALLET_ID', data);
      socket.close();
      window.location.reload();
    });

    return function cleanup() {
      socket.close();
    };
  }, []);

  return (
    <div id="ternoaWallet" className={style.Background}>
      <div className={style.Container}>
        <Close onClick={() => setModalExpand(false)} className={style.Close} />
        <div className={style.Title}>Wallet connect</div>
        <div className={style.Text}>
          To authenticate, scan this QR Code from your Ternoa Wallet mobile
          application.
        </div>
        <div className={style.QR}>
          {showQR ? (
            <QRCode data={{ session }} action={'LOGIN'} />
          ) : (
            <div className={style.Loading}>
              <span className={style.Dot}></span>
              <span className={style.Dot}></span>
              <span className={style.Dot}></span>
            </div>
          )}
        </div>
        {error && <div className={style.Error}>{error}</div>}
      </div>
    </div>
  );
};

export default TernoaWallet;
