import { IGood } from "../../state";
import create from "../../utils/create";
import { goodsContainer } from "../../../index";

export enum FiltersByValue {
  colors = 'colors',
  brand = 'brand',
  height = 'height',
}

export interface IFilterByValue {
  goods: IGood[];
  filteredGoods: IGood[];
  options: string[];
  activeOptions: string[];
  filterType: FiltersByValue;
  createOptions(): void;
  draw(): void;
  filter(): void;
  onClickFilter(item: HTMLElement, option: string): () => void;
}

export class FilterByValue implements IFilterByValue {
  goods: IGood[];
  filteredGoods: IGood[];
  options: string[];
  activeOptions: string[];
  filterType: FiltersByValue;

  constructor (goods: IGood[], filterType: FiltersByValue, filteredGoods?: IGood[], activeOptions?: string[]) {
    this.goods = goods;
    this.filteredGoods = filteredGoods || this.goods;
    this.options = [];
    this.activeOptions = activeOptions || [];
    this.filterType = filterType;
  }

  createOptions() {
    this.goods.forEach(good => {
      good[this.filterType].forEach(option => {
        if (!this.options.includes(option)) {
          this.options.push(option);
        }
      })
    })
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
      item.addEventListener('click', this.onClickFilter(item, option))
    })
  }

  filter() {
    if (!this.activeOptions.length) {
      this.filteredGoods = this.goods;
    } else {
      this.filteredGoods = this.goods
      .filter(good => this.activeOptions.some(option => good[this.filterType].includes(option)));
    }
  }

  onClickFilter(item: HTMLElement, option: string) {
    return () => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        const dataValue = item.dataset.option;
        this.activeOptions = this.activeOptions.filter(option => option !== dataValue);
        this.filter();
        goodsContainer.draw(this.filteredGoods);
      } else {
        item.classList.add('active');
        this.activeOptions.push(option);
        this.filter();
        goodsContainer.draw(this.filteredGoods);
      }
    }
  }
}