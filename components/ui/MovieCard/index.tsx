import React from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movies';
import { TMDB_POSTER_SIZE, TMDB_SECURE_BASE_URL } from '@/utils/globals';
import circlePlay from '@/assets/icons/circle-play.svg';

type MovieCardProps = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <li
      className="relative flex pt-[52px] justify-center w-[327px] h-[172px] gap-0 rounded-[4px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${TMDB_SECURE_BASE_URL}/${TMDB_POSTER_SIZE.md}${movie.poster_path})`,
      }}
    >
      <div className="opacity-[.8] bg-gradient-to-b from-black/0 via-black/50 to-black h-[120px] inset-x-[0] absolute bottom-0 md:hidden" />
      <div className="flex flex-col items-center z-10">
        <Image src={circlePlay} alt="Playback" />
        <p className="text-base-custom mt-[34px]">{movie.title}</p>
      </div>
    </li>
  );
}
