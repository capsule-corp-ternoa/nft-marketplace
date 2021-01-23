import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import breakpoints from '../styles/breakpoints';
import componentBase from '../styles/componentBase';

type ColSize =
  | '10'
  | '20'
  | '25'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '75'
  | '80'
  | '90'
  | '100'
  | 'one-third'
  | 'two-thirds';

const colSizeMap = {
  '10': 10,
  '20': 20,
  '25': 25,
  '30': 30,
  '40': 40,
  '50': 50,
  '60': 60,
  '70': 70,
  '75': 75,
  '80': 80,
  '90': 90,
  '100': 100,
  'one-third': 33.33333,
  'two-thirds': 66.66666,
};

const getSizeStyle = (size: ColSize): FlattenSimpleInterpolation => css`
  flex: 1 1 ${colSizeMap[size]}%;
  min-width: ${colSizeMap[size]}%;
  max-width: ${colSizeMap[size]}%;
`;

type ColPropsBase = {
  size?: ColSize;
  small?: ColSize;
  medium?: ColSize;
  large?: ColSize;
};

export const ColBase = styled.div<ColPropsBase>`
  ${componentBase}
  color: inherit;
  flex: 1 1 0;
  margin-top: 14px;
  padding-left: 7px;
  padding-right: 7px;
  ${({ size }): FlattenSimpleInterpolation | undefined =>
    size && getSizeStyle(size)}
  ${({ small }): FlattenSimpleInterpolation | undefined =>
    small && breakpoints.smallOnly(getSizeStyle(small))}
  ${({ medium }): FlattenSimpleInterpolation | undefined =>
    medium && breakpoints.mediumOnly(getSizeStyle(medium))}
  ${({ large }): FlattenSimpleInterpolation | undefined =>
    large && breakpoints.largeOnly(getSizeStyle(large))}
`;

export default ColBase;
