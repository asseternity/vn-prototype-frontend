// utils
import { generateFirstName } from './name_generator';
import { pickRandomFromArray } from './json_pickers';
import {
  CastleTile,
  EmptyTile,
  ForestTile,
  MountainTile,
  TempleTile,
} from './tiles/index.tsx';
import type { TileDOM } from './tiles/TileDOM';

// data
import castles from './data/castle.json';
import forest from './data/forest.json';
import mountain from './data/mountain.json';
import plains from './data/plains.json';
import temple from './data/temple.json';

const pickWeightedRandomTile = (
  populationPercentage: number,
  climateType: string
): React.FC<TileDOM> => {
  const populationRoll = Math.floor(Math.random() * 100) + 1;
  if (populationRoll < populationPercentage) {
    const settlementType = Math.floor(Math.random() * 2);
    if (settlementType == 0) {
      return CastleTile;
    } else {
      return TempleTile;
    }
  } else {
    const geographyType = Math.floor(Math.random() * 100) + 1;
    switch (climateType) {
      case 'mountains':
        if (geographyType <= 60) {
          return MountainTile;
        } else {
          const geographyType2 = Math.floor(Math.random() * 2);
          if (geographyType2 == 0) {
            return ForestTile;
          } else {
            return EmptyTile;
          }
        }
      case 'forests':
        if (geographyType <= 60) {
          return ForestTile;
        } else {
          const geographyType2 = Math.floor(Math.random() * 2);
          if (geographyType2 == 0) {
            return MountainTile;
          } else {
            return EmptyTile;
          }
        }
      default:
        if (geographyType <= 60) {
          return EmptyTile;
        } else {
          const geographyType2 = Math.floor(Math.random() * 2);
          if (geographyType2 == 0) {
            return ForestTile;
          } else {
            return MountainTile;
          }
        }
    }
  }
};

// TileDOM = what you pass into a tile when rendering it, SO: **ONLY THINGS THAT WILL SHOW UP ON THE TILE IMAGE**
// TileMetadata = what you store in your map state, SO: **METADATA**
interface TileMetadata {
  id: number;
  Tile: React.FC<TileDOM>;
  coords: { q: number; r: number; s: number };
  name: string;
  description: string;
  geography: string;
  favor: number;
  awareness: number;
  resources: number;
  population: number;
  fillColor: string;
  onClick: (name: string, description: string) => void;
}

export default async function generateRandomHexMap(
  radius: number,
  populationLevels: number,
  climateType: string,
  onTileClick: Function
): Promise<TileMetadata[]> {
  const tiles: TileMetadata[] = [];
  let id = 0;

  // common themes to each world that inform the generation
  // population - likelihood of castles or temples
  // climate - if not a castle or a temple - split between plains, mountains, forests

  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      const s = -q - r;
      if (Math.abs(s) <= radius) {
        const firstName = await generateFirstName();
        let geographyName = '';

        let favor: number = 0;
        let awareness: number = 0;
        let resources: number = 0;
        let population: number = 0;

        const Tile = pickWeightedRandomTile(populationLevels, climateType);
        let geography = 'Geography!';
        switch (Tile) {
          case CastleTile:
            geography = 'castle';
            population = Math.floor(Math.random() * 10000) + 1;
            geographyName = pickRandomFromArray(castles);
            break;
          case TempleTile:
            geography = 'temple';
            population = Math.floor(Math.random() * 10000) + 1;
            geographyName = pickRandomFromArray(temple);
            break;
          case ForestTile:
            geography = 'forest';
            population = Math.floor(Math.random() * 500) + 1;
            geographyName = pickRandomFromArray(forest);
            break;
          case MountainTile:
            geography = 'mountain';
            population = Math.floor(Math.random() * 500) + 1;
            geographyName = pickRandomFromArray(mountain);
            break;
          default:
            geography = 'plains';
            population = Math.floor(Math.random() * 500) + 1;
            geographyName = pickRandomFromArray(plains);
            break;
        }

        let fillColor = '#88cc88';

        if (population > 5000) {
          fillColor = '#056608';
        } else if (population > 1000) {
          fillColor = '#2e8857';
        } else {
          fillColor = '#88cc88';
        }

        const finalName = `${firstName} ${geographyName}`;
        const description = 'Description!';

        tiles.push({
          id: id++,
          Tile,
          coords: { q, r, s },
          name: finalName,
          description: description,
          geography: geography,
          favor: favor,
          awareness: awareness,
          resources: resources,
          population: population,
          fillColor: fillColor,
          onClick: () => {},
        });
      }
    }
  }

  return tiles;
}
