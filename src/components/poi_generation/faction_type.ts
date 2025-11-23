import type { Character } from './character_type';

export type Faction = {
  id: number;
  name: string;
  leader: Character;
  color_hex: string;
  numbers: number;
};
