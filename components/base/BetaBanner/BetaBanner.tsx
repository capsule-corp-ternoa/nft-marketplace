import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { AnchorButton } from 'components/ui/Button'
import Chip from 'components/ui/Chip'

// TODO: delete on mainnet
const BetaBanner: React.FC = () => {
  return (
    <SBannerContainer>
      <SText>
        <span>Welcome to the</span>
        <Chip color="primary500" size="small" text="Beta Version" />
        <span>of SecretNFT. All the marketplace is in</span>
        <SLink
          href="https://telemetry.polkadot.io/#list/0xd9adfc7ea82be63ba28088d62b96e9270ad2af25c962afc393361909670835b2"
          target="blank"
        >
          testnet
        </SLink>
      </SText>
      <Link href="/faq" passHref>
        <SButtonContainer>
          <AnchorButton color="invertedContrast" href="/faq" size="small" text="More infos" variant="contained" />
        </SButtonContainer>
      </Link>
    </SBannerContainer>
  )
}

const SBannerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  top: 0;
  text-align: center;
  padding: 1.6rem 2.4rem;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const SText = styled.div`
  color: ${({ theme }) => theme.colors.invertedContrast};\
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  gap: 0.2rem 0.6rem;
  margin: 0;
`

const SLink = styled.a`
  color: ${({ theme }) => theme.colors.invertedContrast};
  text-decoration: underline;
  text-underline-offset: 1px;
`

const SButtonContainer = styled.div`
  margin-top: 1.6rem;

  a {
    &:hover {
      background: ${({ theme }) => theme.colors.invertedContrast};
      color: ${({ theme }) => theme.colors.contrast};
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 1.6rem;
    margin-top: 0;
  }
`

export default BetaBanner
