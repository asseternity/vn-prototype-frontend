type PortraitProps = {
  spritePath: string;
  className: string;
};

export default function Portrait({ spritePath, className }: PortraitProps) {
  return <img src={spritePath} className={`h-full absolute ${className}`} />;
}
