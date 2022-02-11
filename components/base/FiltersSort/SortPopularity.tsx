import React from 'react';
import styled from 'styled-components';

import Select from 'components/ui/Select';

import { getBestSellers, getMostLikedNFTs, getMostViewedNFTs } from 'actions/nft';
import {
  DataNominalSetState,
  FiltersSortDefaultState,
  FiltersSortNominalSetState,
  SortTypesType,
  MOST_LIKED_SORT,
  MOST_VIEWED_SORT,
  BEST_SELLER_SORT,
} from 'components/pages/Explore';
import { FilterClearCta, FilterCtasContainer, FilterTitle, FilterSubtitle } from 'components/layout';
import { CustomResponse, NftType } from 'interfaces';

const sortTypes = [MOST_LIKED_SORT, MOST_VIEWED_SORT, BEST_SELLER_SORT] as const;
type SortTypesIdsTypes = typeof sortTypes[number];

interface SortPopularityProps {
  handleClearSort: () => void;
  setData: DataNominalSetState;
  setDataHasNextPage: (b: boolean) => void;
  setDataCurrentPage: (n: number) => void;
  setDataIsLoading: (b: boolean) => void;
  setIsModalExpanded: (b: boolean) => void;
  setSort: FiltersSortNominalSetState;
  sort: SortTypesType;
}

const SortPopularity = ({
  handleClearSort,
  setData,
  setDataHasNextPage,
  setDataCurrentPage,
  setDataIsLoading,
  setIsModalExpanded,
  setSort,
  sort,
}: SortPopularityProps) => {
  const currentSort = Object.keys(sort).find((key) => sort[key as SortTypesIdsTypes] !== null);

  const toggleSort = async (sort: SortTypesIdsTypes | null) => {
    if (sort === null) {
      handleClearSort();
    } else {
      setDataIsLoading(true);
      setIsModalExpanded(false);
      setSort({ ...FiltersSortDefaultState, [sort]: true });

      try {
        let res: CustomResponse<NftType> = { data: [], hasNextPage: false, hasPreviousPage: false };

        if (sort === MOST_LIKED_SORT) {
          res = await getMostLikedNFTs();
        } else if (sort === MOST_VIEWED_SORT) {
          res = await getMostViewedNFTs();
        } else {
          res = await getBestSellers();
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
      <FilterTitle>Popularity</FilterTitle>
      <SFilterSubtitle>Sort NFTs based on popularity criteria</SFilterSubtitle>
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

export default SortPopularity;
