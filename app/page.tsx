import { fetchHightlight, fetchPopular } from '@/services/movieService';
import MoviesMain from '@/components/features/movies/MoviesMain';
import { fetchUploadedMovies } from './lib/movieActions';

export default async function Home() {
  const movie = await fetchHightlight();
  const popular = await fetchPopular();
  const uploadedMovies = await fetchUploadedMovies();

  return (
    <MoviesMain
      highlightedMovie={movie}
      popular={popular}
      uploadedMovies={uploadedMovies}
    />
  );
}
