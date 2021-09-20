import React, { useState } from 'react';
import Head from 'next/head';
import AlphaBanner from 'components/base/AlphaBanner';
import MainHeader from 'components/base/MainHeader';
import TernoaWallet from 'components/base/TernoaWallet';
import PublicProfile from 'components/pages/PublicProfile';
import NotAvailableModal from 'components/base/NotAvailable';
import cookies from 'next-cookies';

import { getUser, getProfile } from 'actions/user';
import { getCreatorNFTS } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

export interface PublicProfileProps {
  user: UserType;
  profile: UserType;
  data: NftType[];
  dataHasNextPage: boolean;
}

const PublicProfilePage: React.FC<PublicProfileProps> = ({
  user,
  data,
  profile,
  dataHasNextPage,
}) => {
  const [modalExpand, setModalExpand] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [walletUser, setWalletUser] = useState(user);
  const [viewProfile, setViewProfile] = useState(profile);
  const [dataNfts, setDataNfts] = useState(data);
  const [dataNftsHasNextPage, setDataNftsHasNextPage] = useState(dataHasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreNfts = async () => {
    setIsLoading(true);
    try {
      if (dataNftsHasNextPage) {
        let result = await getCreatorNFTS(
          viewProfile.walletId,
          (currentPage + 1).toString()
        );
        setCurrentPage(currentPage + 1);
        setDataNftsHasNextPage(result.hasNextPage || false);
        setDataNfts([...dataNfts, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} - {viewProfile.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`Ternoart - ${viewProfile.name} profile page.`}
        />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      {modalExpand && <TernoaWallet setModalExpand={setModalExpand} />}
      {notAvailable && <NotAvailableModal setNotAvailable={setNotAvailable} />}
      <AlphaBanner />
      <MainHeader user={walletUser} setModalExpand={setModalExpand} />
      <PublicProfile
        user={walletUser}
        setUser={setWalletUser}
        profile={viewProfile}
        setProfile={setViewProfile}
        NFTS={dataNfts}
        setModalExpand={setModalExpand}
        setNotAvailable={setNotAvailable}
        loadMore={loadMoreNfts}
        hasNextPage={dataNftsHasNextPage}
        loading={isLoading}
      />
    </>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user: UserType | null = null,
    profile: UserType | null = null,
    data: NftType[] = [],
    dataHasNextPage: boolean = false;
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
  }
  promises.push(new Promise<void>((success) => {
    getProfile(ctx.query.name as string, token ? token : null).then(_profile => {
      profile = _profile
      success();
    }).catch(success);
  }));
  promises.push(new Promise<void>((success) => {
    getCreatorNFTS(ctx.query.name as string).then(result => {
      data = result.data
      dataHasNextPage = result.hasNextPage || false;
      success();
    }).catch(success);
  }));
  await Promise.all(promises)
  if (!profile) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: { user, profile, data, dataHasNextPage },
  };
}

export default PublicProfilePage;
