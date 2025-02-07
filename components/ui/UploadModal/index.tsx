import { useRef, useState } from 'react';
import Image from 'next/image';
import { IKUpload, ImageKitProvider } from 'imagekitio-next';
import { uploadMovie } from '@/app/lib/movieActions';
import imageAuthenticatorService from '@/services/imageAuthenticatorService';
import closeIcon from '@/assets/icons/close.svg';
import clipIcon from '@/assets/icons/clip.svg';
import Primary from '../Buttons/Primary';

type UploadDialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

const urlEndpoint = process.env.NEXT_PUBLIC_IMGKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY;

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

  const trackProgress = (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
    if (event.lengthComputable) {
      const percentage = (event.loaded / event.total) * 100;

      setProgress(percentage);
    }
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

      if (fileInputRef?.current) {
        // Access the underlying input element
        const inputElement = fileInputRef.current;
        if (inputElement) {
          // Create a change event
          const event = new Event('change', { bubbles: true });

          // Set the files
          Object.defineProperty(inputElement, 'files', {
            value: file,
          });

          // Dispatch the event
          inputElement.dispatchEvent(event);
        }
      }
    }
  };

  const onDropZoneClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
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

          <div
            className="flex items-center w-full justify-center mt-[72px] mb-[56px] md:my-[48px] py-[32px] md:py-[42px] border-2 border-dashed border-white cursor-pointer"
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

          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={imageAuthenticatorService}
          >
            <IKUpload
              ref={fileInputRef}
              className="hidden"
              onSuccess={(data) => {
                console.log(data);
                setThumbnailUrl(data.thumbnailUrl);
                setFileUrl(data.url);
              }}
              onUploadProgress={trackProgress}
            />
          </ImageKitProvider>

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
