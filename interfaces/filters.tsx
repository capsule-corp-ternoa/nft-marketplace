import { CategoryType } from 'interfaces'
import {
  CATEGORIES_FILTER,
  CREATION_DATE_FILTER,
  PRICE_FILTER,
  SALE_TYPE_FILTER,
  ALL_FILTER_SORT_IDS,
  ALL_FILTER_IDS,
  ALL_SORT_IDS,
  MOST_LIKED_SORT,
  MOST_SOLD_SORT,
  MOST_SOLD_SERIES_SORT,
  MOST_VIEWED_SORT,
  DATE_ASC_SORT,
  DATE_DESC_SORT,
  PRICE_ASC_SORT,
  PRICE_DESC_SORT,
} from 'utils/constant'

export type FiltersType = {
  [CATEGORIES_FILTER]: CategoryType[] | null
  [CREATION_DATE_FILTER]: string[] | null
  [PRICE_FILTER]: number[] | null
  [SALE_TYPE_FILTER]: string[] | null
}

export type SortTypesType = {
  [MOST_LIKED_SORT]: boolean | null
  [MOST_SOLD_SORT]: boolean | null
  [MOST_SOLD_SERIES_SORT]: boolean | null
  [MOST_VIEWED_SORT]: boolean | null
  [DATE_ASC_SORT]: boolean | null
  [DATE_DESC_SORT]: boolean | null
  [PRICE_ASC_SORT]: boolean | null
  [PRICE_DESC_SORT]: boolean | null
}

export type AllFilterIdsTypes = typeof ALL_FILTER_IDS[number]
export type AllSortIdsType = typeof ALL_SORT_IDS[number]
export type AllFilterSortIdsType = typeof ALL_FILTER_SORT_IDS[number]

export type FiltersSortNominalSetState = React.Dispatch<React.SetStateAction<FiltersType & SortTypesType>>
