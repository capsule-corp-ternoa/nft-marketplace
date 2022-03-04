import styled from 'styled-components'

export const FilterTitle = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
`

export const FilterSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 1.6rem;
`

export const FilterCtasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;
`

export const FilterClearCta = styled.button`
  color: ${({ theme }) => theme.colors.danger400};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.2rem;
  text-decoration-line: underline;
`
