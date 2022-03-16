import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import Countdown from 'components/base/Countdown'
import NftCard from 'components/base/NftCard'
import { Showcase3D } from 'components/base/Showcase'
import Avatar from 'components/base/Avatar'
import { AnchorButton } from 'components/ui/Button'
import { NftType } from 'interfaces/index'
import { computeCaps } from 'utils/strings'

import { HERO_MODE_AUCTION, HERO_MODE_SELL } from '../constants'
import { HERO_MODE_TYPE } from '../interfaces'

export interface HeroProps {
  capsDollarValue?: number
  NFTs: NftType[]
  mode: HERO_MODE_TYPE
}

const Hero = ({ NFTs, mode }: HeroProps) => {
  const [selectedNFT, setSelectedNFT] = useState<NftType>(NFTs[1] ?? NFTs[0])

  return (
    <SHeroContainer>
      {NFTs.length > 2 ? (
        <Showcase3D
          list={NFTs.slice(0, 3)}
          selectedIdx={NFTs.findIndex(({ id }) => id === selectedNFT.id)}
          setSelectedItem={setSelectedNFT}
        />
      ) : (
        <NftCard item={selectedNFT} noHover noStatsChips />
      )}
      <SDetailsWrapper>
        <Link href={`/nft/${selectedNFT.id}`} passHref>
          <STitle>{selectedNFT.title}</STitle>
        </Link>
        {selectedNFT.creatorData && (
          <SAvatar
            isVerified={selectedNFT.creatorData.verified}
            label="(Creator)"
            name={selectedNFT.creatorData.name}
            picture={selectedNFT.creatorData.picture}
            walletId={selectedNFT.creatorData.walletId}
          />
        )}
        <SSellWrapper>
          <SSell mode={mode}>
            <SBidLabel>{mode === HERO_MODE_AUCTION ? 'Current bid' : 'Price'}</SBidLabel>
            <SBidCapsPrice>{`${computeCaps(Number(selectedNFT.price))} CAPS`}</SBidCapsPrice>
            {/* TODO: enable on mainnet */}
            {/* {capsDollarValue && (
              <SBidDollarsPrice>
                {formatPrice(
                  Math.round(
                    capsDollarValue *
                      (Number(selectedNFT.price) / 1000000000000000000) *
                      100
                  ) / 100
                )}
              </SBidDollarsPrice>
            )} */}
          </SSell>
          {mode === HERO_MODE_AUCTION && (
            <SBid mode={mode}>
              <SBidLabel>Auction ending in</SBidLabel>
              <SBidCountdown>
                {/* TODO: Use real date */}
                <Countdown date={new Date('2021-12-17T03:24:00')} />
              </SBidCountdown>
            </SBid>
          )}
        </SSellWrapper>
        <SButtonWrapper>
          <AnchorButton
            color="primary500"
            href={`/nft/${selectedNFT.id}`}
            text={mode === HERO_MODE_AUCTION ? 'Place a bid' : 'Buy'}
          />
          {/* TODO: When notification are implemented */}
          {/* <Button color="invertedContrast" icon="bell" variant='outlined' /> */}
        </SButtonWrapper>
      </SDetailsWrapper>
    </SHeroContainer>
  )
}

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

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0 4rem 0 10.4rem;
  }
`

const SDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 6.4rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
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
`

const STitle = styled.a`
  width: fit-content;
  color: ${({ theme }) => theme.colors.contrast};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0 auto;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 3.2rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    text-align: left;
  }
`

const SAvatar = styled(Avatar)`
  justify-content: center;
  margin-top: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`

const SSellWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 2.4rem;
`

const SellSideLayout = styled.div<{
  mode: typeof HERO_MODE_AUCTION | typeof HERO_MODE_SELL
}>`
  width: ${({ mode }) => (mode === HERO_MODE_SELL ? '100%' : '50%')};
  height: 100%;
  display: flex;
  align-items: ${({ mode }) => (mode === HERO_MODE_SELL ? 'center' : 'flex-start')};
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
  }
`

const SSell = styled(SellSideLayout)`
  padding-right: ${({ mode }) => (mode === HERO_MODE_AUCTION ? '1.2rem' : 0)};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: ${({ mode }) => (mode === HERO_MODE_AUCTION ? '4.8rem' : 0)};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: ${({ mode }) => (mode === HERO_MODE_AUCTION ? '3.2rem' : 0)};
  }
`

const SBid = styled(SellSideLayout)`
  border-left: 1px solid #e0e0e0;
  padding-left: 1.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 3.2rem;
  }
`

const SBidLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 1.4rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1.6rem;
  }
`

const SBidCapsPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary500};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 0.8rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 2.4rem;
  }
`

// const SBidDollarsPrice = styled.span`
//   color: ${({ theme }) => theme.colors.contrast};
//   font-size: 1.4rem;

//   ${({ theme }) => theme.mediaQueries.sm} {
//     font-size: 1.6rem;
//   }
// `;

const SBidCountdown = styled.div`
  width: 100%;
  margin-top: 0.8rem;
`

const SButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3.2rem;

  > button {
    &:not(:first-child) {
      margin-left: 5.6rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
    margin-top: 5.6rem;
  }
`

export default Hero
