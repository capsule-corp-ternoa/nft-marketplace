import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
}

const Button = ({ className, disabled, onClick, text }: Props) => (
  <SButton className={className} disabled={disabled} onClick={onClick}>
    {text}
  </SButton>
);

const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: #7417ea;
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

export default Button;
