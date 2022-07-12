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
    goods.forEach(good => {
      const item: HTMLElement = create('div', 'good', `${good.name} / ${good.year}`, 
      (document.querySelector('.goods') as HTMLElement), ['id', good.id.toString()]);
      const img: HTMLImageElement = create('img', 'good-img', null, item) as HTMLImageElement;
      img.src = good.imgLink;
    })
  }
}

export default Goods;