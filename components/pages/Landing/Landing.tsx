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

const Landing: React.FC<any> = ({
  setModalExpand,
  setNotAvailable,
  user,
  NFTS,
}) => {
  //const { t } = useTranslation();

  return (
    <div className={style.Container}>
      <Hero creators={Creators} />
      <Showcase category="Most popular" NFTs={NFTS.slice(0, NFTS.length / 2)} />
      <Showcase
        category="Best sellers"
        NFTs={NFTS.slice(NFTS.length / 3, (NFTS.length / 3) * 2)}
      />
      <ArtCreators NFTs={NFTS.slice(4, 7)} creators={Creators} />
      <BestSellers creators={Creators} />
      <Explore NFTs={NFTS} />
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

export default Landing;
