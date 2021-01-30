import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../styles/colors';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {
  primary?: boolean;
};

const TernoaButton = styled.button<ButtonProps>`
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  border-radius: 1000px;
  padding: 10px 30px;
  margin: 0 10px;
  ${({ primary }) =>
    primary
      ? css`
          background: linear-gradient(180deg, #1e34a9 0%, #131062 100%);
          color: ${colors.white};
          box-shadow: 0px 3px 4px rgba(30, 52, 169, 0.29);
          border:none;
        `
      : css`
          background-color: ${colors.white};
          color: ${colors.gray_button};
          box-shadow: 0px 3px 4px rgba(30, 52, 169, 0.29);
          border: 1px solid #ebeaea;
        `}
`;


const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <>
      <TernoaButton {...rest}>{children}</TernoaButton>
    </>
  );
};

export default Button;
