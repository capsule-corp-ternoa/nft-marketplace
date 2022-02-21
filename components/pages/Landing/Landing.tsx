import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { AVATAR_VARIANT_MOSAIC, Picture } from 'components/base/Avatar';
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
  capsDollarValue?: number;
  heroNFTs: NftType[];
  mostFollowedUsers: UserType[];
  popularNfts: NftType[];
  bestSellingNfts: NftType[];
  NFTCreators: NftType[];
  totalCountNFT: number;
}

const Landing = ({ capsDollarValue, heroNFTs, mostFollowedUsers, popularNfts, bestSellingNfts, NFTCreators, totalCountNFT }: LandingProps) => (
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
    {mostFollowedUsers.length > 11 && (
      <Wrapper>
        <STitle>Trending artists</STitle>
        <SUsersContainer>
          {mostFollowedUsers.map(({ _id, name, picture, verified, walletId }) => (
            <SPicture key={_id} isClickable isTooltip isVerified={verified} name={name} picture={picture} variant={AVATAR_VARIANT_MOSAIC} walletId={walletId} />
          ))}
        </SUsersContainer>
      </Wrapper>
    )}
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

const STitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 3.2rem;
  }
`;

const SUsersContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2.4rem;
  gap: 1.6rem;
  overflow-x: auto;
  min-height: 12rem;

  > * {
    flex: 1;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    min-height: auto;
    overflow-x: visible;
  }
`;

const SPicture = styled(Picture)`
  > span {
    left: 43%;
    display: none !important;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    &:hover {
      > span {
        display: block !important;
      }
    }
  }
`;

export default Landing;
