import React from 'react'
import styled from 'styled-components'

import Icon from 'components/ui/Icon'

import Avatar from '../Avatar'
import { AVATAR_VARIANT_BANNER } from '../constants'

interface Props {
  bio?: string
  className?: string
  isVerified?: boolean
  name: string
  nickname?: string
  picture?: string
  twitterName?: string
  walletId: string
}

const Banner = ({ bio, className, isVerified, name, nickname, picture, twitterName, walletId }: Props) => (
  <SBannerContainer className={className}>
    <Avatar
      isAddressDisplayed
      isVerified={isVerified}
      name={name}
      nickname={nickname}
      picture={picture}
      variant={AVATAR_VARIANT_BANNER}
      walletId={walletId}
    />
    {(twitterName || bio) && (
      <SInfosContainer>
        {twitterName && (
          <SLink
            href={`https://twitter.com/${twitterName}`}
            target="_blank"
            title="twitterPage"
            rel="noopener noreferrer"
          >
            <STwitterIcon name="socialTwitter" />
            <STwitterNickname>{twitterName}</STwitterNickname>
          </SLink>
        )}
        {bio && <SBio>{bio}</SBio>}
      </SInfosContainer>
    )}
  </SBannerContainer>
)

const SBannerContainer = styled.div`
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
  }
`

const SInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
    border-left: ${({ theme }) => `1px solid ${theme.colors.neutral600}`};
    height: 100%;
    margin: 0 0 0 8rem;
    padding: 1.6rem 0 1.6rem 2.4rem;
  }
`

const SLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.6rem;
`

const STwitterIcon = styled(Icon)`
  width: 1.4rem;
  height: 1.4rem;
`

const STwitterNickname = styled.span`
  margin-left: 0.4rem;
`

const SBio = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.6rem;
  margin-top: 2.4rem;
  max-width: 28rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0.8rem;
    text-align: left;
    max-height: 12rem;
    overflow-y: scroll;
  }
`

export default Banner
