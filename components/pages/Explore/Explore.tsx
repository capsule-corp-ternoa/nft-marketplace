import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { getNFTs, getTotalOnSaleOnMarketplace } from 'actions/nft'
import { ModalFilters, ModalSort } from 'components/base/Modal'
import NftsGrid from 'components/base/NftsGrid'
import Button from 'components/ui/Button'
import Chip from 'components/ui/Chip'
import { Container, Title, Wrapper } from 'components/layout'
import { EXPLORE_TAB } from 'components/pages/Profile'
import { CustomResponse, NftType } from 'interfaces'
import { AllFilterIdsTypes, AllSortIdsType, FiltersType, SortTypesType } from 'interfaces/filters'
import {
  FILTERS_SORT_RESET_STATE,
  CATEGORIES_FILTER,
  CREATION_DATE_FILTER,
  PRICE_FILTER,
  ALL_FILTER_IDS,
  ALL_SORT_IDS,
} from 'utils/constant'
import { emojiMapping, sortPromiseMapping } from 'utils/functions'
import { decodeFilterQuery, formatPrice } from 'utils/strings'

const getFilteredNfts = (
  filtersSort: FiltersType & SortTypesType,
  currentPage: number
): Promise<CustomResponse<NftType>> => {
  const categoryCodes = filtersSort[CATEGORIES_FILTER]?.map(({ code }) => code)
  const [startDateRange, endDateRange] = filtersSort[CREATION_DATE_FILTER] ?? ['', '']
  const [minPrice, maxPrice] = filtersSort[PRICE_FILTER] ?? [0, 0]

  return getNFTs(
    (currentPage + 1).toString(),
    undefined,
    {
      categories: categoryCodes !== undefined && categoryCodes.length > 0 ? categoryCodes : undefined,
      listed: true,
      priceStartRange: minPrice > 0 ? minPrice : undefined,
      priceEndRange: maxPrice > 0 ? maxPrice : undefined,
      timestampCreateStartRange: dayjs(new Date(startDateRange)).isValid() ? new Date(startDateRange) : undefined,
      timestampCreateEndRange: dayjs(new Date(endDateRange)).isValid() ? new Date(endDateRange) : undefined,
    },
    undefined,
    true
  )
}

const getFilterValueWording = (
  currentFilter: AllFilterIdsTypes | undefined,
  filtersSort: FiltersType & SortTypesType
) => {
  switch (currentFilter) {
    case PRICE_FILTER: {
      const [minPrice, maxPrice] = filtersSort[PRICE_FILTER] ?? [0, 0]
      return [
        minPrice > 0 && `min: ${formatPrice(minPrice, {})} CAPS`,
        maxPrice > 0 && `max: ${formatPrice(maxPrice, {})} CAPS`,
      ]
        .filter((item) => item)
        .join(' - ')
    }
    case CREATION_DATE_FILTER: {
      const [startDate, endDate] = filtersSort[CREATION_DATE_FILTER] ?? ['', '']
      return [
        startDate !== '' && `after: ${dayjs(new Date(startDate)).format('MMM D, YYYY')}`,
        endDate !== '' && `before: ${dayjs(new Date(endDate)).format('MMM D, YYYY')}`,
      ]
        .filter((item) => item)
        .join(' - ')
    }
    case CATEGORIES_FILTER: {
      const categories = filtersSort[CATEGORIES_FILTER] ?? []
      return (
        categories
          // Categories with related emoji are displayed first
          .sort((a, b) => {
            const aBit = emojiMapping(a.code) === undefined ? 1 : 0
            const bBit = emojiMapping(b.code) === undefined ? 1 : 0
            return aBit - bBit
          })
          .map(({ code, name }) => (emojiMapping(code) !== undefined ? `${emojiMapping(code)} ${name}` : name))
          .join(' - ')
      )
    }
    default:
      return undefined
  }
}

export interface ExploreProps {
  NFTs: NftType[]
  hasNextPage: boolean
  totalCount?: number
}

