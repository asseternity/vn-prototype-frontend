import type { Character } from './master_types';

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
