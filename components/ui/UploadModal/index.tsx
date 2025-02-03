import { uploadMovie } from '@/app/lib/movieActions';
import { useActionState, useEffect, useState } from 'react';

type UploadDialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

const initialState = {
  message: '',
};

export default function UploadDialog({ ref }: UploadDialogProps) {
  const [message, setMessage] = useState('');
  const [state, formAction, isPending] = useActionState(
    uploadMovie,
    initialState
  );

  useEffect(() => {
    if (!isPending) {
      setMessage(state.message);
    }
  }, [isPending, state.message]);

  const closeModal = () => {
    ref?.current?.close();
    setMessage('');
  };

  return (
    <dialog ref={ref}>
      <h1>Upload your movie</h1>
      <form action={formAction}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />

        <input type="file" id="movie" name="movie" />
        <button type="button" onClick={closeModal}>
          Close Modal
        </button>

        <button type="submit">Upload</button>
        {message && <p>{message}</p>}
      </form>
    </dialog>
  );
}
