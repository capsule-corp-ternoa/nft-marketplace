/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import style from './ModalEdit.module.scss';
import Close from 'components/assets/close';
import QRCode from 'components/base/QRCode';
import randomstring from 'randomstring';
import { connect as connectIo } from 'utils/socket/socket.helper';
import Link from 'next/link';
import CheckMark from 'components/assets/checkmark';
import { SOCKET_URL } from 'utils/constant';

export interface ModalEditProps {
  setModalExpand: (b: boolean) => void;
  data: any;
}

const ModalEdit: React.FC<ModalEditProps> = ({ setModalExpand, data }) => {
  const [session] = useState(randomstring.generate());
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRN, setIsRN] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsRN(window.isRNApp);
    console.log('socket connect on session',session);
    const socket = connectIo(`/socket/updateProfile`, { session, socketUrl: SOCKET_URL });
    socket.on('connect_error', (e) => {
      console.error('connection error socket', e);
      setModalExpand(false);
    });

    socket.on('CONNECTION_SUCCESS', () => {
      if (window.isRNApp) {
        setLoading(true)
        setTimeout(function () {
          window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'UPDATE_PROFILE', data: {...data, session, socketUrl: SOCKET_URL} }));
        }, 2000);
      } else {
        setShowQR(true);
      }
    });

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));

    socket.on('PROFILE_UPDATED', (data) => {
      setLoading(false)
      if (data.success){
          setSuccess(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
      socket.emit('PROFILE_UPDATED_RECEIVED');
      socket.close();
      setTimeout(() => {
        setModalExpand(false);
        router.reload()
      }, 1000)
    });
    socket.on('disconnect', () => {
      setModalExpand(false);
    });
    return function cleanup() {
      socket.close();
    };
  }, []);

  function manageUpdate() {
    if (success) {
      return (
        <>
          <CheckMark className={style.CheckMark} />
          <div className={style.Text}>
            Profile successfully updated.
          </div>
          <Link href="/profile">
            <a className={style.Button}>Back to profile</a>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <div className={style.Text}>
            {isRN
              ? 'update in progress...'
              : 'Flash the QR Code on your mobile wallet to update your profile'}
          </div>
          <div className={style.QR}>
            {showQR &&
              <QRCode data={{...data, session, socketUrl: SOCKET_URL}} action={'UPDATE_PROFILE'} />
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
        <div className={style.Title}>Update profile</div>
        {manageUpdate()}
        {error && <div className={style.Error}>{error}</div>}
      </div>
    </div>
  );
};

export default ModalEdit;
