/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Logo from '../assets/LogoTernoa';

import style from './FloatingHeader.module.scss';

const FloatingHeader: React.FC<any> = () => {
  const [searchValue, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);

  const history = useHistory();
  const { t } = useTranslation();

  const walletId = null;

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div
      id="FloatingHeader"
      className={
        isExpanded ? `${style.Header} ${style.HeaderExpanded}` : style.Header
      }
    >
      {isExpanded && (
        <div className={style.FullHeader}>
          <div className={style.SearchBar}>
            <input
              type="search"
              onChange={updateKeywordSearch}
              className={style.Input}
              placeholder="Search"
            />
          </div>
          <a href="#" className={style.Link}>
            How it works ?
          </a>
          <a href="#" className={style.Link}>
            Explore
          </a>
        </div>
      )}
      <div className={style.Container}>
        <div
          className={style.Burger}
          onClick={(e) => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span className={style.CrossLine} />
              <span className={style.CrossLine} />
            </>
          ) : (
            <>
              <span className={style.Line} />
              <span className={style.Line} />
              <span className={style.Line} />
            </>
          )}
        </div>
        <div className={style.Connect}>Connect Wallet</div>
      </div>
    </div>
  );
};

export default FloatingHeader;
