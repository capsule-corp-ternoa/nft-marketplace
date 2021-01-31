import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import colors from '../ui-library/styles/colors';

const shared = (): FlattenSimpleInterpolation => css`
  font-family: Montserrat;
  font-style: normal;
  color: ${colors.dark_blue};
  font-weight: 700;
  text-align: left;
`;

export const H1 = styled.h1`
  ${shared};
  font-size: 60px;
`;

export const H2 = styled.h2`
  ${shared};
  font-size: 50px;
`;

export const H2SiteName = styled.h2`
  ${shared};
  font-size: 18px;
`;

export const H3 = styled.h3`
  ${shared};
  font-size: 22px;
  padding-left: 50px;
`;

export const H4 = styled.h4`
  ${shared};
  font-size: 24px;
  margin-left: 20px;
`;

export const H5 = styled.h5`
  font-size: 22px;
  padding-left: 50px;
`;