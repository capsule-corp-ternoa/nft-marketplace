import React from 'react';
import style from './Infos.module.scss';

import Badge from 'components/assets/badge';
import CopyPaste from 'components/assets/copypaste';
import Twitter from 'components/assets/SocialMedias/Twitter';

import gradient from 'random-gradient';

import { middleEllipsis } from 'utils/strings';
import { UserType } from 'interfaces';

export interface InfosProps {
  user: UserType;
}

const Infos: React.FC<InfosProps> = ({ user }) => {
  const bgGradient = user ? { background: gradient(user.name) } : {};

  return (
    <div className={style.Infos}>
      <div className={style.Container}>
        <div className={style.AvatarShell}>
          <div className={style.Avatar}>
            {user.picture ? (
              <img
                src={user.picture}
                draggable="false"
                className={style.AvatarIMG}
              />
            ) : (
              <div style={bgGradient} className={style.AvatarIMG}>
                <div className={style.CreatorLetter}>{user.name.charAt(0)}</div>
              </div>
            )}
            {user.verified && <Badge className={style.Badge} />}
          </div>
        </div>
        <div className={style.ContainerInner}>
          <div className={style.Left}>
            <h1 className={style.Name}>{user.name}</h1>
            {user.twitterName && (
              <a href="https://twitter.com/ternoa_" className={style.Twitter}>
                <Twitter onClick={() => true} className={style.TwitterSVG} />@
                {user.twitterName}
              </a>
            )}
            <div className={style.Description}>{user.bio}</div>
          </div>
          <div className={style.Right}>
            <div className={style.Top}>
              <div
                className={style.Hide}
                onClick={() => {
                  navigator.clipboard.writeText(user.walletId);
                }}
              >
                {middleEllipsis(user.walletId, 20)}
                <CopyPaste className={style.CopyPaste} />
              </div>
              <div></div>
            </div>
            <div className={style.Hide}>
              <span className={style.Bold}>{user.nbFollowers}</span>followers
              <span className={style.Separator}>·</span>
              <span className={style.Bold}>{user.nbFollowing}</span>following
              <span className={style.Separator}>·</span>
              <span className={style.Bold}>{user.views}</span>vues
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infos;
