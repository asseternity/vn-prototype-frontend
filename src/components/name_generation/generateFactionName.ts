import { generateFirstName } from './generateFirstName';
import data from './json/faction_name_parts.json';

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateFactionName = (): string => {
  const suffix: string = data.suffixes[rand(0, data.suffixes.length - 1)];
  const prefix: string = data.prefixes[rand(0, data.prefixes.length - 1)];
  const first_word: string =
    data.first_words[rand(0, data.first_words.length - 1)];
  const second_word: string =
    data.second_words[rand(0, data.second_words.length - 1)];
  const generated_proper_noun: string = generateFirstName(2, 8);
  let name = `${prefix} ${first_word} ${second_word}`;

  const chance = rand(0, 30);

  switch (chance) {
    case 1: // Prefix
      const apostrophe = prefix.includes("'");
      if (apostrophe) {
        name = `${prefix} ${first_word}`;
      } else {
        name = `${prefix}`;
      }
      break;

    case 2: // FirstWord
      name = `${first_word}`;
      break;

    case 3: // SecondWord
      name = `${second_word}`;
      break;

    case 4: // Suffix
      name = `${first_word} ${suffix}`;
      break;

    case 5: // GeneratedProperNoun
      name = `${generated_proper_noun}`;
      break;

    // Two-part combinations
    case 6: // Prefix_FirstWord
      name = `${prefix} ${first_word}`;
      break;

    case 7: // Prefix_SecondWord
      name = `${prefix} ${second_word}`;
      break;

    case 8: // Prefix_Suffix
      name = `${prefix} ${suffix}`;
      break;

    case 9: // Prefix_GeneratedProperNoun
      name = `${prefix} ${generated_proper_noun}`;
      break;

    case 10: // FirstWord_SecondWord
      name = `${first_word} ${second_word}`;
      break;

    case 11: // FirstWord_Suffix
      name = `${first_word} ${suffix}`;
      break;

    case 12: // FirstWord_GeneratedProperNoun
      name = `${first_word} ${generated_proper_noun}`;
      break;

    case 13: // SecondWord_Suffix
      name = `${second_word} ${suffix}`;
      break;

    case 14: // SecondWord_GeneratedProperNoun
      name = `${second_word} ${generated_proper_noun}`;
      break;

    case 15: // GeneratedProperNoun_Suffix
      name = `${generated_proper_noun} ${suffix}`;
      break;

    // Three-part combinations
    case 16: // Prefix_FirstWord_SecondWord
      name = `${prefix} ${first_word} ${second_word}`;
      break;

    case 17: // Prefix_FirstWord_Suffix
      name = `${prefix} ${first_word} ${suffix}`;
      break;

    case 18: // Prefix_FirstWord_GeneratedProperNoun
      name = `${prefix} ${first_word} ${generated_proper_noun}`;
      break;

    case 19: // Prefix_SecondWord_Suffix
      name = `${prefix} ${second_word} ${suffix}`;
      break;

    case 20: // Prefix_SecondWord_GeneratedProperNoun
      name = `${prefix} ${second_word} ${generated_proper_noun}`;
      break;

    case 21: // Prefix_GeneratedProperNoun_Suffix
      name = `${prefix} ${generated_proper_noun} ${suffix}`;
      break;

    case 22: // FirstWord_SecondWord_Suffix
      name = `${first_word} ${second_word} ${suffix}`;
      break;

    case 23: // FirstWord_SecondWord_GeneratedProperNoun
      name = `${first_word} ${second_word} ${generated_proper_noun}`;
      break;

    case 24: // FirstWord_GeneratedProperNoun_Suffix
      name = `${first_word} ${generated_proper_noun} ${suffix}`;
      break;

    case 25: // SecondWord_GeneratedProperNoun_Suffix
      name = `${second_word} ${generated_proper_noun} ${suffix}`;
      break;

    // Four-part combinations
    case 26: // Prefix_FirstWord_SecondWord_Suffix
      name = `${prefix} ${first_word} ${second_word} ${suffix}`;
      break;

    case 27: // Prefix_FirstWord_SecondWord_GeneratedProperNoun
      name = `${prefix} ${first_word} ${second_word} ${generated_proper_noun}`;
      break;

    case 28: // Prefix_FirstWord_GeneratedProperNoun_Suffix
      name = `${prefix} ${first_word} ${generated_proper_noun} ${suffix}`;
      break;

    case 29: // Prefix_SecondWord_GeneratedProperNoun_Suffix
      name = `${prefix} ${second_word} ${generated_proper_noun} ${suffix}`;
      break;

    case 30: // FirstWord_SecondWord_GeneratedProperNoun_Suffix
      name = `${first_word} ${second_word} ${generated_proper_noun} ${suffix}`;
      break;

    // All five parts
    default:
      name = `${prefix} ${first_word} ${second_word}`;
      break;
  }

  return name;
};
