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
  max-width: 128rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3.2rem;

  &:not(:first-child) {
    padding-top: 5.6rem;
  }

  &:last-child {
    padding-bottom: 7.2rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 3.2rem 4rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    &:not(:first-child) {
      padding-top: 4.8rem;
    }

    &:last-child {
      padding-bottom: 9.6rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 4rem 6.4rem;

    &:not(:first-child) {
      padding-top: 5.6rem;
    }

    &:last-child {
      padding-bottom: 12rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: ${breakpointMap.xxl}px;
  }
`;
