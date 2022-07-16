import { IGood } from "../../state";
import create from "../../utils/create";
import { controlsTypes } from "../../utils/Enums";

export interface ISearch {
  value: string;
  draw(): void;
  updateOptions: (type: controlsTypes, option: string) => void;
}

export class Search implements ISearch {
  value: string;
  updateOptions: (type: controlsTypes, option: string) => void;

  constructor (updateOptions: (type: controlsTypes, option: string) => void, filteredState?: IGood[], value?: string) {
    this.value = value || '';
    this.updateOptions = updateOptions;
  }

  draw() {
    const container: HTMLElement = create('div', 'search-container', null,
    (document.querySelector('.other-controls') as HTMLElement));
    const search: HTMLInputElement = create('input', 'search', null, container, ['type', 'search'], ['placeholder', 'Search'], ['autofocus', '']) as HTMLInputElement;
    search.addEventListener('keyup', () => {
      this.value = search.value;
      this.updateOptions(controlsTypes.search, this.value);
    })
  }

  static filter(state: IGood[], value: string) {
    return state.filter(good => good.name.toUpperCase().includes(value.toUpperCase()));
  }
}