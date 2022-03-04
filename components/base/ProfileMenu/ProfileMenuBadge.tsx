import React from 'react'
import styled from 'styled-components'

import { Picture, AVATAR_VARIANT_BADGE } from 'components/base/Avatar'
import { UserType } from 'interfaces'

interface Props {
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  tokenAmount?: string | number
  tokenSymbol?: string
  user: UserType
}

const ProfileMenuBadge = ({ className, onClick, tokenAmount, tokenSymbol, user }: Props) => {
  const { name, picture, verified } = user

  return (
    <SBadgeContainer className={className} onClick={onClick}>
      <STokenContainer>
        <STokenAmount>{tokenAmount}</STokenAmount>
        <STokenSymbol>{tokenSymbol}</STokenSymbol>
      </STokenContainer>
      <SPictureContainer>
        <Picture isVerified={verified} name={name} picture={picture} variant={AVATAR_VARIANT_BADGE} />
      </SPictureContainer>
    </SBadgeContainer>
  )
}

const SBadgeContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.contrast};
  border: 0.2rem solid;
  border-color: ${({ theme }) => theme.colors.contrast};
  border-radius: 2.4rem;
  cursor: pointer;
  padding: 0.4rem;
`

const STokenContainer = styled.div`
  color: ${({ theme }) => theme.colors.invertedContrast};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;
  margin: 0 0.8rem;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 1.6rem;
  }
`

const STokenAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1.6rem;
  }
`

const STokenSymbol = styled.span`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1rem;
  margin-left: 0.4rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 1.4rem;
  }
`

const SPictureContainer = styled.div`
  cursor: pointer;
`

export default ProfileMenuBadge
