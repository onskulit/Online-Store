import { IGood } from "../../state";
import create from "../../utils/create";
import { controlsTypes, filtersByRangeTypes } from "../../utils/Enums";
import * as noUiSlider from '../../../../node_modules/nouislider/dist/nouislider';

export interface IFilterByRange {
  goods: IGood[];
  initialValues: [number, number];
  activeValues: [number, number];
  filterType: filtersByRangeTypes;
  createOptions(): [number, number];
  draw(): void;
  updateOptions: (type: controlsTypes, option: [number, number], filterType?: filtersByRangeTypes) => void;
}

export class FilterByRange implements IFilterByRange {
  goods: IGood[];
  initialValues: [number, number];
  activeValues: [number, number];
  filterType: filtersByRangeTypes;
  updateOptions: (type: controlsTypes, option: [number, number], filterType?: filtersByRangeTypes) => void;

  constructor (goods: IGood[], filterType: filtersByRangeTypes, updateOptions: (type: controlsTypes, option: [number, number], filterType?: filtersByRangeTypes) => void, activeValues?: [number, number]) {
    this.goods = goods;
    this.filterType = filterType;
    this.initialValues = this.createOptions();
    this.activeValues = activeValues || this.initialValues;
    this.updateOptions = updateOptions;
  }

  createOptions(): [number, number] {
    let min = 0;
    let max = 0;
    this.goods.forEach((good, index) => {
      const value = good[this.filterType];
      if (index === 0) {
        min = value;
        max = value;
      }
      if (value < min) { min = value }
      if (value > max) { max = value }
    })
    return [min, max];
  }

  draw() {
    const container: HTMLElement = create('div', 'slider-container', `<b> ${this.filterType.toUpperCase()} </b>`,
    (document.querySelector('.other-controls') as HTMLElement));
    this.createOptions();
    const sliderContainer = create('div', 'slider', null, container, ['data-option', this.filterType]) as noUiSlider.target;
    const slider = noUiSlider.create(sliderContainer, {
      start: this.initialValues,
      connect: true,
      range: {
        'min': this.initialValues[0],
        'max': this.initialValues[1]
      },
      tooltips: {
        to: function(numericValue) {
            return numericValue.toFixed(0);
        }
      },
      step: 1
    }) as noUiSlider.API;
    
    slider.on('change', (e) => {
      this.activeValues = [+e[0], +e[1]];
      console.log(this.activeValues)
      this.updateOptions(controlsTypes.filtersByRange, this.activeValues, this.filterType);
    })
  }

  static filter(state: IGood[], options: [number, number], filterType: filtersByRangeTypes): IGood[] {
    return state.filter(good => good[filterType] > options[0] && good[filterType] < options[1]);
  }
}