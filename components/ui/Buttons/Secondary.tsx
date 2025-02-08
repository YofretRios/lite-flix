import clsx from 'clsx';
import { motion } from 'motion/react';
import { BaseButtonProps } from './types';

type SecondaryProps = BaseButtonProps & {
  animateBorder?: boolean;
};

export default function Secondary({
  children,
  className,
  onClick,
  animateBorder = false,
}: SecondaryProps) {
  const classes = clsx(
    'bg-[#242424]/50 text-white tracking-[4px] text-[18px]/[18px] py-[21px] flex items-center justify-center space-x-2 min-w-[248px] relative transition-opacity duration-300 hover:opacity-80',
    className
  );
  const pathVariants = {
    initial: {
      pathLength: animateBorder ? 0 : 1,
      opacity: animateBorder ? 0 : 1,
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: 'easeInOut',
        repeat: 2,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
    <button onClick={onClick} type="button" className={classes}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          initial="initial"
          animate="animate"
          whileHover="animate"
          variants={pathVariants}
        />
      </svg>
      {children}
    </button>
  );
}
