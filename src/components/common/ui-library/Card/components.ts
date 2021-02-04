import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import colors from '../styles/colors';
import breakpoints from '../styles/breakpoints';
import componentBase from '../styles/componentBase';

export const CardBase = styled.div<{ border: boolean; shadow: boolean; clickable: boolean; }>`
  ${componentBase}
  background-color: ${colors.white};
  margin:20px;
  ${breakpoints.smallOnly(css`
    padding: 24px 14px;
  `)}
  ${breakpoints.mediumUp(css`
    padding: 20px 40px;
  `)}
  ${({ border }): FlattenSimpleInterpolation | false =>
    border &&
    css`
      border-color: ${colors.gray};
      border-style: solid;
      ${breakpoints.smallOnly(css`
        border-width: 1px;
      `)}
      ${breakpoints.mediumUp(css`
        border-width: 1px;
      `)}
    `}
  ${({ shadow }): FlattenSimpleInterpolation | false =>
    shadow &&
    css`
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.15);
    `}
    ${({ clickable }): FlattenSimpleInterpolation | false =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

export default CardBase;
