import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from './Profile.module.scss';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NFTCard from 'components/base/NftCard';
import Creator from 'components/base/Creator';
import TwitterErrorModal from './TwitterErrorModal';
import Sidebar from './Sidebar';
import FloatingMenu from './FloatingMenu';
import Edit from './Edit';
import Switch from 'react-switch';
import { NftType, UserType } from 'interfaces';
import { follow, unfollow, isUserFollowing, getFollowersCount } from 'actions/follower';
import { getUserNFTsStat } from 'actions/nft';

export interface ProfileProps {
  setModalExpand: (b: boolean) => void;
  setNotAvailable: (b: boolean) => void;
  setSuccessPopup: (b: boolean) => void;
  user: UserType;
  setUser: (u: UserType) => void;
  loading: boolean;
  isFiltered: boolean;
  setIsFiltered:(b: boolean) => void;
  searchValue: string;
  setSearchValue:(s: string)=>void;
  //Owned
  ownedNFTS: NftType[];
  loadMoreOwnedNfts: () => void;
  ownedNftsHasNextPage: boolean;
  //Owned listed
  ownedNftsListed: NftType[];
  ownedNftsListedHasNextPage: boolean;
  loadMoreOwnedListedNfts: () => void;
  //Owned not listed
  ownedNftsUnlisted: NftType[];
  ownedNftsUnlistedHasNextPage: boolean;
  loadMoreOwnedUnlistedNfts: () => void;
  //created
  createdNFTS: NftType[];
  loadMoreCreatedNfts: () => void;
  createdNftsHasNextPage: boolean;
  //liked
  likedNfts: NftType[];
  setLikedNfts: (nfts: NftType[]) => void;
  likedNftsHasNextPage: boolean;
  loadMoreLikedNfts: () => void;
  //followers
  followers: UserType[];
  followersUsersHasNextPage: boolean;
  loadMoreFollowers: (forceLoad?: boolean)=>void;
  //followed
  followed: UserType[];
  setFollowed: (users: UserType[]) => void;
  followedUsersHasNextPage: boolean;
  loadMoreFollowed: (forceLoad?: boolean)=>void;
}

