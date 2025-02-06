import Primary from '@/components/ui/Buttons/Primary';
import Secondary from '@/components/ui/Buttons/Secondary';
import playIcon from '@/assets/icons/play-icon.svg';
import plusIcon from '@/assets/icons/plus-icon.svg';
import { Movie } from '@/types/movies';

export default function HeroSection({
  highlightedMovie,
}: {
  highlightedMovie: Movie;
}) {
  return (
    <div className="flex text-white w-full">
      <div className="flex w-full flex-col items-center md:items-start justify-end mt-72 md:mt-0">
        <p className="heroHint delay-500ms opacity-0 animate-fadeInSlideTop">
          Original de <span>LiteFlix</span>
        </p>
        <h1 className="heroTitle text-aqua delay-600ms opacity-0 animate-fadeInSlideRight">
          {highlightedMovie.title}
        </h1>

        <div className="flex flex-col md:flex-row space-y-[16px] md:space-x-[24px] md:space-y-[0] mt-[16px] md:mt-[32px] mb-[64px] md:mb-[162px] z-20">
          <Primary
            icon={{ src: playIcon, alt: 'Play' }}
            text="Reproducir"
            className="delay-800ms opacity-0 animate-fadeInSlideLeft"
          />
          <Secondary
            icon={{ src: plusIcon, alt: 'Play' }}
            text="Mi Lista"
            textStyle="delay-800ms opacity-0 animate-fadeInSlideLeft"
            animateBorder
          />
        </div>
      </div>
    </div>
  );
}
