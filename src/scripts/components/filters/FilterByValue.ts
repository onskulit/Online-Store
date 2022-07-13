import { IGood } from "../../state";
import create from "../../utils/create";

export enum FiltersByValue {
  colors = 'colors',
  brand = 'brand',
  height = 'height',
  size = 'size'
}

export interface IFilterByValue {
  goods: IGood[];
  filteredState: IGood[];
  options: string[];
  activeOptions: string[];
  filterType: FiltersByValue;
  createOptions(): void;
  draw(): void;
  filter(): void;
  clickListener: (state: IGood[]) => void;
  onClickFilter(item: HTMLElement, option: string): void;
  updateState(state: IGood[]): void;
}

export class FilterByValue implements IFilterByValue {
  goods: IGood[];
  filteredState: IGood[];
  options: string[];
  activeOptions: string[];
  filterType: FiltersByValue;
  clickListener: (state: IGood[]) => void;

  constructor (goods: IGood[], filterType: FiltersByValue, clickListener: (state: IGood[]) => void, filteredState?: IGood[], activeOptions?: string[]) {
    this.goods = goods;
    this.filteredState = filteredState || this.goods;
    this.options = [];
    this.activeOptions = activeOptions || [];
    this.filterType = filterType;
    this.clickListener = clickListener;
  }

  createOptions() {
    this.goods.forEach(good => {
      good[this.filterType].forEach(option => {
        if (!this.options.includes(option)) {
          this.options.push(option);
        }
      })
    })

    if (this.filterType === FiltersByValue.size) {
      this.options = this.options.sort((a, b) => +a - +b);
    }
  }

  draw() {
    const container: HTMLElement = create('div', 'filter-container', this.filterType.toUpperCase(),
    (document.querySelector('.controls') as HTMLElement));
    this.createOptions();
    this.options.forEach(option => {
      const item: HTMLElement = create('button', 'filter-item', null, container, ['data-option', option]);
      if (this.filterType === FiltersByValue.colors) {
        item.style.backgroundColor = option;
      } else {
        item.textContent = option;
      }
      item.addEventListener('click', () => {
        this.onClickFilter(item, option);
        this.clickListener(this.filteredState);
      })
    })
  }

  filter() {
    if (!this.activeOptions.length) {
      this.filteredState = this.goods;
    } else {
      this.filteredState = this.goods
      .filter(good => this.activeOptions.some(option => good[this.filterType].includes(option)));
    }
  }

  onClickFilter(item: HTMLElement, option: string) {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        const dataValue = item.dataset.option;
        this.activeOptions = this.activeOptions.filter(option => option !== dataValue);
        this.filter();
      } else {
        item.classList.add('active');
        this.activeOptions.push(option);
        this.filter();
      }
    }

    updateState(state: IGood[]): void {
      this.filteredState = state;
    }
}