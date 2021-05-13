import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './Landing.module.scss';
import Hero from './Hero';
import ArtCreators from './ArtCreators';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import { UserType, NftType } from 'interfaces/index';
import dynamic from 'next/dynamic';
const Showcase = dynamic(() => import('./Showcase'), {
  ssr: false,
});

export interface LandingProps {
  user: UserType;
  users: UserType[];
  setModalExpand: (b: boolean) => void;
  setNotAvailable: (b: boolean) => void;
  NFTSET1: NftType[];
  NFTSET2: NftType[];
  NFTCreators: NftType[];
}

const Landing: React.FC<LandingProps> = ({
  setModalExpand,
  setNotAvailable,
  user,
  users,
  NFTSET1,
  NFTSET2,
  NFTCreators,
}) => {
  const [isRN, setIsRN] = useState(false);

  useEffect(() => {
    setIsRN(window.isRNApp);
  }, []);
  return (
    <div className={style.Container}>
      <Hero users={users} />
      <Showcase category="Most popular" NFTs={NFTSET1} />
      <Showcase category="Best sellers" NFTs={NFTSET2} />
      <ArtCreators NFTs={NFTCreators} creators={users} />
      <Link href="/explore">
        <a className={style.Button}>See more</a>
      </Link>
      <Footer setNotAvailable={setNotAvailable} />
      {!isRN && <FloatingHeader user={user} setModalExpand={setModalExpand} />}
    </div>
  );
};

export default Landing;
