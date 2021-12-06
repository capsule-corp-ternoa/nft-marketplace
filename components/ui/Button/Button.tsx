import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'style/theme/types';

interface IButton {
  color?: keyof Colors;
  size?: 'small' | 'medium';
}
interface Props extends IButton {
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  text?: string;
}

const ButtonStyle = css<IButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: ${({ theme, color }) =>
    color ? theme.colors[`${color}`] : theme.colors.primary};
  border: none;
  border-radius: 4rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  padding: ${({ size }) =>
    size === 'small' ? '0.8rem 1.6rem' : '1.2rem 4.8rem'};
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;

  &:hover {
    color: white;
    background-color: black;
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.invertedContrast;
      case 'primaryLight':
        return theme.colors.primary;
      case 'invertedContrast':
      case 'whiteBlur':
      default:
        return theme.colors.contrast;
    }
  }};
`;

const Button = ({
  className,
  color,
  disabled,
  href,
  onClick,
  size = 'medium',
  text,
}: Props) => {
  if (href !== null && href !== undefined) {
    return (
      <SAnchor className={className} color={color} href={href} size={size}>
        {text}
      </SAnchor>
    );
  }

  return (
    <SButton
      className={className}
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
    >
      {text}
    </SButton>
  );
};

const SAnchor = styled.a<IButton>`
  ${ButtonStyle}
`;

const SButton = styled.button<IButton>`
  ${ButtonStyle}
`;

export default Button;
