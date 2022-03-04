import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { FilterTitle, FilterSubtitle } from 'components/layout'
import { Input } from 'components/ui/Input'
import { FiltersSortNominalSetState } from 'interfaces/filters'
import { FILTERS_SORT_RESET_STATE, CREATION_DATE_FILTER } from 'utils/constant'

// TODO: Use mainnet date here
const TESTNET_DATE = '2021-10-01'

interface FilterCreationDateProps {
  setFilters: FiltersSortNominalSetState
  value: string[] | null
}

const FilterCreationDate = ({ setFilters, value }: FilterCreationDateProps) => {
  const [startDate, endDate] = value ?? ['', '']

  const getDate = (dateType: 'startDateRange' | 'endDateRange', value: string, prevDate?: string) => {
    const date = dayjs(new Date(value))

    switch (dateType) {
      case 'startDateRange': {
        let newStartDate = date
        if (prevDate !== undefined && date.isAfter(new Date(prevDate), 'day')) {
          newStartDate = dayjs(new Date(prevDate))
        }
        return newStartDate.toJSON()?.split('T')[0] || ''
      }
      case 'endDateRange': {
        let endDateRange = date
        if (prevDate !== undefined && date.isBefore(new Date(prevDate), 'day')) {
          endDateRange = dayjs(new Date(prevDate))
        }
        return endDateRange.toJSON()?.split('T')[0] || ''
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => {
      const [prevStartDate, prevEndDate] = prevState[CREATION_DATE_FILTER] ?? ['', '']
      if (e.target.name === 'startDateRange')
        return {
          ...FILTERS_SORT_RESET_STATE,
          [CREATION_DATE_FILTER]: [getDate('startDateRange', e.target.value, prevEndDate), prevEndDate],
        }

      return {
        ...FILTERS_SORT_RESET_STATE,
        [CREATION_DATE_FILTER]: [prevStartDate, getDate('endDateRange', e.target.value, prevStartDate)],
      }
    })
  }

  return (
    <div>
      <FilterTitle>Creation Date</FilterTitle>
      <SFilterSubtitle>Filter your search according creation dates</SFilterSubtitle>
      <SCreationDateContainer>
        <SInput
          name="startDateRange"
          onChange={handleChange}
          label="Start date"
          min={TESTNET_DATE}
          max={dayjs(new Date()).toJSON().split('T')[0]}
          type="date"
          value={startDate}
        />
        <SSeparator />
        <SInput
          name="endDateRange"
          onChange={handleChange}
          label="End date"
          min={TESTNET_DATE}
          max={dayjs(new Date()).toJSON().split('T')[0]}
          type="date"
          value={endDate}
        />
      </SCreationDateContainer>
    </div>
  )
}

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`

const SCreationDateContainer = styled.div`
  margin-top: 3.2rem;

  > * {
    &:not(:first-child) {
      margin-top: 1.6rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: flex-end;
    gap: 1.6rem;

    > * {
      &:not(:first-child) {
        margin-top: 0;
      }
    }
  }
`

const SSeparator = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 26px;
    height: 2px;
    background: ${({ theme }) => theme.colors.neutral200};
    margin-bottom: 2.4rem;
  }
`

const SInput = styled(Input)`
  h4 {
    color: ${({ theme }) => theme.colors.neutral500};
    font-family: ${({ theme }) => theme.fonts.light};
    font-size: 1.6rem;
  }
`

export default FilterCreationDate
