import { motion } from 'framer-motion';

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
  if (!spritePath) return null;
  return (
    <motion.img
      src={spritePath}
      className={`
    absolute ${className}
    transition-transform transition-shadow duration-300 ease-out
    ${
      active
        ? 'scale-105 md:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'
        : 'opacity-80'
    }
    h-40 bottom-30
  `}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: active ? 1.1 : 1,
        filter: active
          ? 'drop-shadow(0px 0px 15px rgba(255,255,255,0.5))'
          : 'brightness(0.8)',
      }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    />
  );
}
