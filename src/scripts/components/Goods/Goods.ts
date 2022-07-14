import { IGood } from "../../state";
import create from '../../utils/create';

export interface IGoodsContainer {
  goods: IGood[];
  cartValue: number;
  draw(goods: IGood[]): void;
  updateCart(toAdd: boolean): void;
}

class Goods implements IGoodsContainer {
  goods: IGood[];
  cartValue: number;

  constructor (goods: IGood[], cartValue?: number) {
    this.goods = goods;
    this.cartValue = cartValue || 0;
  }

  draw(goods: IGood[]) {
    const goodsContainer = (document.querySelector('.goods') as HTMLElement);
    goodsContainer.innerHTML = '';
    if (!goods.length) {
      goodsContainer.innerHTML = 'No such items found';
    }
    goods.forEach(good => {
      const item: HTMLElement = create('div', 'good', `<h3> ${good.name} </h3>`, 
      goodsContainer, ['id', good.id.toString()]);
      const img: HTMLImageElement = create('img', 'good-img', null, item) as HTMLImageElement;
      img.src = good.imgLink;
      create('ul', 'good-info', null, item) as HTMLImageElement;
      Object.entries(good).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'name' && key !== 'imgLink')
        create('li', 'good-info__item', `<b> ${key}: </b> ${value}`, item) as HTMLElement;
      })
    })
    goodsContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.good')) {
        const good = target.closest('.good') as HTMLElement;
        good.classList.toggle('active');
        this.updateCart(good.classList.contains('active'));
      }
    })
  }

  updateCart(toAdd: boolean): void {
    const cart = document.querySelector('.shopping-cart') as HTMLElement;
    const cartValue = document.querySelector('.shopping-cart__amount') as HTMLElement;
    if (toAdd) {
      if (!this.cartValue) {
        cart.classList.add('active');
      }
      if (this.cartValue === 19) {
        alert('Unfortunately, we can\'t deliver more then 20 positions');
        return;
      }
      this.cartValue++;
      cartValue.textContent = this.cartValue.toString();
    } else {
      this.cartValue--;
      if (!this.cartValue) {
        cartValue.textContent = '';
        cart.classList.remove('active');
      } else {
        cartValue.textContent = this.cartValue.toString();
      }
    }
  }
}

export default Goods;