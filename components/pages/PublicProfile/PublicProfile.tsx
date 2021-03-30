import React from 'react';
//import { useTranslation } from 'react-i18next';
import style from './PublicProfile.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Infos from './Infos';

import NFTCard from 'components/base/NftCard';

const PublicProfile: React.FC<any> = ({
  user,
  profile,
  NFTS,
  setModalExpand,
  setNotAvailable,
}) => {
  //const { t } = useTranslation();

  function returnNFTs() {
    return NFTS.map((item: any) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard mode="profile" item={item} />
      </div>
    ));
  }

  return (
    <div className={style.Container}>
      <div className={style.Banner}>
        <img
          className={style.BannerIMG}
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
          alt="banner"
        />
      </div>
      <Infos user={profile} setNotAvailable={setNotAvailable} />
      <div className={style.NFTWrapper}>{returnNFTs()}</div>
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      <Footer setNotAvailable={setNotAvailable} />
    </div>
  );
};

export default PublicProfile;
