export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface MovieBaseResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export interface MoviePopularResponse extends MovieBaseResponse {
  dates: {
    maximum: string;
    minimum: string;
  }
}