export type Line = {
  role: Role;
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

export type Role = {
  id: string;
};

export class Event {
  id: string;
  nodes_by_id: Record<string, Node>;

  constructor(id: string, nodes_by_id: Record<string, Node>) {
    this.id = id;
    this.nodes_by_id = nodes_by_id;
  }
}