const Explore: React.FC<ExploreProps> = ({ NFTs, hasNextPage, totalCount }) => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [filtersSort, setFiltersSort] = useState<FiltersType & SortTypesType>({
    ...FILTERS_SORT_RESET_STATE,
    ...decodeFilterQuery(router.query),
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [dataNfts, setDataNfts] = useState(NFTs)
  const [dataNftsHasNextPage, setDataNftsHasNextPage] = useState(hasNextPage)
  const [dataTotalCount, setDataTotalCount] = useState(totalCount ?? 0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false)
  const [isModalFiltersExpanded, setIsModalFiltersExpanded] = useState(false)
  const [isModalSortExpanded, setIsModalSortExpanded] = useState(false)

  const currentFilter = (Object.keys(filtersSort) as Array<AllFilterIdsTypes>).find(
    (key) => ALL_FILTER_IDS.includes(key) && filtersSort[key] !== null
  )
  const currentSort = (Object.keys(filtersSort) as Array<AllSortIdsType>).find(
    (key) => ALL_SORT_IDS.includes(key) && filtersSort[key] !== null
  )
  const currentFilterValueWording = getFilterValueWording(currentFilter, filtersSort)

  const toggleModalFiltersExpanded = () => {
    setIsModalFiltersExpanded((prevState) => !prevState)
  }

  const toggleModalSortExpanded = () => {
    setIsModalSortExpanded((prevState) => !prevState)
  }

  const loadMoreNfts = async () => {
    setIsLoadMoreLoading(true)
    try {
      if (dataNftsHasNextPage) {
        const promise = sortPromiseMapping(filtersSort, currentPage) ?? getFilteredNfts(filtersSort, currentPage)
        const { data, hasNextPage } = (await promise) ?? { data: [], hasNextPage: false }
        setCurrentPage((prevCount) => prevCount + 1)
        setDataNftsHasNextPage(hasNextPage)
        setDataNfts((prevState) => prevState.concat(data))
        setIsLoadMoreLoading(false)
      }
    } catch (err) {
      console.log(err)
      setIsLoadMoreLoading(false)
    }
  }

  const handleClear = async () => {
    setFiltersSort(FILTERS_SORT_RESET_STATE)
    setIsLoading(true)
    setIsModalFiltersExpanded(false)
    setIsModalSortExpanded(false)
    try {
      const { data, hasNextPage } = (await getNFTs('1', undefined, { listed: true }, undefined, true)) ?? {
        data: [],
        hasNextPage: false,
      }
      const newTotalCount = (await getTotalOnSaleOnMarketplace()) ?? 0

      router.push({ pathname: router.pathname, query: undefined }, undefined, { shallow: true })
      setDataTotalCount(newTotalCount)
      setCurrentPage(1)
      setDataNftsHasNextPage(hasNextPage ?? false)
      setDataNfts(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let shouldUpdate = true
    const getQueryFiltersSort = async () => {
      if (Object.keys(router.query).includes('filter')) {
        const newFilter = await decodeFilterQuery(router.query)
        if (shouldUpdate) setFiltersSort((prevState) => ({ ...prevState, ...newFilter }))
      } else if (typeof router.query.sort === 'string' && ALL_SORT_IDS.includes(router.query.sort as AllSortIdsType)) {
        if (shouldUpdate) setFiltersSort((prevState) => ({ ...prevState, [router.query.sort as AllSortIdsType]: true }))
      }
    }

    if (router.query) getQueryFiltersSort()
    return () => {
      shouldUpdate = false
    }
  }, [router.query])

  return (
    <>
      <Container>
        <Wrapper>
          <STopContainer>
            <STitleContainer>
              <STitle>Explore</STitle>
              {!isLoading && dataTotalCount > 0 && router.query.sort === undefined && (
                <STotalInsight>{`${dataTotalCount} NFTs to discover`}</STotalInsight>
              )}
            </STitleContainer>
            <SFiltersButtonContainer>
              <SSortButton onClick={toggleModalSortExpanded}>
                <SSortButtonWording>Sort</SSortButtonWording>
                {currentSort !== undefined && (
                  <>
                    <span>:</span>
                    <SCurrentSortLabel>{currentSort}</SCurrentSortLabel>
                  </>
                )}
              </SSortButton>
              <Button
                color="primary500"
                icon="filters"
                onClick={toggleModalFiltersExpanded}
                size="medium"
                text="Filters"
                variant="contained"
              />
            </SFiltersButtonContainer>
          </STopContainer>
          {error === '' &&
            currentFilterValueWording !== undefined &&
            currentFilterValueWording !== '' &&
            isModalFiltersExpanded === false && (
              <SCurrentFiltersWrapper>
                <SCurrentFilterLabel>
                  Filtered<SCurrentSortLabel>{currentFilter}</SCurrentSortLabel>:
                </SCurrentFilterLabel>
                <SChip
                  color="invertedContrast"
                  isDeletable
                  onDelete={handleClear}
                  size="medium"
                  text={currentFilterValueWording}
                  variant="rectangle"
                />
              </SCurrentFiltersWrapper>
            )}
          {error !== '' && <SErrorLabel>{error}</SErrorLabel>}
          <NftsGrid
            NFTs={dataNfts}
            isLoading={isLoading}
            isLoadMoreLoading={isLoadMoreLoading}
            isLoadMore={dataNftsHasNextPage}
            loadMore={loadMoreNfts}
            noNftBody={
              <>
                Come later to discover new NFTs.
                <br />
                <br />
                Thanks !
              </>
            }
            noNftTitle="All NFTs are sold !"
            tabId={EXPLORE_TAB}
          />
        </Wrapper>
      </Container>
      {isModalSortExpanded && (
        <ModalSort
          handleClearSort={handleClear}
          setData={setDataNfts}
          setDataHasNextPage={setDataNftsHasNextPage}
          setDataCurrentPage={setCurrentPage}
          setDataIsLoading={setIsLoading}
          setError={setError}
          setIsExpanded={setIsModalSortExpanded}
          setSort={setFiltersSort}
          sort={filtersSort}
        />
      )}
      {isModalFiltersExpanded && (
        <ModalFilters
          filters={filtersSort}
          handleClearFilter={handleClear}
          setData={setDataNfts}
          setDataHasNextPage={setDataNftsHasNextPage}
          setDataCurrentPage={setCurrentPage}
          setDataIsLoading={setIsLoading}
          setDataTotalCount={setDataTotalCount}
          setError={setError}
          setIsExpanded={setIsModalFiltersExpanded}
          setFilters={setFiltersSort}
        />
      )}
    </>
  )
}

const STopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`

const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    align-items: baseline;
  }
`

const STitle = styled(Title)`
  font-size: 3.2rem;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 4.8rem;
    margin: 0 auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 4.8rem;
    margin: 0;
  }
`

const STotalInsight = styled.span`
  color: ${({ theme }) => theme.colors.neutral300};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 0.8rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 0;
    margin-left: 1.6rem;
  }
`

const SFiltersButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 2.4rem;

  > * {
    &:not(:first-child) {
      margin-top: 0.8rem;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;

    > * {
      &:not(:first-child) {
        margin-left: 1.6rem;
        margin-top: 0;
      }
    }
  }
`

const SSortButton = styled.button`
  cursor: pointer;
`

const SSortButtonWording = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  text-decoration-line: underline;
`

const SCurrentFilterLabel = styled.span`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
`

const SCurrentSortLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary500};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-left: 0.8rem;
`

const SCurrentFiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`

const SChip = styled(Chip)`
  > div {
    white-space: break-spaces;
    text-align: center;
  }
`

const SErrorLabel = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.danger500};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  margin-top: 1.6rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
  }
`

export default Explore
