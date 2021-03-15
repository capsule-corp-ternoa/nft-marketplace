import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import style from './Landing.module.scss';
import Hero from './Hero/Hero';
import Showcase from './Showcase/Showcase';
import ArtCreators from './ArtCreators/ArtCreators';
import BestSellers from './BestSellers/BestSellers';
import Explore from './Explore/Explore';
import Footer from '../../general/Footer/Footer';

import Creators from './mocks/mockCreators';
import NFTSET1 from './mocks/NFTSET1';
import NFTSET2 from './mocks/NFTSET2';
import NFTSET3 from './mocks/NFTSET3';
import NFTSET4 from './mocks/NFTSET4';

const Landing: React.FC<any> = () => {
  const { t } = useTranslation();

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
    </div>
  );
};

export default Landing;
