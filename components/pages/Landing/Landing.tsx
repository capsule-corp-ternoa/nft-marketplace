import React from 'react';
import Link from 'next/link';
import style from './Landing.module.scss';
import Hero, { HERO_MODE_SELL } from './Hero';
import ArtCreators from './ArtCreators';
import Footer from 'components/base/Footer';
import FloatingHeader from 'components/base/FloatingHeader';
import NoNFTComponent, { NO_NFT_VARIANT_SOLD_OUT } from 'components/base/NoNFTComponent';
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
  capsDollarValue?: number;
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
  capsDollarValue,
  heroNFTs,
  popularNfts,
  bestSellingNfts,
  NFTCreators,
  totalCountNFT,
}: LandingProps) => (
    <Container>
      <Wrapper>
        {heroNFTs?.length === 3 && (
          <Hero capsDollarValue={capsDollarValue} NFTs={heroNFTs} mode={HERO_MODE_SELL} />
        )}
        {totalCountNFT === 0 && (
          <NoNFTComponent
            body={
              <>
                Come later to discover new NFTs.
                <br />
                <br />
                Thanks !
              </>
            }
            title="All NFTs are sold !"
            variant={NO_NFT_VARIANT_SOLD_OUT}
          />
        )}
      </Wrapper>
      {popularNfts?.length > 0 && (
        <Wrapper>
          <Showcase
            category="Most popular"
            NFTs={popularNfts}
            user={user}
          />
        </Wrapper>
      )}
      {bestSellingNfts?.length > 0 && (
        <Wrapper>
          <Showcase
            category="Best sellers"
            NFTs={bestSellingNfts}
            user={user}
          />
        </Wrapper>
      )}
      {users?.length > 0 && (
        <Wrapper>
          <ArtCreators
            NFTs={NFTCreators}
            creators={users}
            user={user}
          />
          <Link href="/explore">
            <a className={style.Button}>See more</a>
          </Link>
        </Wrapper>
      )}
      <Footer />
      <FloatingHeader user={user} setModalExpand={setModalExpand} />
    </Container>
  );


export default Landing;
