import React, { useState } from 'react';
import Switch from 'react-switch';
import style from './BestSellers.module.scss';
import Blaze from 'components/assets/blaze';

import Avatar from 'components/base/Avatar';

import { UserType } from 'interfaces/index';

export interface BestSellersProps {
  creators: UserType[];
}

const BestSellers: React.FC<BestSellersProps> = ({ creators }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  return (
    <>
      <div className={style.Wrapper}>
        <div className={style.Top}>
          <h3 className={style.Title}>
            Best sellers <Blaze className={style.BlazeSVG} />
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
        <div className={style.CreatorsWrapper}>
          {creators.map(({ name, picture, verified, walletId }) => (
            <div key={walletId} className={style.CreatorShell}>
              <Avatar
                isClickable
                isVerified={verified}
                label="0 CAPS"
                name={name}
                picture={picture}
                walletId={walletId}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSellers;
