// Filters
export const CATEGORIES_FILTER = 'by Categories';
export const CREATION_DATE_FILTER = 'by Creation Date';
export const PRICE_FILTER = 'by Price';
export const SALE_TYPE_FILTER = 'by Sale Types';

// Sort Types
export const MOST_LIKED_SORT = 'Most liked';
export const MOST_SOLD_SORT = 'Most sold';
export const MOST_SOLD_SERIES_SORT = 'Most sold series';
export const MOST_VIEWED_SORT = 'Most viewed';
export const DATE_ASC_SORT = 'Oldest';
export const DATE_DESC_SORT = 'Recently created';
export const PRICE_ASC_SORT = 'Price: Low to High';
export const PRICE_DESC_SORT = 'Price: High to Low';

export const ALL_FILTER_IDS = [CATEGORIES_FILTER, CREATION_DATE_FILTER, PRICE_FILTER, SALE_TYPE_FILTER] as const;
export const ALL_SORT_IDS = [DATE_ASC_SORT, DATE_DESC_SORT, MOST_LIKED_SORT, MOST_SOLD_SORT, MOST_SOLD_SERIES_SORT, MOST_VIEWED_SORT, PRICE_ASC_SORT, PRICE_DESC_SORT] as const;
export const ALL_FILTER_SORT_IDS = [CATEGORIES_FILTER, CREATION_DATE_FILTER, PRICE_FILTER, SALE_TYPE_FILTER, DATE_ASC_SORT, DATE_DESC_SORT, MOST_LIKED_SORT, MOST_SOLD_SORT, MOST_SOLD_SERIES_SORT, MOST_VIEWED_SORT, PRICE_ASC_SORT, PRICE_DESC_SORT] as const;

export const FiltersSortDefaultState = {
  [CATEGORIES_FILTER]: null,
  [CREATION_DATE_FILTER]: ['', ''],
  [PRICE_FILTER]: [0, 0],
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