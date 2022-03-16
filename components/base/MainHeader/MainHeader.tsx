import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { ModalWallet } from 'components/base/Modal'
import { ProfileMenuBadge, ProfileMenuDropdown } from 'components/base/ProfileMenu'
import Button, { AnchorButton } from 'components/ui/Button'
import Icon from 'components/ui/Icon'
import { Container, Wrapper } from 'components/layout'

import { computeCaps } from 'utils/strings'
import { useApp } from 'redux/hooks'

const MainHeader: React.FC = () => {
  const [isModalWalletExpanded, setIsModalWalletExpanded] = useState(false)
  const [isProfileMenuExpanded, setIsProfileMenuExpanded] = useState(false)

  const { user } = useApp()

  const isNftCreationEnabled =
    process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === undefined
      ? true
      : process.env.NEXT_PUBLIC_IS_NFT_CREATION_ENABLED === 'true'

  return (
    <>
      <Container>
        <SWrapper>
          <Link href="/">
            <a title="Marketplace homepage">
              <SLogo name="logoTernoaBlack" />
            </a>
          </Link>
          <SNavContainer>
            <SNavLinksContainer>
              <Link href="/explore" passHref>
                <SLinkItem>Explore</SLinkItem>
              </Link>
              <Link href="/faq" passHref>
                <SLinkItem>How it works</SLinkItem>
              </Link>
            </SNavLinksContainer>
            <SNavButtonsCointainer>
              {isNftCreationEnabled && (
                <Link href="/create" passHref>
                  <>
                    <AnchorButton color="contrast" href="/create" size="medium" text="Create NFT" variant="outlined" />
                  </>
                </Link>
              )}
              {user === undefined || user === null || user._id === '' ? (
                <Button
                  color="contrast"
                  onClick={() => setIsModalWalletExpanded(true)}
                  size="medium"
                  text="Connect"
                  variant="outlined"
                />
              ) : (
                <ProfileMenuBadge
                  onClick={() => setIsProfileMenuExpanded((prevState) => !prevState)}
                  tokenAmount={user.capsAmount ? computeCaps(Number(user.capsAmount)) : 0}
                  tokenSymbol="CAPS"
                  user={user}
                />
              )}
            </SNavButtonsCointainer>
          </SNavContainer>
          {user && isProfileMenuExpanded && (
            <SProfileMenuDropdown onClose={() => setIsProfileMenuExpanded(false)} user={user} />
          )}
        </SWrapper>
      </Container>
      {isModalWalletExpanded && <ModalWallet setExpanded={setIsModalWalletExpanded} />}
    </>
  )
}

const SWrapper = styled(Wrapper)`
  flex-direction: row;
  justify-content: center;
  position: relative;
  padding-top: 3.2rem !important;
  padding-bottom: 3.2rem !important;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }
`

const SLogo = styled(Icon)`
  width: 16rem;
  cursor: pointer;
`

const SNavContainer = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
  }
`

const SNavLinksContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 2.4rem;
    }
  }
`

const SLinkItem = styled.a`
  color: ${({ theme }) => theme.colors.contrast};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
`

const SNavButtonsCointainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 5.6rem;
  }
`

const SProfileMenuDropdown = styled(ProfileMenuDropdown)`
  top: 10.4rem;
  right: 3.2rem;

  &::before {
    width: 0;
    height: 0;
    border-left: 2.4rem solid transparent;
    border-right: 2.4rem solid transparent;
    z-index: 101;
    border-top: ${({ theme }) => `1.2rem solid ${theme.colors.invertedContrast}`};
    content: '';
    position: absolute;
    top: -1.6rem;
    right: 3.2rem;
    transform: translateY(0.8rem) rotate(180deg);
  }
`

export default MainHeader
