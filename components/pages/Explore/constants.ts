// Filters
export const CATEGORIES_FILTER = 'by Categories';
export const PRICE_FILTER = 'by Price';
export const SALE_TYPE_FILTER = 'by Sale Types';

// Sort Types
export const MOST_LIKED_SORT = 'by most liked';
export const MOST_VIEWED_SORT = 'by most viewed';
export const BEST_SELLER_SORT = 'by best seller';
export const DATE_OLDEST_SORT = 'oldest';
export const DATE_RECENT_SORT = 'recently created';

export const FiltersSortDefaultState = {
  [CATEGORIES_FILTER]: null,
  [PRICE_FILTER]: null,
  [SALE_TYPE_FILTER]: null,
  [MOST_LIKED_SORT]: null,
  [MOST_VIEWED_SORT]: null,
  [BEST_SELLER_SORT]: null,
  [DATE_OLDEST_SORT]: null,
  [DATE_RECENT_SORT]: null,
}