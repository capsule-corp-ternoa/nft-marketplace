import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';

import { FiltersType } from 'components/pages/Explore';
import Icon from 'components/ui/Icon';

type FiltersNominalSetState = React.Dispatch<React.SetStateAction<FiltersType>>;
type DataFilteredNominalSetState = React.Dispatch<React.SetStateAction<boolean>>;

interface ModalFiltersProps {
  setExpanded: (b: boolean) => void;
  setFilters: FiltersNominalSetState;
  setIsDataFiltered: DataFilteredNominalSetState;
}

const ModalFilters = ({ setExpanded }: ModalFiltersProps) => (
  <SModalBackground>
    <ClickAwayListener
      onClickAway={() => {
        setExpanded(false);
      }}
    >
      <SModalContainer>
        <SCloseIcon onClick={() => setExpanded(false)}>
          <Icon name="close" />
        </SCloseIcon>
        <STitle>Filters</STitle>
        <SFiltersContainer>
          categories
          <SChildren />
        </SFiltersContainer>
      </SModalContainer>
    </ClickAwayListener>
  </SModalBackground>
);

const SModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 110;
`;

const SCloseIcon = styled.div`
  display: flex;
  position: absolute;
  z-index: 130;
  fill: ${({ theme }) => theme.colors.contrast};
  top: 2rem;
  right: 2.4rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const SModalContainer = styled.div`
  width: 340px;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  display: flex;
  flex-direction: column;
  padding: 1.6rem 2.4rem;
  max-height: 50rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 56rem;
    padding: 5.6rem 4rem;
  }
`;

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 2.4rem;
  margin: 0;
`;

const SFiltersContainer = styled.div`
  overflow-y: scroll;
`;

const SChildren = styled.div`
  background: red;
  height: 80rem;
`;

export default ModalFilters;
