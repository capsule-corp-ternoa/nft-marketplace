import React from 'react';
import style from './TwitterErrorModal.module.scss';
import Close from 'components/assets/close';
import { useRouter } from 'next/router';

export interface TwitterErrorModalProps {
  setModalExpand: (b: boolean) => void;
}

const TwitterErrorModal = ({ setModalExpand }: TwitterErrorModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    setModalExpand(false);
    router.push('/edit');
  };

  return (
    <div className={style.Background}>
      <div className={style.Container}>
        <Close onClick={() => setModalExpand(false)} className={style.Close} />
        <div className={style.Title}>Twitter validation</div>
        <div className={style.Text}>
          Twitter validation failed, please check your information and try again
        </div>
        <div onClick={() => handleClose()}>
          <a className={style.Button}>Back to profile edit</a>
        </div>
      </div>
    </div>
  );
};

export default TwitterErrorModal;
