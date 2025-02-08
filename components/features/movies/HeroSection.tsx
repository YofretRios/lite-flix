import { motion } from 'motion/react';
import Image from 'next/image';
import Primary from '@/components/ui/Buttons/Primary';
import Secondary from '@/components/ui/Buttons/Secondary';
import playIcon from '@/assets/icons/play-icon.svg';
import plusIcon from '@/assets/icons/plus-icon.svg';
import { Movie } from '@/types/movies';
import AnimatedWrapper from '@/components/ui/AnimatedWrapper';
import { getAnimationProps } from '@/utils/animationVariants';

export default function HeroSection({
  highlightedMovie,
}: {
  highlightedMovie: Movie;
}) {
  return (
    <div className="flex text-white w-full">
      <div className="relative md:fixed md:bottom-0 flex w-full flex-col items-center md:items-start justify-end mt-52 md:mt-0">
        <motion.p
          className="heroHint z-20"
          {...getAnimationProps('slideTop', 0.5)}
        >
          Original de <span>LiteFlix</span>
        </motion.p>

        <motion.h1
          className="heroTitle text-aqua text-center md:text-left z-20"
          {...getAnimationProps('slideRight', 0.7)}
        >
          {highlightedMovie.title}
        </motion.h1>

        <div className="flex flex-col md:flex-row space-y-[16px] md:space-x-[24px] md:space-y-[0] mt-[16px] md:mt-[32px] mb-[64px] md:mb-[162px] z-20">
          <AnimatedWrapper delay={0.8}>
            <Primary>
              <Image src={playIcon} alt="Play" />
              <span>Reproducir</span>
            </Primary>
          </AnimatedWrapper>

          <Secondary animateBorder>
            <AnimatedWrapper
              delay={0.8}
              className="flex items-center space-x-2"
            >
              <Image src={plusIcon} alt="Plus" />
              <span>Mi Lista</span>
            </AnimatedWrapper>
          </Secondary>
        </div>
      </div>
    </div>
  );
}
