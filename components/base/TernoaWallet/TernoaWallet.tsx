/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './TernoaWallet.module.scss';
import Close from 'components/assets/close';
import QRCode from 'components/base/QRCode';
import randomstring from 'randomstring';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const TernoaWallet: React.FC<any> = ({ setModalExpand }) => {
  const [session] = useState(randomstring.generate());
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKETIO_URL}/socket/login`, {
      query: { session },
    });

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('RECEIVE_WALLET_ID', (data) => {
      Cookies.set('token', data.walletId, {
        sameSite: 'strict',
        expires: 1,
      });
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
        <QRCode data={{ session }} action={'LOGIN'} />
        {error && <div className={style.Error}>{error}</div>}
      </div>
    </div>
  );
};

export default TernoaWallet;
