import { IGood } from "../../state";
import create from "../../utils/create";
import { SortingTypes, controlsTypes } from "../../utils/Enums";

export interface ISorting {
  values: SortingTypes[];
  value: SortingTypes;
  draw(): void;
  updateOptions: (type: controlsTypes, option: SortingTypes) => void;
}

export class Sorting implements ISorting {
  values: SortingTypes[];
  value: SortingTypes;
  updateOptions: (type: controlsTypes, option: SortingTypes) => void;

  constructor (updateOptions: (type: controlsTypes, option: SortingTypes) => void, value?: SortingTypes) {
    this.values = [
      SortingTypes.byAlphabetAsc,
      SortingTypes.byAlphabetDesc,
      SortingTypes.byAmountAsc,
      SortingTypes.byAmountDesc,
      SortingTypes.byYearAsc,
      SortingTypes.byYearDesc
    ];
    this.value = value || SortingTypes.byAlphabetAsc;
    this.updateOptions = updateOptions;
  }

  draw() {
    const container: HTMLSelectElement = create('select', 'sorting', null,
    (document.querySelector('.other-controls') as HTMLElement), ['name', 'sorting']) as HTMLSelectElement;
    this.values.forEach(value => {
      create('option', 'sorting-item', value, container, ['value', value]) as HTMLOptionElement;
    })

    container.addEventListener('change', (e) => {
      this.value = (e.target as HTMLSelectElement).value as SortingTypes;
      this.updateOptions(controlsTypes.sorting, this.value);
    })
  }

  static sort(state: IGood[], value: SortingTypes) {
    switch (value) {
      case SortingTypes.byAlphabetAsc:
        return state.sort((a,b) => a.name.localeCompare(b.name));
      case SortingTypes.byAlphabetDesc:
        return state.sort((a,b) => b.name.localeCompare(a.name));
      case SortingTypes.byAmountAsc:
        return state.sort((a,b) => a.amount - b.amount);
      case SortingTypes.byAmountDesc:
        return state.sort((a,b) => b.amount - a.amount);
      case SortingTypes.byYearAsc:
        return state.sort((a,b) => a.year - b.year);
      case SortingTypes.byYearDesc:
        return state.sort((a,b) => b.year - a.year);
    }
  }
}