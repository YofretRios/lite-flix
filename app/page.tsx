import { fetchHightlight, fetchPopular } from '@/services/moviesService';
import { MoviesHome } from '@/components/features/movies/MoviesHome';
import { fetchUploadedMovies } from './lib/movieActions';

export default async function Home() {
  const movie = await fetchHightlight();
  const popular = await fetchPopular();
  const uploadedMovies = await fetchUploadedMovies();

  console.log(uploadedMovies);

  return <MoviesHome highlightedMovie={movie} popular={popular} />;
}
