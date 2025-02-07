import { BASE_IMGKIT_URL } from '@/utils/globals';
import axios, { AxiosProgressEvent } from 'axios';

export default async function uploadToImageKit(
  file: File,
  onProgress?: (percentage: number) => void
) {
  // Fetch the authentication parameters from the server
  const { data } = await axios.get('/api/imagekit_auth');
  // const file = formData.get('movie') as File;
  const form = new FormData();

  form.append('file', file);
  form.append('fileName', file.name);
  form.append('token', data.token);
  form.append('expire', data.expire);
  form.append('signature', data.signature);
  form.append('publicKey', process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY!);

  const options = {
    method: 'POST',
    url: `${BASE_IMGKIT_URL}/files/upload`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    data: form,
    onUploadProgress: function (progressEvent: AxiosProgressEvent) {
      if (!progressEvent.total) {
        return;
      }

      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      if (onProgress) {
        onProgress(percentage);
      }
    },
  };

  // Upload the file to ImageKit
  const { data: imgKitData } = await axios.request(options);

  return imgKitData;
}
