import { FilterByRange } from './../controls/FilterByRange';
import { filtersByValueTypes, controlsTypes, SortingTypes, filtersByRangeTypes } from './../../utils/Enums';
import { FilterByValue } from '../controls/FilterByValue';
import { Search } from '../controls/Search';
import { Sorting } from '../controls/Sorting';
import { ResetFilters } from '../controls/ResetFilters';
import { ResetSettings } from '../controls/ResetSettings';
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
    year: [number, number] | null;
    amount: [number, number] | null;
  }
  searchValue: string;
  sortingValue: SortingTypes;
  cartItems: number[];
}

export class App {
  state: IGood[];
  filteredState: IGood[];
  defaultOptions: options;
  options: options;
  goodsContainer?: IGoodsContainer;
  
  constructor(state: IGood[]) {
    this.state = state;
    this.filteredState = this.state;
    this.defaultOptions = {
      filtersByValue: {
        colors: [],
        brand: [],
        height: [],
        size: [],
      },
      filtersByRange: {
        year: null,
        amount: null
      },
      searchValue: '',
      sortingValue: SortingTypes.byAlphabetAsc,
      cartItems: []
    };
    this.options = this.getLocalStorage() || this.defaultOptions;
  }

  start(): void {
    const colorFilter = new FilterByValue(this.state, filtersByValueTypes.colors, this.options.filtersByValue.colors, this.updateOptions.bind(this));
    colorFilter.draw();
    const brandFilter = new FilterByValue(this.state, filtersByValueTypes.brand, this.options.filtersByValue.brand, this.updateOptions.bind(this));
    brandFilter.draw();
    const heightFilter = new FilterByValue(this.state, filtersByValueTypes.height, this.options.filtersByValue.height, this.updateOptions.bind(this));
    heightFilter.draw();
    const sizeFilter = new FilterByValue(this.state, filtersByValueTypes.size, this.options.filtersByValue.size, this.updateOptions.bind(this));
    sizeFilter.draw();
    const search = new Search(this.options.searchValue, this.updateOptions.bind(this));
    search.draw();
    const sorting = new Sorting(this.options.sortingValue, this.updateOptions.bind(this));
    sorting.draw();
    const amountFilter = new FilterByRange(this.state, filtersByRangeTypes.amount, this.options.filtersByRange.amount, this.updateOptions.bind(this));
    amountFilter.draw();
    const yearFilter = new FilterByRange(this.state, filtersByRangeTypes.year, this.options.filtersByRange.year, this.updateOptions.bind(this));
    yearFilter.draw();
    const resetFilters = new ResetFilters(this.updateOptions.bind(this));
    resetFilters.draw();
    const resetSettings = new ResetSettings(this.updateOptions.bind(this));
    resetSettings.draw();
    this.goodsContainer = new Goods(this.state, this.options.cartItems, this.updateOptions.bind(this));
    this.render();

    window.addEventListener('beforeunload', () => {this.setLocalStorage(this.options)});
  }

  updateOptions(type: controlsTypes, option?: string | string[] | number[] | [number, number] | SortingTypes, filterType?: filtersByValueTypes | filtersByRangeTypes): void {
    const cartItems = this.options.cartItems;
    const sortingValue = this.options.sortingValue;

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
      case controlsTypes.cart:
        this.options.cartItems = option as number[];
        return;
      case controlsTypes.resetFilters:
        this.options = JSON.parse(JSON.stringify(this.defaultOptions));
        this.options.cartItems = cartItems;
        this.options.sortingValue = sortingValue;
        location.reload();
        break;
      case controlsTypes.resetSettings:
        this.options = JSON.parse(JSON.stringify(this.defaultOptions));
        location.reload();
        break;
    }
    this.render();
  }

  render(): void {
    console.log(this.options)
    this.filteredState = this.state;
    Object.entries(this.options.filtersByValue).forEach(([key, value]) => {
      if (value.length) {
        this.filteredState = FilterByValue.filter(this.filteredState, value, key as filtersByValueTypes);
      }
    });
    Object.entries(this.options.filtersByRange).forEach(([key, value]) => {
      if (value !== null) {
        this.filteredState = FilterByRange.filter(this.filteredState, value, key as filtersByRangeTypes);
      }
    });
    this.filteredState = Search.filter(this.filteredState, this.options.searchValue);
    this.filteredState = Sorting.sort(this.filteredState, this.options.sortingValue);
    (this.goodsContainer as IGoodsContainer).draw(this.filteredState);
  }

  getLocalStorage(): void | options {
    if (localStorage.getItem('options')) {
      return JSON.parse(localStorage.getItem('options') as string) as options;
    }
  }

  setLocalStorage(options: options): void {
    localStorage.setItem('options', JSON.stringify(options));
  }
}