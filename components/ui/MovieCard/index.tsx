import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import circlePlay from '@/assets/icons/circle-play.svg';
import aquaStart from '@/assets/icons/aqua-start.svg';

type MovieCardProps = {
  title: string;
  backgroundImage: string;
  voteAverage?: number;
  releaseDate?: string;
};

export default function MovieCard({
  title,
  backgroundImage,
  voteAverage,
  releaseDate,
}: MovieCardProps) {
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

  const formatYear = (date: string) => {
    return new Date(date).getFullYear();
  };

  return (
    <motion.li
      variants={item}
      className="group relative flex pt-[52px] md:pt-[46px] justify-center w-[327px] h-[172px] md:w-[220px] md:h-[146px] gap-0 rounded-[4px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="opacity-[.9] bg-gradient-to-b from-black/0 via-black/50 to-black h-[120px] inset-x-[0] absolute bottom-0" />
      <div className="flex flex-col items-center z-10 group-hover:flex-row group-hover:items-start group-hover:gap-2 group-hover:absolute group-hover:bottom-[40%] group-hover:items-center group-hover:w-full group-hover:pl-[10px] md:group-hover:pl-[8px]">
        <Image
          className="group-hover:h-[24px]"
          src={circlePlay}
          alt="Playback"
        />
        <p className="text-base-custom mt-[34px] md:mt-[20px] group-hover:mt-[0] group-hover:text-left">
          {title}
        </p>
      </div>
      <div className="absolute inset-0 bg-[#242424] bg-opacity-0 transition-all duration-300 ease-in-out group-hover:bg-opacity-70"></div>

      {voteAverage && (
        <div className="hidden group-hover:flex group-hover:absolute left-0 bottom-0 text-[14px]/[12px] tracking-[2px] p-[24px] md:p-[16px]">
          <Image className="-mt-[3px]" src={aquaStart} alt="Rating start" />
          <p className="ml-[7px]">{voteAverage.toFixed(1)}</p>
        </div>
      )}
      {releaseDate && (
        <div className="hidden group-hover:flex group-hover:absolute right-0 bottom-0 text-[14px]/[12px] tracking-[2px] p-[24px] md:p-[16px]">
          {formatYear(releaseDate)}
        </div>
      )}
    </motion.li>
  );
}
