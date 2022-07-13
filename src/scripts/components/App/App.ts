import { IFilterByValue, FilterByValue, FiltersByValue } from '../filters/FilterByValue';
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
    this.goodsContainer = new Goods(this.state);
    this.goodsContainer.draw(this.filteredState);
  }

  updateState(state: IGood[]): void {
    this.filteredState = state;
    console.log(this.filteredState);
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