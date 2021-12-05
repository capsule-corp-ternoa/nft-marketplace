import React, { useState } from 'react';
import Switch from 'react-switch';
import style from './ArtCreators.module.scss';
import Creator from 'components/base/Creator';
import { NftCardWithHover } from 'components/base/NftCard';

import Blaze from 'components/assets/blaze';

import { UserType, NftType } from 'interfaces/index';

export interface ArtCreatorsProps {
  creators: UserType[];
  NFTs: NftType[];
  category?: string;
  user?: UserType;
  setUser?: (u: UserType) => void
}

const ArtCreators = ({ creators, NFTs, user, setUser }: ArtCreatorsProps) => {
  const [isFiltered, setIsFiltered] = useState(false);

  return (
    <>
      <div className={style.Wrapper}>
        <div className={style.Top}>
          <h3 className={style.Title}>
            Best art creators <Blaze className={style.BlazeSVG} />
          </h3>
          <div className={`${style.Toggle} ${style.Hide}`}>
            <label>
              <Switch
                checked={isFiltered}
                onChange={() => setIsFiltered(!isFiltered)}
                offColor="#000000"
                onColor="#7417ea"
                uncheckedIcon={false}
                checkedIcon={false}
                width={46}
                handleDiameter={23}
                className={style.SwitchShell}
              />
            </label>
            <span className={style.Label}>Certified only</span>
          </div>
        </div>
        <div className={style.Bottom}>
          {NFTs?.length > 0 && (
              <div className={style.NFTS}>
                {NFTs.map((item) => (
                  <div key={item.id} className={style.NFTShell}>
                    <NftCardWithHover item={item} user={user} setUser={setUser} />
                  </div>
                ))}
              </div>
            )}
          <div className={style.CreatorsContainer}>
            <div className={style.CreatorsInner}>
              {creators.slice(0, 9).map((item, index) => (
                <div key={index} className={style.CreatorItem}>
                  <Creator user={item} walletId={item.walletId} size="small" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtCreators;
