export class Character {
  id: string;
  name: string;
  portrait: string;
  current_speaker: boolean;

  constructor(id: string, name: string, portrait: string) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.current_speaker = false;
  }

  lastSpokeIndex(script: VNScript) {
    // scan backwards through the script
    for (let i = script.index - 2; i >= 0; i--) {
      if (script.script[i].speaker?.id === this.id) {
        return i;
      }
    }
    return -1; // has literally not spoken before
  }
}

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
