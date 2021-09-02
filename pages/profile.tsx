import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile from 'components/pages/Profile';
import NotAvailableModal from 'components/base/NotAvailable';
import SuccessPopup from 'components/base/SuccessPopup';
import cookies from 'next-cookies';

import { getUser } from 'actions/user';
import { getProfileNFTS, getCreatorNFTS } from 'actions/nft';
import { getFollowers, getFollowed } from 'actions/follower';
import { getLikedNFTs } from 'actions/user';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';

export interface ProfilePageProps {
  user: UserType;
  created: NftType[];
  owned: NftType[];
  liked: NftType[];
  followers: UserType[];
  followed: UserType[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  created,
  owned,
  liked,
  followers,
  followed,
}) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [walletUser, setWalletUser] = useState(user);
  const [createdNfts, setCreatedNfts] = useState(created)
  const [ownedNfts, setOwnedNfts] = useState(owned)
  const [likedNfts, setLikedNfts] = useState(liked)
  const [followersUsers, setFollowersUsers] = useState(followers)
  const [followedUsers, setFollowedUsers] = useState(followed)

  useEffect(() => {
    async function callBack() {
      try {
        let res = await getUser(window.walletId);
        setWalletUser(res);
      } catch (error) {
        console.error(error);
      }
    }
    if (window.isRNApp && window.walletId) callBack();
  }, []);

  return (
    <>
      <Head>
        <title>SecretNFT - My account</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ternoa - Your profile." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      {successPopup && <SuccessPopup setSuccessPopup={setSuccessPopup} />}

      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <Profile
        user={walletUser}
        setUser={setWalletUser}
        createdNFTS={createdNfts}
        setCreatedNFTS={setCreatedNfts}
        ownedNFTS={ownedNfts}
        setOwnedNFTS={setOwnedNfts}
        likedNfts={likedNfts}
        setLikedNfts={setLikedNfts}
        followers={followersUsers}
        setFollowers={setFollowersUsers}
        followed={followedUsers}
        setFollowed={setFollowedUsers}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        setSuccessPopup={setSuccessPopup}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let user = null, created: NftType[] = [], owned: NftType[] = [], liked: NftType[] = [], followers: UserType[] = [], followed: UserType[] = [];
  const token = cookies(ctx).token || ctx.query.walletId as string;
  const promises = [];
  if (token) {
    promises.push(new Promise<void>((success) => {
      getUser(token).then(_user => {
        user = _user
        success();
      }).catch(success);
    }));
    promises.push(new Promise<void>((success) => {
      getCreatorNFTS(token).then(_nfts => {
        created = _nfts
        success();
      }).catch(success);
    }));
    promises.push(new Promise<void>((success) => {
      getProfileNFTS(token).then(_nfts => {
        owned = _nfts
        success();
      }).catch(success);
    }));
    promises.push(new Promise<void>((success) => {
      getLikedNFTs(token).then(_nfts => {
        liked = _nfts
        success();
      }).catch(success);
    }));
    promises.push(new Promise<void>((success) => {
      getFollowers(token).then(_users => {
        followers = _users
        success();
      }).catch(success);
    }));
    promises.push(new Promise<void>((success) => {
      getFollowed(token).then(_users => {
        followed = _users
        success();
      }).catch(success);
    }));
  }
  await Promise.all(promises);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: { user, created, owned, liked, followers, followed },
  };
}

export default ProfilePage;
