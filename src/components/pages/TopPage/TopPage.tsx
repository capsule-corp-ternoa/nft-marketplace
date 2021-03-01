import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { ApiProxyUri } from '../../../utils/utils';
import Carousel from './Carousel/Carousel';
import { H1, H4, GradientText } from '../../common/Title/Title';

const TopPage: React.FC<LoadablePageType> = ({ setIsLoading }) => {

  const { t } = useTranslation();

  // Nft list in state
  const [nftList, setNftList] = useState([]);

  // // Retrieve NFT info when component loaded
  useEffect(  () => {
    async function fetchData() {
      setIsLoading(true);
      const res = await axios.get(`${ApiProxyUri}/nfts`);
      setNftList(res.data.nfts);
      setIsLoading(false);
    }
    fetchData();
  }, [setIsLoading]);

  return (
    <>

      <Helmet>
        <title>{t('topPage.seo.title')}</title>
        <meta name="description" content={t('topPage.seo.description')} />
        <meta name="keywords" content={t('topPage.seo.keywords')} />
      </Helmet>
  
      <H1>
        {t('topPage.introduction1')}
        <GradientText>
          {t('topPage.introduction2')}
        </GradientText>
        {t('topPage.introduction3')}
      </H1>

      <H4>{t('topPage.categoryTitle')}</H4>
      <Carousel nftList={nftList} />

      <H4>{t('topPage.topCollector')}</H4>
      <Carousel nftList={nftList} />
      
      <H4>{t('topPage.popularCreations')}</H4>
      <Carousel nftList={nftList} />
    </>
  );
};

export default TopPage;
