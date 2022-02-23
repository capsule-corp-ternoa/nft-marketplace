import React from 'react';
import dynamic from 'next/dynamic';

import NoNFTComponent, { NO_NFT_VARIANT_SOLD_OUT } from 'components/base/NoNFTComponent';
import { Container, Wrapper } from 'components/layout';
import { UserType, NftType } from 'interfaces/index';

import Hero from './components/Hero';
import UsersShowcase from './components/UsersShowcase';
import { HERO_MODE_SELL } from './constants';

const Showcase = dynamic(() => import('../../base/Showcase'), {
  ssr: false,
});

export interface LandingProps {
  capsDollarValue?: number;
  heroNFTs: NftType[];
  mostFollowedUsers: UserType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  topSellersUsers: UserType[];
  totalCountNFT: number;
}

const Landing = ({ capsDollarValue, heroNFTs, mostFollowedUsers, popularNfts, bestSellingNfts, topSellersUsers, totalCountNFT }: LandingProps) => (
  <Container>
    <Wrapper>
      {heroNFTs?.length === 3 && <Hero capsDollarValue={capsDollarValue} NFTs={heroNFTs} mode={HERO_MODE_SELL} />}
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
    {mostFollowedUsers.length > 0 && (
      <Wrapper>
        <UsersShowcase title="Trending artists" users={mostFollowedUsers} />
      </Wrapper>
    )}
    {popularNfts.length > 0 && (
      <Wrapper>
        <Showcase category="Most popular" NFTs={popularNfts} />
      </Wrapper>
    )}
    {bestSellingNfts.length > 0 && (
      <Wrapper>
        <Showcase category="Best sellers" NFTs={bestSellingNfts} />
      </Wrapper>
    )}
    {topSellersUsers.length > 0 && (
      <Wrapper>
        <UsersShowcase title="Top Sellers" users={topSellersUsers} />
      </Wrapper>
    )}
  </Container>
);

export default Landing;
