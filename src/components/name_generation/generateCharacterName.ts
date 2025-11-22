import { generateFirstName } from './generateFirstName';
import data from './json/name_suffixes.json';

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateCharacterName = () => {
  const firstName = generateFirstName(2, 8);
  const lastNameBase = generateFirstName(3, 9);
  const lastNameSuffix: string =
    data.suffixes[rand(0, data.suffixes.length - 1)];
  const lastName = lastNameBase + lastNameSuffix;
  return `${firstName} ${lastName}`;
};
