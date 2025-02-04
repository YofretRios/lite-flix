'use client';
import { useRef } from 'react';
import { Movie, UploadedMovie } from '@/types/movies';
import UploadModal from '@/components/ui/UploadModal';
import Header from '@/components/ui/Header';

type MoviesHomeProps = {
  highlightedMovie: Movie;
  popular: Movie[];
  uploadedMovies: UploadedMovie[];
};

export function MoviesHome({
  highlightedMovie,
  popular,
  uploadedMovies,
}: MoviesHomeProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  // TODO - Move this to a helper function
  const basePath = 'https://image.tmdb.org/t/p/original';

  return (
    <main className="main-h-scree relative bg-background text-white">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 animate-scaleIn"
        style={{
          backgroundImage: `url(${basePath}${highlightedMovie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      <div className="relative z-10 text-white container">
        <Header />
        <h1>Destacada</h1>
        <ul>
          <li key={highlightedMovie.id}>{highlightedMovie.title}</li>
        </ul>

        <h1>Popular</h1>
        <ul>
          {popular.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>

        <h1>Uploaded Movies</h1>
        <ul>
          {uploadedMovies.map((movie) => (
            <li key={movie.id}>{movie.movie_title}</li>
          ))}
        </ul>

        <button onClick={openDialog}>Upload</button>

        <UploadModal ref={dialogRef} />
      </div>
    </main>
  );
}
