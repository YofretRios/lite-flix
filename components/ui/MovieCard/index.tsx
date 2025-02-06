import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import circlePlay from '@/assets/icons/circle-play.svg';
import circlePlayHover from '@/assets/icons/circle-play-hover.svg';
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
  const [isHovered, setIsHovered] = useState(false);
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

  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.li
      variants={item}
      className="group relative flex justify-center w-[327px] h-[172px] md:w-[220px] md:h-[146px] gap-0 rounded-[4px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="opacity-[.9] bg-gradient-to-b from-black/0 via-black/50 to-black h-[120px] inset-x-[0] absolute bottom-0" />
      <div className="flex flex-col items-center justify-end mb-[32px] md:mb-[16px] z-10 group-hover:flex-row group-hover:items-start group-hover:justify-start group-hover:gap-[12px] group-hover:absolute group-hover:bottom-[40%] group-hover:items-center group-hover:w-full group-hover:px-[24px] md:group-hover:px-[16px] group-hover:mb-[0]">
        <Image
          className="w-[48px] md:w-[40px] group-hover:w-[24px]"
          src={isHovered ? circlePlayHover : circlePlay}
          alt="Playback"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
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
