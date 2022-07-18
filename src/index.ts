import './style.scss';
import state from './scripts/state';
import { App } from './scripts/components/App/App';

const app = new App(state);
app.start();

