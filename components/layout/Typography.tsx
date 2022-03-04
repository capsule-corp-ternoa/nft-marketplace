import styled from 'styled-components'

export const Advice = styled.span`
  color: ${({ theme }) => theme.colors.primary500};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;
  line-height: 1.3;
`

export const Insight = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 1.2rem;
  line-height: 1.3;
`

export const InsightLight = styled(Insight)`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1rem;
`

export const Subtitle = styled.h3`
  display: flex;
  align-items: end;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 2rem;
  line-height: 1.3;
  margin: 0;
`

export const Title = styled.h2`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  line-height: 1.3;
  margin: 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    display: inline-flex;
    align-items: start;
    gap: 2.4rem;
    max-width: 64rem;
    font-size: 6.4rem;
    text-align: left;
  }
`
