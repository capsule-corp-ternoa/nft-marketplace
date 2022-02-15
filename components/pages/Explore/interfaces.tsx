import { NftType } from 'interfaces';
import {
  CATEGORIES_FILTER,
  CREATION_DATE_FILTER,
  PRICE_FILTER,
  SALE_TYPE_FILTER,
  MOST_LIKED_SORT,
  MOST_SOLD_SORT,
  MOST_SOLD_SERIES_SORT,
  MOST_VIEWED_SORT,
  DATE_ASC_SORT,
  DATE_DESC_SORT,
  PRICE_ASC_SORT,
  PRICE_DESC_SORT,
} from './constants';

export type FiltersType = {
  [CATEGORIES_FILTER]: string[] | null;
  [CREATION_DATE_FILTER]: string[];
  [PRICE_FILTER]: number[];
  [SALE_TYPE_FILTER]: string[] | null;
};

export type SortTypesType = {
  [MOST_LIKED_SORT]: boolean | null;
  [MOST_SOLD_SORT]: boolean | null;
  [MOST_SOLD_SERIES_SORT]: boolean | null;
  [MOST_VIEWED_SORT]: boolean | null;
  [DATE_ASC_SORT]: boolean | null;
  [DATE_DESC_SORT]: boolean | null;
  [PRICE_ASC_SORT]: boolean | null;
  [PRICE_DESC_SORT]: boolean | null;
};

export type DataNominalSetState = React.Dispatch<React.SetStateAction<NftType[]>>;
export type FiltersSortNominalSetState = React.Dispatch<React.SetStateAction<FiltersType & SortTypesType>>;
