import castleImg from '/castle.svg';
import templeImg from '/temple.svg';
import forestImg from '/forest.svg';
import mountainImg from '/mountain.svg';

import castles from '../data/castle.json';
import temples from '../data/temple.json';
import forests from '../data/forest.json';
import mountains from '../data/mountain.json';
import plains from '../data/plains.json';

export const TILE_KINDS = {
  empty: {
    image: null,
    namePool: plains,
    populationRange: [1, 500],
    weights: { forests: 20, mountains: 20, plains: 60 },
    fontSize: 10,
    baseFill: '#88cc88',
  },

  castle: {
    image: castleImg,
    namePool: castles,
    populationRange: [1000, 10000],
    weights: null,
    fontSize: 10,
    baseFill: '#88cc88',
  },

  temple: {
    image: templeImg,
    namePool: temples,
    populationRange: [1000, 10000],
    weights: null,
    fontSize: 10,
    baseFill: '#88cc88',
  },

  forest: {
    image: forestImg,
    namePool: forests,
    populationRange: [1, 500],
    weights: { forests: 60, mountains: 20, plains: 20 },
    fontSize: 10,
    baseFill: '#88cc88',
  },

  mountain: {
    image: mountainImg,
    namePool: mountains,
    populationRange: [1, 500],
    weights: { mountains: 60, forests: 20, plains: 20 },
    fontSize: 10,
    baseFill: '#88cc88',
  },
};
