import React from 'react'
import styled from 'styled-components'

import Avatar, { AVATAR_VARIANT_MOSAIC } from 'components/base/Avatar'
import { UserType } from 'interfaces'

interface Props {
  title?: string
  users: UserType[]
}

const UsersShowcase = ({ title, users }: Props) => (
  <>
    {title && <STitle>{title}</STitle>}
    <SUsersContainer>
      {users.map(({ _id, name, picture, verified, walletId }) => (
        <SAvatar
          key={_id}
          isPictureOnly
          isTooltip
          isVerified={verified}
          name={name}
          picture={picture}
          variant={AVATAR_VARIANT_MOSAIC}
          walletId={walletId}
        />
      ))}
    </SUsersContainer>
  </>
)

const STitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 3.2rem;
  }
`

const SUsersContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 2.4rem -1.6rem 0;
  padding: 0 1.6rem;
  gap: 3.2rem;
  overflow-x: auto;
  min-height: 11rem;

  ${({ theme }) => theme.mediaQueries.xxl} {
    min-height: auto;
    overflow-x: visible;
  }
`

const SAvatar = styled(Avatar)`
  > span {
    display: none !important;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    &:hover {
      > span {
        display: block !important;
      }
    }
  }
`

export default UsersShowcase
