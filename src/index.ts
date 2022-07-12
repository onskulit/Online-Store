import './style.scss';
import Goods, { IGoods } from './scripts/components/Goods';
import state, { IGood } from './scripts/state';
import { App } from './scripts/components/App/App';

const app = new App(state);
app.draw();
export const goodsContainer: IGoods = new Goods(state);
goodsContainer.draw(state);

