import './style.scss';
import Goods, { IGoods } from './scripts/components/Goods';
import state, { IGood } from './scripts/state';
import { ColorsFilter, IColorsFilter } from './scripts/components/filters/ColorsFilter';

const colorFilter = new ColorsFilter(state);
colorFilter.draw();
const goods: IGoods = new Goods();
goods.draw();

