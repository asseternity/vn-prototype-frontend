export type Line = {
  speakerId: string | null;
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