const Profile: React.FC<ProfileProps> = ({
  setModalExpand,
  setNotAvailable,
  setSuccessPopup,
  user,
  setUser,
  loading,
  isFiltered,
  setIsFiltered,
  searchValue,
  setSearchValue,
  ownedNFTS,
  loadMoreOwnedNfts,
  ownedNftsHasNextPage,
  ownedNftsListed,
  ownedNftsListedHasNextPage,
  loadMoreOwnedListedNfts,
  ownedNftsUnlisted,
  ownedNftsUnlistedHasNextPage,
  loadMoreOwnedUnlistedNfts,
  createdNFTS,
  createdNftsHasNextPage,
  loadMoreCreatedNfts,
  likedNfts,
  setLikedNfts,
  likedNftsHasNextPage,
  loadMoreLikedNfts,
  followers,
  followersUsersHasNextPage,
  loadMoreFollowers,
  followed,
  followedUsersHasNextPage,
  loadMoreFollowed,
  setFollowed,
}) => {
  const router = useRouter();
  const [scope, setScope] = useState(
    router.query?.scope === 'edit' ? 'edit' : 'My NFTs'
  );
  const [expand, setExpand] = useState(false);
  const [twitterErrorModal, setTwitterErrorModal] = useState(false);
  const [banner, setBanner] = useState(
    user.banner ??
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
  );
  const [followBacks, setFollowBacks] = useState(Array(followers.length).fill(false))
  const [countOwned, setCountOwned] = useState(0)
  const [countOwnedListed, setCountOwnedListed] = useState(0)
  const [countOwnedUnlisted, setCountOwnedUnlisted] = useState(0)
  const [countCreated, setCountOwnedCreated] = useState(0)
  const [countFollowers, setCountFollowers] = useState(0)
  const [countFollowed, setCountFollowed] = useState(0)
  const [followersNbFollowers, setFollowersNbFollowers] = useState({} as any)

  const setCounts = async () => {
    try{
      if (user){
        let userStat = await getUserNFTsStat(user.walletId, true)
        if (userStat){
          userStat.countOwned && setCountOwned(userStat.countOwned)
          userStat.countOwnedListed && setCountOwnedListed(userStat.countOwnedListed)
          userStat.countOwnedUnlisted && setCountOwnedUnlisted(userStat.countOwnedUnlisted)
          userStat.countCreated && setCountOwnedCreated(userStat.countCreated)
          userStat.countFollowers && setCountFollowers(userStat.countFollowers)
          userStat.countFollowed && setCountFollowed(userStat.countFollowed)
        }
      }
    }catch(err){
      console.log(err)
    }
  }

  const getFollowBacks = async () => {
    try{
      const followBacksTemp = [...followBacks]
      const promises = [] as Promise<{ isFollowing: boolean }>[]
      followers.forEach((x)=>{
        promises.push(isUserFollowing(x.walletId, user.walletId))
      })
      const results = await Promise.all(promises)
      results.forEach((res,i)=>{
        followBacksTemp[i] = res.isFollowing
      })
      setFollowBacks(followBacksTemp)
    }catch(err){
      console.log(err)
    }
  }

  const initFollowerStat = async () => {
    try{
      const followersCountTemp = {...followersNbFollowers}
      followers.forEach(async (x)=>{
        const followersCount = await getFollowersCount(x.walletId)
        followersCountTemp[x.walletId] = followersCount ? followersCount : 0
      })
      followed.forEach(async (x)=>{
        const followersCount = await getFollowersCount(x.walletId)
        followersCountTemp[x.walletId] = followersCount ? followersCount : 0
      })
      setFollowersNbFollowers(followersCountTemp)
    }catch(err){
      console.log(err)
    }
  }
  
  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleFollow = async (
    profileWalletId: string,
    isUnfollow: boolean = false
  ) => {
    try {
      let res = !isUnfollow
        ? await follow(profileWalletId, user.walletId)
        : await unfollow(profileWalletId, user.walletId);
      if (res) {
        if (isUnfollow) {
          setFollowed(followed.filter((x) => x.walletId !== res.walletId));
          setCountFollowed(countFollowed-1)
        } else {
          setFollowed(
            followed.findIndex((x) => x.walletId === res.walletId) !== -1
              ? followed.map((x) => (x.walletId === res.walletId ? res : x))
              : [...followed, res]
          );
          setCountFollowed(countFollowed+1)
        }
        await getFollowBacks()
        if (res.walletId){
          const newNbFollowers = await getFollowersCount(res.walletId)
          const newFollowersNbFollowers = {...followersNbFollowers }
          newFollowersNbFollowers[res.walletId] = !isNaN(newNbFollowers) ? newNbFollowers : 0
          setFollowersNbFollowers(newFollowersNbFollowers)
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (router.query?.twitterValidated === 'false') {
      setTwitterErrorModal(true);
      router.query = {};
    }
  }, [router.query]);
  
  useEffect(() => {
    setCounts()
    initFollowerStat()
  }, []);

  useEffect(() => {
    getFollowBacks()
  }, [followers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMoreFollowers(true)
      loadMoreFollowed(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [searchValue, isFiltered])


  function returnTitle() {
    return scope;
  }

  function returnNFTs() {
    let displayNFTs: NftType[] = [];
    switch (scope) {
      case 'My NFTs':
        displayNFTs = ownedNFTS;
        break;
      case 'My creations':
        displayNFTs = createdNFTS;
        break;
      case 'Liked':
        displayNFTs = likedNfts;
        break;
      case 'My NFTs on sale':
        displayNFTs = ownedNftsListed;
        break;
      case 'My NFTs not for sale':
        displayNFTs = ownedNftsUnlisted;
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
          user={user}
          setUser={setUser}
          likedNfts={likedNfts}
          setLikedNfts={setLikedNfts}
          scope={scope}
        />
      </div>
    ));
  }

  function returnCategory() {
    if (scope === 'Followed' || scope === 'Followers') {
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
              <div className={style.Toggle}>
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
            {scope === 'Followers' && (
              <>
                {followersUsersHasNextPage && (
                  <>
                    {!loading ? (
                      <div
                        onClick={() => loadMoreFollowers()}
                        className={style.Button}
                      >
                        Load more
                      </div>
                    ) : (
                      <div className={style.DisabledButton}>Loading...</div>
                    )}
                  </>
                )}
              </>
            )}
            {scope === 'Followed' && (
              <>
                {followedUsersHasNextPage && (
                  <>
                    {!loading ? (
                      <div
                        onClick={() => loadMoreFollowed()}
                        className={style.Button}
                      >
                        Load more
                      </div>
                    ) : (
                      <div className={style.DisabledButton}>Loading...</div>
                    )}
                  </>
                )}
              </>
            )}
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
        <div>
          <div className={style.NFTs}>
            <h3 className={style.NFTTitle}>{returnTitle()}</h3>
            <div className={style.NFTsContainer}>{returnNFTs()}</div>
          </div>
          <div>
            {scope === 'My creations' && (
              <>
                {createdNftsHasNextPage && (
                  <>
                    {!loading ? (
                      <div
                        onClick={() => loadMoreCreatedNfts()}
                        className={style.Button}
                      >
                        Load more
                      </div>
                    ) : (
                      <div className={style.DisabledButton}>Loading...</div>
                    )}
                  </>
                )}
              </>
            )}
            {scope === 'My NFTs' && (
              <>
                {ownedNftsHasNextPage && (
                  <>
                    {!loading ? (
                      <div
                        onClick={() => loadMoreOwnedNfts()}
                        className={style.Button}
                      >
                        Load more
                      </div>
                    ) : (
                      <div className={style.DisabledButton}>Loading...</div>
                    )}
                  </>
                )}
              </>
            )}
            {scope === 'Liked' && (
              <>
                {likedNftsHasNextPage && (
                  <>
                    {!loading ? (
                      <div
                        onClick={() => loadMoreLikedNfts()}
                        className={style.Button}
                      >
                        Load more
                      </div>
                    ) : (
                      <div className={style.DisabledButton}>Loading...</div>
                    )}
                  </>
                )}
              </>
            )}
            {scope === 'My NFTs on sale' && (
              <>
                {ownedNftsListedHasNextPage && (
                  <>
                    {!loading ? (
                      <div
                        onClick={() => loadMoreOwnedListedNfts()}
                        className={style.Button}
                      >
                        Load more
                      </div>
                    ) : (
                      <div className={style.DisabledButton}>Loading...</div>
                    )}
                  </>
                )}
              </>
            )}
            {scope === 'My NFTs not for sale' && (
              <>
                {ownedNftsUnlistedHasNextPage && (
                  <>
                    {!loading ? (
                      <div
                        onClick={() => loadMoreOwnedUnlistedNfts()}
                        className={style.Button}
                      >
                        Load more
                      </div>
                    ) : (
                      <div className={style.DisabledButton}>Loading...</div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      );
    }
  }

  const returnFollowers = () => {
    const creators = scope === 'Followers' ? followers : followed;
    return creators.map((item: UserType, i: number) => {
      return (
        <div key={item._id} className={style.CreatorShell}>
          <Link href={`/${item.walletId}`}>
            <a>
              <Creator user={item} size="small" showTooltip={false} />
            </a>
          </Link>
          <div className={style.CreatorInfos}>
            <Link href={`/${item.walletId}`}>
              <a>
                <h2 className={style.CreatorName}>{item.name}</h2>
              </a>
            </Link>
            <span className={style.CreatorFollowers}>
              {followersNbFollowers[item.walletId] ? followersNbFollowers[item.walletId] : 0} followers
            </span>
            {scope === 'Followers' ? (
              <div
                onClick={() => handleFollow(item.walletId, followBacks[i])}
                className={style.Unfollow}
              >
                {followBacks[i] ? 'Unfollow' : 'Follow'}
              </div>
            ) : (
              <div
                onClick={() => handleFollow(item.walletId, true)}
                className={style.Unfollow}
              >
                Unfollow
              </div>
            )}
          </div>
        </div>
      );
    });
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
          ownedAmount={countOwned}
          createdAmount={countCreated}
          listedOwnedAmount={countOwnedListed}
          unlistedOwnedAmount={countOwnedUnlisted}
          likedAmount={user.likedNFTs?.length || 0}
          followersAmount={countFollowers}
          followedAmount={countFollowed}
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
          ownedAmount={countOwned}
          createdAmount={countCreated}
          listedOwnedAmount={countOwnedListed}
          unlistedOwnedAmount={countOwnedUnlisted}
          likedAmount={user.likedNFTs?.length || 0}
          followersAmount={countFollowers}
          followedAmount={countFollowed}
        />
      )}
      {twitterErrorModal && (
        <TwitterErrorModal setModalExpand={setTwitterErrorModal} />
      )}
    </div>
  );
};

export default Profile;
