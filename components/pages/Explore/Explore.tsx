import React from 'react';
import style from './Explore.module.scss';
import NFTCard from 'components/base/NftCard';
import NoNFTComponent from 'components/base/NoNFTComponent';
import { NftType, UserType } from 'interfaces/index';
export interface ExploreProps {
  NFTS: NftType[];
  user?: UserType;
  setUser?: (u: UserType) => void;
  loadMore: () => void;
  hasNextPage: boolean;
  loading: boolean;
}

const Explore: React.FC<ExploreProps> = ({
  NFTS,
  user,
  setUser,
  loadMore,
  hasNextPage,
  loading,
}) => {
  function returnNFTs() {
    return NFTS.map((item) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard mode="grid" item={item} user={user} setUser={setUser} />
      </div>
    ));
  }
  return (
    <>
      <div id="explore" className={style.Wrapper}>
        <div className={style.Top}>
          <h3 className={style.Title}>Explore</h3>
          <div className={style.Hide}>
            <span className={style.Filter}>
              <span role="img" className={style.Emoji} aria-label="art">
                🎨
              </span>
              Art
            </span>
            <span className={style.Filter}>
              <span role="img" className={style.Emoji} aria-label="photo">
                📸
              </span>
              Photo
            </span>
            <span className={style.Filter}>
              <span role="img" className={style.Emoji} aria-label="games">
                👾
              </span>
              Games
            </span>
            <span className={style.Filter}>
              <span role="img" className={style.Emoji} aria-label="games">
                🎷
              </span>
              Music
            </span>
            <span className={style.Filter}>
              <span role="img" className={style.Emoji} aria-label="design">
                🖌
              </span>
              Design
            </span>
            <span className={style.Filter}>
              <span role="img" className={style.Emoji} aria-label="photo">
                📷
              </span>
              Photo
            </span>
          </div>
        </div>
        {NFTS.length === 0 ? (
          <NoNFTComponent />
        ) : (
          <div className={style.NFTWrapper}>{returnNFTs()}</div>
        )}
        {hasNextPage && (
          <>
            {!loading ? (
              <div onClick={() => loadMore()} className={style.Button}>
                Load more
              </div>
            ) : (
              <div className={style.DisabledButton}>
                Loading...
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Explore;
