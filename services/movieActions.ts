'use server';
import { UploadedMovie } from '@/types/movies';
import { createClient } from '@/lib/supabase/server';

type MovieData = {
  title: string;
  thumbnailUrl: string;
  fileUrl: string;
};

export async function uploadMovie(data: MovieData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('movies')
    .insert([
      {
        movie_title: data.title,
        thumbnail_url: data.thumbnailUrl,
        url: data.fileUrl,
      },
    ])
    .select();

  return {
    message: error ? 'error' : 'success',
  };
}

export async function fetchUploadedMovies(): Promise<UploadedMovie[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('movies')
    .select()
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('An error occurred while fetching movies');
  }

  return data;
}

export async function deleteMovie(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('movies').delete().eq('id', id);

  if (error) {
    throw new Error('An error occurred while deleting the movie');
  }

  return data;
}
