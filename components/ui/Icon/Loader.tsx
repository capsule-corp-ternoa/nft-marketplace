import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Colors } from 'style/theme/types';

interface Props {
  className?: string;
  color?: keyof Colors;
}

const Loader = ({ className, color = 'invertedContrast' }: Props) => (
  <LoaderContainer className={className} color={color}>
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

const LoaderContainer = styled.div<{ color: keyof Colors }>`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 6.4rem;
    height: 6.4rem;
    margin: 0.8rem;
    border: 0.8rem solid;
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
