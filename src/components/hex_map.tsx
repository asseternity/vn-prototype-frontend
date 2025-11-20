// libraries
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { useState, useEffect } from 'react';
import { HexGrid, Layout } from 'react-hexgrid';
import { Button } from '@/components/ui/button';

// components
import { generateMap } from './hex_map/tile/map_generator';
import TileRenderer from './hex_map/tile/tile_renderer.tsx';
import VisualNovel from './visual_novel';

// test assets
import type {
  LineChainNode,
  Line,
  Character,
} from './visual_novel/master_types.ts';
import bg_test from '/bg_test.jpg';
import portrait_test_1 from '/portrait_test_1.png';
import portrait_test_2 from '/portrait_test_2.png';
import portrait_test_3 from '/portrait_test_3.png';
const lines_test: Line[] = [
  { speakerId: 'narrator', text: 'Something something.' },
  { speakerId: 'johnny', text: 'Hello 1' },
  { speakerId: 'anne', text: 'Hello 2' },
  { speakerId: 'mark', text: 'Hello 3' },
  { speakerId: 'johnny', text: 'Hello 4' },
];
const characters_test: Character[] = [
  { id: 'johnny', name: 'Johnny', portrait: portrait_test_2 },
  { id: 'anne', name: 'Anne', portrait: portrait_test_1 },
  { id: 'mark', name: 'Lil Marco', portrait: portrait_test_3 },
];
const script_test: LineChainNode = {
  id: '0',
  type: 'line',
  lines: lines_test,
  endingNodeId: null,
};

export default function HexMap() {
  const [mapTiles, setMapTiles] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [turn, setTurn] = useState<number>(0);
  const [actionUsedThisTurn, setActionUsedThisTurn] = useState<boolean>(false);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    if (title == '' || actionUsedThisTurn) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [actionUsedThisTurn, title]);

  const endTurn = () => {
    const fifty_fifty = Math.floor(Math.random() * 2);
    if (fifty_fifty == 0) {
      setShowEventPopup(true);
    }
    const currentTurn: number = turn;
    const nextTurn: number = currentTurn + 1;
    setActionUsedThisTurn(false);
    setTurn(nextTurn);
  };

  const setInfo = (given_title: string, given_description: string) => {
    setTitle(given_title);
    setDescription(given_description);
  };

  useEffect(() => {
    generateMap(5, 10, 'forests').then(setMapTiles);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="border-2 h-25 flex flex-row gap-5 items-center justify-between text-sm md:text-xl">
        <h1 className="pl-5">Province: {title}</h1>
        <p>|</p>
        <h3>Resources: {description}</h3>
        <p>|</p>
        <h3>Turn {turn}</h3>
        <div className="flex flex-col">
          <Button
            disabled={buttonsDisabled}
            onClick={() => setActionUsedThisTurn(true)}
          >
            Action 1
          </Button>
          <Button
            disabled={buttonsDisabled}
            onClick={() => setActionUsedThisTurn(true)}
          >
            Action 2
          </Button>
          <Button
            disabled={buttonsDisabled}
            onClick={() => setActionUsedThisTurn(true)}
          >
            Action 3
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-0 border-2 flex relative">
        {showEventPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-[99999]">
            <VisualNovel
              startingLineChainNode={script_test}
              allCharacters={characters_test}
              bgImagePath={bg_test}
            />
          </div>
        )}
        <UncontrolledReactSVGPanZoom
          className="z-0"
          width={window.innerWidth}
          height={window.innerHeight - 170}
          background="#a3d9a5"
          tool="auto"
          detectAutoPan={false}
          toolbarProps={{ position: 'none' }}
          miniatureProps={{
            position: 'none',
            background: 'transparent',
            width: 0,
            height: 0,
          }}
        >
          <HexGrid
            style={{
              fill: '#88cc88',
            }}
          >
            <Layout
              size={{ x: 85, y: 50 }}
              flat
              spacing={1.1}
              origin={{
                x: window.innerWidth / 2,
                y: (window.innerHeight - 170) / 2,
              }}
            >
              {mapTiles.map((tile) => {
                const { id } = tile;
                let all_data = `Favor: ${tile.favor} | Awareness: ${tile.awareness} | Resources: ${tile.resources} | Population: ${tile.population}`;
                return (
                  <TileRenderer
                    key={id}
                    tile={tile}
                    onClick={() => setInfo(tile.name, all_data)}
                  />
                );
              })}
            </Layout>
          </HexGrid>
        </UncontrolledReactSVGPanZoom>
      </div>
      <div className="border-2 h-15">
        <Button className="w-full h-full" onClick={endTurn}>
          End Turn
        </Button>
      </div>
    </div>
  );
}
