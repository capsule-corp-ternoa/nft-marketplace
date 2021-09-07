import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
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
import { follow, unfollow } from 'actions/follower';

export interface ProfileProps {
  setModalExpand: (b: boolean) => void;
  setNotAvailable: (b: boolean) => void;
  setSuccessPopup: (b: boolean) => void;
  user: UserType;
  setUser: (u: UserType) => void;
  ownedNFTS: NftType[];
  setOwnedNFTS: (nfts: NftType[]) => void;
  createdNFTS: NftType[];
  setCreatedNFTS: (nfts: NftType[]) => void;
  likedNfts: NftType[];
  setLikedNfts: (nfts: NftType[]) => void;
  followers: UserType[];
  setFollowers: (nfts: UserType[]) => void;
  followed: UserType[];
  setFollowed: (nfts: UserType[]) => void;

}

const Profile: React.FC<ProfileProps> = ({
  user,
  setUser,
  ownedNFTS,
  createdNFTS,
  likedNfts,
  setLikedNfts,
  followers,
  followed,
  setFollowers,
  setFollowed,
  setModalExpand,
  setNotAvailable,
  setSuccessPopup,
}) => {
  const router = useRouter()
  const [isFiltered, setIsFiltered] = useState(false);
  const [scope, setScope] = useState(router.query?.scope === 'edit' ? 'edit' : 'My NFTs');
  const [expand, setExpand] = useState(false);
  const [twitterErrorModal, setTwitterErrorModal] = useState(false)
  const [banner, setBanner] = useState(
    user.banner ??
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
  );
  const listedOwnedNFTS = ownedNFTS.filter(x=>x.listed===1)
  const unlistedOwnedNFTS = ownedNFTS.filter(x=>x.listed===0)
  const [, setSearchValue] = useState('' as string);

  const ownedAmount=ownedNFTS.reduce((acc, cur) => acc + Number(cur.serieData?.filter(x => x.owner === user.walletId).length), 0)
  const createdAmount=createdNFTS.reduce((acc, cur) => acc + Number(cur.totalNft), 0)
  const listedOwnedAmount=listedOwnedNFTS.reduce((acc, cur) => acc + Number(cur.serieData?.filter(x => x.owner === user.walletId && x.listed===1).length), 0)
  const unlistedOwnedAmount=unlistedOwnedNFTS.reduce((acc, cur) => acc + Number(cur.serieData?.filter(x => x.owner === user.walletId && x.listed===0).length), 0)

  const updateKeywordSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleFollow = async (profileWalletId: string, isUnfollow:boolean=false) => {
    try {
      let res = !isUnfollow ? await follow(profileWalletId, user.walletId) : await unfollow(profileWalletId, user.walletId);
      if (res) {
        setFollowers(
          followers.findIndex(x => x.walletId === res.walletId) !== -1 ? 
            followers.map(x=>x.walletId === res.walletId ? res : x) 
          : 
            [...followers, res]
        )
        if (isUnfollow){
          setFollowed(followed.filter(x => x.walletId !== res.walletId))
        }else{
          setFollowed(
            followed.findIndex(x => x.walletId === res.walletId) !== -1 ? 
              followed.map(x=>x.walletId === res.walletId ? res : x) 
            : 
              [...followed, res]
          )
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (router.query?.twitterValidated === "false"){
      setTwitterErrorModal(true)
      router.query = {}
    }
  }, [router.query]);

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
      case 'Liked':
        displayNFTs = likedNfts;
        break;
      case 'My NFTs on sale':
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
    let creators = scope==="Followers" ? followers : followed
    creators = !isFiltered ? creators : creators.filter(x => x.verified)
    return creators.map((item: UserType) => {
      const followBack = scope==="Followers" && followed.findIndex(x => x.walletId === item.walletId) !== -1 ? true : false
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
            {scope === 'Followers' ? 
              <div
                onClick={() => handleFollow(item.walletId, followBack)}
                className={style.Unfollow}
              >
                {followBack ? "Unfollow" : "Follow"}
              </div>
            :
              <div
                onClick={() => handleFollow(item.walletId, true)}
                className={style.Unfollow}
              >
                Unfollow
              </div>
            }
          </div>
        </div>
      )
    })
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
          ownedAmount={ownedAmount}
          createdAmount={createdAmount}
          listedOwnedAmount={listedOwnedAmount}
          unlistedOwnedAmount={unlistedOwnedAmount}
          likedAmount={likedNfts.length}
          followersAmount={followers.length}
          followedAmount={followed.length}
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
          ownedAmount={ownedAmount}
          createdAmount={createdAmount}
          listedOwnedAmount={listedOwnedAmount}
          unlistedOwnedAmount={unlistedOwnedAmount}
          likedAmount={likedNfts.length}
          followersAmount={followers.length}
          followedAmount={followed.length}
        />
      )}
      {twitterErrorModal && 
        <TwitterErrorModal
          setModalExpand={setTwitterErrorModal}
        />
      }
    </div>
  );
};

export default Profile;
