'use client';
import { useRef, useState } from 'react';
import { uploadMovie } from '@/services/movieActions';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import Primary from '../../ui/Buttons/Primary';
import UploadDropZone from '../../ui/UploadDropZone';
import { ImageKitResponse } from '@/services/uploadImage';
import Logo from '../../ui/Logo';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Secondary from '@/components/ui/Buttons/Secondary';
import queryClient from '@/lib/queryClient';

export default function UploadDialog() {
  const formRef = useRef<HTMLFormElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    formRef.current?.reset();
    setThumbnailUrl('');
    setFileUrl('');
    setTitle('');
    setSubmitted(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await uploadMovie({
      title,
      thumbnailUrl,
      fileUrl,
    });

    queryClient.invalidateQueries({ queryKey: ['uploaded-movies'] });

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
    <DialogContent className="bg-background text-white w-screen lg:w-[738px] h-screen lg:h-fit p-0 rounded-none border-none">
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </VisuallyHidden>
      <div className="w-full px-[24px] lg:py-[48px] lg:px-[64px]">
        {submitted ? (
          <div className="flex flex-col items-center lg:justify-between justify-center h-full lg:h-[350px]">
            <Logo className="hidden lg:block" />
            <div className="text-center">
              <h2 className="text-[24px]/[26px] mb-[32px] lg:mb-[24px]">
                ¡Felicitaciones!
              </h2>
              <p className="font-light mb-[133px] lg:mb-0 text-[20px]/[32px] lg:text-[20px]/[24px]">
                {title} The Movie fue correctamente subida.
              </p>
            </div>
            <DialogClose asChild>
              <Primary
                className="text-black bg-white"
                type="button"
                onClick={closeModal}
              >
                <span className="text-black">Ir a Home</span>
              </Primary>
            </DialogClose>
          </div>
        ) : (
          <form
            className="flex flex-col items-center justify-center h-full"
            ref={formRef}
            onSubmit={onSubmit}
          >
            <h2 className="text-[22px]/[22px] lg:text-[20px]/[20px] tracking-[4px] text-aqua">
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
              className="mt-[96px] lg:mt-[48px] bg-white"
              type="submit"
              disabled={!thumbnailUrl || !fileUrl || !title}
            >
              <span className="text-black">Subir Pelicula</span>
            </Primary>

            <DialogClose asChild>
              <Secondary
                className="lg:hidden mt-[24px]"
                type="button"
                onClick={closeModal}
              >
                <span className="text-white">Salir</span>
              </Secondary>
            </DialogClose>
          </form>
        )}
      </div>
    </DialogContent>
  );
}
