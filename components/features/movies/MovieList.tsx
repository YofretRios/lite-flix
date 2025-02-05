import React from 'react';
import { motion } from 'motion/react';
import MovieCard from '@/components/ui/MovieCard';
import { Movie } from '@/types/movies';

type MovieListProps = {
  popular: Movie[];
};

export default function MovieList({ popular }: MovieListProps) {
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
      className="flex flex-col gap-[24px] items-center"
    >
      {popular.map((item) => (
        <MovieCard key={item.id} movie={item} />
      ))}
    </motion.ul>
  );
}
