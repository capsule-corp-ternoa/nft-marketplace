import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import style from './ArtCreators.module.scss';
import { Picture, AVATAR_VARIANT_MOSAIC } from 'components/base/Avatar';
import { NftCardWithHover, CAROUSEL_MODE } from 'components/base/NftCard';

import Blaze from 'components/assets/blaze';

import { UserType, NftType } from 'interfaces/index';

export interface ArtCreatorsProps {
  creators?: UserType[];
  NFTs: NftType[];
  category?: string;
  user?: UserType;
}

const ArtCreators = ({ creators, NFTs, user }: ArtCreatorsProps) => {
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
                  <NftCardWithHover item={item} mode={CAROUSEL_MODE} user={user} />
                </div>
              ))}
            </div>
          )}
          {creators !== undefined && creators?.length > 0 && (
            <div className={style.CreatorsContainer}>
              <div className={style.CreatorsInner}>
                {creators.slice(0, 9).map(({ name, picture, walletId }) => (
                  <SCreatorPicture key={walletId}>
                    <Picture
                      isClickable
                      isTooltip
                      name={name}
                      picture={picture}
                      variant={AVATAR_VARIANT_MOSAIC}
                      walletId={walletId}
                    />
                  </SCreatorPicture>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const SCreatorPicture = styled.div`
  margin: 0.8rem;
`;

export default ArtCreators;
