import { FilterByRange } from './../controls/FilterByRange';
import { filtersByValueTypes, controlsTypes, SortingTypes, filtersByRangeTypes } from './../../utils/Enums';
import { FilterByValue } from '../controls/FilterByValue';
import { Search } from '../controls/Search';
import { Sorting } from '../controls/Sorting';
import { IGood } from '../../state';
import Goods, { IGoodsContainer } from '../Goods/Goods';

type options = {
  filtersByValue: {
    colors: string[];
    brand: string[];
    height: string[];
    size: string[];
  };
  filtersByRange: {
    year: [number, number];
    amount: [number, number];
  }
  searchValue: string;
  sortingValue: SortingTypes
}

export class App {
  state: IGood[];
  filteredState: IGood[];
  options: options;
  goodsContainer?: IGoodsContainer;
  
  constructor(state: IGood[], filteredState?: IGood[], options?: options) {
    this.state = state;
    this.filteredState = filteredState || this.state;
    this.options = options || {
      filtersByValue: {
        colors: [],
        brand: [],
        height: [],
        size: [],
      }, filtersByRange: {
        year: [0, 0],
        amount: [0, 0]
      }, 
      searchValue: '',
      sortingValue: SortingTypes.byAlphabetAsc
    };
  }

  start(): void {
    const colorFilter = new FilterByValue(this.state, filtersByValueTypes.colors, this.updateOptions.bind(this));
    colorFilter.draw();
    const brandFilter = new FilterByValue(this.state, filtersByValueTypes.brand, this.updateOptions.bind(this));
    brandFilter.draw();
    const heightFilter = new FilterByValue(this.state, filtersByValueTypes.height, this.updateOptions.bind(this));
    heightFilter.draw();
    const sizeFilter = new FilterByValue(this.state, filtersByValueTypes.size, this.updateOptions.bind(this));
    sizeFilter.draw();
    const search = new Search(this.updateOptions.bind(this));
    search.draw();
    const sorting = new Sorting(this.updateOptions.bind(this));
    sorting.draw();
    const amountFilter = new FilterByRange(this.state, filtersByRangeTypes.amount, this.updateOptions.bind(this));
    amountFilter.draw();
    const yearFilter = new FilterByRange(this.state, filtersByRangeTypes.year, this.updateOptions.bind(this));
    yearFilter.draw();
    this.goodsContainer = new Goods(this.state);
    this.goodsContainer.draw(this.filteredState);
  }

  updateOptions(type: controlsTypes, option: string | string[] | [number, number] | SortingTypes, filterType?: filtersByValueTypes | filtersByRangeTypes): void {
    switch (type) {
      case controlsTypes.filtersByValue:
        this.options.filtersByValue[filterType as filtersByValueTypes] = option as string[];
        break;
      case controlsTypes.search:
        this.options.searchValue = option as string;
        break;
      case controlsTypes.sorting:
        this.options.sortingValue = option as SortingTypes;
        break;
      case controlsTypes.filtersByRange:
        this.options.filtersByRange[filterType as filtersByRangeTypes] = option as [number, number];
        break;
    }
    this.rerender();
  }

  rerender(): void {
    this.filteredState = this.state;
    Object.entries(this.options.filtersByValue).forEach(([key, value]) => {
      if (value.length) {
        this.filteredState = FilterByValue.filter(this.filteredState, value, key as filtersByValueTypes);
      }
    });
    Object.entries(this.options.filtersByRange).forEach(([key, value]) => {
      if (value[0] !== 0 && value[1] !== 0) {
        this.filteredState = FilterByRange.filter(this.filteredState, value, key as filtersByRangeTypes);
      }
    });
    this.filteredState = Search.filter(this.filteredState, this.options.searchValue);
    this.filteredState = Sorting.sort(this.filteredState, this.options.sortingValue);
    (this.goodsContainer as IGoodsContainer).draw(this.filteredState);
  }
}