export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
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
  };
}

export interface UploadedMovie {
  id: number;
  created_at: string;
  movie_title: string;
  url: string;
  thumbnail_url: string;
}
