import { fetchHightlight, fetchPopular } from "@/services/moviesService";
import { MoviesHome } from "@/components/features/movies/MoviesHome";

export default async function Home() {
  const movie = await fetchHightlight();
  const popular = await fetchPopular();

  return <MoviesHome highlightedMovie={movie} popular={popular} />;
}
