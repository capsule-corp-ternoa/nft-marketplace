import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Colors } from 'style/theme/types';

interface Props {
  className?: string;
  color?: keyof Colors;
  size?: 'small' | 'medium';
}

const Loader = ({ className, color = 'invertedContrast', size = 'medium' }: Props) => (
  <LoaderContainer className={className} color={color} size={size}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </LoaderContainer>
);

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div<{ color: keyof Colors, size?: 'small' | 'medium' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ size }) => size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '8rem'};
  height: ${({ size }) => size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '8rem'};

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '6.4rem'};
    height: ${({ size }) => size === 'small' ? '1.6rem' : size === 'medium' ? '2rem' : '6.4rem'};
    margin: 0.8rem;
    border: ${({ size }) => size === 'small' ? '0.2rem solid' : size === 'medium' ? '0.3rem solid' : '0.8rem solid'};
    border-radius: 50%;
    animation: ${rotation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ color, theme }) =>
      `${theme.colors[color]} transparent transparent transparent`};

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

export default Loader;
