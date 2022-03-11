import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { ModalWallet } from 'components/base/Modal'
import { ProfileMenuBadge, ProfileMenuDropdown } from 'components/base/ProfileMenu'
import Button from 'components/ui/Button'

import { computeCaps } from 'utils/strings'
import { useApp } from 'redux/hooks'

const FloatingHeader: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalWalletExpanded, setIsModalWalletExpanded] = useState(false)
  const [isProfileMenuExpanded, setIsProfileMenuExpanded] = useState(false)

  const { user } = useApp()

  return (
    <>
      <SHeaderContainer isExpanded={isExpanded}>
        {isExpanded && (
          <SExpandedHeaderWrapper>
            <Link href="/create" passHref>
              <SLink>Create</SLink>
            </Link>
            <Link href="/explore" passHref>
              <SLink>Explore</SLink>
            </Link>
            <Link href="/faq" passHref>
              <SLink>How it works</SLink>
            </Link>
          </SExpandedHeaderWrapper>
        )}
        <SWrapper>
          <SBurgerContainer onClick={() => setIsExpanded(!isExpanded)}>
            <SBurgerBox>
              <SBurgerInner isExpanded={isExpanded} />
            </SBurgerBox>
          </SBurgerContainer>
          {user === undefined || user === null || user._id === '' ? (
            <Button
              color="invertedContrast"
              onClick={() => {
                setIsModalWalletExpanded(true)
                setIsExpanded(false)
              }}
              size="medium"
              text="Connect"
              variant="contained"
            />
          ) : (
            <SProfileMenuBadge
              onClick={() => setIsProfileMenuExpanded((prevState) => !prevState)}
              tokenAmount={user?.capsAmount ? computeCaps(Number(user.capsAmount)) : 0}
              tokenSymbol="CAPS"
              user={user}
            />
          )}
        </SWrapper>
        {user && isProfileMenuExpanded && (
          <SProfileMenuDropdown onClose={() => setIsProfileMenuExpanded(false)} user={user} />
        )}
      </SHeaderContainer>
      {isModalWalletExpanded && <ModalWallet setExpanded={setIsModalWalletExpanded} />}
    </>
  )
}

const SHeaderContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border-radius: ${({ isExpanded }) => (isExpanded ? '2.4rem' : '4rem')};
  position: fixed;
  z-index: 100;
  bottom: 5.6rem;
  right: 10%;
  padding: ${({ isExpanded }) => (isExpanded ? '1.6rem' : '1.2rem')};
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 28rem;
    right: 5.6rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const SExpandedHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 1.6rem;
  padding-bottom: 0.8rem;
`

const SLink = styled.a`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
`

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const SBurgerContainer = styled.button`
  padding: 1.2rem 0.8rem;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  &:hover {
    opacity: 0.8;
  }
`

const SBurgerBox = styled.span`
  width: 4rem;
  height: 2.4rem;
  display: inline-block;
  position: relative;
  perspective: 8rem;
`

const SBurgerInner = styled.span<{ isExpanded: boolean }>`
  display: block;
  top: 50%;
  margin-top: -2px;
  width: 4rem;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 0.4rem;
  position: absolute;
  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
    background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;

  ${({ isExpanded }) =>
    isExpanded &&
    `
    background-color: transparent !important;
    transform: rotateY(180deg);
  `}

  &::after,
  &::before {
    content: '';
    display: block;
    width: 4rem;
    height: 0.4rem;
    background-color: ${({ theme }) => theme.colors.invertedContrast};
    border-radius: 0.4rem;
    position: absolute;
    transition: transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  &::after {
    bottom: -10px;

    ${({ isExpanded }) =>
      isExpanded &&
      `
      transform: translate3d(0, -10px, 0) rotate(-45deg);
    `}
  }

  &::before {
    top: -10px;

    ${({ isExpanded }) =>
      isExpanded &&
      `
      transform: translate3d(0, 10px, 0) rotate(45deg);
    `}
  }
`

const SProfileMenuBadge = styled(ProfileMenuBadge)`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.invertedContrast};
`

const SProfileMenuDropdown = styled(ProfileMenuDropdown)`
  top: -23rem;
  right: 0;

  &::after {
    width: 0;
    height: 0;
    border-left: 2.4rem solid transparent;
    border-right: 2.4rem solid transparent;
    z-index: 101;
    border-top: ${({ theme }) => `1.2rem solid ${theme.colors.contrast}`};
    content: '';
    position: absolute;
    bottom: 0;
    right: 3.2rem;
    transform: translateY(0.8rem);
  }
`

export default FloatingHeader
