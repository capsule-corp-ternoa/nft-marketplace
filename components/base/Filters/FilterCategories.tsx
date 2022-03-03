import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getCategories } from 'actions/category'
import { FilterTitle, FilterSubtitle } from 'components/layout'
import Button from 'components/ui/Button'
import { CategoryType } from 'interfaces'
import { FiltersSortNominalSetState } from 'interfaces/filters'
import { Loader } from 'components/ui/Icon'
import { FILTERS_SORT_RESET_STATE, CATEGORIES_FILTER } from 'utils/constant'
import { emojiMapping } from 'utils/functions'

interface FilterCategoriesProps {
  setFilters: FiltersSortNominalSetState
  value: CategoryType[] | null
}

const FilterCategories = ({ setFilters, value }: FilterCategoriesProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleCategory = (category: CategoryType) => {
    setFilters((prevState) => {
      const prevCategoriesFiltered = prevState[CATEGORIES_FILTER]
      if (prevCategoriesFiltered === null) {
        return { ...FILTERS_SORT_RESET_STATE, [CATEGORIES_FILTER]: [category] }
      }

      const categoryIdx = prevCategoriesFiltered.findIndex(({ code }) => category.code === code)
      if (categoryIdx < 0) {
        return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.concat(category) }
      }

      return { ...prevState, [CATEGORIES_FILTER]: prevCategoriesFiltered.filter(({ code }) => category.code !== code) }
    })
  }

  useEffect(() => {
    let shouldUpdate = true
    const loadCategories = async () => {
      setIsLoading(true)
      try {
        const categories = await getCategories()
        if (shouldUpdate) {
          setCategories(categories)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        if (shouldUpdate) {
          setIsLoading(false)
        }
      }
    }

    loadCategories()
    return () => {
      shouldUpdate = false
    }
  }, [])

  return (
    <div>
      <FilterTitle>Categories</FilterTitle>
      <SFilterSubtitle>Filter your search according to your favorites categories</SFilterSubtitle>
      <SCategoriesContainer>
        {isLoading ? (
          <SLoader color="contrast" size="medium" useLottie />
        ) : (
          categories
            // Categories with related emoji are displayed first
            .sort((a, b) => {
              const aBit = emojiMapping(a.code) === undefined ? 1 : 0
              const bBit = emojiMapping(b.code) === undefined ? 1 : 0
              return aBit - bBit
            })
            .map((category) => {
              const isActive = value?.some((item) => item.code === category.code) ?? false
              return (
                <Button
                  key={category._id}
                  color={isActive ? 'primary500' : 'invertedContrast'}
                  emoji={emojiMapping(category.code)}
                  onClick={() => toggleCategory(category)}
                  size="small"
                  text={category.name}
                  variant={isActive ? 'contained' : 'outlined'}
                />
              )
            })
        )}
      </SCategoriesContainer>
    </div>
  )
}

const SLoader = styled(Loader)`
  margin: 1.6rem auto;
`

const SFilterSubtitle = styled(FilterSubtitle)`
  margin-top: 0.4rem;
`

const SCategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: 1.6rem;
  max-height: 12rem;
  overflow-y: auto;
`

export default FilterCategories
