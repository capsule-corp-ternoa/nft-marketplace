import React from 'react';
import style from './PublicProfile.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Infos from './Infos';

import NFTCard from 'components/base/NftCard';
import { NftType, UserType } from 'interfaces';

export interface PublicProfileProps {
  user: UserType;
  setNotAvailable: (b: boolean) => void;
  setModalExpand: (b: boolean) => void;
  NFTS: NftType[];
  profile: UserType;
}

const PublicProfile: React.FC<PublicProfileProps> = ({
  user,
  profile,
  NFTS,
  setModalExpand,
  setNotAvailable,
}) => {
  function returnNFTs() {
    return NFTS.map((item: NftType) => (
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
      <Infos user={profile} />
      <div className={style.NFTWrapper}>{returnNFTs()}</div>
      {!window.isRNApp && (
        <FloatingHeader user={user} setModalExpand={setModalExpand} />
      )}
      <Footer setNotAvailable={setNotAvailable} />
    </div>
  );
};

export default PublicProfile;
