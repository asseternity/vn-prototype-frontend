// dependencies
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// components
import Background from '../components/background';
import DialogueBox from '../components/dialogue_box';
import Portrait from '../components/portrait';
import { getCharacter } from '@/lib/get_character';

// assets
import bg_test from '/bg_test.jpg';

// types
import type {
  Line,
  LineChainNode,
  ChoiceNode,
  SplitNode,
  Node,
  Character,
} from '../lib/master_types';

type CharacterRecency = {
  char: Character;
  clicksago: number;
};

type GameProps = {
  username: string;
};

// testing story nodes
const line_chain_node_test: LineChainNode = {
  id: 'test-1',
  type: 'line',
  lines: [
    {
      speakerId: 'narrator',
      text: 'First day back at Eastbridge High. Same chipped lockers, same flickering lights, same feeling in your stomach.',
    },
    {
      speakerId: 'narrator',
      text: 'The bell shrieks. Crowds surge toward the cafeteria like it’s a battlefield.',
    },
    {
      speakerId: 'narrator',
      text: 'Some other third line whatever.',
    },
  ],
  endingNodeId: 'choice-lunch-table',
};

// game
function Game({ username }: GameProps) {
  const [lineChainNode, setLineChainNode] = useState<LineChainNode>(
    line_chain_node_test!
  );
  const [index, setIndex] = useState<number>(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterRecencies, setCharacterRecencies] = useState<
    CharacterRecency[]
  >([]);
  const [visiblePortraits, setVisiblePortraits] = useState<Character[]>([]);

  useEffect(() => {
    // fetch characters on load
  });

  const advance = () => {
    if (index < lineChainNode?.lines.length) {
      const currentIndex = index;
      const nextIndex = index + 1;
      const currentLine = lineChainNode.lines[currentIndex];
      setIndex(nextIndex);

      const recency = characterRecencies.find(
        (c) => c.char.id === currentLine?.speakerId
      );
      const char: Character = getCharacter(characters, currentLine.speakerId);
      if (!recency) {
        const recency_object = { char: char, clicksago: 0 };
        characterRecencies.push(recency_object);
      } else {
        recency.clicksago++;
      }
      // add + 1 to every recency that isn't ours
      characterRecencies.forEach((r) => {
        if (r.char.id !== currentLine.speakerId) r.clicksago += 1;
      });
      if (visiblePortraits.length < 2) {
        visiblePortraits.push(char);
      } else {
        // find which of the two currently visible characters has the highest clicksago
        let oldestIndex = 0;
        let oldestClicks = -1;
        visiblePortraits.forEach((visibleChar, i) => {
          const recencyEntry = characterRecencies.find(
            (r) => r.char.id === visibleChar.id
          );
          const clicks = recencyEntry ? recencyEntry.clicksago : 999;
          if (clicks > oldestClicks) {
            oldestClicks = clicks;
            oldestIndex = i;
          }
        });
        // replace exactly that slot with the new speaker (position stays the same)
        visiblePortraits[oldestIndex] = char;
      }

      // Force React to see the change (we mutated the array)
      setVisiblePortraits([...visiblePortraits]);
    } else {
      // handle choice line or split line fetch
    }
  };

  return (
    <div className="h-full w-full">
      <h1 className="absolute z-10 text-white p-5">{username}</h1>
      <div className="relative w-full h-full">
        <Background imgPath={bg_test} />
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
              active={char.id === lineChainNode.lines[index].speakerId}
            />
          ))}
        </AnimatePresence>
        <DialogueBox
          name={
            getCharacter(characters, lineChainNode.lines[index]?.speakerId).name
          }
          text={lineChainNode.lines[index]?.text || '...'}
          onContinue={advance}
        />
      </div>
    </div>
  );
}

export default Game;
