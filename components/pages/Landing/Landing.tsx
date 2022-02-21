import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import NoNFTComponent, { NO_NFT_VARIANT_SOLD_OUT } from 'components/base/NoNFTComponent';
import Button from 'components/ui/Button';
import { Container, Wrapper } from 'components/layout';
import { UserType, NftType } from 'interfaces/index';

import ArtCreators from './components/ArtCreators';
import Hero from './components/Hero';
import { HERO_MODE_SELL } from './constants';

const Showcase = dynamic(() => import('../../base/Showcase'), {
  ssr: false,
});

export interface LandingProps {
  users?: UserType[];
  capsDollarValue?: number;
  heroNFTs: NftType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  NFTCreators: NftType[];
  totalCountNFT: number;
}

const Landing = ({
  users: _users,
  capsDollarValue,
  heroNFTs,
  popularNfts,
  bestSellingNfts,
  NFTCreators,
  totalCountNFT,
}: LandingProps) => (
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
    {popularNfts.length > 5 && (
      <Wrapper>
        <Showcase category="Most popular" NFTs={popularNfts.slice(0, 6)} />
      </Wrapper>
    )}
    {bestSellingNfts.length > 5 && (
      <Wrapper>
        <Showcase category="Best sellers" NFTs={bestSellingNfts.slice(0, 6)} />
      </Wrapper>
    )}
    {NFTCreators?.length > 0 && (
      <Wrapper>
        <ArtCreators NFTs={NFTCreators} />
        <SButtonContainer>
          <Button color="primary500" href="/explore" size="medium" text="See more" variant="outlined" />
        </SButtonContainer>
      </Wrapper>
    )}
  </Container>
);

const SButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

export default Landing;
