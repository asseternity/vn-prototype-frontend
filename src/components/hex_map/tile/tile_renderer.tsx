import { Hexagon, Text } from 'react-hexgrid';
import { TILE_KINDS } from './tile_kinds';
import type { Tile } from './tile_type';

type TileRendererProps = {
  tile: Tile;
  onClick: () => void;
};

export default function TileRenderer({ tile, onClick }: TileRendererProps) {
  const def = TILE_KINDS[tile.kind as keyof typeof TILE_KINDS];

  return (
    <Hexagon
      q={tile.q}
      r={tile.r}
      s={tile.s}
      onClick={onClick}
      style={{ fill: tile.fillColor }}
    >
      {def.image && (
        <image href={def.image} width="40" height="40" x="-20" y="0" />
      )}

      <Text
        fill="black"
        fontSize={def.fontSize}
        fontFamily="Arial"
        fontWeight={600}
        y={-20}
      >
        {tile.name}
      </Text>
    </Hexagon>
  );
}
