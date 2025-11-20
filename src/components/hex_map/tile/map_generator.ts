import { TILE_KINDS } from './tile_kinds.ts';
import { pickRandomFromArray } from './json_pickers.ts';
import { generateFirstName } from './name_generator.ts';

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export async function generateMap(
  radius: number,
  populationChance: number,
  climate: string
) {
  const tiles = [];
  let id = 0;

  const settlementKinds = Object.entries(TILE_KINDS)
    .filter(([k, v]) => v.weights === null)
    .map(([k, v]) => ({ kind: k, ...v }));

  const terrainKinds = Object.entries(TILE_KINDS)
    .filter(([k, v]) => v.weights !== null)
    .map(([k, v]) => ({ kind: k, ...v }));

  const pickSettlement = () =>
    settlementKinds[rand(0, settlementKinds.length - 1)];

  const pickTerrain = () => {
    const weighted = terrainKinds.flatMap((t) =>
      Array((t.weights as Record<string, number>)[climate] || 0).fill(t)
    );
    return weighted[rand(0, weighted.length - 1)];
  };

  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      const s = -q - r;
      if (Math.abs(s) > radius) continue;

      const isSettlement = rand(1, 100) <= populationChance;
      const type = isSettlement ? pickSettlement() : pickTerrain();

      const [minPop, maxPop] = type.populationRange;
      const population = rand(minPop, maxPop);

      const fillColor =
        population > 5000
          ? '#056608'
          : population > 1000
            ? '#2e8857'
            : type.baseFill;

      const name = `${await generateFirstName()} ${pickRandomFromArray(
        type.namePool
      )}`;

      tiles.push({
        id: id++,
        kind: type.kind,
        q,
        r,
        s,
        name,
        description: 'Description!',
        population,
        fillColor,
        favor: 0,
        awareness: 0,
        resources: 0,
      });
    }
  }

  return tiles;
}
