import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import styled from 'styled-components';

import { ProfileMenuBadge, ProfileMenuDropdown } from 'components/base/ProfileMenu';
import Button from 'components/ui/Button';

import { UserType } from 'interfaces/index';
import { computeCaps } from 'utils/strings';
import { breakpointMap } from 'style/theme/base';

import { onModelOpen } from '../../../utils/model-helpers';
import style from './FloatingHeader.module.scss';
export interface FloatingHeaderProps {
  user: UserType;
  setModalExpand: (b: boolean) => void;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  user,
  setModalExpand,
}) => {
  const [, setSearchValue] = useState('' as string);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProfileMenuExpanded, setIsProfileMenuExpanded] = useState(false);

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const isMobileTablet = useMediaQuery({
    query: `(max-width: ${breakpointMap.lg - 1}px)`,
  });

  if (!isMobileTablet) {
    return null;
  }

  return (
    <div className={isExpanded ? `${style.Header} ${style.HeaderExpanded}` : style.Header}>
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
        {user ? (
          <SProfileMenuBadge
            onClick={() => setIsProfileMenuExpanded(prevState => !prevState)}
            tokenAmount={
              user?.capsAmount ? computeCaps(Number(user.capsAmount)) : 0
            }
            tokenSymbol="CAPS"
            user={user}
          />
        ) : (
          <Button
            color="contrast"
            onClick={() => {
              onModelOpen();
              setModalExpand(true);
              setIsExpanded(false);
            }}
            size="medium"
            text="Connect Wallet"
            variant="outlined"
          />
        )}
      </div>
      {user && isProfileMenuExpanded && (
        <SProfileMenuDropdown
          onClose={() => setIsProfileMenuExpanded(false)}
          user={user}
        />
      )}
    </div>
  );
};

const SProfileMenuBadge = styled(ProfileMenuBadge)`
  background-color: transparent;
  border-color: ${({theme}) => theme.colors.invertedContrast};
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
    border-top: ${({ theme }) =>
      `1.2rem solid ${theme.colors.contrast}`};
    content: "";
    position: absolute;
    bottom: 0;
    right: 3.2rem;
    transform: translateY(0.8rem);
  }
`;

export default FloatingHeader;
