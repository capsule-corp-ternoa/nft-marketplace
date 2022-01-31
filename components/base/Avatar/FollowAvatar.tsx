import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { follow, getFollowersCount, isUserFollowing, unfollow } from 'actions/follower';
import { FOLLOWED_TAB, TabsIdType } from 'components/pages/Profile';
import Button from 'components/ui/Button';
import { UserType } from 'interfaces';
import { useApp } from 'redux/hooks';

import Picture from './components/Picture';

type CountsNominalSetState = React.Dispatch<React.SetStateAction<{ [key in TabsIdType]: number }>>;
type FollowersNominalSetState = React.Dispatch<React.SetStateAction<UserType[]>>;

interface FollowAvatarProps {
  className?: string;
  isVerified: boolean;
  name: string;
  picture?: string;
  profileWalletId: string;
  setCounts?: CountsNominalSetState;
  setFollowed?: FollowersNominalSetState;
}

const FollowAvatar = ({ className, isVerified, name = 'Ternoa', picture, profileWalletId, setCounts, setFollowed }: FollowAvatarProps) => {
  const { user } = useApp();
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const isFollowButton = !!user && profileWalletId !== user.walletId;

  const handleFollow = async () => {
    if (user) {
      setIsFollowLoading(true);
      try {
        if (isFollowing) {
          await unfollow(profileWalletId, user.walletId);
          if (setFollowed) setFollowed((prevState) => prevState.filter(({ walletId }) => walletId !== profileWalletId));
          if (setCounts)
            setCounts((prevCounts) => ({
              ...prevCounts,
              [FOLLOWED_TAB]: prevCounts[FOLLOWED_TAB] - 1,
            }));

          setFollowersCount((prevCount) => prevCount - 1);
        } else {
          const res = await follow(profileWalletId, user.walletId);
          if (setFollowed) setFollowed((prevState) => [...prevState, res]);
          if (setCounts)
            setCounts((prevCounts) => ({
              ...prevCounts,
              [FOLLOWED_TAB]: prevCounts[FOLLOWED_TAB] + 1,
            }));

          setFollowersCount((prevCount) => prevCount + 1);
        }

        setIsFollowing((prevState) => !prevState);
        setIsFollowLoading(false);
      } catch (err) {
        setIsFollowLoading(false);
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const initStatus = async () => {
      if (user) {
        try {
          const { isFollowing } = await isUserFollowing(profileWalletId, user.walletId);
          setIsFollowing(isFollowing);

          const count = await getFollowersCount(profileWalletId);
          setFollowersCount(count);
        } catch (error) {
          console.log(error);
        }
      }
    };

    initStatus();
  }, []);

  return (
    <SAvatarContainer className={className}>
      <SAvatarWrapper>
        <Picture isClickable isVerified={isVerified} name={name} picture={picture} walletId={profileWalletId} />
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
                color={isFollowing ? 'primary300' : 'invertedContrast'}
                disabled={isFollowLoading}
                isLoading={isFollowLoading}
                onClick={handleFollow}
                size="small"
                text={isFollowing ? 'Unfollow' : 'Follow'}
              />
            )}
          </SBottomDetails>
        </SDetailsContainer>
      </SAvatarWrapper>
      {isFollowButton && (
        <SFollowButtonMobile
          color={isFollowing ? 'primary300' : 'invertedContrast'}
          disabled={isFollowLoading}
          isLoading={isFollowLoading}
          onClick={handleFollow}
          size="small"
          text={isFollowing ? 'Unfollow' : 'Follow'}
        />
      )}
    </SAvatarContainer>
  );
};

const SAvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SAvatarWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;

const SDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0;
  margin-left: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
  }
`;

const STopDetails = styled.div`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;

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
`;

const SName = styled.a`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
    cursor: pointer;
  }
`;

const SFollowers = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-size: 1.2rem;
`;

const SFollowButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
`;

const SFollowButtonMobile = styled(SFollowButton)`
  display: inline-block;
  margin-left: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const SFollowButtonDesktop = styled(SFollowButton)`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline-block;
  }
`;

export default FollowAvatar;
