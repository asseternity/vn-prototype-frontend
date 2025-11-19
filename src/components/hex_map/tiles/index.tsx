import BaseTile from './BaseTile';
import type { TileDOM } from './TileDOM';

import castle from '/castle.svg';
import temple from '/temple.svg';
import forest from '/forest.svg';
import mountain from '/mountain.svg';

export const EmptyTile: React.FC<TileDOM> = (props) => <BaseTile {...props} />;
export const CastleTile: React.FC<TileDOM> = (props) => (
  <BaseTile {...props} image={castle} />
);
export const TempleTile: React.FC<TileDOM> = (props) => (
  <BaseTile {...props} image={temple} />
);
export const ForestTile: React.FC<TileDOM> = (props) => (
  <BaseTile {...props} image={forest} />
);
export const MountainTile: React.FC<TileDOM> = (props) => (
  <BaseTile {...props} image={mountain} />
);

export const TileComponents: React.FC<TileDOM>[] = [
  EmptyTile,
  CastleTile,
  TempleTile,
  MountainTile,
  ForestTile,
];
