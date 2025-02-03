'use server';
import { createClient } from '@/utils/supabase/server';

export async function uploadMovie(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const supabase = await createClient();
  const title = formData.get('title');

  const { error } = await supabase
    .from('movies')
    .insert([{ movie_title: title }])
    .select();

  return {
    message: error ? 'error' : 'success',
  };
}
