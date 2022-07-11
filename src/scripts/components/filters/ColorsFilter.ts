import { IGood } from "../../state";
import create from "../../utils/create";
import { goodsContainer } from "../../../index";

export interface IColorsFilter {
  goods: IGood[];
  filteredGoods: IGood[];
  options: string[];
  activeOptions: string[];
  createOptions(): void;
  draw(): void;
  filter(): void;
  onClickFilter(item: HTMLElement, option: string): () => void;
}

export class ColorsFilter implements IColorsFilter {
  goods: IGood[];
  filteredGoods: IGood[];
  options: string[];
  activeOptions: string[];

  constructor (goods: IGood[]) {
    this.goods = goods;
    this.filteredGoods = goods;
    this.options = [];
    this.activeOptions = [];
  }

  createOptions() {
    this.goods.forEach(good => {
      good.colors.forEach(color => {
        if (!this.options.includes(color)) {
          this.options.push(color);
        }
      })
    })
  }

  draw() {
    const container: HTMLElement = create('div', 'filter-container', 'Colors',
    (document.querySelector('.controls') as HTMLElement));
    this.createOptions();
    this.options.forEach(option => {
      const item: HTMLElement = create('button', 'filter-item', null, container, ['data-option', option]);
      item.style.backgroundColor = option;
      item.addEventListener('click', this.onClickFilter(item, option))
    })
  }

  filter() {
    if (!this.activeOptions.length) {
      this.filteredGoods = this.goods;
    } else {
      this.filteredGoods = this.goods
      .filter(good => this.activeOptions.some(option => good.colors.includes(option)));
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