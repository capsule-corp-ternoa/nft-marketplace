import React, { useState } from 'react';
import Link from 'next/link';
import style from './Landing.module.scss';
import Hero from './Hero';
import ArtCreators from './ArtCreators';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NoNFTComponent from 'components/base/NoNFTComponent';
import { Container, Wrapper } from 'components/layout';
import { UserType, NftType } from 'interfaces/index';
import dynamic from 'next/dynamic';
const Showcase = dynamic(() => import('../../base/Showcase'), {
  ssr: false,
});

export interface LandingProps {
  user: UserType;
  users: UserType[];
  setModalExpand: (b: boolean) => void;
  heroNFTs: NftType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  NFTCreators: NftType[];
  totalCountNFT: number;
}

const Landing = ({
  setModalExpand,
  user,
  users,
  heroNFTs,
  popularNfts,
  bestSellingNfts,
  NFTCreators,
  totalCountNFT,
}: LandingProps) => {
  const [walletUser, setWalletUser] = useState(user);

  return (
    <Container>
      <Wrapper>
        {heroNFTs.length === 3 && <Hero NFTs={heroNFTs} />}
        {totalCountNFT === 0 && <NoNFTComponent />}
      </Wrapper>
      {popularNfts?.length > 0 && (
        <Wrapper>
          <Showcase
            category="Most popular"
            NFTs={popularNfts}
            user={walletUser}
            setUser={setWalletUser}
          />
        </Wrapper>
      )}
      {bestSellingNfts?.length > 0 && (
        <Wrapper>
          <Showcase
            category="Best sellers"
            NFTs={bestSellingNfts}
            user={walletUser}
            setUser={setWalletUser}
          />
        </Wrapper>
      )}
      {users?.length > 0 && (
        <Wrapper>
          <ArtCreators
            NFTs={NFTCreators}
            creators={users}
            user={walletUser}
            setUser={setWalletUser}
          />
          <Link href="/explore">
            <a className={style.Button}>See more</a>
          </Link>
        </Wrapper>
      )}
      <Footer />
      <FloatingHeader user={walletUser} setModalExpand={setModalExpand} />
    </Container>
  );
};

export default Landing;
