import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getCategories } from 'actions/category';
import { getNFTs } from 'actions/nft';
import { FilterTitle, FilterSubtitle, FilterClearCta, FilterCtasContainer } from 'components/layout';
import { DataNominalSetState, FiltersSortNominalSetState, FiltersSortDefaultState, CATEGORIES_FILTER } from 'components/pages/Explore';
import Button from 'components/ui/Button';
import { CategoryType } from 'interfaces';
import { emojiMapping } from 'utils/functions';

interface FilterCategoriesProps {
  setData: DataNominalSetState;
  setDataHasNextPage: (b: boolean) => void;
  setDataCurrentPage: (n: number) => void;
  setDataIsLoading: (b: boolean) => void;
  setFilters: FiltersSortNominalSetState;
  setIsModalExpanded: (b: boolean) => void;
  value: string[] | null;
}

const FilterCategories = ({ setData, setDataHasNextPage, setDataCurrentPage, setDataIsLoading, setFilters, setIsModalExpanded, value }: FilterCategoriesProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const toggleCategory = (code: string) => {
    setFilters((prevState) => {
      const prevCategoriesFiltered = prevState[CATEGORIES_FILTER];
      if (prevCategoriesFiltered === null) {
        return { ...FiltersSortDefaultState, [CATEGORIES_FILTER]: [code] };
      }

      const categoryIdx = prevCategoriesFiltered.findIndex((item) => item === code);
      if (categoryIdx < 0) {
        return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.concat(code) };
      }

      return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.filter((item) => item !== code) };
    });
  };

  const submit = async () => {
    const categoriesCodes = value !== null && value.length > 0 ? value : undefined;
    setDataIsLoading(true);
    setIsModalExpanded(false);
    try {
      const { data, hasNextPage } = (await getNFTs(categoriesCodes, '1', undefined, true)) ?? { data: [], hasNextPage: false };
      setDataCurrentPage(1);
      setDataHasNextPage(hasNextPage ?? false);
      setData(data);
      setDataIsLoading(false);
    } catch (error) {
      console.log(error);
      setDataIsLoading(false);
    }
  };

  const handleClearFilter = async () => {
    setFilters(FiltersSortDefaultState);
    setDataIsLoading(true);
    setIsModalExpanded(false);
    try {
      const { data, hasNextPage } = (await getNFTs(undefined, '1', undefined, true, true)) ?? { data: [], hasNextPage: false };
      setDataCurrentPage(1);
      setDataHasNextPage(hasNextPage ?? false);
      setData(data);
      setDataIsLoading(false);
    } catch (error) {
      console.log(error);
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div>
      <FilterTitle>Categories</FilterTitle>
      <SFilterSubtitle>Filter your search according to your favorites categories</SFilterSubtitle>
      <SCategoriesContainer>
        {categories
          // Categories with related emoji are displayed first
          .sort((a, b) => {
            const aBit = emojiMapping(a.code) === undefined ? 1 : 0;
            const bBit = emojiMapping(b.code) === undefined ? 1 : 0;
            return aBit - bBit;
          })
          .map(({ _id, code, name }) => {
            const isActive = value?.some((item) => item === code) ?? false;
            return (
              <Button
                key={_id}
                color={isActive ? 'primary500' : 'invertedContrast'}
                emoji={emojiMapping(code)}
                onClick={() => toggleCategory(code)}
                size="small"
                text={name}
                variant={isActive ? 'contained' : 'outlined'}
              />
            );
          })}
      </SCategoriesContainer>
      <FilterCtasContainer>
        <FilterClearCta onClick={handleClearFilter}>
          Clear filter
        </FilterClearCta>
        <Button color="primary500" onClick={submit} size="small" text="Show related NFTs" variant="contained" />
      </FilterCtasContainer>
    </div>
  );
};

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`;

const SCategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;
  max-height: 12rem;
  overflow-y: auto;
`;

export default FilterCategories;
