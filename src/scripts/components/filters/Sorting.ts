import { IGood } from "../../state";
import create from "../../utils/create";

enum SortingTypes {
  byAlphabetAsc = 'By name, A to Z',
  byAlphabetDesc = 'By name, Z to A',
  byYearAsc = 'By year, ascending',
  byYearDesc = 'By year, descending',
  byAmountAsc = 'By amount, ascending',
  byAmountDesc = 'By amount, descending'
}

export interface ISorting {
  goods: IGood[];
  filteredState: IGood[];
  values: SortingTypes[];
  value: SortingTypes;
  draw(): void;
  filter(): void;
  changeListener: (state: IGood[]) => void;
  onChangeFilter(): void;
  updateState(state: IGood[]): void;
}

export class Sorting implements ISorting {
  goods: IGood[];
  filteredState: IGood[];
  values: SortingTypes[];
  value: SortingTypes;
  changeListener: (state: IGood[]) => void;

  constructor (goods: IGood[], changeListener: (state: IGood[]) => void, filteredState?: IGood[], value?: SortingTypes) {
    this.goods = goods;
    this.filteredState = filteredState || this.goods;
    this.values = [
      SortingTypes.byAlphabetAsc,
      SortingTypes.byAlphabetDesc,
      SortingTypes.byAmountAsc,
      SortingTypes.byAmountDesc,
      SortingTypes.byYearAsc,
      SortingTypes.byYearDesc
    ];
    this.value = value || SortingTypes.byAlphabetAsc;
    this.changeListener = changeListener;
  }

  draw() {
    const container: HTMLSelectElement = create('select', 'sorting', null,
    (document.querySelector('.other-controls') as HTMLElement), ['name', 'sorting']) as HTMLSelectElement;
    this.values.forEach(value => {
      create('option', 'sorting-item', value, container, ['value', value]) as HTMLOptionElement;
    })

    container.addEventListener('change', (e) => {
      this.value = (e.target as HTMLSelectElement).value as SortingTypes;
      this.onChangeFilter();
      this.changeListener(this.filteredState);
    })
  }

  filter() {
    switch (this.value) {
      case SortingTypes.byAlphabetAsc:
        this.filteredState = this.goods.sort((a,b) => a.name.localeCompare(b.name));
        break;
      case SortingTypes.byAlphabetDesc:
        this.filteredState = this.goods.sort((a,b) => b.name.localeCompare(a.name));
        break;
      case SortingTypes.byAmountAsc:
        this.filteredState = this.goods.sort((a,b) => a.amount - b.amount);
        break;
      case SortingTypes.byAmountDesc:
        this.filteredState = this.goods.sort((a,b) => b.amount - a.amount);
        break;
      case SortingTypes.byYearAsc:
        this.filteredState = this.goods.sort((a,b) => a.year - b.year);
        break;
      case SortingTypes.byYearDesc:
        this.filteredState = this.goods.sort((a,b) => b.year - a.year);
        break;
    }
  }

  onChangeFilter() {
      this.filter();
  }

  updateState(state: IGood[]): void {
    this.filteredState = state;
  }
}