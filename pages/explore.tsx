import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import BetaBanner from 'components/base/BetaBanner';
import MainHeader from 'components/base/MainHeader';
import Explore from 'components/pages/Explore';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import { getNFTs, getTotalOnSaleOnMarketplace } from 'actions/nft';
import { NftType } from 'interfaces';
import { useMarketplaceData } from 'redux/hooks';

export interface ExplorePage {
  data: NftType[];
  dataHasNextPage: boolean;
  loading: boolean;
}

const ExplorePage = ({ data, dataHasNextPage }: ExplorePage) => {
  const [dataNfts, setDataNfts] = useState(data);
  const [dataNftsHasNextPage, setDataNftsHasNextPage] = useState(dataHasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTotalCount, setDataTotalCount] = useState(0);

  const { name } = useMarketplaceData();

  const loadMoreNfts = async () => {
    setIsLoading(true);
    try {
      if (dataNftsHasNextPage) {
        let result = await getNFTs(undefined, (currentPage + 1).toString(), undefined, true, true);
        setCurrentPage(currentPage + 1);
        setDataNftsHasNextPage(result.hasNextPage || false);
        setDataNfts([...dataNfts, ...result.data]);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadTotalCount = async () => {
    try {
      setDataTotalCount(await getTotalOnSaleOnMarketplace());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTotalCount();
  }, []);

  return (
    <>
      <Head>
        <title>{name} - Explore</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="SecretNFT Marketplace, by Ternoa." />
        <meta name="og:image" content="ternoa-social-banner.jpg" />
        <meta property="og:image" content="ternoa-social-banner.jpg" />
      </Head>
      <BetaBanner />
      <MainHeader />
      <Explore
        NFTS={dataNfts}
        loadMore={loadMoreNfts}
        hasNextPage={dataNftsHasNextPage}
        loading={isLoading}
        totalCount={dataTotalCount}
      />
      <Footer />
      <FloatingHeader />
    </>
  );
};

export async function getServerSideProps() {
  let data: NftType[] = [],
    dataHasNextPage: boolean = false;

  try {
    const res = await getNFTs(undefined, undefined, undefined, true, true);
    data = res.data;
    dataHasNextPage = res.hasNextPage || false;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { data, dataHasNextPage },
  };
}

export default ExplorePage;
