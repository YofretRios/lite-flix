import { fetchHightlight, fetchPopular } from '@/services/tbdService';
import MoviesMain from '@/components/features/MoviesSpotlight/MoviesMain';
import { fetchUploadedMovies } from '../services/movieActions';
import { Dialog } from '@/components/ui/Dialog';


export default async function Home() {
  const [movie, popular, uploadedMovies] = await Promise.all([
    fetchHightlight(),
    fetchPopular(),
    fetchUploadedMovies(),
  ]);

  return (
    <Dialog>
      <MoviesMain
        highlightedMovie={movie}
        popular={popular}
        uploadedMovies={uploadedMovies}
      />
    </Dialog>
  );
}
