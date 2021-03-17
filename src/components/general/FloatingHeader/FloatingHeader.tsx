/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Logo from '../assets/LogoTernoa';

import style from './FloatingHeader.module.scss';

const FloatingHeader: React.FC = () => {
  const [searchValue, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);

  const history = useHistory();
  const { t } = useTranslation();

  // to update when wallet API will be integrated
  // const walletId = null;

  const walledId = {
    id: 61768,
  };

  const item = {
    name: 'Takeshi Kovacs',
    caps: 78029,
    img:
      'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80',
    verified: true,
    id: 9,
  };

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
          <a href="/" className={style.Link}>
            How it works ?
          </a>
          <a href="/" className={style.Link}>
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
        {walledId ? (
          <div className={style.Profile}>
            <div className={style.Caps}>
              <span className={style.NumberCaps}>{item.caps}</span>
              caps
            </div>
            <div className={style.ProfileImageContainer}>
              <img
                className={style.ProfileImage}
                src={item.img}
                alt="profile"
              />
            </div>
          </div>
        ) : (
          <div className={style.Connect}>Connect Wallet</div>
        )}
      </div>
    </div>
  );
};

export default FloatingHeader;
