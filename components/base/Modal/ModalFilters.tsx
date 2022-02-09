import React, { useEffect } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';

import { FilterCategories } from 'components/base/Filters';
import { CATEGORIES_FILTER, FiltersType } from 'components/pages/Explore';
import Icon from 'components/ui/Icon';

type FiltersNominalSetState = React.Dispatch<React.SetStateAction<FiltersType>>;
type DataFilteredReadyNominalSetState = React.Dispatch<React.SetStateAction<boolean>>;

interface ModalFiltersProps {
  filters: FiltersType;
  setExpanded: (b: boolean) => void;
  setFilters: FiltersNominalSetState;
  setIsDataFilteredReady: DataFilteredReadyNominalSetState;
}

const ModalFilters = ({ filters, setExpanded, setFilters, setIsDataFilteredReady }: ModalFiltersProps) => {
  useEffect(() => {
    setIsDataFilteredReady(true);
  }, []);

  return (
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
            <FilterCategories categoriesFiltered={filters[CATEGORIES_FILTER]} setFilters={setFilters} />
          </SFiltersContainer>
        </SModalContainer>
      </ClickAwayListener>
    </SModalBackground>
  );
};

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
  top: 3.2rem;
  right: 2.4rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.lg} {
    top: 4.8rem;
    right: 4rem;
  }
`;

const SModalContainer = styled.div`
  width: 340px;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  max-height: 50rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 56rem;
    padding: 4rem 4rem;
  }
`;

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin: 0;
  padding-bottom: 2.4rem;
`;

const SFiltersContainer = styled.div`
  overflow-y: scroll;
`;

export default ModalFilters;
