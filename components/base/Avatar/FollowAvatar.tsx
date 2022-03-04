import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { follow, getFollowersCount, isUserFollowing, unfollow } from 'actions/follower'
import Button from 'components/ui/Button'
import { UserType } from 'interfaces'
import { useApp } from 'redux/hooks'
import { FOLLOW_ACTION, FOLLOW_ACTION_TYPE, UNFOLLOW_ACTION } from 'utils/profile/constants'

import Avatar from './Avatar'

interface FollowAvatarProps {
  className?: string
  handleFollow?: (action: FOLLOW_ACTION_TYPE, profile?: UserType) => void
  isVerified: boolean
  name: string
  picture?: string
  profileWalletId: string
}

const FollowAvatar = ({
  className,
  handleFollow,
  isVerified,
  name = 'Ternoa',
  picture,
  profileWalletId,
}: FollowAvatarProps) => {
  const { user } = useApp()
  const [followersCount, setFollowersCount] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFollowLoading, setIsFollowLoading] = useState(true)

  const isFollowButton = !!user && profileWalletId !== user.walletId

  const onFollow = async () => {
    if (user) {
      setIsFollowLoading(true)
      try {
        if (isFollowing) {
          const res = await unfollow(profileWalletId, user.walletId)
          if (handleFollow) handleFollow(UNFOLLOW_ACTION, res)
          setFollowersCount((prevCount) => prevCount - 1)
        } else {
          const res = await follow(profileWalletId, user.walletId)
          if (handleFollow) handleFollow(FOLLOW_ACTION, res)
          setFollowersCount((prevCount) => prevCount + 1)
        }

        setIsFollowing((prevState) => !prevState)
        setIsFollowLoading(false)
      } catch (err) {
        setIsFollowLoading(false)
        console.error(err)
      }
    }
  }

  useEffect(() => {
    let shouldUpdate = true
    const initStatus = async () => {
      try {
        if (user) {
          const { isFollowing } = await isUserFollowing(profileWalletId, user.walletId)
          if (shouldUpdate) setIsFollowing(isFollowing)
        }

        const count = await getFollowersCount(profileWalletId)
        if (shouldUpdate) {
          setFollowersCount(count)
          setIsFollowLoading(false)
        }
      } catch (error) {
        console.log(error)
        if (shouldUpdate) setIsFollowLoading(false)
      }
    }

    initStatus()
    return () => {
      shouldUpdate = false
    }
  }, [profileWalletId, user])

  return (
    <SAvatarContainer className={className}>
      <SAvatarWrapper>
        <Avatar isPictureOnly isVerified={isVerified} name={name} picture={picture} walletId={profileWalletId} />
        <SDetailsContainer>
          <STopDetails>
            <Link href={`/${profileWalletId}`} passHref>
              <SName href={`/${profileWalletId}`}>{name}</SName>
            </Link>
          </STopDetails>

          <SBottomDetails>
            <SFollowers>{`${followersCount} followers`}</SFollowers>
            {isFollowButton && (
              <SFollowButtonDesktop
                color={isFollowing ? 'primary200' : 'invertedContrast'}
                disabled={isFollowLoading}
                isLoading={isFollowLoading}
                onClick={onFollow}
                size="small"
                text={isFollowing ? 'Unfollow' : 'Follow'}
              />
            )}
          </SBottomDetails>
        </SDetailsContainer>
      </SAvatarWrapper>
      {isFollowButton && (
        <SFollowButtonMobile
          color={isFollowing ? 'primary200' : 'invertedContrast'}
          disabled={isFollowLoading}
          isLoading={isFollowLoading}
          onClick={onFollow}
          size="small"
          text={isFollowing ? 'Unfollow' : 'Follow'}
        />
      )}
    </SAvatarContainer>
  )
}

const SAvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const SAvatarWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

const SDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0;
  margin-left: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
  }
`

const STopDetails = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`

const SBottomDetails = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0.4rem;
  }
`

const SName = styled.a`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
    cursor: pointer;
  }
`

const SFollowers = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-size: 1.2rem;
`

const SFollowButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
`

const SFollowButtonMobile = styled(SFollowButton)`
  display: inline-block;
  margin-left: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const SFollowButtonDesktop = styled(SFollowButton)`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline-block;
  }
`

export default FollowAvatar
