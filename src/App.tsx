// dependencies
import { useEffect, useState } from 'react';

// components
import Background from './components/background';
import DialogueBox from './components/dialogue_box';
import Portrait from './components/portrait';
import { VNScript } from './lib/vn_objects';

// assets
import bg_test from '/bg_test.jpg';
import portrait_test_1 from '/portrait_test_1.png';
import portrait_test_2 from '/portrait_test_2.png';
import portrait_test_3 from '/portrait_test_3.png';
// types
import type { Character, VNLine } from './lib/vn_objects';
type TestResponse = {
  message: string;
};

// test script
const Mary: Character = { id: '0', name: 'Mary', portrait: portrait_test_1 };
const Andy: Character = { id: '1', name: 'Andy', portrait: portrait_test_2 };
const James: Character = { id: '2', name: 'James', portrait: portrait_test_3 };
const line0: VNLine = { speaker: null, text: '...' };
const line1: VNLine = { speaker: Mary, text: 'Hello 1' };
const line2: VNLine = { speaker: Andy, text: 'Hello 2' };
const line3: VNLine = { speaker: James, text: 'Hello 3' };
const line4: VNLine = { speaker: Mary, text: 'Hello 4' };
const script = new VNScript([line0, line1, line2, line3, line4]);
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

    if (!next.speaker) return;

    setVisiblePortraits((prev) => {
      // If speaker is already visible, just move them to the "newest" position
      if (prev.some((c) => c.id === next.speaker!.id)) {
        const filtered = prev.filter((c) => c.id !== next.speaker!.id);
        return [...filtered, next.speaker!];
      }

      // If we have room, just add them
      if (prev.length < 2) {
        return [...prev, next.speaker!];
      }

      // Otherwise: replace the one who spoke longest ago
      const lastSpokeIndex = (char: Character) => {
        // scan backwards through the script
        for (let i = script.index - 2; i >= 0; i--) {
          if (script.script[i].speaker?.id === char.id) {
            return i;
          }
        }
        return -1; // has literally not spoken before
      };

      const [c1, c2] = prev;
      const c1Last = lastSpokeIndex(c1);
      const c2Last = lastSpokeIndex(c2);

      // lower index = longer ago = older speaker
      const replace = c1Last < c2Last ? c1 : c2;

      return prev.map((c) => (c.id === replace.id ? next.speaker! : c));
    });
  };

  return (
    <div>
      <h1>Backend says: {data?.message || 'nothing yet'}</h1>
      <div className="relative w-full h-full">
        <Background imgPath={bg_test} />
        {visiblePortraits.map((char, i) => (
          <Portrait
            key={char.id}
            spritePath={char.portrait}
            className={i === 0 ? 'left-10 bottom-0' : 'right-10 bottom-0'}
          />
        ))}
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
