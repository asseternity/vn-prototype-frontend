import type { Faction } from './faction_type';
import type { Character } from './character_type';

export type Town = {
  id: number;
  name: string;
  mayor: Character;
  faction?: Faction;
  prosperity: number;
  population: number;
  isFactionCapital: boolean;
};
