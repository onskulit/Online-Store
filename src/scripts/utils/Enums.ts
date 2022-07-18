
export enum controlsTypes {
  filtersByValue = 'filtersByValue',
  filtersByRange = 'filtersByRange',
  search = 'search',
  sorting = 'sorting',
  cart = 'cart'
}

export enum filtersByValueTypes {
  colors = 'colors',
  brand = 'brand',
  height = 'height',
  size = 'size'
}

export enum filtersByRangeTypes {
  year = 'year',
  amount = 'amount'
}

export enum SortingTypes {
  byAlphabetAsc = 'By name, A to Z',
  byAlphabetDesc = 'By name, Z to A',
  byYearAsc = 'By year, ascending',
  byYearDesc = 'By year, descending',
  byAmountAsc = 'By amount, ascending',
  byAmountDesc = 'By amount, descending'
}