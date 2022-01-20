/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import randomstring from 'randomstring';
import Cookies from 'js-cookie';

import { getUser } from 'actions/user';
import QRCode from 'components/base/QRCode';
import Modal from 'components/ui/Modal';
import { NODE_API_URL, SOCKET_URL } from 'utils/constant';
import { encryptCookie } from 'utils/cookie';
import { connect as connectIo } from 'utils/socket/socket.helper';

import ModalLoader from './components/ModalLoader';

export interface ModalWalletProps {
  setExpanded: (b: boolean) => void;
}

const ModalWallet: React.FC<ModalWalletProps> = ({ setExpanded }) => {
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
      setExpanded(false);
    });
    socket.on('disconnect', (data) => {
      console.log('socket disconnect', data);
      setExpanded(false);
    });

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));
    socket.on('RECEIVE_WALLET_ID', async (data) => {
      //console.log('SEND_WALLET_ID', data);
      const walletId = data.walletId as string;
      let isUserCreated = false;
      try {
        const user = await getUser(walletId);
        if (!user.walletId) {
          const response = await fetch(`${NODE_API_URL}/api/users/create`, {
            method: 'POST',
            body: JSON.stringify({ walletId }),
          });
          const created = await response.json();
          if (created.walletId) isUserCreated = true;
        } else {
          isUserCreated = true;
        }
      } catch (err) {
        console.log(err);
      }
      if (isUserCreated) {
        Cookies.set('token', encryptCookie(walletId), {
          //sameSite: 'strict',
          expires: 1,
        });
      }
      socket.emit('RECEIVED_WALLET_ID', data);
      socket.close();
      window.location.reload();
    });

    return function cleanup() {
      socket.close();
    };
  }, []);

  return (
    <Modal
      error={error}
      setExpanded={setExpanded}
      subtitle="To authenticate, scan this QR Code from your Ternoa Wallet mobile application."
      title="Wallet connect"
    >
      {showQR ? <QRCode data={{ session, socketUrl: SOCKET_URL }} action={'LOGIN'} /> : <ModalLoader />}
    </Modal>
  );
};

export default ModalWallet;
