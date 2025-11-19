import { Hexagon } from 'react-hexgrid';
import type { TileDOM } from './TileDOM';
import { Text } from 'react-hexgrid';

function WrappedText({
  text,
  fontSize,
  lineHeight = 12,
}: {
  text: string;
  fontSize: number;
  lineHeight?: number;
}) {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  // Simple greedy line splitter (around ~8 chars per line)
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > 8) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());

  return (
    <Text
      fill="black"
      fontSize={fontSize}
      fontFamily="Arial"
      fontWeight={600}
      y={-15 - (lines.length - 1) * (lineHeight / 2)}
    >
      {lines.map((line, i) => (
        <tspan key={i} x="0" dy={i === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </Text>
  );
}

export default function BaseTile({
  q,
  r,
  s,
  name,
  image,
  fontSize = 10,
  fillColor = '#88cc88',
  onClick,
}: TileDOM) {
  return (
    <Hexagon
      q={q}
      r={r}
      s={s}
      onClick={() => onClick(name, name)}
      style={{ fill: fillColor }}
    >
      {image && <image href={image} width="40" height="40" x="-20" y="0" />}
      <WrappedText text={name} fontSize={fontSize} />
    </Hexagon>
  );
}
