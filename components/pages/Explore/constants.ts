// Filters
export const CATEGORIES_FILTER = 'by Categories';
export const PRICE_FILTER = 'by Price';
export const SALE_TYPE_FILTER = 'by Sale Types';

// Sort Types
export const MOST_LIKED_SORT = 'by most liked';
export const MOST_SOLD_SORT = 'by most sold';
export const MOST_SOLD_SERIES_SORT = 'by most sold series';
export const MOST_VIEWED_SORT = 'by most viewed';
export const DATE_OLDEST_SORT = 'oldest';
export const DATE_RECENT_SORT = 'recently created';

export const FiltersSortDefaultState = {
  [CATEGORIES_FILTER]: null,
  [PRICE_FILTER]: [0, 0],
  [SALE_TYPE_FILTER]: null,
  [MOST_LIKED_SORT]: null,
  [MOST_SOLD_SORT]: null,
  [MOST_SOLD_SERIES_SORT]: null,
  [MOST_VIEWED_SORT]: null,
  [DATE_OLDEST_SORT]: null,
  [DATE_RECENT_SORT]: null,
}