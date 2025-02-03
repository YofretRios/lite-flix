import { useRef, useState } from 'react';
import { IKUpload, ImageKitProvider } from 'imagekitio-next';
import { uploadMovie } from '@/app/lib/movieActions';
import imageAuthenticatorService from '@/services/imageAuthenticatorService';

type UploadDialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

const urlEndpoint = process.env.NEXT_PUBLIC_IMGKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY;

export default function UploadDialog({ ref }: UploadDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [progress, setProgress] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const closeModal = () => {
    ref?.current?.close();
    formRef.current?.reset();
    setProgress(0);
    setThumbnailUrl('');
    setFileUrl('');
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await uploadMovie({
      title: formData.get('title') as string,
      thumbnailUrl,
      fileUrl,
    });

    console.log(response);
  };

  const trackProgress = (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
    if (event.lengthComputable) {
      const percentage = (event.loaded / event.total) * 100;

      setProgress(percentage);
    }
  };

  return (
    <dialog ref={ref}>
      <h1>Upload your movie</h1>

      <form ref={formRef} onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />

        <ImageKitProvider
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={imageAuthenticatorService}
        >
          <div>
            <h2>File upload</h2>
            <IKUpload
              onSuccess={(data) => {
                console.log(data);
                setThumbnailUrl(data.thumbnailUrl);
                setFileUrl(data.url);
              }}
              onUploadProgress={trackProgress}
            />
          </div>
        </ImageKitProvider>

        {progress > 0 && <progress value={progress} max="100" />}

        <button type="submit">Upload</button>
        <button type="button" onClick={closeModal}>
          Close
        </button>
      </form>
    </dialog>
  );
}
