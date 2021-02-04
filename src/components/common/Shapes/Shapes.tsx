import styled from 'styled-components';
import colors from '../ui-library/styles/colors';

export const RoundedSpan = styled.span`
  border: solid 1px ${colors.black};
  padding: 15px;
  border-radius: 1000px;

`;

export const SquaredSpan = styled.span`
  border: solid 1px ${colors.black};
  padding: 15px;
  border-radius: 5px;
`;