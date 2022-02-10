import React from 'react';
import styled from 'styled-components';

import Select from 'components/ui/Select';

import { FilterTitle, FilterSubtitle } from 'components/layout';

interface SortDateProps {}

const SortDate = ({}: SortDateProps) => {
  return (
    <div>
      <FilterTitle>Date</FilterTitle>
      <SFilterSubtitle>Sort NFTs based on theirs creation date</SFilterSubtitle>
      <SSortContainer>
        <Select color="invertedContrast" text="Oldest">
          {(setSelectExpanded) => (
            <>
              <li
                onClick={() => {
                  setSelectExpanded(false);
                }}
              >
                Oldest
              </li>
              <li
                onClick={() => {
                  setSelectExpanded(false);
                }}
              >
                Recently Created
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

export default SortDate;
