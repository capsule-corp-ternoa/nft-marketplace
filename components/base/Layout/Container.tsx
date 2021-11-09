import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3.2rem 2.4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 6.4rem 2.4rem;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: 112rem;
    padding: 9.6rem 2.4rem;
  }
`;
