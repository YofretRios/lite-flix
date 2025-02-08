import { motion } from 'motion/react';
import animationVariants from '@/utils/animationVariants';
import clsx from 'clsx';

type AnimatedWrapper = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  easing?: string;
  className?: string;
  preset?: keyof typeof animationVariants;
};

export default function AnimatedWrapper({
  children,
  delay = 0,
  duration = 0.5,
  easing = 'easeInOut',
  className,
  preset = 'slideLeft',
}: AnimatedWrapper) {
  const variant = animationVariants[preset];
  const wrapperClasses = clsx('leading-[0]', className);

  return (
    <motion.div
      className={wrapperClasses}
      initial="hidden"
      animate="visible"
      variants={variant}
      transition={{ delay, duration, easing }}
    >
      {children}
    </motion.div>
  );
}
