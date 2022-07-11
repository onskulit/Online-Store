export interface IGood {
  id: number;
  name: string;
  year: number;
  colors: string[];
}

const goods: IGood[] = [
  {
    id: 1,
    name: 'Jordan 1',
    year: 2015,
    colors: ['black'],
  },
  {
    id: 2,
    name: 'Jordan 2',
    year: 2012,
    colors: ['red', 'green'],
  },
  {
    id: 3,
    name: 'Jordan 3',
    year: 2011,
    colors: ['red'],
  },
  {
    id: 4,
    name: 'Jordan 4',
    year: 2010,
    colors: ['grey'],
  },
  {
    id: 5,
    name: 'Jordan 5',
    year: 2010,
    colors: ['grey', 'pink'],
  }
]

export default goods;