import { BASE_IMGKIT_URL } from '@/utils/globals';
import axios, { AxiosProgressEvent } from 'axios';

type ImageKitAuthResponse = {
  token: string;
  expire: number;
  signature: string;
};

export type ImageKitResponse = {
  fileId: string;
  name: string;
  size: number;
  versionInfo: {
    id: string;
    name: string;
  };
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  orientation: number;
  thumbnailUrl: string;
  AITags?: null | unknown; // Replace 'any' with specific type if AITags has a known structure
};

export default async function uploadToImageKit(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<ImageKitResponse> {
  // Throw an error if the file is not an image
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Fetch the authentication parameters from the server
  const { data } = await axios.get<ImageKitAuthResponse>('/api/imagekit_auth');
  const form = new FormData();

  form.append('file', file);
  form.append('fileName', file.name);
  form.append('token', data.token);
  form.append('expire', data.expire.toString());
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
  const { data: imgKitData } = await axios.request<ImageKitResponse>(options);

  return imgKitData;
}
