import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

import Clipboard from 'components/base/Clipboard';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';

import Picture from './components/Picture';
import { AVATAR_VARIANT_BANNER, AVATAR_VARIANT_TRANSACTION } from './constants';
import { AVATAR_VARIANT_TYPE } from './interfaces';
import { getNameColor, getNameFontSize } from './utils';

interface Props {
  className?: string;
  followers?: number;
  followLabel?: string;
  handleFollow?: () => void;
  isAddressDisplayed?: boolean;
  isClickable?: boolean;
  isDiscoverButton?: boolean;
  isFollowButton?: boolean;
  isNameEllipsis?: boolean;
  isPictureOnly?: boolean;
  isTooltip?: boolean;
  isUnfollow?: boolean;
  isVerified?: boolean;
  label?: string | React.ReactNode;
  name?: string;
  nickname?: string;
  personalUrl?: string;
  picture?: string;
  twitterName?: string;
  variant?: AVATAR_VARIANT_TYPE;
  walletId?: string;
}

const Avatar = ({
  className,
  followers,
  handleFollow,
  isAddressDisplayed,
  isClickable,
  isDiscoverButton,
  isFollowButton,
  isNameEllipsis,
  isPictureOnly,
  isTooltip,
  isUnfollow,
  isVerified,
  label,
  name = 'Ternoa',
  nickname,
  personalUrl,
  picture,
  twitterName,
  variant,
  walletId,
}: Props) => {
  if (isPictureOnly) {
    return (
      <Picture
        isClickable={isClickable}
        isTooltip={isTooltip}
        isVerified={isVerified}
        name={name}
        picture={picture}
        variant={variant}
        walletId={walletId}
      />
    );
  }

  return (
    <SAvatarContainer className={className} variant={variant}>
      <SAvatarWrapper variant={variant}>
        <STransactionVariantWrapper variant={variant}>
          <Picture
            isClickable={isClickable}
            isTooltip={isTooltip}
            isVerified={isVerified}
            name={name}
            picture={picture}
            variant={variant}
            walletId={walletId}
          />
        </STransactionVariantWrapper>
        <SDetailsContainer variant={variant}>
          <STopDetails>
            <Link href={`/${walletId}`} passHref>
              <SName href={`/${walletId}`} isNameEllipsis={isNameEllipsis} variant={variant}>
                {name}
              </SName>
            </Link>
            {nickname !== undefined && <SNickname>{nickname}</SNickname>}
          </STopDetails>

          <SBottomDetails isMarginTop={isFollowButton}>
            {label !== undefined && label && typeof label === 'string' ? <SLabel>{label}</SLabel> : label}
            {followers !== undefined && <SFollowers>{`${followers} followers`}</SFollowers>}
            {twitterName !== undefined && (
              <STransactionVariantWrapper variant={variant}>
                <SLink
                  href={`https://twitter.com/${twitterName}`}
                  target="_blank"
                  title={`${twitterName}'s twitter account`}
                  rel="noopener noreferrer"
                >
                  <STwitterIcon name="socialTwitter" />
                  <STwitterNickname>{twitterName}</STwitterNickname>
                </SLink>
              </STransactionVariantWrapper>
            )}
            {personalUrl !== undefined && (
              <SLink href={personalUrl} target="_blank" title="personalPage" rel="noopener noreferrer">
                {personalUrl.replace(/(^\w+:|^)\/\//, '')}
              </SLink>
            )}
            {isAddressDisplayed && walletId && (
              <STransactionVariantWrapper variant={variant}>
                <Clipboard address={walletId} isCopyLabelIndicator={false} isEllipsis variant={variant} />
              </STransactionVariantWrapper>
            )}
            {isFollowButton && (
              <SFollowButtonDesktop
                color={isUnfollow ? 'primaryLight' : 'invertedContrast'}
                onClick={handleFollow}
                size="small"
                text={isUnfollow ? 'Unfollow' : 'Follow'}
              />
            )}
          </SBottomDetails>
        </SDetailsContainer>
      </SAvatarWrapper>
      {isDiscoverButton && (
        <SDiscoverButton
          color="primaryLight"
          onClick={() => walletId && Router.push(`/${walletId}`)}
          size="small"
          text="Discover"
        />
      )}
      {isFollowButton && (
        <SFollowButtonMobile
          color={isUnfollow ? 'primaryLight' : 'invertedContrast'}
          onClick={handleFollow}
          size="small"
          text={isUnfollow ? 'Unfollow' : 'Follow'}
        />
      )}
    </SAvatarContainer>
  );
};

const SAvatarContainer = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  display: flex;
  justify-content: space-between;
`;

const SAvatarWrapper = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  width: ${({ variant }) => (variant === AVATAR_VARIANT_BANNER ? '100%' : 'auto')};
  display: flex;
  flex-direction: ${({ variant }) => (variant === AVATAR_VARIANT_BANNER ? 'column' : 'row')};
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;

const STransactionVariantWrapper = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  display: ${({ variant }) => (variant === AVATAR_VARIANT_TRANSACTION ? 'none' : 'block')};

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

const SDetailsContainer = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ variant }) => (variant === AVATAR_VARIANT_BANNER ? 'center' : 'flex-start')};
  margin-top: ${({ variant }) => (variant === AVATAR_VARIANT_BANNER ? '1.6rem' : 0)};
  margin-left: ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER || variant === AVATAR_VARIANT_TRANSACTION ? 0 : '1.6rem'};

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: ${({ variant }) =>
      variant === AVATAR_VARIANT_TRANSACTION ? '1.6rem' : variant === AVATAR_VARIANT_BANNER ? 0 : '1.6rem'};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
    margin-top: 0;
    margin-left: ${({ variant }) => (variant === AVATAR_VARIANT_BANNER ? '3.2rem' : '1.6rem')};
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

const SBottomDetails = styled.div<{ isMarginTop?: boolean }>`
  display: flex;
  align-items: center;

  > * {
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: ${({ isMarginTop }) => (isMarginTop ? '0.4rem' : 0)};
  }
`;

const SName = styled.a<{ isNameEllipsis?: boolean; variant?: AVATAR_VARIANT_TYPE }>`
  color: ${({ theme, variant }) => getNameColor(theme, variant)};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ variant }) => getNameFontSize(variant)};

  ${({ isNameEllipsis }) =>
    isNameEllipsis &&
    `
    display: inline-block;
    width: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    ${({ variant }) =>
      variant === AVATAR_VARIANT_TRANSACTION &&
      `
        font-size: 1.6rem;
    `}
  }
`;

const SLabel = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 1.6rem;
`;

const SFollowers = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-size: 1.2rem;
`;

const SNickname = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
`;

const SLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral200};
  font-size: 1.6rem;
`;

const STwitterIcon = styled(Icon)`
  width: 1.4rem;
  height: 1.4rem;
`;

const STwitterNickname = styled.span`
  margin-left: 0.4rem;
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

const SDiscoverButton = styled(Button)`
  margin-left: 0.8rem;
`;

export default Avatar;
