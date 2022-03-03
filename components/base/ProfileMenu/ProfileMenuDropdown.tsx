import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import ClickAwayListener from 'react-click-away-listener'
import { useApp } from 'redux/hooks'

import Avatar from 'components/base/Avatar'
import Clipboard from 'components/base/Clipboard'
import Button from 'components/ui/Button'
import { UserType } from 'interfaces'

interface Props {
  className?: string
  onClose: () => void
  user: UserType
}

const ProfileMenuDropdown = ({ className, onClose, user }: Props) => {
  const { name, picture, verified, walletId } = user

  const { isRN } = useApp()

  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/'
  }

  return (
    <ClickAwayListener onClickAway={onClose}>
      <SDropdownContainer className={className}>
        <SDropdownWrapper>
          <SProfileContainer>
            <Avatar isVerified={verified} name={name} picture={picture} walletId={walletId} />
            {!isRN && (
              <SButtonWrapper>
                <Button color="neutral600" icon="powerOff" onClick={handleLogout} size="small" variant="outlined" />
              </SButtonWrapper>
            )}
          </SProfileContainer>

          <SLinkSection>
            <div>
              <Link href="/wallet" passHref>
                <SAnchor>Wallet</SAnchor>
              </Link>
              <Clipboard address={walletId} isEllipsis />
            </div>
            <div>
              <Link href="/profile" passHref>
                <SAnchor>My Account</SAnchor>
              </Link>
            </div>
          </SLinkSection>
        </SDropdownWrapper>
        <SCapsAnchor href={`/user/${walletId}`}>My artist profile</SCapsAnchor>
      </SDropdownContainer>
    </ClickAwayListener>
  )
}

const SDropdownContainer = styled.div`
  background: ${({ theme }) => theme.colors.invertedContrast};
  box-shadow: ${({ theme }) => theme.shadows.popupShadow};
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: absolute;
  width: 26rem;
`

const SDropdownWrapper = styled.div`
  padding: 0.8rem 1.6rem;
  display: flex;
  flex-direction: column;
`

const SProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const SButtonWrapper = styled.div`
  margin-left: 1.6rem;
`

const SLinkSection = styled.div`
  > * {
    width: 100%;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral100}`};
    cursor: pointer;
    margin: 1.6rem 0;
    padding-bottom: 0.8rem;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    &:last-child {
      border-bottom: none;
      margin-bottom: 0.8rem;
      padding-bottom: 0;
    }
  }
`

const SAnchor = styled.a`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
  }
`

const SCapsAnchor = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  border-radius: 0 0 1.6rem 1.6rem;
  color: ${({ theme }) => theme.colors.invertedContrast};
  padding: 1.6rem;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;
`

export default ProfileMenuDropdown
