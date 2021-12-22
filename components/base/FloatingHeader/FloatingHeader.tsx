import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import ProfileMenuDropdown from 'components/base/ProfileMenu';

import { computeCaps, computeTiime } from 'utils/strings';
import gradient from 'random-gradient';

import { UserType } from 'interfaces/index';

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
  const [fullProfile, setFullProfile] = useState(false);

  const bgGradient = user ? { background: gradient(user.name) } : {};

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
              <span>
                <span
                  className={
                    fullProfile
                      ? `${style.NumberCaps} ${style.ProfileSelect}`
                      : style.NumberCaps
                  }
                >
                  {user.capsAmount ? computeCaps(Number(user.capsAmount)) : 0}{' '}
                </span>
                CAPS
              </span>
              <span style={{display: "none"}}>
                <span
                  className={
                    fullProfile
                      ? `${style.NumberCaps} ${style.ProfileSelect}`
                      : style.NumberCaps
                  }
                >
                  {user.tiimeAmount ? computeTiime(Number(user.tiimeAmount)) : 0}{' '}
                </span>
                TIIME
              </span>
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
        ) : (
          <div
            className={style.Connect}
            onClick={() => {
              onModelOpen();
              setModalExpand(true);
              setIsExpanded(false);
            }}
          >
            Connect Wallet
          </div>
        )}
      </div>
      {user && fullProfile && <SProfileMenuDropdown user={user} />}
    </div>
  );
};

const SProfileMenuDropdown = styled(ProfileMenuDropdown)`
  top: -22rem;
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
