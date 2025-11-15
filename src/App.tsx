// dependencies
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// components
import Background from './components/background';
import DialogueBox from './components/dialogue_box';
import Portrait from './components/portrait';
import { VNScript, Character } from './lib/vn_objects';

// assets
import bg_test from '/bg_test.jpg';
import { script } from './lib/vn_script';

// types
import type { VNLine } from './lib/vn_objects';
type TestResponse = {
  message: string;
};

const firstLine = script.flipLine();

function App() {
  const [data, setData] = useState<TestResponse | null>(null);
  const [currentLine, setCurrentLine] = useState<VNLine | null>(firstLine);
  const [visiblePortraits, setVisiblePortraits] = useState<Character[]>([]);

  useEffect(() => {
    // will fetch the story from server in the future
    const fetchTest = async () => {
      try {
        const res = await fetch('http://localhost:3000/test');
        if (!res.ok) throw new Error('backend refuses to cooperate');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('fetch is having a meltdown:', err);
      }
    };

    fetchTest();
  }, []);

  const advance = () => {
    const next = script.flipLine();
    if (!next) return;

    setCurrentLine(next);

    setVisiblePortraits((prev) => {
      // Reset all
      const updated = prev.map((c) => {
        c.current_speaker = false;
        return c;
      });

      // Quit if narration
      if (!next.speaker) return prev;

      // Ensure speaker is visible
      let nextList = [...updated];
      if (!updated.some((c) => c.id === next.speaker!.id)) {
        if (updated.length < 2) {
          nextList = [...updated, next.speaker!];
        } else {
          const [c1, c2] = updated;
          const c1Last = c1.lastSpokeIndex(script);
          const c2Last = c2.lastSpokeIndex(script);
          const replace = c1Last < c2Last ? c1 : c2;
          nextList = updated.map((c) =>
            c.id === replace.id ? next.speaker! : c
          );
        }
      }

      // NOW set the active one
      next.speaker!.current_speaker = true;
      return nextList;
    });
  };

  return (
    <div className="h-full w-full">
      <h1 className="absolute z-10 text-white p-5">
        Backend says: {data?.message || 'nothing yet'}
      </h1>
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
              active={char.current_speaker}
            />
          ))}
        </AnimatePresence>
        <DialogueBox
          name={currentLine?.speaker?.name || ''}
          text={currentLine?.text || '...'}
          onContinue={advance}
        />
      </div>
    </div>
  );
}

export default App;
