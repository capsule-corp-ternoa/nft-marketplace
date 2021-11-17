import styled from 'styled-components';

export const Advice = styled.span`
  color: #7417ea;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;
  line-height: 1.3;
`;

export const Insight = styled.span`
  color: #b1b1b1;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 1.2rem;
  line-height: 1.3;
`;

export const InsightLight = styled(Insight)`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1rem;
`;

export const Subtitle = styled.h3`
  display: flex;
  align-items: end;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 2rem;
  line-height: 1.3;
  margin: 0;
`;

export const Title = styled.h2`
  display: inline-flex;
  align-items: start;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  gap: 2.4rem;
  line-height: 1.3;
  margin: 0;
  max-width: 64rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 6.4rem;
    text-align: left;
  }
`;
