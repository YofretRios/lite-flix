'use client';
import { Movie, UploadedMovie } from '@/types/movies';
import Header from '@/components/ui/Header';
import { TMDB_BACKDROP_SIZE, TMDB_SECURE_BASE_URL } from '@/utils/globals';
import HeroSection from './HeroSection';
import ListSection from './ListSection';

type MoviesHomeProps = {
  highlightedMovie: Movie;
  popular: Movie[];
  uploadedMovies: UploadedMovie[];
};

export default function MoviesHome({
  highlightedMovie,
  popular,
  uploadedMovies,
}: MoviesHomeProps) {
  return (
    <main className="relative bg-background text-white h-full">
      <div className="absolute md:fixed top-0 left-0 right-0 h-[calc(100%-163px)] md:inset-0 md:h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 animate-scaleIn"
          style={{
            backgroundImage: `url(${TMDB_SECURE_BASE_URL}/${TMDB_BACKDROP_SIZE.original}${highlightedMovie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>

        <div className="bg-gradient-to-t from-background to-background/0 h-[150px] inset-x-[0] absolute bottom-0 md:hidden" />
      </div>
      <div className="container z-10 text-white h-full">
        <Header />
        <div className="flex flex-col md:flex-row h-[calc(100%-163px)] md:h-[calc(100%-104px)]">
          <HeroSection highlightedMovie={highlightedMovie} />
          <ListSection popular={popular} uploadedMovies={uploadedMovies} />
        </div>
      </div>
    </main>
  );
}
