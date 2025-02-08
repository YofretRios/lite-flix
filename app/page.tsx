import { fetchHightlight, fetchPopular } from '@/services/tbdService';
import MoviesMain from '@/components/features/movies/MoviesMain';
import { fetchUploadedMovies } from '../services/movieActions';

export default async function Home() {
  const [movie, popular, uploadedMovies] = await Promise.all([
    fetchHightlight(),
    fetchPopular(),
    fetchUploadedMovies(),
  ]);

  return (
    <MoviesMain
      highlightedMovie={movie}
      popular={popular}
      uploadedMovies={uploadedMovies}
    />
  );
}
