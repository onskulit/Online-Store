import { IGood } from "../../state";
import create from '../../utils/create';
import { controlsTypes } from "../../utils/Enums";

enum cartUpdateMethod {
  add,
  remove,
  update
}

export interface IGoodsContainer {
  goods: IGood[];
  cartItems: number[];
  cartValue: number;
  draw(goods: IGood[]): void;
  updateCart(method: cartUpdateMethod): void;
  getCartValue(): number;
  updateOptions: (type: controlsTypes, option: number[]) => void;
}

class Goods implements IGoodsContainer {
  goods: IGood[];
  cartItems: number[];
  cartValue: number;
  updateOptions: (type: controlsTypes, option: number[]) => void;

  constructor (state: IGood[], cartItems: number[], updateOptions: (type: controlsTypes, option: number[]) => void) {
    this.goods = state;
    this.cartItems = cartItems;
    this.cartValue = this.getCartValue();
    this.updateOptions = updateOptions;
  }

  draw(goods: IGood[]) {
    const goodsContainer = (document.querySelector('.goods') as HTMLElement);
    goodsContainer.innerHTML = '';
    if (!goods.length) {
      goodsContainer.innerHTML = 'No such items found';
    }
    goods.forEach(good => {
      const item: HTMLElement = create('div', 'good', `<h3> ${good.name} </h3>`, 
      goodsContainer, ['data-id', good.id.toString()]);
      console.log(this.cartItems);
      if (this.cartItems.includes(good.id)) {
        item.classList.add('active');
      }
      const img: HTMLImageElement = create('img', 'good-img', null, item) as HTMLImageElement;
      img.src = good.imgLink;
      create('ul', 'good-info', null, item) as HTMLImageElement;
      Object.entries(good).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'name' && key !== 'imgLink')
        create('li', 'good-info__item', `<b> ${key}: </b> ${value}`, item) as HTMLElement;
      });
      item.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.good')) {
          const good = target.closest('.good') as HTMLElement;
          const currentId = +(good.dataset.id as string);
          if (good.classList.contains('active')) {
            good.classList.remove('active');
            this.cartItems = this.cartItems.filter(id => currentId !== id);
            this.updateCart(cartUpdateMethod.remove);
          } else {
            good.classList.add('active');
            this.cartItems.push(currentId);
            this.updateCart(cartUpdateMethod.add);
          }
          this.updateOptions(controlsTypes.cart, this.cartItems);
        }
      })
    })
    this.updateCart(cartUpdateMethod.update);
  }

  updateCart(method: cartUpdateMethod): void {
    const cart = document.querySelector('.shopping-cart') as HTMLElement;
    const cartValue = document.querySelector('.shopping-cart__amount') as HTMLElement;
    switch (method) {
      case cartUpdateMethod.update:
        if(this.cartValue > 0) {
          cart.classList.add('active');
          cartValue.textContent = this.cartValue.toString();
        }
        break;
      case cartUpdateMethod.add:
        if (!this.cartValue) {
          cart.classList.add('active');
        }
        if (this.cartValue === 19) {
          alert('Unfortunately, we can\'t deliver more then 20 positions');
          return;
        }
        this.cartValue++;
        cartValue.textContent = this.cartValue.toString();
        break;
      case cartUpdateMethod.remove:
        this.cartValue--;
        if (!this.cartValue) {
          cartValue.textContent = '';
          cart.classList.remove('active');
        } else {
          cartValue.textContent = this.cartValue.toString();
        }
        break;
    }
  }

  getCartValue(): number {
    return this.cartItems.length;
  }
}

export default Goods;