import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import style from './FloatingHeader.module.scss';
import Creator from 'components/base/Creator';
import CopyPaste from 'components/assets/copypaste';

import { computeCaps, computeTiime, middleEllipsis } from 'utils/strings';
import gradient from 'random-gradient';

import { UserType } from 'interfaces/index';

import { onModelOpen } from '../../../utils/model-helpers';
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
  const [isRN, setIsRN] = useState(false);

  useEffect(() => {
    setIsRN(window.isRNApp);
  }, []);
  
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
            {!isRN && 
              <Link href="/create">
                <a className={style.Link}>Create</a>
              </Link>
            }
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
      {user && fullProfile && (
        <div className={style.Dropdown}>
          <div className={style.DropdownContainer}>
            <div className={style.DropdownProfile}>
              <Creator user={user} size="xsmall" showTooltip={false} />
              <div className={style.Name}>{user?.name}</div>
            </div>

            <div className={style.Section}>
              <div className={style.SectionTitle}>
                <Link href="/wallet">
                  <a>
                    Wallet
                  </a>
                </Link>
                <span 
                  className={style.SectionWallet}
                  onClick={() => {
                    navigator.clipboard.writeText(user.walletId);
                  }}
                >
                  {middleEllipsis(user.walletId, 20)}
                  <CopyPaste className={style.CopyPaste} />
                </span>
              </div>
            </div>
            <Link href="/profile">
              <a className={style.Section}>
                <div className={style.SectionTitle}> My Account</div>
              </a>
            </Link>
          </div>
          <Link href={`/${user.walletId}`}>
            <a className={style.CapsSection}>
              <div className={style.SectionTitle}>My artist profile</div>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FloatingHeader;
