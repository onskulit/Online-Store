import { IGood } from "../state";
import create from '../utils/create';

export interface IGoods {
  goods: IGood[];
  draw(goods: IGood[]): void;
}

class Goods implements IGoods {
  goods: IGood[];

  constructor (goods: IGood[]) {
    this.goods = goods;
  }

  draw(goods: IGood[]) {
    (document.querySelector('.goods') as HTMLElement).innerHTML = '';
    goods.forEach(good => create('div', 'good', `${good.name} / ${good.year}`, 
    (document.querySelector('.goods') as HTMLElement), ['id', good.id.toString()]));
  }
}

export default Goods;