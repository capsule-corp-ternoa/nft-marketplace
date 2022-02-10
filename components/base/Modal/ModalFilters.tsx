import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';

import { FilterCategories, FilterTypeSales } from 'components/base/FiltersSort';
import { CATEGORIES_FILTER, DataNominalSetState, FiltersType, FiltersSortNominalSetState, PRICE_FILTER, SALE_TYPE_FILTER } from 'components/pages/Explore';
import Icon from 'components/ui/Icon';
import Select from 'components/ui/Select';

interface ModalFiltersProps {
  filters: FiltersType;
  setData: DataNominalSetState;
  setDataHasNextPage: (b: boolean) => void;
  setDataCurrentPage: (n: number) => void;
  setDataIsLoading: (b: boolean) => void;
  setIsExpanded: (b: boolean) => void;
  setFilters: FiltersSortNominalSetState;
}

const ModalFilters = ({ filters, setData, setDataHasNextPage, setDataCurrentPage, setDataIsLoading, setIsExpanded, setFilters }: ModalFiltersProps) => {
  const [currentFilter, setCurrentFilter] = useState(CATEGORIES_FILTER);

  return (
    <SModalBackground>
      <ClickAwayListener
        onClickAway={() => {
          setIsExpanded(false);
        }}
      >
        <SModalContainer>
          <SCloseIcon onClick={() => setIsExpanded(false)}>
            <Icon name="close" />
          </SCloseIcon>
          <STopContainer>
            <STitle>Filter</STitle>
            <Select color="invertedContrast" text={currentFilter}>
              {(setSelectExpanded) => (
                <>
                  {[CATEGORIES_FILTER, PRICE_FILTER, SALE_TYPE_FILTER].map(
                    (filter, id) =>
                      filter !== currentFilter && (
                        <li
                          key={id}
                          onClick={() => {
                            setSelectExpanded(false);
                            setCurrentFilter(filter);
                          }}
                        >
                          {filter}
                        </li>
                      )
                  )}
                </>
              )}
            </Select>
          </STopContainer>

          <div>
            {currentFilter === CATEGORIES_FILTER && (
              <FilterCategories
                setData={setData}
                setDataHasNextPage={setDataHasNextPage}
                setDataCurrentPage={setDataCurrentPage}
                setDataIsLoading={setDataIsLoading}
                setIsModalExpanded={setIsExpanded}
                setFilters={setFilters}
                value={filters[CATEGORIES_FILTER]}
              />
            )}
            {currentFilter === SALE_TYPE_FILTER && <FilterTypeSales />}
          </div>
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
  overflow-y: hidden;
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

const STopContainer = styled.div`
  padding-bottom: 2.4rem;

  button,
  ul {
    max-width: 20rem;
    left: 34%;
  }

  button,
  li {
    text-transform: none;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;

    ul {
      left: 44%;
    }

    > * {
      &:not(:first-child) {
        margin-left: 1.6rem;
      }
    }
  }
`;

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin: 0;
  margin-bottom: 0.4rem;
`;

export default ModalFilters;
