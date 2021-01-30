import React from 'react';
import styled from 'styled-components';

export type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  full?: boolean;
};

const SearchField = styled.input<ButtonProps>`
  height: 43px;
  left: 211px;
  top: 1px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  border-radius: 30px;
  text-indent: 10px;
  ${({ full }) =>
    full &&
    `
    width: 100%;
  `}
`;

const Input: React.FC<ButtonProps> = (props) => (
  <SearchField {...props} />
);

export default Input;