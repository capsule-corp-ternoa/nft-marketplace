import React from 'react';
//import { useTranslation } from 'react-i18next';
import style from './Landing.module.scss';
import Hero from './Hero';
import Showcase from './Showcase';
import ArtCreators from './ArtCreators';
import BestSellers from './BestSellers';
import Explore from './Explore';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';

import Creators from 'utils/mocks/mockCreators';
import NFTSET1 from 'utils/mocks/NFTSET1';
import NFTSET2 from 'utils/mocks/NFTSET2';
import NFTSET3 from 'utils/mocks/NFTSET3';
import NFTSET4 from 'utils/mocks/NFTSET4';

const Landing: React.FC<any> = ({ setModalExpand }) => {
  //const { t } = useTranslation();

  return (
    <div className={style.Container}>
      <Hero creators={Creators} />
      <Showcase category="Most popular" NFTs={NFTSET1} />
      <Showcase category="Best sellers" NFTs={NFTSET2} />
      <ArtCreators NFTs={NFTSET3} creators={Creators} />
      <BestSellers creators={Creators} />
      <Explore NFTs={NFTSET4} />
      <Footer />
      <FloatingHeader setModalExpand={setModalExpand} />
    </div>
  );
};

export default Landing;
