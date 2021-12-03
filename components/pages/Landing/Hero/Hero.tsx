import React, { useState } from 'react';
import styled from 'styled-components';

import Countdown from 'components/base/Countdown';
import Creator from 'components/base/Creator';
import { Showcase3D } from 'components/base/Showcase';
import { NftType } from 'interfaces/index';
import { computeCaps } from 'utils/strings';
import Button from 'components/ui/Button';

export interface HeroProps {
  NFTs: NftType[];
}

const Hero = ({ NFTs }: HeroProps) => {
  const [selectedNFT, setSelectedNFT] = useState<NftType>(NFTs[1]);

  return (
    <SHeroContainer>
      <Showcase3D
        list={NFTs}
        selectedIdx={NFTs.findIndex(({ id }) => id === selectedNFT.id)}
        setSelectedItem={setSelectedNFT}
      />
      <SDetailsWrapper>
        <STitle>{selectedNFT.title}</STitle>
        <SCreatorWrapper>
          <Creator
            user={selectedNFT.creatorData}
            walletId={selectedNFT.creatorData.walletId}
            size="small"
          />
          <span>{selectedNFT.creatorData.name}</span>
          <span>(Creator)</span>
        </SCreatorWrapper>
        <SBidWrapper>
          <SBidLeft>
            <SBidLabel>Current Bid</SBidLabel>
            <SBidCapsPrice>{`${computeCaps(
              Number(25000000)
            )} CAPS`}</SBidCapsPrice>
            <SBidDollarsPrice>$3,417.09</SBidDollarsPrice>
          </SBidLeft>
          <SBidRight>
            <SBidLabel>Auction ending in</SBidLabel>
            <SBidCountdown>
              {/* TODO: Use real date */}
              <Countdown date={new Date('2021-12-17T03:24:00')} />
            </SBidCountdown>
          </SBidRight>
        </SBidWrapper>
        <SButtonWrapper>
          <Button
            color="primary"
            href={`/nft/${selectedNFT.id}`}
            text="Place a bid"
          />
          {/* TODO: When notification are implemented */}
          {/* <Button color="primary" text="Notification" /> */}
        </SButtonWrapper>
      </SDetailsWrapper>
    </SHeroContainer>
  );
};

const SHeroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.4rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
    flex-direction: row;
    padding: 0 3.2rem 0 6.4rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0 4rem 0 10.4rem;
  }
`;

const SDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2.4rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 6.4rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 3.2rem;
    padding: 0 6.4rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0;
    max-width: 50%;
    padding: 0;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: 42%;
  }
`;

const STitle = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  min-height: 6.4rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 3.2rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 13.2rem;
    text-align: left;
  }
`;

const SCreatorWrapper = styled.div`
  margin-top: 0.8rem;
`;

const SBidWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 2.4rem;
`;

const BidSideLayout = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SBidLeft = styled(BidSideLayout)`
  border-right: 1px solid #e0e0e0;
  padding-right: 1.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 3.2rem;
  }
`;

const SBidRight = styled(BidSideLayout)`
  padding-left: 1.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 3.2rem;
  }
`;

const SBidLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral200};
  font-size: 1.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1.6rem;
  }
`;

const SBidCapsPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 0.8rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 2.4rem;
  }
`;

const SBidDollarsPrice = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1.6rem;
  }
`;

const SBidCountdown = styled.div`
  width: 100%;
  margin-top: 0.8rem;
`;

const SButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
    margin-top: 5.6rem;
  }
`;

export default Hero;
