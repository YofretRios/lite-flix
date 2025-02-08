import { motion } from 'motion/react';
import animationVariants from './animationVariants';

type AnimatedWrapper = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function AnimatedWrapper({
  children,
  delay = 0,
  className,
}: AnimatedWrapper) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={animationVariants.slideLeft}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
