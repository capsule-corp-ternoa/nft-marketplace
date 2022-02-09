import styled from 'styled-components';

export const FilterCointainer = styled.div`
  padding: 3.2rem 0;

  &:not(:last-child) {
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.neutral200}`};
  }
`;

export const FilterTitle = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
`;

export const FilterSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 1.6rem;
`;