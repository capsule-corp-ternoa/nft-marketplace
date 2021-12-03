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
  padding: 3.2rem 2.4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 6.4rem 3.2rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 9.6rem 4.8rem;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: 1440px;
    // TODO: Use xxl breakpoint when its value is 1440px
    // max-width: ${breakpointMap.xxl}px;
    padding: 9.6rem;
  }
`;
