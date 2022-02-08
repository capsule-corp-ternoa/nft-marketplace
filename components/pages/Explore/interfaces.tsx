import { ALL_FILTERS_ID, CATEGORIES_FILTER } from './constants';

export type FiltersIdType = typeof ALL_FILTERS_ID[number];

export type FiltersType = {
  [CATEGORIES_FILTER]: string[] | undefined;
};