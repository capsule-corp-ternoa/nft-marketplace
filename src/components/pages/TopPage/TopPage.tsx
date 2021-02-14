import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { fetchNfts } from '../../../utils/store/dataFetcher';
import { Context } from '../../../utils/store/store';
import Carousel from './Carousel/Carousel';
import { H1, H4, GradientText } from '../../common/Title/Title';

const TopPage: React.FC = () => {

  const { t } = useTranslation();

  // Get the context
  const { dispatch, state } = useContext(Context);

  // Retrieve NFT info when component loaded
  useEffect( () => {
    fetchNfts(dispatch);
  }, [dispatch]);

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
      <Carousel nftList={state.nftList} />

      <H4>{t('topPage.topCollector')}</H4>
      <Carousel nftList={state.nftList} />
      
      <H4>{t('topPage.popularCreations')}</H4>
      <Carousel nftList={state.nftList} />
    </>
  );
};

export default TopPage;
