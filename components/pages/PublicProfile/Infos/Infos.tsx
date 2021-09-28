import React, { useEffect, useState } from 'react';
import style from './Infos.module.scss';
import Badge from 'components/assets/badge';
import CopyPaste from 'components/assets/copypaste';
import Twitter from 'components/assets/SocialMedias/Twitter';
import gradient from 'random-gradient';
import { middleEllipsis } from 'utils/strings';
import { UserType } from 'interfaces';
import { follow, unfollow, isUserFollowing, getFollowedCount, getFollowersCount } from 'actions/follower';

export interface InfosProps {
  profile: UserType;
  setProfile: (u: UserType) => void;
  user: UserType;
}

const Infos: React.FC<InfosProps> = ({ profile, setProfile, user }) => {
  const [isUserFollowingProfile, setIsUserFollowingProfile] = useState<boolean | null>(null)
  const [followLoading, setFollowLoading] = useState(false)
  const [profileFollowersCount, setProfileFollowersCount] = useState(0)
  const [profileFollowedCount, setProfileFollowedCount] = useState(0)
  const bgGradient = profile ? { background: gradient(profile.name) } : {};

  const handleFollowUnfollow = async (isUnfollow:boolean=false) => {
    try {
      if (!followLoading){
        setFollowLoading(true)
        let res = !isUnfollow ? await follow(profile.walletId, user.walletId) : await unfollow(profile.walletId, user.walletId);
        if (res) {
          let views = profile.viewsCount
          setProfile({...res, viewsCount:views})
          getIsUserFollowingProfile()
        }
        setFollowLoading(false)
      }
    } catch (err) {
      setFollowLoading(false)
      console.error(err);
    }
  }

  const getIsUserFollowingProfile = async () => {
    try{
      let res = await isUserFollowing(profile.walletId, user.walletId)
      if (res) {
        setIsUserFollowingProfile(res.isFollowing)
      }
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if (profile && user && profile.walletId && user.walletId){
      getIsUserFollowingProfile()
    }
  }, [])

  const updateFollowersCount = async () => {
    if (profile && profile.walletId){
      const nb = await getFollowersCount(profile.walletId)
      if (!isNaN(nb)){
        setProfileFollowersCount(nb)
      }
    }
  }

  const updateFollowedCount = async () => {
    if (profile && profile.walletId){
      const nb = await getFollowedCount(profile.walletId)
      if (!isNaN(nb)){
        setProfileFollowedCount(nb)
      }
    }
  }

  useEffect(()=>{
    updateFollowersCount()
    updateFollowedCount()
  }, [profile])

  return (
    <div className={style.Infos}>
      <div className={style.Container}>
        <div className={style.AvatarShell}>
          <div className={style.Avatar}>
            {profile.picture ? (
              <img
                src={profile.picture}
                draggable="false"
                className={style.AvatarIMG}
              />
            ) : (
              <div style={bgGradient} className={style.AvatarIMG}>
                <div className={style.CreatorLetter}>{profile.name.charAt(0)}</div>
              </div>
            )}
            {profile.verified && <Badge className={style.Badge} />}
          </div>
        </div>
        <div className={style.ContainerInner}>
          <div className={style.Left}>
            <h1 className={style.Name}>{profile.name}</h1>
            {profile.twitterName && (
              <a href={"https://twitter.com/"+profile.twitterName.substring(1)} target="_blank" className={style.Twitter}>
                <Twitter onClick={() => true} className={style.TwitterSVG} />
                {profile.twitterName}
              </a>
            )}
            <div className={style.Description}>{profile.bio}</div>
          </div>
          <div className={style.Right}>
            <div className={style.Top}>
              <div
                className={style.Address}
                onClick={() => {
                  navigator.clipboard.writeText(profile.walletId);
                }}
              >
                {middleEllipsis(profile.walletId, 20)}
                <CopyPaste className={style.CopyPaste} />
              </div>
              {(user?.walletId && profile?.walletId && user.walletId!==profile.walletId && isUserFollowingProfile!==null) &&
                <div className={`${style.Button} ${followLoading ? style.ButtonDisabled : ""}`} onClick={()=>handleFollowUnfollow(isUserFollowingProfile)}>
                  {!isUserFollowingProfile ? "Follow" : "Unfollow"}
                </div>
              }
            </div>
            <div className={style.Bottom}>
              <span className={style.Bold}>{profileFollowersCount}</span>followers
              <span className={style.Separator}>·</span>
              <span className={style.Bold}>{profileFollowedCount}</span>following
              <span className={style.Separator}>·</span>
              <span className={style.Bold}>{profile.viewsCount}</span>views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infos;
