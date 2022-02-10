import React from 'react';
import styled from 'styled-components';

import Select from 'components/ui/Select';

import { FilterTitle, FilterSubtitle } from 'components/layout';

interface SortPopularityProps {}

const SortPopularity = ({}: SortPopularityProps) => {
  return (
    <div>
      <FilterTitle>Popularity</FilterTitle>
      <SFilterSubtitle>Sort NFTs based on popularity criteria</SFilterSubtitle>
      <SSortContainer>
        <Select color="invertedContrast" text="Most viewed">
          {(setSelectExpanded) => (
            <>
              <li
                onClick={() => {
                  setSelectExpanded(false);
                }}
              >
                Most liked
              </li>
              <li
                onClick={() => {
                  setSelectExpanded(false);
                }}
              >
                Most viewed
              </li>
              <li
                onClick={() => {
                  setSelectExpanded(false);
                }}
              >
                Best sellers
              </li>
            </>
          )}
        </Select>
      </SSortContainer>
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
