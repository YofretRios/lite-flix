"use client";
import { useRef } from "react";
import { Movie } from "@/types/movies";
import UploadModal from "@/components/ui/UploadModal";

type MoviesHomeProps = {
  highlightedMovie: Movie;
  popular: Movie[];
};

export function MoviesHome({ highlightedMovie, popular }: MoviesHomeProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  return (
    <div>
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

      <button onClick={openDialog}>Upload</button>

      <UploadModal ref={dialogRef} />
    </div>
  );
}
