type PortraitProps = {
  spritePath: string;
  className: string;
  active: boolean;
};

export default function Portrait({
  spritePath,
  className,
  active,
}: PortraitProps) {
  return (
    <img
      src={spritePath}
      className={`
        h-full absolute ${className}
        transition-transform transition-shadow duration-300 ease-out
        ${
          active
            ? 'scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]'
            : 'scale-100 drop-shadow-none opacity-80'
        }
      `}
    />
  );
}
