import React from 'react';

import style from './Success.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';

import { UserType } from 'interfaces/index';
import SuccessImage from 'components/assets/SuccessImage';
import Link from 'next/link';

export interface SuccessProps {
  user: UserType;
  title: string;
  text?: string;
  buttonText: string;
  returnUrl: string
  setModalExpand: (b: boolean) => void;
}

const Success = ({ 
  user,
  title,
  text,
  buttonText,
  returnUrl,
  setModalExpand,
}: SuccessProps) => {
  return (
    <div className={style.Container}>
      <div className={style.Wrapper}>
        <SuccessImage className={style.Image}/>
        <h1 className={style.Title}>{title}</h1>
        {text && <div className={style.Text}>{text}</div>}
        <Link href={returnUrl}>
          <a className={style.Button}>{buttonText}</a>
        </Link>
      </div>
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      <Footer />
    </div>
  );
};

export default Success;
