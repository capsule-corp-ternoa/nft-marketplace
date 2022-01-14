import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { ModalWallet } from 'components/base/Modal';
import { ProfileMenuBadge, ProfileMenuDropdown } from 'components/base/ProfileMenu';
import Button from 'components/ui/Button';

import { UserType } from 'interfaces/index';
import { computeCaps } from 'utils/strings';

import style from './FloatingHeader.module.scss';
export interface FloatingHeaderProps {
  user: UserType;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({ user }) => {
  const [, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalWalletExpanded, setIsModalWalletExpanded] = useState(false);
  const [isProfileMenuExpanded, setIsProfileMenuExpanded] = useState(false);

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <>
      <SHeaderContainer isExpanded={isExpanded}>
        {isExpanded && (
          <div className={style.FullHeader}>
            <div className={style.SearchBar}>
              <input type="search" onChange={updateKeywordSearch} className={style.Input} placeholder="Search" />
            </div>
            <div className={style.Links}>
              <Link href="/create">
                <a className={style.Link}>Create</a>
              </Link>
              <Link href="/explore">
                <a className={style.Link}>Explore</a>
              </Link>
              <Link href="/faq">
                <a className={style.Link}>How it works</a>
              </Link>
            </div>
          </div>
        )}
        <div className={style.Container}>
          <div className={style.Burger} onClick={() => setIsExpanded(!isExpanded)}>
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
          {user ? (
            <SProfileMenuBadge
              onClick={() => setIsProfileMenuExpanded((prevState) => !prevState)}
              tokenAmount={user?.capsAmount ? computeCaps(Number(user.capsAmount)) : 0}
              tokenSymbol="CAPS"
              user={user}
            />
          ) : (
            <Button
              color="invertedContrast"
              onClick={() => {
                setIsModalWalletExpanded(true);
                setIsExpanded(false);
              }}
              size="medium"
              text="Connect Wallet"
              variant="contained"
            />
          )}
        </div>
        {user && isProfileMenuExpanded && (
          <SProfileMenuDropdown onClose={() => setIsProfileMenuExpanded(false)} user={user} />
        )}
      </SHeaderContainer>
      {isModalWalletExpanded && <ModalWallet setExpanded={setIsModalWalletExpanded} />}
    </>
  );
};

const SHeaderContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-radius: ${({ isExpanded }) => isExpanded ? '2.4rem' : '4rem'};
  position: fixed;
  z-index: 100;
  bottom: 5.6rem;
  right: 10%;
  padding: ${({ isExpanded }) => isExpanded ? '1.6rem' : '1.2rem'};
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 28rem;
    right: 5.6rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const SProfileMenuBadge = styled(ProfileMenuBadge)`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.invertedContrast};
`;

const SProfileMenuDropdown = styled(ProfileMenuDropdown)`
  top: -23rem;
  right: 0;

  &::after {
    width: 0;
    height: 0;
    border-left: 2.4rem solid transparent;
    border-right: 2.4rem solid transparent;
    z-index: 101;
    border-top: ${({ theme }) => `1.2rem solid ${theme.colors.contrast}`};
    content: '';
    position: absolute;
    bottom: 0;
    right: 3.2rem;
    transform: translateY(0.8rem);
  }
`;

export default FloatingHeader;
