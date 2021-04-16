/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import style from './ModalMint.module.scss';
import Close from 'components/assets/close';
import randomstring from 'randomstring';
import io from 'socket.io-client';

const ModalMint: React.FC<any> = ({ setModalCreate }) => {
  const [session] = useState(randomstring.generate());
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = io(
      `${process.env.NEXT_PUBLIC_SOCKETIO_URL}/socket/createNft`,
      {
        query: { session },
      }
    );

    socket.on('CONNECTION_FAILURE', (data) => setError(data.msg));

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div id="createModal" className={style.Background}>
      <div className={style.Container}>
        <Close onClick={() => setModalCreate(false)} className={style.Close} />
        <div className={style.Title}>Create NFT</div>
        <div className={style.Text}>
          Please wait while we are uploading your files...
        </div>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default ModalMint;
