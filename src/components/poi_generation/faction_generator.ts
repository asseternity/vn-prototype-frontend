import { generateFactionName } from '../name_generation/generateFactionName';
import { generateCharacter } from './character_generator';
import type { Faction } from './faction_type';

export const GenerateFaction = (): Faction => {
  return {
    id: 0,
    name: generateFactionName(),
    leader: generateCharacter(),
    color_hex: '',
    numbers: 0,
  };
};
