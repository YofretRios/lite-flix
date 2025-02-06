import React, { useState } from 'react';
import MovieList from './MovieList';
import { Movie, UploadedMovie } from '@/types/movies';
import Select from '@/components/ui/Select';
import SelectTrigger from '@/components/ui/Select/SelectTrigger';
import SelectContent from '@/components/ui/Select/SelectContent';
import SelectOption from '@/components/ui/Select/SelectOption';
import MovieCard from '@/components/ui/MovieCard';
import { TMDB_POSTER_SIZE, TMDB_SECURE_BASE_URL } from '@/utils/globals';

type ListSectionProps = {
  popular: Movie[];
  uploadedMovies: UploadedMovie[];
};

interface Selection {
  value: string;
  label: string;
}

const initialValue = { value: 'popular', label: 'Populares' };

export default function ListSection({
  popular,
  uploadedMovies,
}: ListSectionProps) {
  const [activeList, setActiveList] = useState('popular');

  const onChange = (selection: Selection) => {
    setActiveList(selection.value);
  };

  const renderMoviesList = () => {
    if (activeList === 'popular') {
      return popular.map((item) => (
        <MovieCard
          key={item.id}
          title={item.title}
          backgroundImage={`${TMDB_SECURE_BASE_URL}/${TMDB_POSTER_SIZE.md}${item.poster_path}`}
          voteAverage={item.vote_average}
          releaseDate={item.release_date}
        />
      ));
    }

    return uploadedMovies.map((item) => (
      <MovieCard
        key={item.id}
        title={item.movie_title}
        backgroundImage={item.thumbnail_url}
      />
    ));
  };

  return (
    <div className="relative z-10 pb-[52px] md:pb-[0]">
      <Select onChange={onChange} defaultValue={initialValue}>
        <SelectTrigger>Ver:</SelectTrigger>
        <SelectContent>
          <SelectOption label="Populares" value="popular" />
          <SelectOption label="Mis películas" value="my-movies" />
        </SelectContent>
      </Select>

      <MovieList>{renderMoviesList()}</MovieList>
    </div>
  );
}
