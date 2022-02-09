import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getCategories } from 'actions/category';
import { FilterCointainer, FilterTitle, FilterSubtitle } from 'components/layout';
import { FiltersType, CATEGORIES_FILTER } from 'components/pages/Explore';
import Button from 'components/ui/Button';
import { CategoryType } from 'interfaces';

type FiltersNominalSetState = React.Dispatch<React.SetStateAction<FiltersType>>;

interface FilterCategoriesProps {
  categoriesFiltered?: string[];
  setFilters: FiltersNominalSetState;
}

const FilterCategories = ({ categoriesFiltered, setFilters }: FilterCategoriesProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const toggleCategory = (code: string) => {
    setFilters((prevState) => {
      const prevCategoriesFiltered = prevState[CATEGORIES_FILTER];
      if (prevCategoriesFiltered === undefined) {
        return { ...prevState, [CATEGORIES_FILTER]: [code] };
      }

      const categoryIdx = prevCategoriesFiltered.findIndex((item) => item === code);
      if (categoryIdx < 0) {
        return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.concat(code) };
      }

      return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.filter((item) => item !== code) };
    });
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
    return () => {
      setCategories([]);
    };
  }, []);

  return (
    <FilterCointainer>
      <FilterTitle>Categories</FilterTitle>
      <SFilterSubtitle>Filter your search according to your favorites categories</SFilterSubtitle>
      <SCategoriesContainer>
        {categories.map(({ _id, code, name }) => {
          const isActive = categoriesFiltered?.some((item) => item === code);
          return (
            <Button
              key={_id}
              color={isActive ? 'primary500' : 'invertedContrast'}
              onClick={() => toggleCategory(code)}
              size="small"
              text={name}
              variant={isActive ? 'contained' : 'outlined'}
            />
          );
        })}
      </SCategoriesContainer>
    </FilterCointainer>
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
`;

export default FilterCategories;
