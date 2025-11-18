// frontend:
// - shows line nodes, line by line, as the player clicks
// - shows choices
// - sends which choice was made

// backend:
// - sends line nodes
// - holds the player object in DB
// - updates the player object on the DB based on choice made
// - sends choices
// - sends the next line node based on choice made or split node condition

export type Line = {
  speakerId: string;
  text: string;
};

export type LineChainNode = {
  id: string;
  type: 'line';
  lines: Line[];
  endingNodeId: string | null;
};

export type ChoiceOption = {
  id: string;
  text: string;
  node_id: string;
  stat?: string;
  amount?: number;
};

export type ChoiceNode = {
  id: string;
  type: 'choice';
  choices: ChoiceOption[];
};

export type SplitNode = {
  id: string;
  type: 'split';
  condition: string;
  trueNodeId: string;
  falseNodeId: string;
};

export type Node = LineChainNode | ChoiceNode | SplitNode;

export type Character = {
  id: string;
  name: string;
  portrait: string;
};
