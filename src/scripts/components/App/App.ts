import { ColorsFilter } from './../filters/ColorsFilter';
import state, { IGood } from '../../state';

type options = {
  filtersByValue?: {
    colors: string[];
    brands: string[];
  };
  filtersByRange?: {
    years: [number, number];
    amount: [number, number];
  }
  searchValue: string;
}

export class App {
  goods: IGood[];
  filteredGoods: IGood[];
  options?: options;
  
  constructor(goods: IGood[], filteredGoods?: IGood[], options?: options) {
    this.goods = goods;
    this.filteredGoods = filteredGoods || this.goods;
    this.options = options;
  }

  draw():void {
    const colorFilter = new ColorsFilter(state);
    colorFilter.draw();
  }
}