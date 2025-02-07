import { useRef, useState } from 'react';
import Image from 'next/image';
import { uploadMovie } from '@/app/lib/movieActions';
import closeIcon from '@/assets/icons/close.svg';
import Primary from '../Buttons/Primary';
import UploadDropZone from '../UploadDropZone';

type UploadDialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

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

  const trackProgress = (progress: number) => {
    setProgress(progress);
  };

  return (
    <dialog
      ref={ref}
      className="relative bg-background text-white w-screen md:w-[738px] h-[calc(100vh-163px)] md:h-fit"
    >
      <div className="w-full pt-[96px] md:py-[48px] md:px-[64px]">
        <button
          className="hidden md:block md:absolute p-[24px] top-0 right-0"
          type="button"
          onClick={closeModal}
        >
          <Image src={closeIcon} alt="Close menu" />
        </button>
        <form
          className="flex flex-col items-center justify-center"
          ref={formRef}
          onSubmit={onSubmit}
        >
          <h2 className="text-[22px]/[22px] md:text-[20px]/[20px] tracking-[4px] text-aqua">
            Agregar película
          </h2>

          <UploadDropZone onUploadProgress={trackProgress} />

          <input
            className="input text-base-custom text-center w-[248px]"
            type="text"
            name="title"
            id="title"
            required
          />

          {progress > 0 && <progress value={progress} max="100" />}

          <Primary
            className="mt-[96px] md:mt-[48px] bg-white"
            textStyle="text-background"
            type="submit"
            text="Subir Pelicula"
          />
        </form>
      </div>
    </dialog>
  );
}
