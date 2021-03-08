/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';

export type TextAreaProps = 
React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  full?: boolean;
  medium?: boolean;
  light?: boolean;
  onChange: any;
};

const TextAreaStyled = styled.textarea<TextAreaProps>`
  height: 143px;
  left: 211px;
  top: 1px;
  height: 100px;
  ${({ full }) =>
    full &&
    `
    width: 100%;
  `}
  ${({ medium }) =>
    medium &&
    `
    width: 50%;
  `}
  ${({ light }) =>
    light
      ? `
    background: rgba(0, 0, 0, 0.01);
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    border-radius: 7px;
  `
      : `
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
    
    border-radius: 30px;
  `}
`;

// TODO children is not properly displayed
const TextArea: React.FC<TextAreaProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <TextAreaStyled {...rest}>{children}</TextAreaStyled>
  );
};

export default TextArea;
