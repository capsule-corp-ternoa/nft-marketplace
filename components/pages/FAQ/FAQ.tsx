import React from 'react'
import styled from 'styled-components'

import { Container, Title, Wrapper } from 'components/layout'
import { useMarketplaceData } from 'redux/hooks'

import Section from './Section'

const FAQ = () => {
  const { name } = useMarketplaceData()

  const sections = [
    {
      question: `What is ${name} Marketplace ?`,
      answer: `“${name}” is a NFTs marketplace for digital creators. Discover Tokenized Digital Art. Artists issue authenticated single edition digital artworks. These are certified on the Ternoa blockchain to prevent forgery. Each artwork is authentically created by an artist in the network, and tokenized as a collectible digital item that you can own, display and trade.`,
    },
    {
      question: 'How to submit your NFT as an artist?',
      answer: `In beta version, you fill our form here. Soon you will be able to upload your creations on “${name}”.`,
    },
    {
      question: `What do I use for payment when buying on ${name} ?`,
      answer: `“${name}” is on Ternoa Chain, so all the platform use CAPS for transactions.`,
    },
    {
      question: 'What is CAPS and why do i need some ?',
      answer:
        'CAPS is the Ternoa token. You can see more about the CAPS here. You need some CAPS to buy or sell creations.',
    },
    {
      question: 'What are “test CAPS”?',
      answer: '“Test CAPS” are CAPS usable on our testnet. Real CAPS will come on mainnet.',
    },
  ]

  return (
    <Container>
      <Wrapper>
        <Title>How it works ?</Title>
        <SSubtitle>FAQ</SSubtitle>
        <SSectionsWrapper>
          {sections.map((x, index) => (
            <Section key={index} section={x} />
          ))}
        </SSectionsWrapper>
      </Wrapper>
    </Container>
  )
}

const SSubtitle = styled.div`
  font-size: 3.2rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 4rem;
    text-align: left;
  }
`

const SSectionsWrapper = styled.div`
  margin-top: 0.8rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 8rem;
  }
`

export default FAQ
