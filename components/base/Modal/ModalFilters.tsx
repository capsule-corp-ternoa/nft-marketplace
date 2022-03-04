import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import ClickAwayListener from 'react-click-away-listener'
import styled from 'styled-components'

import { getNFTs, getTotalFilteredNFTsOnMarketplace } from 'actions/nft'
import { FilterCategories, FilterCreationDate, FilterPrice, FilterTypeSales } from 'components/base/Filters'
import { FilterClearCta, FilterCtasContainer } from 'components/layout'
import Button from 'components/ui/Button'
import Icon from 'components/ui/Icon'
import Select from 'components/ui/Select'
import { NFTDataNominalSetState } from 'interfaces'
import { AllFilterIdsTypes, FiltersType, FiltersSortNominalSetState } from 'interfaces/filters'
import { ALL_FILTER_IDS, CATEGORIES_FILTER, CREATION_DATE_FILTER, PRICE_FILTER, SALE_TYPE_FILTER } from 'utils/constant'

// TODO: add type of sales filter when auction are implemented
const getFilterQuery = (currentFilter: AllFilterIdsTypes, filterValues: FiltersType): string | undefined => {
  switch (currentFilter) {
    case PRICE_FILTER: {
      const [minPrice, maxPrice] = filterValues[PRICE_FILTER] ?? [0, 0]
      return `filter=${currentFilter}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    }
    case CREATION_DATE_FILTER: {
      const [startDate, endDate] = filterValues[CREATION_DATE_FILTER] ?? ['', '']
      return [
        `filter=${currentFilter}`,
        startDate !== '' && `startDate=${startDate}`,
        endDate !== '' && `endDate=${endDate}`,
      ]
        .filter((item) => item)
        .join('&')
    }
    case CATEGORIES_FILTER: {
      const categories = filterValues[CATEGORIES_FILTER] ?? []
      return `filter=${currentFilter}&codes=[${categories.map(({ code }) => `"${code}"`).join(',')}]`
    }
    default:
      return undefined
  }
}

interface ModalFiltersProps {
  filters: FiltersType
  handleClearFilter: () => void
  setData: NFTDataNominalSetState
  setDataHasNextPage: (b: boolean) => void
  setDataCurrentPage: (n: number) => void
  setDataIsLoading: (b: boolean) => void
  setDataTotalCount: (n: number) => void
  setError: (s: string) => void
  setIsExpanded: (b: boolean) => void
  setFilters: FiltersSortNominalSetState
}

const ModalFilters = ({
  filters,
  handleClearFilter,
  setData,
  setDataHasNextPage,
  setDataCurrentPage,
  setDataIsLoading,
  setDataTotalCount,
  setError,
  setIsExpanded,
  setFilters,
}: ModalFiltersProps) => {
  const router = useRouter()
  const [currentFilter, setCurrentFilter] = useState<AllFilterIdsTypes>(
    (Object.keys(filters) as Array<AllFilterIdsTypes>).find(
      (key) => ALL_FILTER_IDS.includes(key) && filters[key] !== null
    ) ?? PRICE_FILTER
  )

  const categoryCodes = filters[CATEGORIES_FILTER]?.map(({ code }) => code)
  const [startDateRange, endDateRange] = filters[CREATION_DATE_FILTER] ?? ['', '']
  const [minPrice, maxPrice] = filters[PRICE_FILTER] ?? [0, 0]

  const isValidData =
    Number(minPrice) >= 0 && Number(minPrice) < 1e16 && Number(maxPrice) >= 0 && Number(maxPrice) < 1e16

  const submit = async () => {
    const query = getFilterQuery(currentFilter, filters)
    setDataIsLoading(true)
    setIsExpanded(false)
    try {
      const filterOptions = {
        categories: categoryCodes !== undefined && categoryCodes.length > 0 ? categoryCodes : undefined,
        listed: true,
        priceStartRange: minPrice > 0 ? minPrice : undefined,
        priceEndRange: maxPrice > 0 ? maxPrice : undefined,
        timestampCreateStartRange: dayjs(new Date(startDateRange)).isValid() ? new Date(startDateRange) : undefined,
        timestampCreateEndRange: dayjs(new Date(endDateRange)).isValid() ? new Date(endDateRange) : undefined,
      }

      const { data, hasNextPage } = (await getNFTs('1', undefined, filterOptions, undefined, true)) ?? {
        data: [],
        hasNextPage: false,
      }
      const newTotalCount = (await getTotalFilteredNFTsOnMarketplace(filterOptions, true)) ?? 0

      if (query !== undefined) router.push({ pathname: router.pathname, query }, undefined, { shallow: true })
      setDataTotalCount(newTotalCount)
      setDataCurrentPage(1)
      setDataHasNextPage(hasNextPage ?? false)
      setData(data)
      setError('')
      setDataIsLoading(false)
    } catch (error) {
      console.log(error)
      setError('Unable to filter, please try again')
      setDataIsLoading(false)
    }
  }

  return (
    <SModalBackground>
      <ClickAwayListener
        onClickAway={() => {
          setIsExpanded(false)
        }}
      >
        <SModalContainer>
          <SCloseIcon onClick={() => setIsExpanded(false)}>
            <Icon name="close" />
          </SCloseIcon>
          <STopContainer>
            <STitle>Filter</STitle>
            <Select color="invertedContrast" text={currentFilter}>
              {(setSelectExpanded) => (
                <>
                  {ALL_FILTER_IDS.map(
                    (filter, id) =>
                      filter !== currentFilter && (
                        <li
                          key={id}
                          onClick={() => {
                            setSelectExpanded(false)
                            setCurrentFilter(filter)
                          }}
                        >
                          {filter}
                        </li>
                      )
                  )}
                </>
              )}
            </Select>
          </STopContainer>

          <div>
            {currentFilter === CREATION_DATE_FILTER && (
              <FilterCreationDate setFilters={setFilters} value={filters[CREATION_DATE_FILTER]} />
            )}
            {currentFilter === PRICE_FILTER && <FilterPrice setFilters={setFilters} value={filters[PRICE_FILTER]} />}
            {currentFilter === SALE_TYPE_FILTER && <FilterTypeSales />}
            {currentFilter === CATEGORIES_FILTER && (
              <FilterCategories setFilters={setFilters} value={filters[CATEGORIES_FILTER]} />
            )}
          </div>
          <FilterCtasContainer>
            <FilterClearCta onClick={handleClearFilter}>Clear filter</FilterClearCta>
            <Button
              color="primary500"
              disabled={!isValidData}
              onClick={submit}
              size="small"
              text="Show related NFTs"
              variant="contained"
            />
          </FilterCtasContainer>
        </SModalContainer>
      </ClickAwayListener>
    </SModalBackground>
  )
}

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
`

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
`

const SModalContainer = styled.div`
  width: 340px;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 56rem;
    padding: 4rem 4rem;
  }
`

const STopContainer = styled.div`
  padding-bottom: 2.4rem;

  button,
  ul {
    max-width: 24rem;
    left: 41%;
  }

  button,
  li {
    text-transform: none;
  }

  li {
    color: ${({ theme }) => theme.colors.contrast};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;

    ul {
      left: 50%;
    }

    > * {
      &:not(:first-child) {
        margin-left: 1.6rem;
      }
    }
  }
`

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin: 0;
  margin-bottom: 0.4rem;
`

export default ModalFilters
