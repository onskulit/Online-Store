import { IGood } from "../../state";
import create from "../../utils/create";

export interface IColorsFilter {
  goods: IGood[];
  options: string[];
  createOptions(): void;
  draw(): void;
  filter(): void;
}

export class ColorsFilter implements IColorsFilter {
  goods: IGood[];
  options: string[];

  constructor (goods: IGood[]) {
    this.goods = goods;
    this.options = [];
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
    const container: HTMLElement = create('div', null, 'Colors',
    (document.querySelector('.controls') as HTMLElement));
    this.createOptions();
    this.options.forEach(option => {
      const item: HTMLElement = create('button', 'filter-item', null, container, ['color', option]);
      item.style.backgroundColor = option;
    })
  }

  filter() {
    return;
  }
}