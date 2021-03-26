import React from 'react';
import Link from 'next/link';
//import { useTranslation } from 'react-i18next';
import style from './AlphaBanner.module.scss';

const AlphaBanner: React.FC = () => {
  //const { i18n, t } = useTranslation();

  /*
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };*/
  return (
    <div className={style.Banner}>
      <p className={style.Text}>
        Welcome to the <span className={style.Alpha}> Alpha Version</span> of
        SecretNFT. All the marketplace is in chaos net. Only FAKE CAPS are used.
      </p>
      <Link href="/faq">
        <a className={style.More}>More infos</a>
      </Link>
    </div>
  );
};

export default AlphaBanner;
