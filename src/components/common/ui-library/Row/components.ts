import styled from 'styled-components';
import settings from '../styles/settings';
import componentBase from '../styles/componentBase';

export const RowBase = styled.div`
  ${componentBase}
  color: inherit;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 0 1 auto;
  margin-left: -7px;
  margin-right: -7px;
  margin-top: -14px;
  max-width: ${settings.maxScreenWidth + 14}px;
  min-width: 100%;
  overflow-y: hidden;
  & + & {
    margin-top: 0;
  }
`;
