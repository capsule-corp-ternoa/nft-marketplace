import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { ApiProxyUri } from '../../../utils/utils';
import { H1, H4, GradientText } from '../../common/Title/Title';
import style from './Landing.module.scss';
import Hero from './Hero/Hero';
import Showcase from './Showcase/Showcase';
import ArtCreators from './ArtCreators/ArtCreators';
import BestSellers from './BestSellers/BestSellers';
import Explore from './Explore/Explore';
import Footer from '../../common/Footer/Footer';

import Creators from './mocks/mockCreators';
import NFTSET1 from './mocks/NFTSET1';
import NFTSET2 from './mocks/NFTSET2';
import NFTSET3 from './mocks/NFTSET3';
import NFTSET4 from './mocks/NFTSET4';

const Landing: React.FC<LoadablePageType> = ({ setIsLoading }) => {
  const { t } = useTranslation();

  // Nft list in state
  const [nftList1, setNftList1] = useState([]);
  const [nftList2, setNftList2] = useState([]);
  const [nftList3, setNftList3] = useState([]);

  // // Retrieve NFT info when component loaded
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const [res1, res2, res3] = await Promise.all([
        axios.get(`${ApiProxyUri}/nfts`),
        axios.get(`${ApiProxyUri}/nfts`),
        axios.get(`${ApiProxyUri}/nfts`),
      ]);

      setNftList1(res1.data.nfts);
      setNftList2(res2.data.nfts);
      setNftList3(res3.data.nfts);

      setIsLoading(false);
    }
    fetchData();
  }, [setIsLoading]);

  return (
    <div className={style.Container}>
      <Helmet>
        <title>{t('topPage.seo.title')}</title>
        <meta name="description" content={t('topPage.seo.description')} />
        <meta name="keywords" content={t('topPage.seo.keywords')} />
      </Helmet>

      <Hero creators={Creators} />
      <Showcase category="Most popular" NFTs={NFTSET1} />
      <Showcase category="Best sellers" NFTs={NFTSET2} />
      <ArtCreators NFTs={NFTSET3} creators={Creators} />
      <BestSellers creators={Creators} />
      <Explore NFTs={NFTSET4} />
      <Footer />

      {/*
      <H1>
        {t('topPage.introduction1')}
        <GradientText>
          {t('topPage.introduction2')}
        </GradientText>
        {t('topPage.introduction3')}
      </H1>

      <H4>{t('topPage.categoryTitle')}</H4>
      {nftList1 && <Carousel big nftList={nftList1} />}

      <H4>{t('topPage.topCollector')}</H4>
      { nftList2 && <Carousel nftList={nftList2} />}

      <H4>{t('topPage.popularCreations')}</H4>
      { nftList3 && <Carousel nftList={nftList3} />}
      */}
    </div>
  );
};

export default Landing;
