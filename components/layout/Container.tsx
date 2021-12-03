import styled from 'styled-components';
import { breakpointMap } from 'style/theme/base';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3.2rem;

  &:not(:first-child) {
    padding-top: 5.4rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 6.4rem 4rem 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    &:not(:first-child) {
      padding-top: 8.8rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: 1440px;
    // TODO: Use xxl breakpoint when its value is 1440px
    // max-width: ${breakpointMap.xxl}px;
    padding: 9.6rem 6.4rem 0;

    &:not(:first-child) {
      padding-top: 16rem;
    }
  }
`;
