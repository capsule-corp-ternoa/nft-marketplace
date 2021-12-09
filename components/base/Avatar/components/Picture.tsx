import React from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';
import gradient from 'random-gradient';

import Icon from '../../../ui/Icon';

interface Props {
  className?: string;
  isClickable?: boolean;
  isTooltip?: boolean;
  isVerified?: boolean;
  link?: string;
  name: string;
  picture?: string;
}

const Picture = ({
  className,
  isClickable,
  isTooltip,
  isVerified,
  link,
  name,
  picture,
}: Props) => (
  <SPictureContainer
    className={className}
    isClickable={isClickable}
    isTooltip={isTooltip}
    onClick={() => isClickable && link && Router.push(link)}
  >
    <SPictureWrapper>
      {isVerified && <SIcon name="badge" />}
      {picture ? (
        <SImage draggable="false" isClickable={isClickable} src={picture} />
      ) : (
        <SInitials isClickable={isClickable} name={name}>
          <SLetter>{name?.charAt(0) ?? 'T'}</SLetter>
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

const SPictureWrapper = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
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

const SLetter = styled.div`
  color: ${({ theme }) => theme.colors.invertedContrast};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 2.4rem;
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
