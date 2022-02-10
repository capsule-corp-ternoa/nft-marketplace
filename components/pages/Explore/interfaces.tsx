import { NftType } from 'interfaces';
import {
  CATEGORIES_FILTER,
  PRICE_FILTER,
  SALE_TYPE_FILTER,
  MOST_LIKED_SORT,
  MOST_VIEWED_SORT,
  BEST_SELLER_SORT,
  DATE_OLDEST_SORT,
  DATE_RECENT_SORT,
} from './constants';

export type FiltersType = {
  [CATEGORIES_FILTER]: string[] | null;
  [PRICE_FILTER]: [number, number] | null;
  [SALE_TYPE_FILTER]: string[] | null;
};

export type SortTypesType = {
  [MOST_LIKED_SORT]: boolean | null;
  [MOST_VIEWED_SORT]: boolean | null;
  [BEST_SELLER_SORT]: boolean | null;
  [DATE_OLDEST_SORT]: boolean | null;
  [DATE_RECENT_SORT]: boolean | null;
};

export type DataNominalSetState = React.Dispatch<React.SetStateAction<NftType[]>>;
export type FiltersSortNominalSetState = React.Dispatch<React.SetStateAction<FiltersType & SortTypesType>>;
