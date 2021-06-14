import React from 'react';
import style from './NoNFTComponent.module.scss';
import NoNFTImage from 'components/assets/NoNFTImage';

interface NoNFTComponentProps {
}

const Code: React.FC<NoNFTComponentProps> = () => {
  return (
    <div className={style.SoldOutWrapper}>
    <div className={style.SoldOutContainer}>
        <NoNFTImage className={style.SoldOutImage}/>
        <div className={style.SoldOutTitle}>
            All NFTs are sold !
        </div>
        <div className={style.SoldOutLabel}>
            Come later to discover new NFTs.
        </div>
        <div className={style.SoldOutLabel}>
            Thanks !
        </div>
    </div>
    </div>
  );
};

export default Code;
