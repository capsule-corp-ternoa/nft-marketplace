import React from 'react';
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
  totalCount: number;
}

const ExplorePage = ({ data, dataHasNextPage, totalCount }: ExplorePage) => {
  const { name } = useMarketplaceData();

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
      <Explore NFTs={data} hasNextPage={dataHasNextPage} totalCount={totalCount} />
      <Footer />
      <FloatingHeader />
    </>
  );
};

export async function getServerSideProps() {
  let data: NftType[] = [],
    dataHasNextPage: boolean = false,
    totalCount: number = 0;

  try {
    const res = await getNFTs(undefined, undefined, undefined, true, true);
    data = res.data;
    dataHasNextPage = res.hasNextPage || false;
  } catch (error) {
    console.log(error);
  }

  try {
    totalCount = await getTotalOnSaleOnMarketplace();
  } catch (error) {
    console.log(error);
  }

  return {
    props: { data, dataHasNextPage, totalCount },
  };
}

export default ExplorePage;
