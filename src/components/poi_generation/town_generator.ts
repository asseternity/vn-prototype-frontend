import { generateTownName } from '../name_generation/generateTownName';
import { generateCharacterName } from '../name_generation/generateCharacterName';
import type { Town } from './town_type';

export const GenerateTown = (): Town => {
  return {
    id: 0,
    name: generateTownName(),
    mayor_name: generateCharacterName(),
    // faction:
    prosperity: 0,
    population: 0,
    isFactionCapital: false,
  };
};
