import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import Profile from 'components/pages/Profile';
import SuccessPopup from 'components/base/SuccessPopup';
import cookies from 'next-cookies';
import { getUser } from 'actions/user';
import { getOwnedNFTS, getCreatorNFTS } from 'actions/nft';
import { getFollowers, getFollowed } from 'actions/follower';
import { getLikedNFTs } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

export interface ProfilePageProps {
  user: UserType;
  owned: NftType[];
  ownedHasNextPage: boolean;
  loading: boolean;
}

const ProfilePage = ({
  user,
  owned,
  ownedHasNextPage,
}: ProfilePageProps) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [walletUser, setWalletUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  //Owned NFTs
  const [ownedNfts, setOwnedNfts] = useState(owned);
  const [ownedNftsHasNextPage, setOwnedNftsHasNextPage] = useState(ownedHasNextPage);
  const [ownedCurrentPage, setOwnedCurrentPage] = useState(1);
  //Created NFTs
  const [createdNfts, setCreatedNfts] = useState([] as NftType[]);
  const [createdNftsHasNextPage, setCreatedNftsHasNextPage] = useState(false);
  const [createdCurrentPage, setCreatedCurrentPage] = useState(1);
  //Owned listed NFTs
  const [ownedNftsListed, setOwnedNftsListed] = useState([] as NftType[]);
  const [ownedNftsListedHasNextPage, setOwnedNftsListedHasNextPage] = useState(false);
  const [ownedNftsListedCurrentPage, setOwnedNftsListedCurrentPage] = useState(1);
  //Owned not listed NFTs
  const [ownedNftsUnlisted, setOwnedNftsUnlisted] = useState([] as NftType[]);
  const [ownedNftsUnlistedHasNextPage, setOwnedNftsUnlistedHasNextPage] = useState(false);
  const [ownedNftsUnlistedCurrentPage, setOwnedNftsUnlistedCurrentPage] = useState(1);
  //Liked NFTs
  const [likedNfts, setLikedNfts] = useState([] as NftType[]);
  const [likedNftsHasNextPage, setLikedNftsHasNextPage] = useState(false);
  const [likedCurrentPage, setLikedCurrentPage] = useState(1);
  //profile followers
  const [followersUsers, setFollowersUsers] = useState([] as UserType[]);
  const [followersUsersHasNextPage, setFollowersUsersHasNextPage] = useState(false);
  const [followersCurrentPage, setFollowersCurrentPage] = useState(1);
  //profile followed
  const [followedUsers, setFollowedUsers] = useState([] as UserType[]);
  const [followedUsersHasNextPage, setFollowedUsersHasNextPage] = useState(false);
  const [followedCurrentPage, setFollowedCurrentPage] = useState(1);

  useEffect(() => {
    try{
      populateProfileData(user.walletId)
    }catch(err){
      console.log(err)
    }
  }, [])

  const populateProfileData = async (token: string) => {
    //created nfts
    const createdNfts = await getCreatorNFTS(token, undefined, undefined, true)
    setCreatedNfts(createdNfts.data)
    setCreatedNftsHasNextPage(createdNfts.hasNextPage)
    //Liked NFTs
    const liked = await getLikedNFTs(token, undefined, undefined, true)
    setLikedNfts(liked.data)
    setLikedNftsHasNextPage(liked.hasNextPage)
    //Owned listed NFTs
    const ownedListed = await getOwnedNFTS(token, true, true, undefined, undefined, true)
    setOwnedNftsListed(ownedListed.data)
    setOwnedNftsListedHasNextPage(ownedListed.hasNextPage)
    //Owned not listed NFTs
    const ownedUnlisted = await getOwnedNFTS(token, false, false, undefined, undefined, true)
    setOwnedNftsUnlisted(ownedUnlisted.data)
    setOwnedNftsUnlistedHasNextPage(ownedUnlisted.hasNextPage)
    //profile followers
    const followers = await getFollowers(token)
    setFollowersUsers(followers.data)
    setFollowersUsersHasNextPage(followers.hasNextPage)
    //profile followed
    const followed = await getFollowed(token)
    setFollowedUsers(followed.data)
    setFollowedUsersHasNextPage(followed.hasNextPage)
  } 

  const loadMoreCreatedNfts = async () => {
    setIsLoading(true);
    try {
      if (createdNftsHasNextPage) {
        let result = await getCreatorNFTS(
          walletUser.walletId,
          (createdCurrentPage + 1).toString(),
          undefined,
          true
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
          (ownedCurrentPage + 1).toString(),
          undefined,
          true
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
          true,
          (ownedNftsListedCurrentPage + 1).toString(),
          undefined,
          true
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
          false,
          (ownedNftsUnlistedCurrentPage + 1).toString(),
          undefined,
          true
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
          (likedCurrentPage + 1).toString(),
          undefined,
          true
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
          isFiltered ? true : undefined
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
          isFiltered ? true : undefined
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
      {successPopup && <SuccessPopup setSuccessPopup={setSuccessPopup} />}
      <BetaBanner />
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
        setSuccessPopup={setSuccessPopup}
        loading={isLoading}
      />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user = null, owned: NftType[] = [], ownedHasNextPage: boolean = false
  const promises = [];
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token, true, true)
          .then((_user) => {
            user = _user;
            success();
          })
          .catch(success);
      })
    );
    promises.push(
      new Promise<void>((success) => {
        getOwnedNFTS(token, false, undefined, undefined, undefined, true)
          .then((result) => {
            owned = result.data;
            ownedHasNextPage = result.hasNextPage || false;
            success();
          })
          .catch(success);
      })
    );
  }
  await Promise.all(promises);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user,
      owned,
      ownedHasNextPage,
    },
  };
}

export default ProfilePage;
