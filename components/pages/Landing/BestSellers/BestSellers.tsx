import React, { useState } from 'react';
import Switch from 'react-switch';
import style from './BestSellers.module.scss';
import Blaze from 'components/assets/blaze';

import Creator from 'components/base/Creator';

import { UserType } from 'interfaces/index';
import Link from 'next/link';

export interface BestSellersProps {
  creators: UserType[];
}

const BestSellers: React.FC<BestSellersProps> = ({ creators }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  function returnCreators() {
    return creators.map((item, index) => (
      <Link key={index} href={`/${item.walletId}`}>
        <a className={style.CreatorShell}>
          <Creator user={item} showTooltip={false} />
          <div className={style.CreatorInfos}>
            <h2 className={style.CreatorName}>{item.name}</h2>
            <span className={style.CreatorCaps}>0 CAPS</span>
          </div>
        </a>
      </Link>
    ));
  }

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
        <div className={style.CreatorsWrapper}>{returnCreators()}</div>
      </div>
    </>
  );
};

export default BestSellers;
