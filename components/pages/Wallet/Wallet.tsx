import React from 'react'
import styled from 'styled-components'

import Avatar, { AVATAR_VARIANT_BANNER } from 'components/base/Avatar'
import Clipboard from 'components/base/Clipboard'
import { Container, Title, Wrapper } from 'components/layout'
import { UserType } from 'interfaces'
import { computeCaps } from 'utils/strings'
import { AnchorButton } from 'components/ui/Button'

export interface WalletProps {
  user: UserType
}

const Wallet = ({ user }: WalletProps) => {
  const { capsAmount, name, picture, verified, walletId } = user
  return (
    <Container>
      <Wrapper>
        <Title>My wallet</Title>
        <SWalletContainer>
          <Avatar
            isPictureOnly
            name={name}
            isVerified={verified}
            picture={picture}
            walletId={walletId}
            variant={AVATAR_VARIANT_BANNER}
          />

          <SName>{name}</SName>
          <SClipboard address={walletId} isEllipsis />

          <SCapsAmount>{capsAmount ? computeCaps(Number(capsAmount)) : 0} CAPS</SCapsAmount>
          <SButtonContainer>
            <AnchorButton
              color="primary500"
              href="https://www.ternoa.com/"
              size="medium"
              text="Buy CAPS"
              variant="contained"
            />
          </SButtonContainer>
        </SWalletContainer>
      </Wrapper>
    </Container>
  )
}

const SWalletContainer = styled.div`
  background: ${({ theme }) => theme.colors.contrast};
  border-radius: 2.4rem;
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 3.2rem;
  padding: 2.4rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 80%;
    margin-top: 5.6rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: 64rem;
    width: 100%;
  }
`

const SName = styled.h3`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin-top: 2.4rem;
  text-align: center;
`

const SClipboard = styled(Clipboard)`
  color: ${({ theme }) => theme.colors.neutral600};
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
`

const SCapsAmount = styled.div`
  width: 100%;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors.neutral300};
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 2.4rem auto 0;
  padding-top: 1.6rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 90%;
    font-size: 4.8rem;
  }
`

const SButtonContainer = styled.div`
  margin-top: 2.4rem;

  &:hover {
    > a {
      background: ${({ theme }) => theme.colors.invertedContrast};
      color: ${({ theme }) => theme.colors.primary500};
    }
  }
`

export default Wallet
