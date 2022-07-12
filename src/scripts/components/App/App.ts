import { IFilterByValue, FilterByValue, FiltersByValue } from '../filters/FilterByValue';
import { IGood } from '../../state';

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
  
  constructor(state: IGood[], filteredState?: IGood[], options?: options) {
    this.state = state;
    this.filteredState = filteredState || this.state;
    this.options = options;
  }

  start():void {
    const colorFilter: IFilterByValue = new FilterByValue(this.state, FiltersByValue.colors);
    colorFilter.draw();
    const brandFilter: IFilterByValue = new FilterByValue(this.state, FiltersByValue.brand);
    brandFilter.draw();
    const heightFilter: IFilterByValue = new FilterByValue(this.state, FiltersByValue.height);
    heightFilter.draw();
  }
}