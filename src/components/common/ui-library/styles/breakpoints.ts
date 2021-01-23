import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const smallMax = 767;
const mediumMin = 768;
const mediumMax = 994;
const largeMin = 995;
const smallMaxPx = `${smallMax}px`;
const mediumMinPx = `${mediumMin}px`;
const mediumMaxPx = `${mediumMax}px`;
const largeMinPx = `${largeMin}px`;

export const SpHide = styled.div`
  @media (max-width: ${smallMaxPx}) {
    display: none;
  }
`;
export const PcHide = styled.div`
  @media (min-width: ${mediumMinPx}) {
    display: none;
  }
`;
export default {
  smallMax,
  mediumMin,
  mediumMax,
  largeMin,
  smallMaxPx,
  mediumMinPx,
  mediumMaxPx,
  largeMinPx,
  smallOnly: (cssRules: FlattenSimpleInterpolation) => css`
    @media (max-width: ${smallMaxPx}) {
      ${cssRules}
    }
  `,
  mediumOnly: (cssRules: FlattenSimpleInterpolation) => css`
    @media (min-width: ${mediumMinPx}) and (max-width: ${mediumMaxPx}) {
      ${cssRules}
    }
  `,
  mediumDown: (cssRules: FlattenSimpleInterpolation) => css`
    @media (max-width: ${mediumMaxPx}) {
      ${cssRules}
    }
  `,
  mediumUp: (cssRules: FlattenSimpleInterpolation) => css`
    @media (min-width: ${mediumMinPx}) {
      ${cssRules}
    }
  `,
  largeOnly: (cssRules: FlattenSimpleInterpolation) => css`
    @media (min-width: ${largeMinPx}) {
      ${cssRules}
    }
  `,
  SpHide,
  PcHide,
};
