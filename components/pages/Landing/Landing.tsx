import React from 'react';
//import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import style from './Landing.module.scss';
import Hero from './Hero';
import Showcase from './Showcase';
import ArtCreators from './ArtCreators';
//import BestSellers from './BestSellers';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';

const Landing: React.FC<any> = ({
  setModalExpand,
  setNotAvailable,
  user,
  users,
  NFTSET1,
  NFTSET2,
  NFTCreators,
}) => {
  //const { t } = useTranslation();

  return (
    <div className={style.Container}>
      <Hero users={users} />
      <Showcase category="Most popular" NFTs={NFTSET1} />
      <Showcase category="Best sellers" NFTs={NFTSET2} />
      <ArtCreators NFTs={NFTCreators} creators={users} />
      {/*<BestSellers creators={Creators} />*/}
      <Link href="/explore">
        <a className={style.Button}>See more</a>
      </Link>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </div>
  );
};

export default Landing;
