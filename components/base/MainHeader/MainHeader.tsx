import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Logo from 'components/assets/LogoTernoaBlack';
import { ProfileMenuBadge, ProfileMenuDropdown } from 'components/base/ProfileMenu';
import Button from 'components/ui/Button';

import { UserType } from 'interfaces/index';
import { computeCaps } from 'utils/strings';

import style from './MainHeader.module.scss';

export interface HeaderProps {
  user: UserType;
  setModalExpand: (b: boolean) => void;
}

const MainHeader: React.FC<HeaderProps> = ({ setModalExpand, user }) => {
  const [, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);
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
          <SNavButtonsCointainer>
            {isNftCreationEnabled && (
              <Link href="/create" passHref>
                <>
                  <Button
                    color="invertedContrast"
                    href="/create"
                    size="medium"
                    text="Create NFT"
                    variant="outlined"
                  />
                </>
              </Link>
            )}
            {user ? (
              <ProfileMenuBadge
                onClick={() => setIsExpanded(!isExpanded)}
                tokenAmount={
                  user?.capsAmount ? computeCaps(Number(user.capsAmount)) : 0
                }
                tokenSymbol="CAPS"
                user={user}
              />
            ) : (
              <Button
                color="contrast"
                onClick={() => setModalExpand(true)}
                size="medium"
                text="Connect"
                variant="outlined"
              />
            )}
          </SNavButtonsCointainer>
        </div>
        {user && isExpanded && <SProfileMenuDropdown user={user} />}
      </div>
    </div>
  );
};

const SNavButtonsCointainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-left: 5.6rem;
  }
`;

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
