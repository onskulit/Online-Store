export interface IGood {
  id: number;
  name: string;
  year: number;
  amount: number;
  colors: string[];
  brand: string[];
  height: string[];
  size: string[];
  imgLink: string;
}

const state: IGood[] = [
  {
    id: 1,
    name: 'Vans Authentic',
    year: 2015,
    amount: 4,
    colors: ['black', 'white'],
    brand: ['Vans'],
    height: ['low'],
    size: ['39', '43', '44'],
    imgLink: 'https://sneakers.by/image/cache/data/1C-1/VEE3BLK-300x300.webp'
  },
  {
    id: 2,
    name: 'Anta Dance Battle 1.0',
    year: 2012,
    amount: 4,
    colors: ['white', 'grey'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['36', '37', '40', '41'],
    imgLink: 'https://sneakers.by/image/cache/data/1C-1/812138862-6-300x300.webp'
  },
  {
    id: 3,
    name: 'Adidas Forum 84 Low',
    year: 2022,
    amount: 6,
    colors: ['grey', 'white', 'pink', 'green'],
    brand: ['Adidas'],
    height: ['low'],
    size: ['42', '43', '44'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15102/krossovki-adidas-forum-84-low-gy5723-1-300x300.webp'
  },
  {
    id: 4,
    name: 'Adidas Nite Jogger J',
    year: 2010,
    amount: 3,
    colors: ['white', 'pink'],
    brand: ['Adidas'],
    height: ['mid'],
    size: ['35', '36', '37'],
    imgLink: 'https://sneakers.by/image/cache/data/1C-1/EG6744-300x300.webp'
  },
  {
    id: 5,
    name: 'Fila Venom',
    year: 2010,
    amount: 5,
    colors: ['white', 'red', 'grey'],
    brand: ['Fila'],
    height: ['mid'],
    size: ['34', '35', '40', '41', '42'],
    imgLink: 'https://sneakers.by/image/cache/data/1C-1/5RM00813-426-300x300.webp'
  },
  {
    id: 6,
    name: 'Converse Chuck Taylor All Star',
    year: 2014,
    amount: 10,
    colors: ['black'],
    brand: ['Converse'],
    height: ['low'],
    size: ['36', '37', '42', '44'],
    imgLink: 'https://sneakers.by/image/cache/data/1C-1/M5039C-300x300.webp'
  },
  {
    id: 7,
    name: 'Converse Chuck 70 Hi',
    year: 2000,
    amount: 1,
    colors: ['purple'],
    brand: ['Converse'],
    height: ['high'],
    size: ['35'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15117/kedy-converse-chuck-70-hi-172683c-2-300x300.webp'
  },
  {
    id: 8,
    name: 'Puma X-Ray 2 Square',
    year: 2021,
    amount: 13,
    colors: ['white'],
    brand: ['Puma'],
    height: ['mid'],
    size: ['36', '37', '42', '43', '44', '45'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15113/krossovki-puma-x-ray-2-square-373108-07-1-300x300.webp'
  },
  {
    id: 9,
    name: 'Adidas Ventice Climacool',
    year: 2020,
    amount: 4,
    colors: ['white'],
    brand: ['Adidas'],
    height: ['mid'],
    size: ['36', '37', '42', '44'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15103/krossovki-adidas-ventice-climacool-gz0644-1-300x300.webp'
  },
  {
    id: 10,
    name: 'Adidas Her Court',
    year: 2022,
    amount: 3,
    colors: ['white', 'blue', 'grey'],
    brand: ['Converse'],
    height: ['mid'],
    size: ['35', '36', '37'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15111/krossovki-adidas-her-court-gx3499-1-300x300.webp'
  },
  {
    id: 11,
    name: 'Adidas ZX 2K Boost 2.0',
    year: 2022,
    amount: 10,
    colors: ['white'],
    brand: ['Adidas'],
    height: ['mid'],
    size: ['36', '37', '42', '44'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15110/krossovki-adidas-zx-2k-boost-2-0-trail-gy8503-1-300x300.webp'
  },
  {
    id: 12,
    name: 'Adidas Forum Mid',
    year: 2019,
    amount: 3,
    colors: ['brown', 'grey'],
    brand: ['Adidas'],
    height: ['high'],
    size: ['42', '44'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15104/krossovki-adidas-forum-mid-gy1807-1-300x300.webp'
  },
  {
    id: 13,
    name: 'Fila Reggio',
    year: 2022,
    amount: 4,
    colors: ['grey', 'white'],
    brand: ['Fila'],
    height: ['mid'],
    size: ['36', '37', '42', '44'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15086/krossovki-fila-reggio-ffm0054-13058-1-300x300.webp'
  },
  {
    id: 14,
    name: 'Anta Skateboard China Tea',
    year: 2022,
    amount: 1,
    colors: ['grey', 'brown'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['46'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15080/alt_krossovki-anta-skateboard-china-tea-812228071-6-8-300x300.webp'
  },
  {
    id: 15,
    name: 'Anta Fashion Worship 2.0',
    year: 2022,
    amount: 3,
    colors: ['white'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['36', '37', '38', '39', '42'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15078/krossovki-anta-fashion-worship-2-0-shock-812218860-1-1-300x300.webp'
  },
  {
    id: 16,
    name: 'Anta Shock The Game Alien 3',
    year: 2022,
    amount: 2,
    colors: ['white', 'blue'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['40', '46'],
    imgLink: 'https://sneakers.by/image/cache/data/1C-1/812211601-2-300x300.webp'
  },
  {
    id: 17,
    name: 'Anta Rubik\'s Cube',
    year: 2016,
    amount: 3,
    colors: ['white', 'black'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['40', '44', '46'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15084/krossovki-anta-rubik-s-cube-812138800-3-1-300x300.webp'
  },
  {
    id: 18,
    name: 'Anta Go Crazy 5 Heat Wave',
    year: 2022,
    amount: 15,
    colors: ['black', 'white'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['40', '41', '43', '44', '46'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15075/krossovki-anta-go-crazy-5-heat-wave-3-812131608-3-1-300x300.webp'
  },
  {
    id: 19,
    name: 'Anta Shock The Game Star',
    year: 2022,
    amount: 3,
    colors: ['white', 'grey'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['42', '44'],
    imgLink: 'https://sneakers.by/image/cache/data/1C-1/812211605-1-300x300.webp'
  },
  {
    id: 20,
    name: 'Puma Karmen Shine',
    year: 2018,
    amount: 2,
    colors: ['white'],
    brand: ['Anta'],
    height: ['mid'],
    size: ['36', '37'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/15064/krossovki-puma-karmen-shine-385559-01-1-300x300.webp'
  },
  {
    id: 21,
    name: 'Nike Air Force 1 LV8',
    year: 2022,
    amount: 3,
    colors: ['black', 'white'],
    brand: ['Nike'],
    height: ['mid'],
    size: ['36', '37', '38'],
    imgLink: 'https://sneakers.by/image/cache/catalog/sneakers-pics/13551/nike-air-force-1-lv8-gs-cw1577-002-1-300x300.webp'
  }
]

export default state;