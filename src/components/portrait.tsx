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
    absolute ${className}
    transition-transform transition-shadow duration-300 ease-out
    ${
      active
        ? 'scale-105 md:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'
        : 'opacity-80'
    }
    h-[70vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]
  `}
    />
  );
}
