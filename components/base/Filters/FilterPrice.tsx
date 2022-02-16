import React from 'react';
import styled from 'styled-components';

import { FilterTitle, FilterSubtitle } from 'components/layout';
import { FiltersSortDefaultState, FiltersSortNominalSetState, PRICE_FILTER } from 'components/pages/Explore';
import { Input } from 'components/ui/Input';

interface FilterPriceProps {
  setFilters: FiltersSortNominalSetState;
  value: number[] | null;
}

const FilterPrice = ({ setFilters, value }: FilterPriceProps) => {
  const [minPrice, maxPrice] = value ?? [0, 0];

  const validateValue = (value?: number) => {
    if (value === undefined) return true;
    return Number(value) >= 0 && Number(value) < 1e16;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => {
      const [prevMin, prevMax] = prevState[PRICE_FILTER] ?? [0, 0];
      if (e.target.name === 'startPrice') return { ...FiltersSortDefaultState, [PRICE_FILTER]: [Number(e.target.value), prevMax] };

      return { ...FiltersSortDefaultState, [PRICE_FILTER]: [prevMin, Number(e.target.value)] };
    });
  };

  return (
    <div>
      <FilterTitle>Price (CAPS)</FilterTitle>
      <SFilterSubtitle>Filter your search according to your budget</SFilterSubtitle>
      <SPriceContainer>
        <Input
          isError={!validateValue(minPrice)}
          name="startPrice"
          onChange={handleChange}
          placeholder={minPrice > 0 ? `${minPrice}` : 'Minimum price'}
          type="number"
        />
        <SSeparator />
        <Input
          isError={!validateValue(maxPrice)}
          name="endPrice"
          onChange={handleChange}
          placeholder={maxPrice > 0 ? `${maxPrice}` : 'Maximum price'}
          type="number"
        />
      </SPriceContainer>
    </div>
  );
};

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`;

const SPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-top: 1.6rem;
`;

const SSeparator = styled.div`
  width: 26px;
  height: 2px;
  background: ${({ theme }) => theme.colors.neutral200};
`;

export default FilterPrice;
