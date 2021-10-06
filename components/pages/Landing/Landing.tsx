import React, { useState } from 'react';
import Link from 'next/link';
import style from './Landing.module.scss';
import Hero from './Hero';
import ArtCreators from './ArtCreators';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NoNFTComponent from 'components/base/NoNFTComponent';
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
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  NFTCreators: NftType[];
  totalCountNFT: number;
}

const Landing: React.FC<LandingProps> = ({
  setModalExpand,
  setNotAvailable,
  user,
  users,
  popularNfts,
  bestSellingNfts,
  NFTCreators,
  totalCountNFT,
}) => {
  const [walletUser, setWalletUser] = useState(user);
  return (
    <div className={style.Container}>
      <Hero users={users} />
      {totalCountNFT === 0 && <NoNFTComponent/>}
      <Showcase category="Most popular" NFTs={popularNfts} user={walletUser} setUser={setWalletUser} />
      <Showcase category="Best sellers" NFTs={bestSellingNfts} user={walletUser} setUser={setWalletUser}/>
      <ArtCreators NFTs={NFTCreators} creators={users} user={walletUser} setUser={setWalletUser}/>
      <Link href="/explore">
        <a className={style.Button}>See more</a>
      </Link>
      <Footer setNotAvailable={setNotAvailable} />
      <FloatingHeader user={walletUser} setModalExpand={setModalExpand} />
    </div>
  );
};

export default Landing;
