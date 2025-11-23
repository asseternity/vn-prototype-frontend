import { generateCharacter } from './character_generator';
import { generateTownName } from '../name_generation/generateTownName';
import type { Town } from './town_type';

export const GenerateTown = (): Town => {
  return {
    id: 0,
    name: generateTownName(),
    mayor: generateCharacter(),
    // faction:
    prosperity: 0,
    population: 0,
    isFactionCapital: false,
  };
};
