import React from 'react';
import styled from 'styled-components';

import { getNFTs } from 'actions/nft';
import { FilterTitle, FilterSubtitle, FilterClearCta, FilterCtasContainer } from 'components/layout';
import { DataNominalSetState, FiltersSortNominalSetState, FiltersSortDefaultState, PRICE_FILTER } from 'components/pages/Explore';
import { Input } from 'components/ui/Input';
import Button from 'components/ui/Button';

interface FilterPriceProps {
  handleClearFilter: () => void;
  setData: DataNominalSetState;
  setDataHasNextPage: (b: boolean) => void;
  setDataCurrentPage: (n: number) => void;
  setDataIsLoading: (b: boolean) => void;
  setFilters: FiltersSortNominalSetState;
  setIsModalExpanded: (b: boolean) => void;
  value: [number | undefined, number | undefined];
}

const FilterPrice = ({
  handleClearFilter,
  setData,
  setDataHasNextPage,
  setDataCurrentPage,
  setDataIsLoading,
  setFilters,
  setIsModalExpanded,
  value,
}: FilterPriceProps) => {
  const validateValue = (value?: number) => {
    if (value === undefined) return true;
    return Number(value) >= 0 && Number(value) < 1e16;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => {
      const [prevMin, prevMax] = prevState[PRICE_FILTER];
      console.log({ prevMin, prevMax });
      if (e.target.name === 'startPrice') return { ...FiltersSortDefaultState, [PRICE_FILTER]: [Number(e.target.value), prevMax] };

      return { ...FiltersSortDefaultState, [PRICE_FILTER]: [prevMin, Number(e.target.value)] };
    });
  };

  const submit = async () => {
    setDataIsLoading(true);
    setIsModalExpanded(false);
    try {
      const { data, hasNextPage } = (await getNFTs('1', undefined, {
        listed: true,
        priceStartRange: value[0] && value[0] > 0 ? value[0] : undefined,
        priceEndRange: value[1] && value[1] > 0 ? value[1] : undefined,
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
    <div>
      <FilterTitle>Price</FilterTitle>
      <SFilterSubtitle>Filter your search according to your budget</SFilterSubtitle>
      <SPriceContainer>
        <Input isError={!validateValue(value[0])} name="startPrice" onChange={handleChange} placeholder="Minimum price" value={Number(value[0]) || undefined} />
        <SSeparator />
        <Input isError={!validateValue(value[1])} name="endPrice" onChange={handleChange} placeholder="Maximum price" value={Number(value[1]) || undefined} />
      </SPriceContainer>
      <FilterCtasContainer>
        <FilterClearCta onClick={handleClearFilter}>Clear filter</FilterClearCta>
        <Button color="primary500" onClick={submit} size="small" text="Show related NFTs" variant="contained" />
      </FilterCtasContainer>
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
