/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Switch from 'react-switch';
import style from './BestSellers.module.scss';
import Blaze from '../../../common/assets/blaze';

import Creator from '../../../common/Creator/Creator';

const BestSellers: React.FC<any> = ({ creators }) => {
  const [isFiltered, setIsFiltered] = useState(false);
  function returnCreators() {
    return creators.map((item: any) => (
      <div key={item.id} className={style.CreatorShell}>
        <Creator item={item} showTooltip={false} />
        <div className={style.CreatorInfos}>
          <h2 className={style.CreatorName}>{item.name}</h2>
          <span className={style.CreatorCaps}>{item.caps} caps</span>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className={style.Wrapper}>
        <div className={style.Top}>
          <h3 className={style.Title}>
            Best sellers <Blaze className={style.BlazeSVG} />
          </h3>
          <div className={style.Toggle}>
            <label>
              <Switch
                checked={isFiltered}
                onChange={(e) => setIsFiltered(!isFiltered)}
                offColor="#00000"
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
