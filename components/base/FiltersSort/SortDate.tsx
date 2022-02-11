import React from 'react';
import styled from 'styled-components';

import { getNFTs } from 'actions/nft';
import {
  DataNominalSetState,
  DATE_OLDEST_SORT,
  DATE_RECENT_SORT,
  FiltersSortDefaultState,
  FiltersSortNominalSetState,
  SortTypesType,
} from 'components/pages/Explore';
import { FilterClearCta, FilterCtasContainer, FilterTitle, FilterSubtitle } from 'components/layout';
import Select from 'components/ui/Select';
import { CustomResponse, NftType } from 'interfaces';
import { SORT_OPTION_TIMESTAMP_CREATE_ASC, SORT_OPTION_TIMESTAMP_CREATE_DESC } from "utils/constant";

const sortTypes = [DATE_OLDEST_SORT, DATE_RECENT_SORT] as const;
type SortTypesIdsTypes = typeof sortTypes[number];

interface SortDateProps {
  handleClearSort: () => void;
  setData: DataNominalSetState;
  setDataHasNextPage: (b: boolean) => void;
  setDataCurrentPage: (n: number) => void;
  setDataIsLoading: (b: boolean) => void;
  setIsModalExpanded: (b: boolean) => void;
  setSort: FiltersSortNominalSetState;
  sort: SortTypesType;
}

const SortDate = ({ handleClearSort, setData, setDataHasNextPage, setDataCurrentPage, setDataIsLoading, setIsModalExpanded, setSort, sort }: SortDateProps) => {
  const currentSort = (Object.keys(sort) as Array<keyof typeof sort>).find((key) => sortTypes.includes(key as SortTypesIdsTypes) && sort[key] !== null);

  const toggleSort = async (sort: SortTypesIdsTypes | null) => {
    if (sort === null) {
      handleClearSort();
    } else {
      setDataIsLoading(true);
      setIsModalExpanded(false);
      setSort({ ...FiltersSortDefaultState, [sort]: true });

      try {
        let res: CustomResponse<NftType> = { data: [], hasNextPage: false, hasPreviousPage: false };

        if (sort === DATE_OLDEST_SORT) {
          res = await getNFTs(undefined, '1', undefined, SORT_OPTION_TIMESTAMP_CREATE_ASC, true);
        } else {
          res = await getNFTs(undefined, '1', undefined, SORT_OPTION_TIMESTAMP_CREATE_DESC, true);
        }

        setDataCurrentPage(1);
        setDataHasNextPage(res.hasNextPage ?? false);
        setData(res.data);
        setDataIsLoading(false);
      } catch (error) {
        console.log(error);
        setDataIsLoading(false);
      }
    }
  };

  return (
    <div>
      <FilterTitle>Date</FilterTitle>
      <SFilterSubtitle>Sort NFTs based on theirs creation date</SFilterSubtitle>
      <SSortContainer>
        <Select color="invertedContrast" text={currentSort ?? '-'}>
          {(setSelectExpanded) => (
            <>
              {currentSort !== undefined && (
                <li
                  onClick={() => {
                    setSelectExpanded(false);
                    toggleSort(null);
                  }}
                >
                  -
                </li>
              )}
              {sortTypes.map(
                (sort, id) =>
                  sort !== currentSort && (
                    <li
                      key={id}
                      onClick={() => {
                        setSelectExpanded(false);
                        toggleSort(sort);
                      }}
                    >
                      {sort}
                    </li>
                  )
              )}
            </>
          )}
        </Select>
      </SSortContainer>
      <FilterCtasContainer>
        <FilterClearCta onClick={handleClearSort}>Clear sort</FilterClearCta>
      </FilterCtasContainer>
    </div>
  );
};

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`;

const SSortContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;
`;

export default SortDate;
