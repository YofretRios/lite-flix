'use client';
import { useRef } from 'react';
import { Movie, UploadedMovie } from '@/types/movies';
import UploadModal from '@/components/ui/UploadModal';
import Header from '@/components/ui/Header';
import HeroSection from './HeroSection';
import { TMDB_BACKDROP_SIZE, TMDB_SECURE_BASE_URL } from '@/utils/globals';
import MovieList from './MovieList';

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  return (
    <main className="relative bg-background text-white h-full">
      <div className="absolute top-0 left-0 right-0 h-[calc(100%-163px)] md:inset-0 md:h-full overflow-hidden">
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

      <Header />
      <HeroSection highlightedMovie={highlightedMovie} />
      <div className="relative z-10 ">
        <MovieList popular={popular} />

        <h1>Uploaded Movies</h1>
        <ul>
          {uploadedMovies.map((movie) => (
            <li key={movie.id}>{movie.movie_title}</li>
          ))}
        </ul>

        <button onClick={openDialog}>Upload</button>
      </div>

      <UploadModal ref={dialogRef} />
    </main>
  );
}
