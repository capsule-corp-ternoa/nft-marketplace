import styled from 'styled-components'
import { breakpointMap } from 'style/theme/base'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 128rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 2.4rem 3.2rem;

  &:first-child {
    padding-top: 4rem;
  }

  &:last-child {
    padding-bottom: 6.4rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 2.4rem 4rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 3.2rem 4rem;

    &:last-child {
      padding-bottom: 6.4rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 3.2rem 6.4rem;

    &:first-child {
      padding-top: 5.6rem;
    }

    &:last-child {
      padding-bottom: 9.6rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: ${breakpointMap.xxl}px;
  }
`
