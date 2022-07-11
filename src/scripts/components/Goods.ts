import goods, { IGood } from "../state";
import create from '../utils/create';

export interface IGoods {
  goods: IGood[];
  draw(): void;
}

class Goods implements IGoods {
  goods: IGood[];

  constructor () {
    this.goods = goods;
  }

  draw() {
    goods.forEach(good => create('div', 'good', `${good.name} / ${good.year}`, (document.querySelector('.goods') as HTMLElement), ['id', good.id.toString()]));
  }
}

export default Goods;