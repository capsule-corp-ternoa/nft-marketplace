import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styled from 'styled-components';

import { getNFTs } from 'actions/nft';
import { FilterCategories, FilterPrice, FilterTypeSales } from 'components/base/Filters';
import { CATEGORIES_FILTER, DataNominalSetState, FiltersType, FiltersSortNominalSetState, PRICE_FILTER } from 'components/pages/Explore';
import { FilterClearCta, FilterCtasContainer } from 'components/layout';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';

interface ModalFiltersProps {
  filters: FiltersType;
  handleClearFilter: () => void;
  setData: DataNominalSetState;
  setDataHasNextPage: (b: boolean) => void;
  setDataCurrentPage: (n: number) => void;
  setDataIsLoading: (b: boolean) => void;
  setIsExpanded: (b: boolean) => void;
  setFilters: FiltersSortNominalSetState;
}

const ModalFilters = ({
  filters,
  handleClearFilter,
  setData,
  setDataHasNextPage,
  setDataCurrentPage,
  setDataIsLoading,
  setIsExpanded,
  setFilters,
}: ModalFiltersProps) => {
  const categoryCodes = filters[CATEGORIES_FILTER];
  const minPrice = filters[PRICE_FILTER][0];
  const maxPrice = filters[PRICE_FILTER][1];

  const isValidData = Number(minPrice) >= 0 && Number(minPrice) < 1e16 && Number(maxPrice) >= 0 && Number(maxPrice) < 1e16;

  const submit = async () => {
    setDataIsLoading(true);
    setIsExpanded(false);
    try {
      const { data, hasNextPage } = (await getNFTs('1', undefined, {
        categories: categoryCodes !== null && categoryCodes.length > 0 ? categoryCodes : undefined,
        listed: true,
        priceStartRange: minPrice > 0 ? minPrice : undefined,
        priceEndRange: maxPrice > 0 ? maxPrice : undefined,
      })) ?? {
        data: [],
        hasNextPage: false,
      };
      setDataCurrentPage(1);
      setDataHasNextPage(hasNextPage ?? false);
      setData(data);
      setDataIsLoading(false);
    } catch (error) {
      console.log(error);
      setDataIsLoading(false);
    }
  };

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
          <STitle>Filter</STitle>

          <SFiltersContainer>
            <FilterPrice setFilters={setFilters} value={filters[PRICE_FILTER]} />
            <FilterTypeSales />
            <FilterCategories setFilters={setFilters} value={categoryCodes} />
          </SFiltersContainer>
          <FilterCtasContainer>
            <FilterClearCta onClick={handleClearFilter}>Clear filter</FilterClearCta>
            <Button color="primary500" disabled={!isValidData} onClick={submit} size="small" text="Show related NFTs" variant="contained" />
          </FilterCtasContainer>
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

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin: 0;
  margin-bottom: 0.4rem;
`;

const SFiltersContainer = styled.div`
  overflow-y: scroll;

  > * {
    margin-right: 2.4rem;
    padding: 4rem 0;

    &:not(:last-child) {
      border-bottom: ${({ theme }) => `2px solid ${theme.colors.neutral200}`};
    }

    &:last-child {
      margin-bottom: 0;
    }
`;

export default ModalFilters;
