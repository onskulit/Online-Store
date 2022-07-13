import { IGood } from "../../state";
import create from '../../utils/create';

export interface IGoodsContainer {
  goods: IGood[];
  draw(goods: IGood[]): void;
}

class Goods implements IGoodsContainer {
  goods: IGood[];

  constructor (goods: IGood[]) {
    this.goods = goods;
  }

  draw(goods: IGood[]) {
    (document.querySelector('.goods') as HTMLElement).innerHTML = '';
    if (!goods.length) {
      (document.querySelector('.goods') as HTMLElement).innerHTML = 'No such items found';
    }
    goods.forEach(good => {
      const item: HTMLElement = create('div', 'good', `${good.name}`, 
      (document.querySelector('.goods') as HTMLElement), ['id', good.id.toString()]);
      const img: HTMLImageElement = create('img', 'good-img', null, item) as HTMLImageElement;
      img.src = good.imgLink;
      const info: HTMLElement = create('ul', 'good-info', null, item) as HTMLImageElement;
      Object.entries(good).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'name' && key !== 'imgLink')
        create('li', 'good-info__item', `${key}: ${value}`, item) as HTMLElement;
      })
    })
  }
}

export default Goods;