import { generateCharacterName } from '../name_generation/generateCharacterName';
import { generatePortrait } from '../portrait_generation/portrait_generator';
import type { Character } from './character_type';
import backup from '/Multiavatar-Pechorin Bloom.png';

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateCharacter = (): Character => {
  const charName = generateCharacterName();
  const charPortrait = generatePortrait(charName);
  return {
    id: 0,
    name: generateCharacterName(),
    relationship_with_player: 0,
    strength: rand(3, 20),
    dexterity: rand(3, 20),
    constitution: rand(3, 20),
    intelligence: rand(3, 20),
    wisdom: rand(3, 20),
    charisma: rand(3, 20),
    portrait: charPortrait ? charPortrait : backup,
  };
};
