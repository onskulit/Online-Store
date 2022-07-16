import { filtersByValueTypes, controlsTypes, SortingTypes } from './../../utils/Enums';
import { FilterByValue } from '../filters/FilterByValue';
import { Search } from '../filters/Search';
import { Sorting } from '../filters/Sorting';
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
    years: [number | null, number | null];
    amount: [number | null, number | null];
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
        years: [null, null],
        amount: [null, null]
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
    this.goodsContainer = new Goods(this.state);
    this.goodsContainer.draw(this.filteredState);
  }

  updateOptions(type: controlsTypes, option: string | string[] | SortingTypes, filterType?: filtersByValueTypes): void {
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
    this.filteredState = Search.filter(this.filteredState, this.options.searchValue);
    this.filteredState = Sorting.sort(this.filteredState, this.options.sortingValue);
    (this.goodsContainer as IGoodsContainer).draw(this.filteredState);
  }
}