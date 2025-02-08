'use client';
import { useRef } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';
import { Movie, UploadedMovie } from '@/types/movies';
import Header from '@/components/ui/Header';
import { TMDB_BACKDROP_SIZE, TMDB_SECURE_BASE_URL } from '@/utils/globals';
import UploadDialog from '@/components/features/UploadModal';
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
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <main ref={mainRef} className="relative bg-background text-white h-full">
        <div className="absolute lg:fixed top-0 left-0 right-0 h-[calc(100%-163px)] lg:inset-0 lg:h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 animate-scaleIn"
            style={{
              backgroundImage: `url(${TMDB_SECURE_BASE_URL}/${TMDB_BACKDROP_SIZE.original}${highlightedMovie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>

          <div className="bg-gradient-to-t from-background to-background/0 h-[150px] inset-x-[0] absolute bottom-0 lg:hidden" />
        </div>
        <div className="container z-10 text-white h-full">
          <Header />
          <div className="flex flex-col lg:flex-row h-[calc(100%-163px)] lg:h-[calc(100%-104px)]">
            <HeroSection highlightedMovie={highlightedMovie} />
            <ListSection popular={popular} uploadedMovies={uploadedMovies} />
          </div>
        </div>
      </main>
      <UploadDialog />
    </QueryClientProvider>
  );
}
