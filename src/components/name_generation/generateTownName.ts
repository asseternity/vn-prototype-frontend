import { generateFirstName } from './generateFirstName';
import data from './json/city_name_parts.json';

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateTownName = (): string => {
  const suffix: string = data.suffixes[rand(0, data.suffixes.length - 1)];
  const prefix: string = data.prefixes[rand(0, data.prefixes.length - 1)];
  let name = generateFirstName(2, 8);

  const chance = rand(0, 100);
  if (chance < 50) {
    name = name + suffix;
  }
  if (chance < 30) {
    name = prefix + ' ' + name;
  }
  return name;
};
