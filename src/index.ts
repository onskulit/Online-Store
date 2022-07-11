import './style.scss';
import create from './scripts/utils/create';
import goods from './scripts/state';

goods.forEach(good => create('div', 'good', `${good.name} / ${good.year}`, (document.querySelector('.goods') as HTMLElement), ['id', good.id.toString()]))