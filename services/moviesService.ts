import { Movie, MovieBaseResponse, MoviePopularResponse } from '@/types/movies';

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

export async function fetchHightlight(): Promise<Movie> {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('An error while fetching the movie data');
  }

  const movies = (await response.json()) as MovieBaseResponse;

  movies.results.sort((a: Movie, b: Movie) => b.vote_average - a.vote_average);

  const highlight = movies.results[0];

  return highlight;
}

export async function fetchPopular(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error('An error while fetching the movie data');
  }

  const movies = (await response.json()) as MoviePopularResponse;

  return movies.results.slice(0, 4);
}
