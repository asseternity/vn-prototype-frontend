// libraries
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { useState, useEffect } from 'react';
import { HexGrid, Layout } from 'react-hexgrid';
import { Button } from '@/components/ui/button';

// components
import { generateMap } from './hex_map/tile/map_generator';
import TileRenderer from './hex_map/tile/tile_renderer.tsx';
import VisualNovel from './visual_novel';
import type { Character } from './poi_generation/character_type.ts';
import type { LineChainNode, Event } from './visual_novel/master_types.ts';
import { fetchEventById } from './visual_novel/fetch_event.ts';

// test vn
import bg from '/bg_test.jpg';
import { generateCharacter } from './poi_generation/character_generator.ts';

const narratorCharacter: Character = {
  id: 998,
  name: '',
  relationship_with_player: 0,
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
  portrait: '',
};

const playerCharacter: Character = {
  id: 999,
  name: 'Player',
  relationship_with_player: 0,
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
  portrait: '',
};

export default function HexMap() {
  // map
  const [mapTiles, setMapTiles] = useState<any[]>([]);

  // tile clicked on
  const [selectedTileTitle, setSelectedTileTitle] = useState<string>('');
  const [selectedTileDescription, setSelectedTileDescription] =
    useState<string>('');
  const [selectedTileId, setSelectedTileId] = useState<number | null>(null);
  const [selectedTileIsNeighbor, setSelectedTileIsNeighbor] = useState<
    boolean | null
  >(null);

  // action state and action-related ui
  const [turn, setTurn] = useState<number>(0);
  const [actionUsedThisTurn, setActionUsedThisTurn] = useState<boolean>(false);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true);

  // visual novel part
  const [showEventPopup, setShowEventPopup] = useState(false);

  // party location
  const [partyPos, setPartyPos] = useState<{
    q: number;
    r: number;
    s: number;
  } | null>({ q: 0, r: 0, s: 0 });
  const [partyPosTileid, setPartyPosTileId] = useState<number | null>(null);

  // player and party
  const [player, setPlayer] = useState<Character>(playerCharacter);
  const [party, setParty] = useState<Character[]>([]);

  // visual novel state
  const [roleMap, setRoleMap] = useState<Record<string, Character>>({});
  const [startingNode, setStartingNode] = useState<LineChainNode | null>();

  // initial map generation
  useEffect(() => {
    generateMap(5, 10, 'forests').then(setMapTiles);
  }, []);

  // find and sync the id of the party's tile
  const currentTileId =
    mapTiles.find(
      (tile) =>
        partyPos?.q === tile.q &&
        partyPos?.r === tile.r &&
        partyPos?.s === tile.s
    )?.id ?? null;
  useEffect(() => {
    setPartyPosTileId(currentTileId);
  }, [currentTileId]);

  // sync whether actions buttons are enabled or not
  useEffect(() => {
    if (selectedTileTitle == '' || actionUsedThisTurn) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [actionUsedThisTurn, selectedTileTitle]);

  // handler for end turn
  const endTurn = async () => {
    setRoleMap({});
    setStartingNode(null);
    const fifty_fifty = Math.floor(Math.random() * 2);
    if (fifty_fifty == 0) {
      const event: Event = await fetchEventById('test_event');
      // TODO: cast characters logic
      const newRoleMap: Record<string, Character> = {
        narrator: narratorCharacter,
        player: playerCharacter,
        '1': generateCharacter(),
        '2': generateCharacter(),
        '3': generateCharacter(),
        '4': generateCharacter(),
      };
      // find the first line chain node and set it in a state
      const firstNode: LineChainNode = event.nodes_by_id[
        'intro'
      ] as LineChainNode;
      setStartingNode(firstNode);
      setRoleMap(newRoleMap);
      setShowEventPopup(true);
    }
    const currentTurn: number = turn;
    const nextTurn: number = currentTurn + 1;
    setActionUsedThisTurn(false);
    setTurn(nextTurn);
  };

  // disable movement button if not a neighbor
  function isNeighbor(tileAId: number, tileBId: number) {
    const a = mapTiles.find((tile) => tile.id === tileAId);
    const b = mapTiles.find((tile) => tile.id === tileBId);
    if (!a || !b) return false;
    const directions = [
      { q: 1, r: -1, s: 0 },
      { q: 1, r: 0, s: -1 },
      { q: 0, r: 1, s: -1 },
      { q: -1, r: 1, s: 0 },
      { q: -1, r: 0, s: 1 },
      { q: 0, r: -1, s: 1 },
    ];
    return directions.some(
      (dir) => b.q === a.q + dir.q && b.r === a.r + dir.r && b.s === a.s + dir.s
    );
  }
  useEffect(() => {
    if (!selectedTileId || !partyPosTileid) {
      setSelectedTileIsNeighbor(false);
      return;
    }
    setSelectedTileIsNeighbor(isNeighbor(selectedTileId, partyPosTileid));
  }, [selectedTileId, partyPosTileid, mapTiles]);

  // handler for moving
  const move = () => {
    const targetTile = mapTiles.find((tile) => selectedTileId === tile.id);
    setPartyPos({ q: targetTile.q, r: targetTile.r, s: targetTile.s });
  };

  // handler for clicking a tile
  const setInfo = (
    given_title: string,
    given_description: string,
    given_id: number
  ) => {
    setSelectedTileTitle(given_title);
    setSelectedTileDescription(given_description);
    setSelectedTileId(given_id);
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="border-2 h-25 flex flex-row gap-5 items-center justify-between text-sm md:text-xl">
        <h1 className="pl-5">Province: {selectedTileTitle}</h1>
        <p>|</p>
        <h3>Resources: {selectedTileDescription}</h3>
        <p>|</p>
        <h3>Turn {turn}</h3>
        {selectedTileId === partyPosTileid ? (
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
        ) : (
          <div className="flex flex-col">
            <Button
              disabled={buttonsDisabled || !selectedTileIsNeighbor}
              onClick={() => {
                move();
                setActionUsedThisTurn(true);
              }}
            >
              Move Here
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 min-h-0 border-2 flex relative">
        {showEventPopup && (
          <div className="absolute inset-0 flex items-center justify-center z-[99999]">
            <VisualNovel
              startingLineChainNode={startingNode as LineChainNode}
              roleMap={roleMap}
              bgImagePath={bg}
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
                    onClick={() => setInfo(tile.name, all_data, tile.id)}
                    partyHere={
                      partyPos?.q === tile.q &&
                      partyPos?.r === tile.r &&
                      partyPos?.s === tile.s
                    }
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
