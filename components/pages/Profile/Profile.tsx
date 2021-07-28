import React, { useState } from 'react';
import Link from 'next/link';
import style from './Profile.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NFTCard from 'components/base/NftCard';
import Creator from 'components/base/Creator';

import Sidebar from './Sidebar';
import FloatingMenu from './FloatingMenu';
import Edit from './Edit';
import Switch from 'react-switch';
import { NftType, UserType, FollowType } from 'interfaces';
import { follow, unfollow, isUserFollowing } from 'actions/follower';

export interface ProfileProps {
  setModalExpand: (b: boolean) => void;
  setNotAvailable: (b: boolean) => void;
  setSuccessPopup: (b: boolean) => void;
  user: UserType;
  ownedNFTS: NftType[];
  setOwnedNFTS: Function;
  createdNFTS: NftType[];
  setCreatedNFTS: Function;
  followers: FollowType[];
  setFollowers: Function;
  following: FollowType[];
  setFollowing: Function;

}

const Profile: React.FC<ProfileProps> = ({
  user,
  ownedNFTS,
  createdNFTS,
  followers,
  following,
  setFollowers,
  setFollowing,
  setModalExpand,
  setNotAvailable,
  setSuccessPopup,
}) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [scope, setScope] = useState('My NFTs');
  const [expand, setExpand] = useState(false);
  const [banner, setBanner] = useState(
    user.banner ??
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
  );
  const listedOwnedNFTS = ownedNFTS.filter(x=>x.listed===1)
  const unlistedOwnedNFTS = ownedNFTS.filter(x=>x.listed===0)
  const [, setSearchValue] = useState('' as string);

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleFollowUnfollowFollowers = async (profileWalletId: string, isUnfollow:boolean=false) => {
    try {
      let res = !isUnfollow ? await follow(profileWalletId, user.walletId) : await unfollow(profileWalletId, user.walletId);
      if (res) {
        setFollowers({...followers, ...res as UserType})
      }
    } catch (err) {
      console.error(err);
    }
  }

  const isUserFollowingItem = async (walletIdFollowed: string, walletIdFollower:string) => {
    try{
      let data = await isUserFollowing(walletIdFollowed, walletIdFollower)
      return data.isFollowing
    }catch(err){
      console.error(err)
    }
  }

  function returnTitle() {
    return scope;
  }

  function returnNFTs() {
    let displayNFTs: NftType[] = [];
    switch(scope){
      case 'My NFTs':
        displayNFTs = ownedNFTS;
        break;
      case 'My creations':
        displayNFTs = createdNFTS;
        break;
      case 'My listed NFTs':
        displayNFTs = listedOwnedNFTS;
        break;
      case 'My NFTs not for sale':
        displayNFTs = unlistedOwnedNFTS;
        break;
      default:
        displayNFTs = ownedNFTS;
        break;
    }
    return displayNFTs.map((item: NftType) => (
      <div key={item.id} className={style.NFTShell}>
        <NFTCard
          mode="grid"
          item={item}
        />
      </div>
    ));
  }

  function returnCategory() {
    if (scope === 'Following' || scope === 'Followers') {
      return (
        <div className={style.NFTs}>
          <div className={style.Top}>
            <h3 className={style.NFTTitle}>{returnTitle()}</h3>
            <div className={style.SearchContainer}>
              <div className={style.SearchBar}>
                <input
                  type="search"
                  onChange={updateKeywordSearch}
                  className={style.Input}
                  placeholder="Search"
                />
              </div>
              <div className={`${style.Toggle} ${style.Hidden}`}>
                <label>
                  <Switch
                    checked={isFiltered}
                    onChange={() => setIsFiltered(!isFiltered)}
                    offColor="#000000"
                    onColor="#7417ea"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    width={46}
                    handleDiameter={23}
                    className={style.SwitchShell}
                  />
                </label>
                <span className={style.Label}>Certified only</span>
              </div>
            </div>
          </div>
          <div className={style.FollowsContainer}>{returnFollowers()}</div>
        </div>
      );
    }
    if (scope === 'edit') {
      return (
        <Edit
          user={user}
          setBanner={setBanner}
          setSuccessPopup={setSuccessPopup}
        />
      );
    } else {
      return (
        <div className={style.NFTs}>
          <h3 className={style.NFTTitle}>{returnTitle()}</h3>
          <div className={style.NFTsContainer}>{returnNFTs()}</div>
        </div>
      );
    }
  }

  function returnFollowers() {
    let creators = followers.map((item: FollowType) => item.follower)
    let promises = creators.map(async (item: UserType) => {
      let isFollowing = (await isUserFollowingItem(item.walletId, user.walletId))
      return (
        <div key={item._id} className={style.CreatorShell}>
          <Link href={`/${item.name}`}>
            <a>
              <Creator user={item} size="small" showTooltip={false} />
            </a>
          </Link>
          <div className={style.CreatorInfos}>
            <Link href={`/${item.name}`}>
              <a>
                <h2 className={style.CreatorName}>{item.name}</h2>
              </a>
            </Link>
            <span className={style.CreatorFollowers}>
              {item.nbFollowers} followers
            </span>
            {scope !== 'Followers' && <div
              onClick={() => handleFollowUnfollowFollowers(item.walletId, isFollowing)}
              className={style.Unfollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </div>}
          </div>
        </div>
      )
    })
    Promise.all(promises).then(data => data)
  }

  return (
    <div className={style.Container}>
      <div className={style.Banner}>
        <img
          className={style.BannerIMG}
          src={banner}
          draggable="false"
          alt="banner"
        />
      </div>
      <div className={style.Wrapper}>
        <Sidebar
          user={user}
          scope={scope}
          setScope={setScope}
          setExpand={setExpand}
          ownedAmount={ownedNFTS.length}
          createdAmount={createdNFTS.length}
          listedOwnedAmount={listedOwnedNFTS.length}
          unlistedOwnedAmount={unlistedOwnedNFTS.length}
          followersAmount={followers.length}
          followingAmount={following.length}
        />
        {returnCategory()}
      </div>
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
      <Footer setNotAvailable={setNotAvailable} />
      {expand && (
        <FloatingMenu 
          setScope={setScope} 
          scope={scope} 
          setExpand={setExpand} 
          ownedAmount={ownedNFTS.length}
          createdAmount={createdNFTS.length}
          listedOwnedAmount={listedOwnedNFTS.length}
          unlistedOwnedAmount={unlistedOwnedNFTS.length}
          followersAmount={followers.length}
          followingAmount={following.length}
        />
      )}
    </div>
  );
};

export default Profile;
