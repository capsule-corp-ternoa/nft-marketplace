import React from 'react'
import { useRouter } from 'next/router'
import ClickAwayListener from 'react-click-away-listener'
import styled from 'styled-components'

import { getNFTs, getMostLikedNFTs, getMostSoldNFTs, getMostSoldSeries, getMostViewedNFTs } from 'actions/nft'

import Icon from 'components/ui/Icon'
import Select from 'components/ui/Select'
import { FilterClearCta, FilterCtasContainer, FilterSubtitle } from 'components/layout'
import { CustomResponse, NFTDataNominalSetState, NftType } from 'interfaces'
import { AllSortIdsType, FiltersSortNominalSetState, SortTypesType } from 'interfaces/filters'
import {
  ALL_SORT_IDS,
  DATE_ASC_SORT,
  DATE_DESC_SORT,
  FILTERS_SORT_RESET_STATE,
  MOST_LIKED_SORT,
  MOST_SOLD_SORT,
  MOST_SOLD_SERIES_SORT,
  PRICE_ASC_SORT,
  PRICE_DESC_SORT,
  SORT_OPTION_PRICE_ASC,
  SORT_OPTION_PRICE_DESC,
  SORT_OPTION_TIMESTAMP_CREATE_ASC,
  SORT_OPTION_TIMESTAMP_CREATE_DESC,
} from 'utils/constant'

interface ModalSortProps {
  handleClearSort: () => void
  setData: NFTDataNominalSetState
  setDataHasNextPage: (b: boolean) => void
  setDataCurrentPage: (n: number) => void
  setDataIsLoading: (b: boolean) => void
  setError: (s: string) => void
  setIsExpanded: (b: boolean) => void
  setSort: FiltersSortNominalSetState
  sort: SortTypesType
}

const ModalSort = ({
  handleClearSort,
  setData,
  setDataHasNextPage,
  setDataCurrentPage,
  setDataIsLoading,
  setError,
  setIsExpanded,
  setSort,
  sort,
}: ModalSortProps) => {
  const router = useRouter()
  const currentSort = (Object.keys(sort) as Array<keyof typeof sort>).find(
    (key) => ALL_SORT_IDS.includes(key) && sort[key] !== null
  )

  const toggleSort = async (sort: AllSortIdsType | null) => {
    if (sort === null) {
      handleClearSort()
    } else {
      setDataIsLoading(true)
      setIsExpanded(false)
      setSort({ ...FILTERS_SORT_RESET_STATE, [sort]: true })

      try {
        let res: CustomResponse<NftType> = { data: [], hasNextPage: false, hasPreviousPage: false }

        if (sort === DATE_ASC_SORT) {
          res = await getNFTs('1', undefined, { listed: true }, SORT_OPTION_TIMESTAMP_CREATE_ASC, true)
        } else if (sort === DATE_DESC_SORT) {
          res = await getNFTs('1', undefined, { listed: true }, SORT_OPTION_TIMESTAMP_CREATE_DESC, true)
        } else if (sort === PRICE_ASC_SORT) {
          res = await getNFTs('1', undefined, { listed: true }, SORT_OPTION_PRICE_ASC, true)
        } else if (sort === PRICE_DESC_SORT) {
          res = await getNFTs('1', undefined, { listed: true }, SORT_OPTION_PRICE_DESC, true)
        } else if (sort === MOST_LIKED_SORT) {
          res = await getMostLikedNFTs('1', undefined, true)
        } else if (sort === MOST_SOLD_SORT) {
          res = await getMostSoldNFTs('1', undefined, true)
        } else if (sort === MOST_SOLD_SERIES_SORT) {
          res = await getMostSoldSeries('1', undefined, true)
        } else {
          res = await getMostViewedNFTs('1', undefined, true)
        }

        router.push({ pathname: router.pathname, query: `sort=${sort}` }, undefined, { shallow: true })
        setDataCurrentPage(1)
        setDataHasNextPage(res.hasNextPage ?? false)
        setData(res.data)
        setError('')
        setDataIsLoading(false)
      } catch (error) {
        console.log(error)
        setError('Unable to sort, please try again')
        setDataIsLoading(false)
      }
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
          <STitle>Sort</STitle>

          <div>
            <SFilterSubtitle>Sort NFTs based on theirs creation date or popularity criteria</SFilterSubtitle>
            <SSortContainer>
              <Select color="invertedContrast" text={currentSort ?? '-'}>
                {(setSelectExpanded) => (
                  <>
                    {currentSort !== undefined && (
                      <li
                        onClick={() => {
                          setSelectExpanded(false)
                          toggleSort(null)
                        }}
                      >
                        -
                      </li>
                    )}
                    {ALL_SORT_IDS.map(
                      (sort, id) =>
                        sort !== currentSort && (
                          <li
                            key={id}
                            onClick={() => {
                              setSelectExpanded(false)
                              toggleSort(sort)
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
  max-height: 50rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 56rem;
    padding: 4rem 4rem;
  }
`

const STitle = styled.h3`
  color: ${({ theme }) => theme.colors.contrast};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 3.2rem;
  margin: 0;
  margin-bottom: 3.2rem;
`

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`

const SSortContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;

  ul {
    max-height: 21rem;
    overflow-y: scroll;
  }

  li {
    color: ${({ theme }) => theme.colors.contrast};
  }
`

export default ModalSort
