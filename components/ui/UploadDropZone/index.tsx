import React, { useImperativeHandle, useRef, useState, RefObject } from 'react';
import Image from 'next/image';
import uploadToImageKit, { ImageKitResponse } from '@/services/uploadImage';
import clsx from 'clsx';
import ProgressBar from '../ProgressBar';

export type UploadDropZoneHandle = {
  resetSignal: () => void;
};

type UploadDropZoneProps = {
  onUploadProgress?: (progress: number) => void;
  onSuccess?: (imageData: ImageKitResponse) => void;
  reset?: () => void;
  ref: RefObject<UploadDropZoneHandle | null>;
};

const controller = new AbortController();

export default function UploadDropZone({
  onUploadProgress,
  onSuccess,
  ref,
}: UploadDropZoneProps) {
  const controllerRef = useRef(controller);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      resetSignal: () => {
        setProgress(0);
        setFileId(null);
        setIsError(false);
        controllerRef.current = new AbortController();
      },
    }),
    []
  );

  const trackProgress = (progress: number) => {
    setProgress(progress);

    if (onUploadProgress) {
      onUploadProgress(progress);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const results = await uploadToImageKit(
          file,
          trackProgress,
          controllerRef.current
        );

        if (results && onSuccess) {
          onSuccess(results);
          setFileId(results.fileId);
        }
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  const handleClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelect = async () => {
    try {
      const file = fileInputRef.current?.files?.[0];

      if (file) {
        const results = await uploadToImageKit(
          file,
          trackProgress,
          controllerRef.current
        );

        if (results && onSuccess) {
          onSuccess(results);
          setFileId(results.fileId);
        }
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  const handleRetry = () => {
    setIsError(false);
    setProgress(0);
  };

  const cancelUpload = () => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
  };

  const dropZoneClass = clsx(
    'flex items-center w-full justify-center  transition-all ease-in-out opacity-1 py-[32px] lg:py-[42px] border-2 border-dashed cursor-pointer',
    { 'opacity-[0.5] text-aqua border-aqua': dragActive }
  );

  return (
    <div className="w-full mt-[72px] mb-[56px] lg:my-[48px]">
      {progress <= 0 && !isError ? (
        <div
          className={dropZoneClass}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <p className="text-[16px]/[19px] tracking-[4px] lg:text-[16px]/[16px]">
            <Image
              className="inline mr-[16px]"
              src="/icons/clip.svg"
              width="18"
              height="18"
              alt="Paper clip"
            />
            <span>Agregá un archivo</span>
            <span className="hidden lg:inline">
              &nbsp;o arrastralo y soltalo aquí
            </span>
          </p>
        </div>
      ) : (
        <ProgressBar
          progress={progress}
          isConfirmed={fileId !== null}
          isError={isError}
          onRetry={handleRetry}
          cancelRequest={cancelUpload}
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        name="file"
        onChange={handleSelect}
      />
    </div>
  );
}
