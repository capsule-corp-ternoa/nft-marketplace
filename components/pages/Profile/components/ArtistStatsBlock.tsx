import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { follow, isUserFollowing, unfollow } from 'actions/follower'
import Button from 'components/ui/Button'
import { UserType } from 'interfaces'
import { useApp } from 'redux/hooks'
import { computeValue } from 'utils/strings'

import { FOLLOWERS_TAB } from '../constants'
import { TabsIdType } from '../interfaces'

type CountsNominalSetState = React.Dispatch<React.SetStateAction<{ [key in TabsIdType]: number }>>
type FollowersNominalSetState = React.Dispatch<React.SetStateAction<UserType[]>>

interface ArtistStatsBlockProps {
  artistWalletId: string
  followedCount: number
  followersCount: number
  setCounts: CountsNominalSetState
  setFollowers: FollowersNominalSetState
  viewsCount: number
}

const ArtistStatsBlock = ({
  artistWalletId,
  followedCount,
  followersCount,
  setCounts,
  setFollowers,
  viewsCount,
}: ArtistStatsBlockProps) => {
  const { user } = useApp()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFollowLoading, setIsFollowLoading] = useState(false)

  const handleUserFollow = async () => {
    if (user) {
      setIsFollowLoading(true)
      try {
        if (isFollowing) {
          await unfollow(artistWalletId, user.walletId)
          setFollowers((prevState) => prevState.filter(({ walletId }) => walletId !== user.walletId))
          setCounts((prevCounts) => ({
            ...prevCounts,
            [FOLLOWERS_TAB]: prevCounts[FOLLOWERS_TAB] - 1,
          }))
        } else {
          await follow(artistWalletId, user.walletId)
          setFollowers((prevState) => prevState.concat(user))
          setCounts((prevCounts) => ({
            ...prevCounts,
            [FOLLOWERS_TAB]: prevCounts[FOLLOWERS_TAB] + 1,
          }))
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
    const getFollowingStatus = async () => {
      if (user) {
        try {
          const { isFollowing } = await isUserFollowing(artistWalletId, user.walletId)
          if (shouldUpdate) setIsFollowing(isFollowing)
        } catch (error) {
          console.log(error)
        }
      }
    }

    getFollowingStatus()
    return () => {
      shouldUpdate = false
    }
  }, [artistWalletId, user])

  return (
    <SStatsContainer>
      {user && user.walletId !== artistWalletId && (
        <Button
          color={isFollowing ? 'contrast' : 'invertedContrast'}
          disabled={isFollowLoading}
          isLoading={isFollowLoading}
          onClick={handleUserFollow}
          size="medium"
          text={isFollowing ? 'Unfollow' : 'Follow'}
          variant={isFollowing ? 'contained' : 'outlined'}
        />
      )}
      <SArtistStatsContainer>
        <SArtistStatsValue>{computeValue(followersCount)}</SArtistStatsValue>followers
        <SArtistStatsSeparator>·</SArtistStatsSeparator>
        <SArtistStatsValue>{computeValue(followedCount)}</SArtistStatsValue>following
        <SArtistStatsSeparator>·</SArtistStatsSeparator>
        <SArtistStatsValue>{computeValue(viewsCount)}</SArtistStatsValue>views
      </SArtistStatsContainer>
    </SStatsContainer>
  )
}

const SStatsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    align-self: center;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    > * {
      align-self: flex-end;
    }
  }
`

const SArtistStatsContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.6rem;
  margin-top: 1.2rem;
`

const SArtistStatsSeparator = styled.div`
  font-family: ${({ theme }) => theme.fonts.bold};
  margin: 0 1.2rem;
  font-size: 2.4rem;
`

const SArtistStatsValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-right: 0.4rem;
`

export default ArtistStatsBlock
