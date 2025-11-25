import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import DialogueBox from './visual_novel/dialogue_box';
import Portrait from './visual_novel/portrait';

import type { Character } from './poi_generation/character_type';
import type { LineChainNode, Event } from './visual_novel/master_types';

type CharacterRecency = {
  roleId: string;
  clicksago: number;
};

type VisualNovelProps = {
  event: Event | null;
  roleMap: Record<string, Character>;
  bgImagePath: string;
};

// -----------------------------------------------------
// VISUAL NOVEL COMPONENT
// -----------------------------------------------------

export default function VisualNovel({
  event,
  roleMap,
  bgImagePath,
}: VisualNovelProps) {
  // null check — prevents crash if VN opened before event fetched
  if (!event) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-4 w-[600px] h-[400px] flex items-center justify-center">
        <p>No event loaded.</p>
      </div>
    );
  }

  const [currentNode, setCurrentNode] = useState<LineChainNode>(
    event.nodes_by_id['intro'] as LineChainNode
  );
  const [lineIndex, setLineIndex] = useState<number>(0);

  // recency + visibility tracking via role IDs
  const [recencies, setRecencies] = useState<CharacterRecency[]>([]);
  const [visibleRoles, setVisibleRoles] = useState<string[]>([]);

  const currentLine = currentNode.lines[lineIndex];
  const currentRoleId = currentLine.role.id;
  const currentChar = roleMap[currentRoleId];

  // -----------------------------------------------------
  // ADVANCE FUNCTION
  // -----------------------------------------------------
  function advance() {
    const nextIndex = lineIndex + 1;

    // If this is the last line of the node
    if (nextIndex >= currentNode.lines.length) {
      // TODO: choices logic will go here
      // [_] show choices on screen if it's a choice node
      // [_] show next line chain node when clicked
      // [_] add choice id into player stats
      // [_] figure out data format of "condition" on split nodes
      // [_] check for decision id
      // [_] check for player stats
      console.warn('Reached end of chain node.');
      return;
    }

    // Grab the NEXT line, not the current one
    const nextLine = currentNode.lines[nextIndex];
    const nextRoleId = nextLine.role.id;

    // 1. UPDATE RECENCIES (pure)
    const updatedRecencies = (() => {
      const existed = recencies.some((r) => r.roleId === nextRoleId);

      const base = recencies.map((r) =>
        r.roleId === nextRoleId
          ? { ...r, clicksago: 0 }
          : { ...r, clicksago: r.clicksago + 1 }
      );

      if (!existed) {
        base.push({ roleId: nextRoleId, clicksago: 0 });
      }

      return base;
    })();

    // 2. UPDATE VISIBLE ROLES (pure)
    const updatedVisibleRoles = (() => {
      if (visibleRoles.includes(nextRoleId)) {
        return visibleRoles;
      }
      if (visibleRoles.length < 2) {
        return [...visibleRoles, nextRoleId];
      }

      const worst = updatedRecencies.reduce((a, b) =>
        a.clicksago > b.clicksago ? a : b
      ).roleId;

      return visibleRoles.map((r) => (r === worst ? nextRoleId : r));
    })();

    // 3. Commit state BEFORE updating line index
    setRecencies(updatedRecencies);
    setVisibleRoles(updatedVisibleRoles);

    // 4. Now move to next line
    setLineIndex(nextIndex);
  }

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------

  return (
    <div
      className="bg-white rounded-xl shadow-xl p-4 w-[600px] h-[400px] bg-cover"
      style={{ backgroundImage: `url(${bgImagePath})` }}
    >
      <div className="relative w-full h-full">
        {/* PORTRAITS */}
        <AnimatePresence>
          {visibleRoles.map((roleId, i) => {
            const char = roleMap[roleId];
            if (!char) return null; // yeet the undefined one

            return (
              <Portrait
                key={roleId}
                spritePath={char.portrait}
                className={
                  i === 0
                    ? `
                      bottom-0
                      left-1/2 -translate-x-1/2
                      -ml-[20vw] sm:-ml-[15vw] md:-ml-[12vw] lg:-ml-[10vw]
                    `
                    : `
                      bottom-0
                      left-1/2 -translate-x-1/2
                      ml-[20vw] sm:ml-[15vw] md:ml-[12vw] lg:ml-[10vw]
                    `
                }
                active={roleId === currentRoleId}
              />
            );
          })}
        </AnimatePresence>

        {/* DIALOGUE BOX */}
        <DialogueBox
          name={currentChar.name ?? ''}
          text={currentLine.text}
          onContinue={advance}
        />
      </div>
    </div>
  );
}
