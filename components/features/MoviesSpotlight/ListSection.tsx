import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import MovieList from './MovieList';
import { Movie, UploadedMovie } from '@/types/movies';
import Select from '@/components/ui/Select';
import SelectTrigger from '@/components/ui/Select/SelectTrigger';
import SelectContent from '@/components/ui/Select/SelectContent';
import SelectOption from '@/components/ui/Select/SelectOption';
import MovieCard from '@/components/ui/MovieCard';
import { TMDB_POSTER_SIZE, TMDB_SECURE_BASE_URL } from '@/utils/globals';
import AnimatedWrapper from '@/components/ui/AnimatedWrapper';
import { fetchUploadedMovies } from '@/services/movieActions';
import Tertiary from '@/components/ui/Buttons/Tertiary';
import { DialogTrigger } from '@/components/ui/Dialog';

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
  const { data: movieData } = useQuery({
    queryKey: ['uploaded-movies'],
    queryFn: () => fetchUploadedMovies(),
    initialData: uploadedMovies,
  });
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
          id={item.id}
          backgroundImage={`${TMDB_SECURE_BASE_URL}/${TMDB_POSTER_SIZE.md}${item.poster_path}`}
          voteAverage={item.vote_average}
          releaseDate={item.release_date}
        />
      ));
    }

    if (movieData.length === 0) {
      return (
        <DialogTrigger className="z-30" asChild>
          <Tertiary>
            <Image
              src="/icons/plus-icon.svg"
              alt="Plus"
              width="16"
              height="16"
            />
            <span>Agregar Pelicula</span>
          </Tertiary>
        </DialogTrigger>
      );
    }

    return movieData.map((item) => (
      <MovieCard
        key={item.id}
        id={item.id}
        title={item.movie_title}
        backgroundImage={item.thumbnail_url}
        showDelete
      />
    ));
  };

  return (
    <div className="z-10 pb-[52px] lg:pb-[0] shrink-0">
      <AnimatedWrapper preset="slideTop" delay={0.3}>
        <Select
          className="mb-[32px]"
          onChange={onChange}
          defaultValue={initialValue}
        >
          <SelectTrigger>Ver:</SelectTrigger>
          <SelectContent>
            <SelectOption label="Populares" value="popular" />
            <SelectOption label="Mis películas" value="my-movies" />
          </SelectContent>
        </Select>
      </AnimatedWrapper>

      <MovieList>{renderMoviesList()}</MovieList>
    </div>
  );
}
