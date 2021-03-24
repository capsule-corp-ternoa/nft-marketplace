/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Link from 'next/link';
//import { useTranslation } from 'react-i18next';

import style from './FloatingHeader.module.scss';
import Creator from 'components/base/Creator';
import CopyPaste from 'components/assets/copypaste';

const FloatingHeader: React.FC<any> = ({ item, setModalExpand }) => {
  const [, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullProfile, setFullProfile] = useState(false);

  //const { t } = useTranslation();

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
          <div className={style.Links}>
            <Link href="/#explore">
              <a className={style.LinkItem}>Explore</a>
            </Link>
            <Link href="/">
              <a className={style.LinkItem}>How it works</a>
            </Link>
          </div>
        </div>
      )}
      <div className={style.Container}>
        <div
          className={style.Burger}
          onClick={() => setIsExpanded(!isExpanded)}
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
        {item ? (
          <div
            className={
              fullProfile
                ? `${style.Profile} ${style.ProfileSelect}`
                : style.Profile
            }
            onClick={() => setFullProfile(!fullProfile)}
          >
            <div
              className={
                fullProfile
                  ? `${style.Caps} ${style.ProfileSelect}`
                  : style.Caps
              }
            >
              <span
                className={
                  fullProfile
                    ? `${style.NumberCaps} ${style.ProfileSelect}`
                    : style.NumberCaps
                }
              >
                {item.caps}
              </span>
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
          <div className={style.Connect} onClick={() => setModalExpand(true)}>
            Connect Wallet
          </div>
        )}
      </div>
      {item && fullProfile && (
        <div className={style.Dropdown}>
          <div className={style.DropdownContainer}>
            <div className={style.DropdownProfile}>
              <Creator item={item} size="xsmall" showTooltip={false} />
              <div className={style.Name}>{item?.name}</div>
            </div>

            <div className={style.Section}>
              <div className={style.SectionTitle}>
                Wallet :
                <span className={style.SectionWallet}>
                  gdt67fx6.....ej636373BH
                  <CopyPaste className={style.CopyPaste} />
                </span>
              </div>
            </div>
            <Link href="/test-author">
              <a className={style.Section}>
                <div className={style.SectionTitle}>Profile</div>
              </a>
            </Link>
            <Link href="/profile">
              <a className={style.Section}>
                <div className={style.SectionTitle}>Account</div>
              </a>
            </Link>
            <div className={style.Section}>
              <div className={style.SectionTitle}>Disconnect</div>
            </div>
          </div>
          <Link href="/wallet">
            <a className={style.CapsSection}>
              <span>My wallet</span>
              <div className={style.CapsPrice}>{item?.caps} Caps</div>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FloatingHeader;
