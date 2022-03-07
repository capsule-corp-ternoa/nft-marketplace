import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { getNFTs, getUserNFTsStat } from 'actions/nft'
import { getArtistHighlight } from 'actions/user'
import Avatar, { AVATAR_VARIANT_EDIT } from 'components/base/Avatar'
import NoNFTComponent, { NO_NFT_VARIANT_SOLD_OUT } from 'components/base/NoNFTComponent'
import { Container, Wrapper } from 'components/layout'
import { ArtistHighlightType, UserType, NftType } from 'interfaces/index'
import { MOST_LIKED_SORT, MOST_SOLD_SERIES_SORT } from 'utils/constant'

import Hero from './components/Hero'
import UsersShowcase from './components/UsersShowcase'
import { HERO_MODE_SELL } from './constants'

const Showcase = dynamic(() => import('../../base/Showcase'), {
  ssr: false,
})

export interface LandingProps {
  capsDollarValue?: number
  recentNFTs: NftType[]
  mostFollowedUsers: UserType[]
  popularNfts: NftType[]
  bestSellingNfts: NftType[]
  topSellersUsers: UserType[]
  totalCountNFT: number
}

const Landing = ({
  capsDollarValue,
  recentNFTs,
  mostFollowedUsers,
  popularNfts,
  bestSellingNfts,
  topSellersUsers,
  totalCountNFT,
}: LandingProps) => {
  const [artistHighlight, setArtistHighlight] = useState<ArtistHighlightType | undefined>(undefined)
  const [artistHighlightNFTs, setArtistHighlightNFTs] = useState<NftType[]>([])

  useEffect(() => {
    let shouldUpdate = true
    const loadArtistHighlightData = async () => {
      try {
        const artist = await getArtistHighlight()
        if (artist.walletId === undefined) throw new Error('')
        const { countFollowers } = await getUserNFTsStat(artist.walletId, true) ?? {}
        const artistNFTs = await getNFTs('1', '6', { creator: artist.walletId })

        if (shouldUpdate) {
          setArtistHighlight({...artist, nbFollowers: countFollowers})
          setArtistHighlightNFTs(artistNFTs.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    loadArtistHighlightData()
    return () => {
      shouldUpdate = false
    }
  }, [])

  return (
    <>
      <Container>
        <Wrapper>
          {recentNFTs.length > 0 && <Hero capsDollarValue={capsDollarValue} NFTs={recentNFTs} mode={HERO_MODE_SELL} />}
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
      </Container>
      <Container>
        {mostFollowedUsers.length > 0 && (
          <Wrapper>
            <UsersShowcase title="Trending artists" users={mostFollowedUsers} />
          </Wrapper>
        )}
        {popularNfts.length > 0 && (
          <Wrapper>
            <Showcase title="Most popular" NFTs={popularNfts} href={`/explore?sort=${MOST_LIKED_SORT}`} />
          </Wrapper>
        )}
        {topSellersUsers.length > 0 && (
          <Wrapper>
            <UsersShowcase title="Top Sellers" users={topSellersUsers} />
          </Wrapper>
        )}
        {bestSellingNfts.length > 0 && (
          <Wrapper>
            <Showcase title="Best sellers" NFTs={bestSellingNfts} href={`/explore?sort=${MOST_SOLD_SERIES_SORT}`} />
          </Wrapper>
        )}
        {popularNfts.length === 0 && bestSellingNfts.length === 0 && recentNFTs.length > 0 && (
          <Wrapper>
            <Showcase title="NFTs on sale" NFTs={recentNFTs} href={`/explore`} />
          </Wrapper>
        )}
      </Container>
      {artistHighlight !== undefined && artistHighlightNFTs.length > 0 && (
        <SArtistHighlightContainer>
          <Wrapper>
            <STitle>Artist of the week</STitle>
            <SAvatarWrapper>
            <Avatar
              isDiscoverButton
              isVerified={artistHighlight.verified}
              label={artistHighlight.nbFollowers > 0 ? `${artistHighlight.nbFollowers} followers` : undefined}
              name={artistHighlight.name}
              picture={artistHighlight.picture}
              variant={AVATAR_VARIANT_EDIT}
              walletId={artistHighlight.walletId}
            />
            </SAvatarWrapper>
            <SArtistHighlightNFTsWrapper>
              <Showcase NFTs={artistHighlightNFTs} />
            </SArtistHighlightNFTsWrapper>
          </Wrapper>
        </SArtistHighlightContainer>
      )}
    </>
  )
}

const STitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 3.2rem;
  }
`

const SAvatarWrapper = styled.div`
  margin-top: 3.2rem;
`;

const SArtistHighlightContainer = styled(Container)`
  background: ${({ theme }) => theme.colors.neutral100};
`

const SArtistHighlightNFTsWrapper = styled.div`
  margin-top: 4rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 5.6rem;
  }
`

export default Landing
