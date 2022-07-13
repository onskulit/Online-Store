import { IGood } from "../../state";
import create from "../../utils/create";

export interface ISearch {
  goods: IGood[];
  filteredState: IGood[];
  value: string;
  draw(): void;
  filter(): void;
  changeListener: (state: IGood[]) => void;
  onChangeFilter(): void;
  updateState(state: IGood[]): void;
}

export class Search implements ISearch {
  goods: IGood[];
  filteredState: IGood[];
  value: string;
  changeListener: (state: IGood[]) => void;

  constructor (goods: IGood[], changeListener: (state: IGood[]) => void, filteredState?: IGood[], value?: string) {
    this.goods = goods;
    this.filteredState = filteredState || this.goods;
    this.value = value || '';
    this.changeListener = changeListener;
  }

  draw() {
    const container: HTMLElement = create('div', 'search-container', null,
    (document.querySelector('.controls') as HTMLElement));
    const search: HTMLInputElement = create('input', 'search', null, container, ['type', 'search'], ['placeholder', 'Search'], ['autofocus', '']) as HTMLInputElement;
    search.addEventListener('keyup', () => {
      this.value = search.value;
      console.log(search.value);
      this.onChangeFilter();
      this.changeListener(this.filteredState);
    })
  }

  filter() {
    if (!this.value) {
      this.filteredState = this.goods;
    } else {
      this.filteredState = this.goods
      .filter(good => good.name.toUpperCase().includes(this.value.toUpperCase()));
    }
  }

  onChangeFilter() {
      this.filter();
    }

    updateState(state: IGood[]): void {
      this.filteredState = state;
    }
}