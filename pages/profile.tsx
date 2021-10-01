import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile from 'components/pages/Profile';
import NotAvailableModal from 'components/base/NotAvailable';
import SuccessPopup from 'components/base/SuccessPopup';
import cookies from 'next-cookies';
import { getUser } from 'actions/user';
import { getOwnedNFTS, getCreatorNFTS } from 'actions/nft';
import { getFollowers, getFollowed } from 'actions/follower';
import { getLikedNFTs } from 'actions/user';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

export interface ProfilePageProps {
  user: UserType;
  created: NftType[];
  createdHasNextPage: boolean;
  owned: NftType[];
  ownedHasNextPage: boolean;
  ownedListed: NftType[];
  ownedListedHasNextPage: boolean;
  ownedUnlisted: NftType[];
  ownedUnlistedHasNextPage: boolean;
  liked: NftType[];
  likedHasNextPage: boolean;
  followers: UserType[];
  followersHasNextPage: boolean;
  followed: UserType[];
  followedHasNextPage: boolean;
  loading: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  created,
  createdHasNextPage,
  owned,
  ownedHasNextPage,
  ownedListed,
  ownedListedHasNextPage,
  ownedUnlisted,
  ownedUnlistedHasNextPage,
  liked,
  likedHasNextPage,
  followers,
  followersHasNextPage,
  followed,
  followedHasNextPage,
}) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [walletUser, setWalletUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  //Created NFTs
  const [createdNfts, setCreatedNfts] = useState(created);
  const [createdNftsHasNextPage, setCreatedNftsHasNextPage] = useState(createdHasNextPage);
  const [createdCurrentPage, setCreatedCurrentPage] = useState(1);
  //Owned NFTs
  const [ownedNfts, setOwnedNfts] = useState(owned);
  const [ownedNftsHasNextPage, setOwnedNftsHasNextPage] = useState(ownedHasNextPage);
  const [ownedCurrentPage, setOwnedCurrentPage] = useState(1);
  //Owned listed NFTs
  const [ownedNftsListed, setOwnedNftsListed] = useState(ownedListed);
  const [ownedNftsListedHasNextPage, setOwnedNftsListedHasNextPage] = useState(ownedListedHasNextPage);
  const [ownedNftsListedCurrentPage, setOwnedNftsListedCurrentPage] = useState(1);
  //Owned not listed NFTs
  const [ownedNftsUnlisted, setOwnedNftsUnlisted] = useState(ownedUnlisted);
  const [ownedNftsUnlistedHasNextPage, setOwnedNftsUnlistedHasNextPage] = useState(ownedUnlistedHasNextPage);
  const [ownedNftsUnlistedCurrentPage, setOwnedNftsUnlistedCurrentPage] = useState(1);
  //Liked NFTs
  const [likedNfts, setLikedNfts] = useState(liked);
  const [likedNftsHasNextPage, setLikedNftsHasNextPage] = useState(likedHasNextPage);
  const [likedCurrentPage, setLikedCurrentPage] = useState(1);
  //profile followers
  const [followersUsers, setFollowersUsers] = useState(followers);
  const [followersUsersHasNextPage, setFollowersUsersHasNextPage] = useState(followersHasNextPage);
  const [followersCurrentPage, setFollowersCurrentPage] = useState(1);
  //profile followed
  const [followedUsers, setFollowedUsers] = useState(followed);
  const [followedUsersHasNextPage, setFollowedUsersHasNextPage] = useState(followedHasNextPage);
  const [followedCurrentPage, setFollowedCurrentPage] = useState(1);

  const loadMoreCreatedNfts = async () => {
    setIsLoading(true);
    try {
      if (createdNftsHasNextPage) {
        let result = await getCreatorNFTS(
          walletUser.walletId,
          (createdCurrentPage + 1).toString()
        );
        setCreatedCurrentPage(createdCurrentPage + 1);
        setCreatedNftsHasNextPage(result.hasNextPage || false);
        setCreatedNfts([...createdNfts, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMoreOwnedNfts = async () => {
    setIsLoading(true);
    try {
      if (ownedNftsHasNextPage) {
        let result = await getOwnedNFTS(
          walletUser.walletId,
          false,
          undefined,
          (ownedCurrentPage + 1).toString()
        );
        setOwnedCurrentPage(ownedCurrentPage + 1);
        setOwnedNftsHasNextPage(result.hasNextPage || false);
        setOwnedNfts([...ownedNfts, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMoreOwnedListedNfts = async () => {
    setIsLoading(true);
    try {
      if (ownedNftsListedHasNextPage) {
        let result = await getOwnedNFTS(
          walletUser.walletId,
          true,
          1,
          (ownedNftsListedCurrentPage + 1).toString()
        );
        setOwnedNftsListedCurrentPage(ownedNftsListedCurrentPage + 1);
        setOwnedNftsListedHasNextPage(result.hasNextPage || false);
        setOwnedNftsListed([...ownedNftsListed, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMoreOwnedUnlistedNfts = async () => {
    setIsLoading(true);
    try {
      if (ownedNftsUnlistedHasNextPage) {
        let result = await getOwnedNFTS(
          walletUser.walletId,
          false,
          0,
          (ownedNftsUnlistedCurrentPage + 1).toString()
        );
        setOwnedNftsUnlistedCurrentPage(ownedNftsUnlistedCurrentPage + 1);
        setOwnedNftsUnlistedHasNextPage(result.hasNextPage || false);
        setOwnedNftsUnlisted([...ownedNftsUnlisted, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMoreLikedNfts = async () => {
    setIsLoading(true);
    try {
      if (likedNftsHasNextPage) {
        let result = await getLikedNFTs(
          walletUser.walletId,
          (likedCurrentPage + 1).toString()
        );
        setLikedCurrentPage(likedCurrentPage + 1);
        setLikedNftsHasNextPage(result.hasNextPage || false);
        setLikedNfts([...likedNfts, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMoreFollowers = async (forceLoad: boolean=false) => {
    setIsLoading(true);
    try {
      if (followersUsersHasNextPage || forceLoad) {
        let pageToLoad = !forceLoad ? followersCurrentPage : 0 
        let result = await getFollowers(
          walletUser.walletId,
          (pageToLoad + 1).toString(),
          undefined,
          searchValue,
          isFiltered ? "true" : undefined
        );
        setFollowersCurrentPage(pageToLoad + 1);
        setFollowersUsersHasNextPage(result.hasNextPage || false);
        if (!forceLoad){
          setFollowersUsers([...followersUsers, ...result.data]);
        }else{
          setFollowersUsers([...result.data]);
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadMoreFollowed = async (forceLoad: boolean=false) => {
    setIsLoading(true);
    try {
      if (followedUsersHasNextPage || forceLoad) {
        let pageToLoad = !forceLoad ? followedCurrentPage : 0 
        let result = await getFollowed(
          walletUser.walletId,
          (pageToLoad + 1).toString(),
          undefined,
          searchValue,
          isFiltered ? "true" : undefined
        );
        setFollowedCurrentPage(pageToLoad + 1);
        setFollowedUsersHasNextPage(result.hasNextPage || false);
        if (!forceLoad){
          setFollowedUsers([...followedUsers, ...result.data]);
        }else{
          setFollowedUsers([...result.data]);
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} - My account</title>
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
        createdNftsHasNextPage={createdNftsHasNextPage}
        loadMoreCreatedNfts={loadMoreCreatedNfts}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        ownedNFTS={ownedNfts}
        ownedNftsHasNextPage={ownedNftsHasNextPage}
        loadMoreOwnedNfts={loadMoreOwnedNfts}
        ownedNftsListed={ownedNftsListed}
        ownedNftsListedHasNextPage={ownedNftsListedHasNextPage}
        loadMoreOwnedListedNfts={loadMoreOwnedListedNfts}
        ownedNftsUnlisted={ownedNftsUnlisted}
        ownedNftsUnlistedHasNextPage={ownedNftsUnlistedHasNextPage}
        loadMoreOwnedUnlistedNfts={loadMoreOwnedUnlistedNfts}
        likedNfts={likedNfts}
        likedNftsHasNextPage={likedNftsHasNextPage}
        loadMoreLikedNfts={loadMoreLikedNfts}
        setLikedNfts={setLikedNfts}
        followers={followersUsers}
        followersUsersHasNextPage={followersUsersHasNextPage}
        loadMoreFollowers={loadMoreFollowers}
        followed={followedUsers}
        setFollowed={setFollowedUsers}
        followedUsersHasNextPage={followedUsersHasNextPage}
        loadMoreFollowed={loadMoreFollowed}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        setSuccessPopup={setSuccessPopup}
        loading={isLoading}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user = null,
    created: NftType[] = [],
    createdHasNextPage: boolean = false,
    owned: NftType[] = [],
    ownedHasNextPage: boolean = false,
    ownedListed: NftType[] = [],
    ownedListedHasNextPage: boolean = false,
    ownedUnlisted: NftType[] = [],
    ownedUnlistedHasNextPage: boolean = false,
    liked: NftType[] = [],
    likedHasNextPage: boolean = false,
    followers: UserType[] = [],
    followersHasNextPage: boolean = false,
    followed: UserType[] = [],
    followedHasNextPage: boolean = false;
  const promises = [];
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token)
          .then((_user) => {
            user = _user;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getCreatorNFTS(token)
          .then((result) => {
            created = result.data;
            createdHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getOwnedNFTS(token, false)
          .then((result) => {
            owned = result.data;
            ownedHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getOwnedNFTS(token, true, 1)
          .then((result) => {
            ownedListed = result.data;
            ownedListedHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getOwnedNFTS(token, false, 0)
          .then((result) => {
            ownedUnlisted = result.data;
            ownedUnlistedHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getLikedNFTs(token)
          .then((result) => {
            liked = result.data;
            likedHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getFollowers(token)
          .then((result) => {
            followers = result.data;
            followersHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getFollowed(token)
          .then((result) => {
            followed = result.data;
            followedHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
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
    props: {
      user,
      created,
      createdHasNextPage,
      owned,
      ownedHasNextPage,
      ownedListed,
      ownedListedHasNextPage,
      ownedUnlisted,
      ownedUnlistedHasNextPage,
      liked,
      likedHasNextPage,
      followers,
      followersHasNextPage,
      followed,
      followedHasNextPage,
    },
  };
}

export default ProfilePage;
