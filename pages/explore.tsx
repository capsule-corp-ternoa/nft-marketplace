import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import Explore from 'components/pages/Explore';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import cookies from 'next-cookies';
import { getUser } from 'actions/user';
import { getNFTs, getTotalOnSaleOnMarketplace } from 'actions/nft';
import { NftType, UserType } from 'interfaces';
import { NextPageContext } from 'next';
import { decryptCookie } from 'utils/cookie';

export interface ExplorePage {
  user: UserType;
  data: NftType[];
  dataHasNextPage: boolean;
  loading: boolean
}

const ExplorePage = ({
  user,
  data,
  dataHasNextPage,
}: ExplorePage) => {
  const [dataNfts, setDataNfts] = useState(data);
  const [dataNftsHasNextPage, setDataNftsHasNextPage] =
    useState(dataHasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTotalCount, setDataTotalCount] = useState(0)

  const loadMoreNfts = async () => {
    setIsLoading(true)
    try {
      if (dataNftsHasNextPage) {
        let result = await getNFTs(
          undefined,
          (currentPage + 1).toString(),
          undefined,
          true,
          true
        );
        setCurrentPage(currentPage + 1);
        setDataNftsHasNextPage(result.hasNextPage || false);
        setDataNfts([...dataNfts, ...result.data]);
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadTotalCount = async () => {
    try{
      setDataTotalCount(await getTotalOnSaleOnMarketplace())
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    loadTotalCount()
  }, [])

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ? process.env.NEXT_PUBLIC_APP_NAME : "SecretNFT"} - Explore</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
        <meta property="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader user={user} />
      <Explore
        NFTS={dataNfts}
        user={user}
        loadMore={loadMoreNfts}
        hasNextPage={dataNftsHasNextPage}
        loading={isLoading}
        totalCount={dataTotalCount}
      />
      <Footer />
      <FloatingHeader user={user} />
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const token = cookies(ctx).token && decryptCookie(cookies(ctx).token as string);
  let user: UserType | null = null,
    data: NftType[] = [],
    dataHasNextPage: boolean = false;
  const promises = [];
  if (token) {
    promises.push(
      new Promise<void>((success) => {
        getUser(token, true)
          .then((_user) => {
            user = _user;
            success();
          })
          .catch(success);
      })
    );
  }
  promises.push(
    new Promise<void>((success) => {
      getNFTs(undefined, undefined, undefined, true, true)
        .then((result) => {
          data = result.data;
          dataHasNextPage = result.hasNextPage || false;
          success();
        })
        .catch(success);
    })
  );
  await Promise.all(promises);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user, data, dataHasNextPage },
  };
}

export default ExplorePage;
