import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../styles/colors';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {
  primary?: boolean;
  full?:boolean;
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
  ${({ full }) =>
    full &&
  css`
  width:90%;
  `
}
  ${({ primary }) =>
    primary
      ? css`
          background: ${colors.blue_gradient};
          color: ${colors.white};
          box-shadow: 0px 3px 4px rgba(30, 52, 169, 0.29);
          border: none;
          & a,
          a:visited {
            color: ${colors.white};
            text-decoration: none;
          }
        `
      : css`
          background-color: ${colors.white};
          color: ${colors.gray_button};
          box-shadow: 0px 3px 4px rgba(30, 52, 169, 0.29);
          border: 1px solid #ebeaea;
          & a,
          a:visited {
            color: ${colors.gray_button};
            text-decoration: none;
          }
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
