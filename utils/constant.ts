import { removeURLSlash } from './strings'

export const DEFAULT_LIMIT_PAGINATION = '12'
export const MARKETPLACE_ID = process.env.NEXT_PUBLIC_MARKETPLACE_ID || '0'
export const SOCKET_URL =
  (process.env.NEXT_PUBLIC_SOCKET_API && removeURLSlash(process.env.NEXT_PUBLIC_SOCKET_API)) ||
  (process.env.NEXT_PUBLIC_NODE_API && removeURLSlash(process.env.NEXT_PUBLIC_NODE_API)) ||
  ''
export const NODE_API_URL = process.env.NEXT_PUBLIC_NODE_API && removeURLSlash(process.env.NEXT_PUBLIC_NODE_API)
export const EXPLORER_URL = process.env.NEXT_PUBLIC_EXPLORER_URL
  ? removeURLSlash(process.env.NEXT_PUBLIC_EXPLORER_URL)
  : 'https://explorer.ternoa.com/'

// Sort Options
export const SORT_OPTION_CREATED_AT_ASC = 'created_at:asc'
export const SORT_OPTION_CREATED_AT_DESC = 'created_at:desc'
export const SORT_OPTION_PRICE_ASC = 'price_rounded:asc'
export const SORT_OPTION_PRICE_DESC = 'price_rounded:desc'
export const SORT_OPTION_TIMESTAMP_CREATE_ASC = 'timestamp_create:asc'
export const SORT_OPTION_TIMESTAMP_CREATE_DESC = 'timestamp_create:desc'

export const SORT_OPTIONS = [
  SORT_OPTION_CREATED_AT_ASC,
  SORT_OPTION_CREATED_AT_DESC,
  SORT_OPTION_PRICE_ASC,
  SORT_OPTION_PRICE_DESC,
  SORT_OPTION_TIMESTAMP_CREATE_ASC,
  SORT_OPTION_TIMESTAMP_CREATE_DESC,
] as const

// Filters
export const CATEGORIES_FILTER = 'by Categories'
export const CREATION_DATE_FILTER = 'by Creation Date'
export const PRICE_FILTER = 'by Price'
export const SALE_TYPE_FILTER = 'by Sale Types'

// Sort Types
export const MOST_LIKED_SORT = 'Most liked'
export const MOST_SOLD_SORT = 'Most sold'
export const MOST_SOLD_SERIES_SORT = 'Most sold series'
export const MOST_VIEWED_SORT = 'Most viewed'
export const DATE_ASC_SORT = 'Oldest'
export const DATE_DESC_SORT = 'Recently created'
export const PRICE_ASC_SORT = 'Price: Low to High'
export const PRICE_DESC_SORT = 'Price: High to Low'

export const ALL_FILTER_IDS = [CATEGORIES_FILTER, CREATION_DATE_FILTER, PRICE_FILTER, SALE_TYPE_FILTER] as const
export const ALL_SORT_IDS = [
  DATE_ASC_SORT,
  DATE_DESC_SORT,
  MOST_LIKED_SORT,
  MOST_SOLD_SORT,
  MOST_SOLD_SERIES_SORT,
  MOST_VIEWED_SORT,
  PRICE_ASC_SORT,
  PRICE_DESC_SORT,
] as const
export const ALL_FILTER_SORT_IDS = [
  CATEGORIES_FILTER,
  CREATION_DATE_FILTER,
  PRICE_FILTER,
  SALE_TYPE_FILTER,
  DATE_ASC_SORT,
  DATE_DESC_SORT,
  MOST_LIKED_SORT,
  MOST_SOLD_SORT,
  MOST_SOLD_SERIES_SORT,
  MOST_VIEWED_SORT,
  PRICE_ASC_SORT,
  PRICE_DESC_SORT,
] as const

export const FILTERS_SORT_RESET_STATE = {
  [CATEGORIES_FILTER]: null,
  [CREATION_DATE_FILTER]: null,
  [PRICE_FILTER]: null,
  [SALE_TYPE_FILTER]: null,
  [MOST_LIKED_SORT]: null,
  [MOST_SOLD_SORT]: null,
  [MOST_SOLD_SERIES_SORT]: null,
  [MOST_VIEWED_SORT]: null,
  [DATE_ASC_SORT]: null,
  [DATE_DESC_SORT]: null,
  [PRICE_ASC_SORT]: null,
  [PRICE_DESC_SORT]: null,
}
