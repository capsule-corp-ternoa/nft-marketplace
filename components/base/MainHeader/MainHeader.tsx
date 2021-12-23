import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Logo from 'components/assets/LogoTernoaBlack';
import ProfileMenuDropdown from 'components/base/ProfileMenu';

import style from './MainHeader.module.scss';
import { computeCaps, computeTiime } from 'utils/strings';
import gradient from 'random-gradient';

import { UserType } from 'interfaces/index';

export interface HeaderProps {
  user: UserType;
  setModalExpand: (b: boolean) => void;
}

const MainHeader: React.FC<HeaderProps> = ({ setModalExpand, user }) => {
  const [, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);
  const bgGradient = user ? { background: gradient(user.name) } : {};
  const isNftCreationEnabled = process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED===undefined ? true : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true'
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
            <Link href="/explore">
              <a className={style.LinkItem}>Explore</a>
            </Link>
            <Link href="/faq">
              <a className={style.LinkItem}>How it works</a>
            </Link>
          </div>
          <div className={style.Wallet}>
            {user ? (
              <div className={style.Regular}>
                {isNftCreationEnabled && <Link href="/create">
                  <a className={style.Create}>Create NFT</a>
                </Link>}
                <div
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={style.Profile}
                >
                  <div className={style.Caps}>
                    <span className={style.NumberCaps}>
                      {user && user.capsAmount
                        ? computeCaps(Number(user.capsAmount))
                        : 0}
                    </span>
                    CAPS
                  </div>
                  <div className={style.Caps} style={{display: "none"}}>
                    <span className={style.NumberCaps}>
                      {user && user.tiimeAmount
                        ? computeTiime(Number(user.tiimeAmount))
                        : 0}
                    </span>
                    TIIME
                  </div>
                  
                  <div className={style.ProfileImageContainer}>
                    {user.picture ? (
                      <img
                        src={user.picture}
                        draggable="false"
                        className={style.ProfileImage}
                      />
                    ) : (
                      <div style={bgGradient} className={style.ProfileImage}>
                        <div className={style.CreatorLetter}>
                          {user.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.Regular}>
                {isNftCreationEnabled && <Link href="/create">
                  <a className={style.Create}>Create NFT</a>
                </Link>}
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
        {user && isExpanded && <SProfileMenuDropdown user={user} />}
      </div>
    </div>
  );
};

const SProfileMenuDropdown = styled(ProfileMenuDropdown)`
  top: 10rem;
  right: 4.8rem;

  &::before {
    width: 0;
    height: 0;
    border-left: 2.4rem solid transparent;
    border-right: 2.4rem solid transparent;
    z-index: 101;
    border-top: ${({ theme }) =>
      `1.2rem solid ${theme.colors.invertedContrast}`};
    content: '';
    position: absolute;
    top: -1.6rem;
    right: 3.2rem;
    transform: translateY(0.8rem) rotate(180deg);
  }
`;

export default MainHeader;
