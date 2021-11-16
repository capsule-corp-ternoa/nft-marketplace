import styled from 'styled-components';

export const Advice = styled.span`
  color: #7417ea;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;
  line-height: 1.3;
`;

export const Insight = styled.span`
  color: #c1c1c1;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 1.2rem;
  line-height: 1.3;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  line-height: 1.3;
  margin: 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 6.4rem;
    text-align: left;
  }
`;
