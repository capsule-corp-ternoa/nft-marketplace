/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Link from 'next/link';
//import { useTranslation } from 'react-i18next';

import Logo from 'components/assets/LogoTernoa';
import Creator from '../Creator';
import CopyPaste from 'components/assets/copypaste';

import style from './MainHeader.module.scss';

const MainHeader: React.FC<any> = ({ setModalExpand, item }) => {
  const [, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);
  //const { t } = useTranslation();

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div className={style.Header}>
      <div className={style.HeaderContainer}>
        <Link href="/">
          <a>
            <Logo className={style.Logo} onClick={() => true} />
          </a>
        </Link>

        <div className={style.SearchBar}>
          <input
            type="search"
            onChange={updateKeywordSearch}
            className={style.Input}
            placeholder="Search"
          />
        </div>
        <div className={style.Infos}>
          <div className={style.Links}>
            <Link href="/#explore">
              <a className={style.LinkItem}>Explore</a>
            </Link>
            <Link href="/">
              <a className={style.LinkItem}>How it works</a>
            </Link>
            <Link href="/">
              <a className={style.LinkItem}>Support</a>
            </Link>
          </div>
          <div className={style.Wallet}>
            {item ? (
              <div className={style.Regular}>
                <Link href="/create">
                  <a className={style.Create}>Create NFT</a>
                </Link>
                <div
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={style.Profile}
                >
                  <div className={style.Caps}>
                    <span className={style.NumberCaps}>{item?.caps}</span>
                    caps
                  </div>
                  <div className={style.ProfileImageContainer}>
                    <img
                      className={style.ProfileImage}
                      src={item?.img}
                      alt="profile"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.Regular}>
                <Link href="/create">
                  <a className={style.Create}>Create NFT</a>
                </Link>
                <div
                  onClick={() => setModalExpand(true)}
                  className={style.Connect}
                >
                  Connect
                </div>
              </div>
            )}
          </div>
        </div>
        {item && isExpanded && (
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
    </div>
  );
};

export default MainHeader;
