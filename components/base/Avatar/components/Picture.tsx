import React from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';
import gradient from 'random-gradient';

import Icon from 'components/ui/Icon';

import {
  AVATAR_VARIANT_BADGE,
  AVATAR_VARIANT_BANNER,
  AVATAR_VARIANT_EDIT,
  AVATAR_VARIANT_TYPE,
} from '../Avatar';

interface Props {
  className?: string;
  isBanner?: boolean;
  isClickable?: boolean;
  isTooltip?: boolean;
  isVerified?: boolean;
  link?: string;
  name: string;
  picture?: string;
  variant?: AVATAR_VARIANT_TYPE;
}

const pictureSize = (variant?: AVATAR_VARIANT_TYPE) => {
  switch (variant) {
    case AVATAR_VARIANT_BANNER:
      return '12rem';
    case AVATAR_VARIANT_EDIT:
      return '9.6rem';
    case AVATAR_VARIANT_BADGE:
      return '3.6rem';
    default:
      return '5.6rem';
  }
};

const fontSize = (variant?: AVATAR_VARIANT_TYPE) => {
  switch (variant) {
    case AVATAR_VARIANT_BANNER:
      return '5.6rem';
    case AVATAR_VARIANT_EDIT:
      return '3.2rem';
    case AVATAR_VARIANT_BADGE:
      return '2rem';
    default:
      return '2.4rem';
  }
};

const Picture = ({
  className,
  isClickable,
  isTooltip,
  isVerified,
  link,
  name,
  picture,
  variant,
}: Props) => (
  <SPictureContainer
    className={className}
    isClickable={isClickable}
    isTooltip={isTooltip}
    onClick={() => isClickable && link && Router.push(link)}
  >
    <SPictureWrapper variant={variant}>
      {isVerified && <SIcon name="badge" />}
      {picture ? (
        <SImage draggable="false" isClickable={isClickable} src={picture} />
      ) : (
        <SInitials isClickable={isClickable} name={name}>
          <SLetter variant={variant}>{name?.charAt(0) ?? 'T'}</SLetter>
        </SInitials>
      )}
    </SPictureWrapper>
    <SPopoverName>{name}</SPopoverName>
  </SPictureContainer>
);

const SPictureContainer = styled.div<{
  isClickable?: boolean;
  isTooltip?: boolean;
}>`
  position: relative;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};

  > span {
    display: none;
  }

  ${({ isTooltip }) =>
    isTooltip &&
    `
    &:hover {
      > span {
        display: block;
      }
    }
  `}
`;

const SPictureWrapper = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  width: ${({ variant }) => pictureSize(variant)};
  height: ${({ variant }) => pictureSize(variant)};
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.25);
  z-index: 5;
`;

const SIcon = styled(Icon)`
  position: absolute;
  width: 40%;
  bottom: 3%;
  right: -3%;
  z-index: 10;
`;

const ImageStyle = css<{ isClickable?: boolean }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  position: absolute;
  transition: border 0.05s ease-out;

  ${({ isClickable, theme }) =>
    isClickable &&
    `
      &:hover {
        border: 3px solid;
        border-color: ${theme.colors.primary};
      }
    }
  `}
`;

const SImage = styled.img`
  ${ImageStyle}
`;

const SInitials = styled.div<{ isClickable?: boolean; name: string }>`
  ${ImageStyle}

  background: ${({ name }) => gradient(name)};
`;

const SLetter = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ variant }) => fontSize(variant)};
  text-transform: uppercase;
`;

const SPopoverName = styled.span`
  position: absolute;
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 14.5243px 5.0835px rgb(0 0 0 / 10%);
  color: ${({ theme }) => theme.colors.neutral200};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.4rem;
  max-width: 32rem;
  padding: 0.8rem 1.6rem;
  bottom: 110%;
  left: 50%;
  text-align: center;
  transform: translateX(calc(-50%));
  z-index: 2;
`;

export default Picture;
