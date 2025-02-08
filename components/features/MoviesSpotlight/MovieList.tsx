import React from 'react';
import { motion } from 'motion/react';

type MovieListProps = {
  children: React.ReactNode;
};

export default function MovieList({ children }: MovieListProps) {
  // Staggered animation for the movie list
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-[24px] lg:gap-[20px] items-center pb-[24px]"
    >
      {children}
    </motion.ul>
  );
}
