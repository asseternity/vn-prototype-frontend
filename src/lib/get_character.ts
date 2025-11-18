import type { Character } from '../lib/master_types';

export const getCharacter = (
  allCharacters: Character[],
  id: string
): Character => {
  const char = allCharacters.find((c) => c.id === id);
  if (!char) {
    return { id: '', name: '', portrait: '' };
  } else {
  }
  return char;
};
