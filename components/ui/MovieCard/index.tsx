import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import circlePlay from '@/assets/icons/circle-play.svg';

type MovieCardProps = {
  // movie: Movie;
  title: string;
  backgroundImage: string;
};

export default function MovieCard({ title, backgroundImage }: MovieCardProps) {
  // Child animation variant for the staggered animation, sliding from top while fading in
  const item = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.li
      variants={item}
      className="relative flex pt-[52px] md:pt-[46px] justify-center w-[327px] h-[172px] md:w-[220px] md:h-[146px] gap-0 rounded-[4px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="opacity-[.9] bg-gradient-to-b from-black/0 via-black/50 to-black h-[120px] inset-x-[0] absolute bottom-0" />
      <div className="flex flex-col items-center z-10">
        <Image src={circlePlay} alt="Playback" />
        <p className="text-base-custom mt-[34px] md:mt-[20px]">{title}</p>
      </div>
    </motion.li>
  );
}
