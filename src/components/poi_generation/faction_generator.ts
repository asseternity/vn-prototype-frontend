import { generateFactionName } from '../name_generation/generateFactionName';
import { generateCharacterName } from '../name_generation/generateCharacterName';
import type { Faction } from './faction_type';

export const GenerateFaction = (): Faction => {
  return {
    id: 0,
    name: generateFactionName(),
    leader_name: generateCharacterName(),
    color_hex: '',
    numbers: 0,
  };
};
