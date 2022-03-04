import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const NftSaleLink = () => (
  <SSaleLinkWrapper>
    <Link href="/" passHref>
      <>
        <SSaleContainer href="/">
          <SSaleIcon>
            <span>+</span>
          </SSaleIcon>
          <SSaleLabel>Sell your NFT</SSaleLabel>
        </SSaleContainer>
      </>
    </Link>
  </SSaleLinkWrapper>
)

const SSaleLinkWrapper = styled.div`
  max-width: 26rem;
  border: 0.2rem dashed;
  border-color: ${({ theme }) => theme.colors.contrast};
  border-radius: 1.2rem;
  margin: 6.4rem auto 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    border-radius: 2.4rem;
    max-width: none;
    margin: 0 0 0 -0.8rem;
    padding: 0.8rem;
  }
`

const SSaleContainer = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 1.6rem 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: ${({ theme }) => theme.sizes.cardHeight.sm};
    width: ${({ theme }) => theme.sizes.cardWidth.sm};
    flex-direction: column;
    justify-content: center;
    margin: 0;
  }
`

const SSaleIcon = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.contrast};
  border-radius: 50%;
  padding: 1rem;

  > span {
    color: ${({ theme }) => theme.colors.invertedContrast};
    font-size: 5.4rem;
    transform: translate(4%, -5%);
  }
`

const SSaleLabel = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 2.4rem;
  }
`

export default NftSaleLink
