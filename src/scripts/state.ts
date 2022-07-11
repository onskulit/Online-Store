export interface IGood {
  id: number;
  name: string;
  year: number;
}

const goods: IGood[] = [
  {
    id: 1,
    name: 'Jordan 1',
    year: 2015
  },
  {
    id: 2,
    name: 'Jordan 2',
    year: 2012
  },
  {
    id: 3,
    name: 'Jordan 3',
    year: 2011
  },
  {
    id: 4,
    name: 'Jordan 4',
    year: 2010
  }
]

export default goods;