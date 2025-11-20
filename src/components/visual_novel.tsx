// dependencies
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// components
import DialogueBox from './visual_novel/dialogue_box';
import Portrait from './visual_novel/portrait';
import { getCharacter } from './visual_novel/get_character';

// types
import type {
  Line,
  LineChainNode,
  ChoiceNode,
  SplitNode,
  Node,
  Character,
} from './visual_novel/master_types';

type CharacterRecency = {
  char: Character;
  clicksago: number;
};

type VisualNovelProps = {
  startingLineChainNode: LineChainNode;
  bgImagePath: string;
  allCharacters: Character[];
};

// game
function VisualNovel({
  startingLineChainNode,
  bgImagePath,
  allCharacters,
}: VisualNovelProps) {
  const [lineChainNode, setLineChainNode] = useState<LineChainNode>(
    startingLineChainNode
  );
  const [index, setIndex] = useState<number>(0);
  const [characters, setCharacters] = useState<Character[]>(allCharacters);
  const [characterRecencies, setCharacterRecencies] = useState<
    CharacterRecency[]
  >([]);
  const [visiblePortraits, setVisiblePortraits] = useState<Character[]>([]);

  const advance = () => {
    const currentIndex = index;

    if (currentIndex < lineChainNode.lines.length) {
      const nextIndex = currentIndex + 1; // local, reliable, synchronous
      const nextLine = lineChainNode.lines[nextIndex];
      const speakerId = nextLine?.speakerId;

      // determine the character for THIS upcoming line
      const char = getCharacter(characters, speakerId);

      // update recencies
      let alreadyExists = false;
      const updatedRecencies = characterRecencies.map((entry) => {
        if (entry.char.id === speakerId) {
          alreadyExists = true;
          return { ...entry, clicksago: 0 };
        }
        return { ...entry, clicksago: entry.clicksago + 1 };
      });

      if (!alreadyExists) {
        updatedRecencies.push({ char, clicksago: 0 });
      }

      // update portraits based on the *new* speaker we just looked up
      let updatedVisiblePortraits = [...visiblePortraits];

      if (!updatedVisiblePortraits.some((p) => p.id === char.id)) {
        if (updatedVisiblePortraits.length < 2) {
          updatedVisiblePortraits.push(char);
        } else {
          const getClicks = (id: string) =>
            updatedRecencies.find((r) => r.char.id === id)?.clicksago ?? 999;

          const [left, right] = updatedVisiblePortraits;
          const replaceLeft = getClicks(left.id) > getClicks(right.id);

          if (replaceLeft) {
            updatedVisiblePortraits[0] = char;
          } else {
            updatedVisiblePortraits[1] = char;
          }
        }
      }

      // now safely commit the state updates
      setIndex(nextIndex);
      setCharacterRecencies(updatedRecencies);
      setVisiblePortraits(updatedVisiblePortraits);

      return;
    }

    // handle end of chain
  };

  return (
    <div
      className="bg-white rounded-xl shadow-xl p-4 w-[600px] h-[400px] bg-cover"
      style={{ backgroundImage: `url(${bgImagePath})` }}
    >
      <div className="relative w-full h-full">
        <AnimatePresence>
          {visiblePortraits.map((char, i) => (
            <Portrait
              key={char.id}
              spritePath={char.portrait}
              className={
                i === 0
                  ? `
      bottom-0
      left-1/2 -translate-x-1/2
      -ml-[20vw] sm:-ml-[15vw] md:-ml-[12vw] lg:-ml-[10vw]
    `
                  : `
      bottom-0
      left-1/2 -translate-x-1/2
      ml-[20vw] sm:ml-[15vw] md:ml-[12vw] lg:ml-[10vw]
    `
              }
              active={char.id === lineChainNode?.lines[index]?.speakerId}
            />
          ))}
        </AnimatePresence>
        <DialogueBox
          name={
            getCharacter(characters, lineChainNode?.lines[index]?.speakerId)
              .name
          }
          text={lineChainNode.lines[index]?.text || '...'}
          onContinue={advance}
        />
      </div>
    </div>
  );
}

export default VisualNovel;
