import create from "../../utils/create";
import { controlsTypes } from "../../utils/Enums";

export interface IResetSettings {
  draw(): void;
  updateOptions: (type: controlsTypes) => void;
}

export class ResetSettings implements IResetSettings {
  updateOptions: (type: controlsTypes) => void;

  constructor (updateOptions: (type: controlsTypes) => void) {
    this.updateOptions = updateOptions;
  }

  draw() {
    let container = document.querySelector('.reset-buttons-container');
    if (!container) {
      container = create('div', 'reset-buttons-container', null,
        (document.querySelector('.other-controls') as HTMLElement));
    }
    const button: HTMLElement = create('button', 'button reset-button', 'Reset Settings', container as HTMLElement);
    button.addEventListener('click', () => {
      this.updateOptions(controlsTypes.resetSettings);
    })
  }
}