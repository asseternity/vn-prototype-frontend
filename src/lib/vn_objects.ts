export type Character = {
  id: string;
  name: string;
  portrait: string;
};

export type VNLine = {
  speaker: Character | null;
  text: string;
};

export class VNScript {
  script: VNLine[] = [];
  index = 0;

  constructor(script: VNLine[]) {
    this.script = script;
    this.index = 0;
  }

  flipLine(): VNLine | null {
    if (this.index >= this.script.length) return null;
    const line = this.script[this.index];
    this.index++;
    return line;
  }
}
