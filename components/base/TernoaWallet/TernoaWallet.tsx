/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import style from './TernoaWallet.module.scss';
import Close from 'components/assets/close';
import QRCode from 'components/base/QRCode';
import randomstring from 'randomstring';
import Cookies from 'js-cookie';
import { onModelClose } from 'utils/model-helpers';
import { connect as connectIo } from 'utils/socket/socket.helper';
import { encryptCookie } from 'utils/cookie';
import { NODE_API_URL, SOCKET_URL } from 'utils/constant';
import { getUser } from 'actions/user';
export interface TernoaWalletProps {
  setModalExpand: (b: boolean) => void;
}

const TernoaWallet: React.FC<TernoaWalletProps> = ({ setModalExpand }) => {
  const [session] = useState(randomstring.generate());
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    console.log('socket connect on session', session);
    const socket = connectIo(`/socket/login`, {
      session,
      socketUrl: SOCKET_URL,
    });

    socket.on('CONNECTION_SUCCESS', () => {
      setShowQR(true);
    });
    socket.on('connect_error', (e) => {
      console.error('connection error socket', e);
      setModalExpand(false);
    });
    socket.on('disconnect', (data) => {
      console.log('deco', data);
      setModalExpand(false);
    });

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('RECEIVE_WALLET_ID', async (data) => {
      console.log('SEND_WALLET_ID', data);
      const walletId = data.walletId as string;
      let isUserCreated = false
      try {
        const datas = await getUser(walletId);
        console.log('wallet response', datas);
        if(!datas && !datas.walletId) {
          const response = await fetch(`${NODE_API_URL}/api/users/create`, {
            method: 'POST',
            body: JSON.stringify({ walletId }),
          })
          const created = await response.json();
          if(created.walletId) isUserCreated = true;
        }else{
          isUserCreated=true
        }
      } catch (err) {
        console.log(err);
      }
      isUserCreated && Cookies.set('token', encryptCookie(walletId), {
        //sameSite: 'strict',
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
        <Close
          onClick={() => {
            onModelClose();
            setModalExpand(false);
          }}
          className={style.Close}
        />
        <div className={style.Title}>Wallet connect</div>
        <div className={style.Text}>
          To authenticate, scan this QR Code from your Ternoa Wallet mobile
          application.
        </div>
        <div className={style.QR}>
          {showQR ? (
            <QRCode
              data={{ session, socketUrl: SOCKET_URL }}
              action={'LOGIN'}
            />
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
