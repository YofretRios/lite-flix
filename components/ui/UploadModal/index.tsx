import { useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { uploadMovie } from '@/app/lib/movieActions';
import closeIcon from '@/assets/icons/close.svg';
import clipIcon from '@/assets/icons/clip.svg';
import uploadToImageKit from '@/services/uploadImage';
import Primary from '../Buttons/Primary';

type UploadDialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

export default function UploadDialog({ ref }: UploadDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);

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

  const trackProgress = (number: number) => {
    setProgress(number);
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    console.log('handleDrop');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      uploadToImageKit(file, trackProgress);
    }
  };

  const onDropZoneClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const dropZoneClass = clsx(
    'flex items-center w-full justify-center mt-[72px] transition-all ease-in-out opacity-1 mb-[56px] md:my-[48px] py-[32px] md:py-[42px] border-2 border-dashed border-white cursor-pointer',
    { 'border-aqua opacity-[0.5] text-aqua': dragActive }
  );

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

          <div
            className={dropZoneClass}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={onDropZoneClick}
          >
            <p className="text-[16px]/[19px] tracking-[4px] md:text-[16px]/[16px]">
              <Image
                className="inline mr-[16px]"
                src={clipIcon}
                alt="Paper clip"
              />
              <span>Agregá un archivo</span>
              <span className="hidden md:inline">
                &nbsp;o arrastralo y soltalo aquí
              </span>
            </p>
          </div>

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
