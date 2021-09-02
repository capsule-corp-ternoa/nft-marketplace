import React, { useEffect, useState } from 'react';
import style from './Sidebar.module.scss';
import Badge from 'components/assets/badge';
import CopyPaste from 'components/assets/copypaste';
import Edit from 'components/assets/edit';

import PowerOff from 'components/assets/poweroff';
import { computeCaps, computeTiime, middleEllipsis } from 'utils/strings';
import gradient from 'random-gradient';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { UserType } from 'interfaces';

export interface SidebarProps {
  setScope: (s: string) => void;
  setExpand: (b: boolean) => void;
  scope: string;
  user: UserType;
  ownedAmount: number;
  createdAmount: number;
  likedAmount: number;
  listedOwnedAmount: number;
  unlistedOwnedAmount: number;
  followersAmount: number;
  followedAmount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  scope,
  setScope,
  setExpand,
  ownedAmount,
  createdAmount,
  likedAmount,
  listedOwnedAmount,
  unlistedOwnedAmount,
  followersAmount,
  followedAmount
}) => {
  const router = useRouter();
  const bgGradient = user ? { background: gradient(user.name) } : {};
  const [isRn, setIsRn] = useState(false)
  
  useEffect(() => {
    setIsRn(window.isRNApp);
  }, []);

  function returnActiveTitle(name: string) {
    if (scope === name) {
      return `${style.SectionTitle} ${style.SectionTitleActive}`;
    } else {
      return style.SectionTitle;
    }
  }

  function returnActiveNumber(name: string) {
    if (scope === name)
      return `${style.SectionNumber} ${style.SectionNumberActive}`;
    else return style.SectionNumber;
  }

  function disconnect() {
    if (!isRn){
      Cookies.remove('token');
      router.push('/');
    }
  }

  return (
    <div className={style.SidebarMenu}>
      <div className={style.Infos}>
        <div className={style.AvatarShell}>
          <div style={bgGradient} className={style.Avatar}>
            {user.picture ? (
              <img
                className={style.AvatarIMG}
                draggable="false"
                src={user.picture}
              />
            ) : (
              <div className={style.CreatorLetter}>{user.name.charAt(0)}</div>
            )}

            {user.verified && <Badge className={style.Badge} />}
          </div>
        </div>

        {scope !== 'edit' && (
          <div className={style.Edit} onClick={() => setScope('edit')}>
            <Edit className={style.EditSVG} />
            Edit profile
          </div>
        )}

        <h1 className={style.Name}>{user.name}</h1>
        <div
          className={style.Address}
          onClick={() => {
            navigator.clipboard.writeText(user.walletId);
          }}
        >
          {middleEllipsis(user.walletId, 20)}
          <CopyPaste className={style.CopyPaste} />
        </div>

        <div className={style.Separator} />
        <div className={style.Caps}>
          <span className={style.CapsData}>
            {user.capsAmount ? computeCaps(Number(user.capsAmount)) : 0} CAPS
          </span>
          <span className={style.CapsData} style={{display: "none"}}>
            {user.tiimeAmount ? computeTiime(Number(user.tiimeAmount)) : 0} TIIME
          </span>
          <div className={style.Burger} onClick={() => setExpand(true)}>
            <span className={style.Line} />
            <span className={style.Line} />
            <span className={style.Line} />
          </div>
        </div>
      </div>
      <div className={style.Sections}>
        <div className={style.Section}>
          <div
            onClick={() => setScope('My NFTs')}
            className={returnActiveTitle('My NFTs')}
          >
            My NFTs
          </div>
          <div className={returnActiveNumber('My NFTs')}>{ownedAmount}</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('My creations')}
            className={returnActiveTitle('My creations')}
          >
            Created
          </div>
          <div className={returnActiveNumber('My creations')}>
            {createdAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('Liked')}
            className={returnActiveTitle('Liked')}
          >
            Liked
          </div>
          <div className={returnActiveNumber('Liked')}>
            {likedAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('My NFTs on sale')}
            className={returnActiveTitle('My NFTs on sale')}
          >
            On sale
          </div>
          <div className={returnActiveNumber('My NFTs on sale')}>
            {listedOwnedAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('My NFTs not for sale')}
            className={returnActiveTitle('My NFTs not for sale')}
          >
            Not on sale
          </div>
          <div className={returnActiveNumber('My NFTs not for sale')}>
            {unlistedOwnedAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('Followers')}
            className={returnActiveTitle('Followers')}
          >
            Followers
          </div>
          <div className={returnActiveNumber('Followers')}>
            {followersAmount}
          </div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('Followed')}
            className={returnActiveTitle('Followed')}
          >
            Followed
          </div>
          <div className={returnActiveNumber('Followed')}>
            {followedAmount}
          </div>
        </div>
        {!isRn && 
          <div className={style.Disconnect} onClick={disconnect}>
            <PowerOff className={style.PowerOff} />
            Disconnect
          </div>
        }
        
      </div>
    </div>
  );
};

export default Sidebar;
