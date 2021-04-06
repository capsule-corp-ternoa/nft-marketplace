import React from 'react';
import style from './Explore.module.scss';

import NFTCard from 'components/base/NftCard';

import { NftType } from 'interfaces/index';

export interface ExploreProps {
  NFTS: NftType[];
}

const Explore: React.FC<ExploreProps> = ({ NFTS }) => {
  function returnNFTs() {
    return NFTS.map((item) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard mode="grid" item={item} />
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
        <div className={style.NFTWrapper}>{returnNFTs()}</div>
        <div className={style.Hide}>Load more...</div>
      </div>
    </>
  );
};

export default Explore;
