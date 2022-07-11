import './style.scss';
import create from './scripts/utils/create';

interface Good {
  id: number;
  name: string;
  year: number;
}

const goods: Good[] = [
  {
    id: 1,
    name: 'Jordan 1',
    year: 2015
  },
  {
    id: 2,
    name: 'Jordan 2',
    year: 2012
  }
]

goods.forEach(good => create('div', 'good', `${good.name} / ${good.year}`, (document.querySelector('.goods') as HTMLElement), ['id', good.id.toString()]))