import React from 'react';

//import { useTranslation } from 'react-i18next';
import style from './Sidebar.module.scss';
import Badge from 'components/assets/badge';
import CopyPaste from 'components/assets/copypaste';
import Edit from 'components/assets/edit';

import PowerOff from 'components/assets/poweroff';

const Sidebar: React.FC<any> = ({
  item,
  scope,
  setScope,
  setExpand,
  setNotAvailable,
}) => {
  //const { t } = useTranslation();

  function returnActiveTitle(name: any) {
    if (scope === name) {
      return `${style.SectionTitle} ${style.SectionTitleActive}`;
    } else {
      return style.SectionTitle;
    }
  }

  function returnActiveNumber(name: any) {
    if (scope === name)
      return `${style.SectionNumber} ${style.SectionNumberActive}`;
    else return style.SectionNumber;
  }

  return (
    <div className={style.SidebarMenu}>
      <div className={style.Infos}>
        <div className={style.AvatarShell}>
          <div className={style.Avatar}>
            <img className={style.AvatarIMG} src={item.img} />
            {item.verified && <Badge className={style.Badge} />}
          </div>
        </div>

        {scope !== 'edit' && (
          <div className={style.Edit} onClick={() => setScope('edit')}>
            <Edit className={style.EditSVG} />
            Edit profile
          </div>
        )}

        <h1 className={style.Name}>{item.name}</h1>
        <div
          className={style.Address}
          onClick={() => {
            navigator.clipboard.writeText(item.address);
          }}
        >
          {item.address} <CopyPaste className={style.CopyPaste} />
        </div>

        <div className={style.Separator} />
        <div className={style.Caps}>
          <span className={style.CapsData}>{item.caps} caps</span>
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
            onClick={() => setScope('My NFTs on sale')}
            className={returnActiveTitle('My NFTs on sale')}
          >
            On sale
          </div>
          <div className={returnActiveNumber('My NFTs on sale')}>12</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('My Collectibles')}
            className={returnActiveTitle('My Collectibles')}
          >
            Collectibles
          </div>
          <div className={returnActiveNumber('My Collectibles')}>45</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('My creations')}
            className={returnActiveTitle('My creations')}
          >
            Created
          </div>
          <div className={returnActiveNumber('My creations')}>4</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('Likes')}
            className={returnActiveTitle('Likes')}
          >
            Likes
          </div>
          <div className={returnActiveNumber('Likes')}>103</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('Followers')}
            className={returnActiveTitle('Followers')}
          >
            Followers
          </div>
          <div className={returnActiveNumber('Followers')}>349</div>
        </div>
        <div className={style.Section}>
          <div
            onClick={() => setScope('Followings')}
            className={returnActiveTitle('Followings')}
          >
            Followings
          </div>
          <div className={returnActiveNumber('Followings')}>38</div>
        </div>
        <div className={style.Disconnect} onClick={() => setNotAvailable(true)}>
          <PowerOff className={style.PowerOff} />
          Disconnect
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
