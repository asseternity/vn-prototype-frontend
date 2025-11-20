function pickRandomUpperAndInner(data: Record<string, any>): string {
  let root = data;

  // If JSON has a single wrapper like { "classes": { ... } } or { "races": { ... } }
  const keys = Object.keys(root);
  if (
    keys.length === 1 &&
    typeof root[keys[0]] === 'object' &&
    !Array.isArray(root[keys[0]])
  ) {
    root = root[keys[0]];
  }

  const upperList = Object.keys(root);
  if (upperList.length === 0) return 'Unknown';

  const upper = upperList[Math.floor(Math.random() * upperList.length)];
  const upperNode = root[upper];

  // If upper node is an array -> subclasses/subraces stored as string array
  if (Array.isArray(upperNode) && upperNode.length > 0) {
    const inner = upperNode[Math.floor(Math.random() * upperNode.length)];
    return `${upper} (${inner})`;
  }

  // If upper node is an object -> pick a property name as inner
  if (upperNode && typeof upperNode === 'object' && !Array.isArray(upperNode)) {
    const innerList = Object.keys(upperNode);
    if (innerList.length > 0) {
      const inner = innerList[Math.floor(Math.random() * innerList.length)];
      return `${upper} (${inner})`;
    }
  }

  // No inner / empty array -> just upper
  return upper;
}

function pickRandomFromArray(data: Record<string, any>): string {
  const firstKey = Object.keys(data)[0];
  const array = data[firstKey];
  if (!Array.isArray(array) || array.length === 0) return 'Unknown';
  const value = array[Math.floor(Math.random() * array.length)];
  return String(value);
}

export { pickRandomUpperAndInner, pickRandomFromArray };
