import React from 'react';
import style from './PublicProfile.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import Infos from './Infos';

import NFTCard from 'components/base/NftCard';
import { NftType, UserType } from 'interfaces';

export interface PublicProfileProps {
  user: UserType;
  setUser?: (u: UserType) => void;
  profile: UserType;
  setProfile: (u: UserType) => void;
  NFTS: NftType[];
  setNotAvailable: (b: boolean) => void;
  setModalExpand: (b: boolean) => void;
  loadMore: () => void;
  hasNextPage: boolean;
  loading: boolean;
}

const PublicProfile: React.FC<PublicProfileProps> = ({
  user,
  setUser,
  profile,
  setProfile,
  NFTS,
  setModalExpand,
  setNotAvailable,
  loadMore,
  hasNextPage,
  loading,
}) => {
  function returnNFTs() {
    return NFTS.map((item: NftType) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard mode="profile" item={item} user={user} setUser={setUser} />
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
      <Infos profile={profile} setProfile={setProfile} user={user} />
        <div className={style.NFTWrapper}>{returnNFTs()}</div>
        {hasNextPage && (
          <>
            {!loading ? (
              <div onClick={() => loadMore()} className={style.Button}>
                Load more
              </div>
            ) : (
              <div className={style.DisabledButton}>Loading...</div>
            )}
          </>
        )}
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      <Footer setNotAvailable={setNotAvailable} />
    </div>
  );
};

export default PublicProfile;
