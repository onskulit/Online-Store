import { IFilterByValue, FilterByValue, FiltersByValue } from '../filters/FilterByValue';
import { Search, ISearch } from '../filters/Search';
import { Sorting, ISorting } from '../filters/Sorting';
import { IGood } from '../../state';
import Goods, { IGoodsContainer } from '../Goods/Goods';

type options = {
  filtersByValue?: {
    colors: string[];
    brands: string[];
  };
  filtersByRange?: {
    years: [number, number];
    amount: [number, number];
  }
  searchValue?: string;
}

export class App {
  state: IGood[];
  filteredState: IGood[];
  options?: options;
  colorFilter?: IFilterByValue;
  brandFilter?: IFilterByValue;
  heightFilter?: IFilterByValue;
  sizeFilter?: IFilterByValue;
  search?: ISearch;
  sorting?: ISorting;
  goodsContainer?: IGoodsContainer;
  
  constructor(state: IGood[], filteredState?: IGood[], options?: options) {
    this.state = state;
    this.filteredState = filteredState || this.state;
    this.options = options;
  }

  start(): void {
    this.colorFilter = new FilterByValue(this.state, FiltersByValue.colors, this.updateState.bind(this));
    this.colorFilter.draw();
    this.brandFilter = new FilterByValue(this.state, FiltersByValue.brand, this.updateState.bind(this));
    this.brandFilter.draw();
    this.heightFilter = new FilterByValue(this.state, FiltersByValue.height, this.updateState.bind(this));
    this.heightFilter.draw();
    this.sizeFilter = new FilterByValue(this.state, FiltersByValue.size, this.updateState.bind(this));
    this.sizeFilter.draw();
    this.search = new Search(this.state, this.updateState.bind(this));
    this.search.draw();
    this.sorting = new Sorting(this.state, this.updateState.bind(this));
    this.sorting.draw();
    this.goodsContainer = new Goods(this.state);
    this.goodsContainer.draw(this.filteredState);
  }

  updateState(state: IGood[]): void {
    this.filteredState = state;
    this.rerender();
  }

  rerender(): void {
    /* (this.colorFilter as FilterByValue).updateState(this.filteredState);
    (this.brandFilter as FilterByValue).updateState(this.filteredState);
    (this.heightFilter as FilterByValue).updateState(this.filteredState);
    (this.sizeFilter as FilterByValue).updateState(this.filteredState); */
    (this.goodsContainer as IGoodsContainer).draw(this.filteredState);
  } 
}