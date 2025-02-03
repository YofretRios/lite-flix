import { useState } from 'react';
// import { uploadMovie } from '@/app/lib/movieActions';
import uploadToImageKit from '@/services/uploadImage';

type UploadDialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

export default function UploadDialog({ ref }: UploadDialogProps) {
  const [progress, setProgress] = useState(0);
  const closeModal = () => {
    ref?.current?.close();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    await uploadToImageKit(formData, (percentage) => {
      setProgress(percentage);
    });
  };

  return (
    <dialog ref={ref}>
      <h1>Upload your movie</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />

        <label htmlFor="movie">Movie</label>
        <input type="file" name="movie" id="movie" required />

        <button type="submit">Upload</button>
        <button type="button" onClick={closeModal}>
          Close
        </button>

        {progress > 0 && <progress value={progress} max="100" />}
      </form>
    </dialog>
  );
}
