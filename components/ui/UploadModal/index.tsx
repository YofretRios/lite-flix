import { useRef, useState } from 'react';
import Image from 'next/image';
import { uploadMovie } from '@/services/movieActions';
import closeIcon from '@/assets/icons/close.svg';
import Primary from '../Buttons/Primary';
import UploadDropZone from '../UploadDropZone';
import { ImageKitResponse } from '@/services/uploadImage';
import Logo from '../Logo';

type UploadDialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

export default function UploadDialog({ ref }: UploadDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    ref?.current?.close();
    formRef.current?.reset();
    setThumbnailUrl('');
    setFileUrl('');
    setSubmitted(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await uploadMovie({
      title,
      thumbnailUrl,
      fileUrl,
    });

    setSubmitted(true);
  };

  const onFileUpload = (results: ImageKitResponse) => {
    setThumbnailUrl(results.thumbnailUrl);
    setFileUrl(results.url);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
        {submitted ? (
          <div className="flex flex-col items-center justify-between justify-center h-[350px]">
            <Logo className="hidden md:block" />
            <div className="text-center">
              <h2 className="text-[24px]/[26px] mb-[32px] md:mb-[24px]">
                ¡Felicitaciones!
              </h2>
              <p className="text-[20px]/[32px] md:text-[20px]/[24px]">
                Liteflix The Movie fue correctamente subida.
              </p>
            </div>
            <Primary
              className="text-black bg-white"
              type="button"
              onClick={closeModal}
            >
              Ir a Home
            </Primary>
          </div>
        ) : (
          <form
            className="flex flex-col items-center justify-center"
            ref={formRef}
            onSubmit={onSubmit}
          >
            <h2 className="text-[22px]/[22px] md:text-[20px]/[20px] tracking-[4px] text-aqua">
              Agregar película
            </h2>

            <UploadDropZone onSuccess={onFileUpload} />

            <input
              className="input text-base-custom text-center w-[248px]"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onTitleChange}
            />

            <Primary
              className="text-black mt-[96px] md:mt-[48px] bg-white"
              type="submit"
              disabled={!thumbnailUrl || !fileUrl || !title}
            >
              Subir Pelicula
            </Primary>
          </form>
        )}
      </div>
    </dialog>
  );
}
