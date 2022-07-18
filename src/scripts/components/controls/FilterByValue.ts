import { IGood } from "../../state";
import create from "../../utils/create";
import { filtersByValueTypes, controlsTypes } from "../../utils/Enums";

export interface IFilterByValue {
  goods: IGood[];
  options: string[];
  activeOptions: string[];
  filterType: filtersByValueTypes;
  createOptions(): void;
  draw(): void;
  updateOptions: (type: controlsTypes, option: string[], filterType?: filtersByValueTypes) => void;
  onChangeFilter(item: HTMLElement, option: string): void;
}

export class FilterByValue implements IFilterByValue {
  goods: IGood[];
  options: string[];
  activeOptions: string[];
  filterType: filtersByValueTypes;
  updateOptions: (type: controlsTypes, option: string[], filterType?: filtersByValueTypes) => void;

  constructor (goods: IGood[], filterType: filtersByValueTypes, activeOptions: string[], updateOptions: (type: controlsTypes, option: string[], filterType?: filtersByValueTypes) => void) {
    this.goods = goods;
    this.options = [];
    this.activeOptions = activeOptions;
    this.filterType = filterType;
    this.updateOptions = updateOptions;
  }

  createOptions() {
    this.goods.forEach(good => {
      good[this.filterType].forEach(option => {
        if (!this.options.includes(option)) {
          this.options.push(option);
        }
      })
    })

    if (this.filterType === filtersByValueTypes.size) {
      this.options = this.options.sort((a, b) => +a - +b);
    }
  }

  draw() {
    const container: HTMLElement = create('div', 'filter-container', `<b>${this.filterType.toUpperCase()}</b>`,
    (document.querySelector('.filters-by-value') as HTMLElement));
    this.createOptions();
    this.options.forEach(option => {
      const item: HTMLElement = create('button', 'filter-item', null, container, ['data-option', option]);
      if (this.filterType === filtersByValueTypes.colors) {
        item.style.backgroundColor = option;
      } else {
        item.textContent = option;
      }
      if (this.activeOptions.includes(option)) {
        item.classList.add('active');
      }
      item.addEventListener('click', () => {
        this.onChangeFilter(item, option);
        this.updateOptions(controlsTypes.filtersByValue, this.activeOptions, this.filterType);
      })
    })
  }

  static filter(state: IGood[], options: string[], filterType: filtersByValueTypes): IGood[] {
    return state.filter(good => options.some(option => good[filterType].includes(option)));
  }

  onChangeFilter(item: HTMLElement, option: string) {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        const dataValue = item.dataset.option;
        this.activeOptions = this.activeOptions.filter(option => option !== dataValue);
      } else {
        item.classList.add('active');
        this.activeOptions.push(option);
      }
    }
}