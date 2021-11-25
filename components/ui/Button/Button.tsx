import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'style/theme/types';

interface IButton {
  color?: keyof Colors;
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
  color: white;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  padding: 1.2rem 4.8rem;
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
`;

const Button = ({ className, color, disabled, href, onClick, text }: Props) => {
  if (href !== null && href !== undefined) {
    return (
      <SAnchor className={className} color={color} href={href}>
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
