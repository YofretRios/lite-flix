import { motion } from 'motion/react';
import Image from 'next/image';
import Primary from '@/components/ui/Buttons/Primary';
import Secondary from '@/components/ui/Buttons/Secondary';
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
      <div className="relative lg:fixed lg:bottom-0 flex w-full flex-col items-center lg:items-start justify-end mt-52 lg:mt-0">
        <motion.p
          className="heroHint z-20"
          {...getAnimationProps('slideTop', 0.5)}
        >
          Original de <span>LiteFlix</span>
        </motion.p>

        <motion.h1
          className="heroTitle text-aqua text-center lg:text-left z-20"
          {...getAnimationProps('slideRight', 0.7)}
        >
          {highlightedMovie.title}
        </motion.h1>

        <div className="flex flex-col lg:flex-row space-y-[16px] lg:space-x-[24px] lg:space-y-[0] mt-[16px] lg:mt-[32px] mb-[64px] lg:mb-[162px] z-20">
          <AnimatedWrapper delay={0.8}>
            <Primary>
              <Image
                alt="Play"
                src="/icons/play-icon.svg"
                width={14}
                height={16}
              />
              <span>Reproducir</span>
            </Primary>
          </AnimatedWrapper>

          <Secondary animateBorder>
            <AnimatedWrapper
              delay={0.8}
              className="flex items-center space-x-2"
            >
              <Image
                src="/icons/plus-icon.svg"
                alt="Plus"
                width="16"
                height="16"
              />
              <span>Mi Lista</span>
            </AnimatedWrapper>
          </Secondary>
        </div>
      </div>
    </div>
  );
}
