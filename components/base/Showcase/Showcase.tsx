import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import NftCard from 'components/base/NftCard'

import { NftType } from 'interfaces/index'
export interface ShowcaseProps {
  NFTs: NftType[]
  title?: string
  href?: string
}

const Showcase: React.FC<ShowcaseProps> = ({ NFTs, title, href }) => (
  <SShowcaseContainer>
    {(title !== undefined || href !== undefined) && (
      <STopContainer>
        {title !== undefined && <STitle>{title}</STitle>}
        {href !== undefined && (
          <Link href={href} passHref>
            <SLink href={href}>SEE ALL</SLink>
          </Link>
        )}
      </STopContainer>
    )}
    <SNftsContainer>
      {NFTs.map((item) => (
        <SNftCard key={item.id} item={item} />
      ))}
    </SNftsContainer>
  </SShowcaseContainer>
)

const SShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const STopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const STitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 3.2rem;
  }
`

const SLink = styled.a`
  color: ${({ theme }) => theme.colors.neutral600};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-left: 0.8rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
  }
`

const SNftsContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  justify-content: flex-start;
  align-items: center;
  gap: 3.2rem;
  min-height: 34rem;

  &:not(:first-child) {
    margin-top: 2.4rem;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    min-height: auto;
    gap: 3.4rem;
    overflow-x: visible;
  }
`

const SNftCard = styled(NftCard)`
  flex-shrink: 0;
  height: ${({ theme }) => theme.sizes.cardHeight.sm};
  width: ${({ theme }) => theme.sizes.cardWidth.sm};
`

export default Showcase
