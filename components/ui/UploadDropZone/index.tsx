import React, { useRef, useState } from 'react';
import Image from 'next/image';
import uploadToImageKit, { ImageKitResponse } from '@/services/uploadImage';
import clipIcon from '@/assets/icons/clip.svg';
import clsx from 'clsx';
import ProgressBar from '../ProgressBar';

type UploadDropZoneProps = {
  onUploadProgress?: (progress: number) => void;
  onSuccess?: (imageData: ImageKitResponse) => void;
};

export default function UploadDropZone({
  onUploadProgress,
  onSuccess,
}: UploadDropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        const results = await uploadToImageKit(file, trackProgress);

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
        const results = await uploadToImageKit(file, trackProgress);

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

  const handleRetry = async () => {
    setIsError(false);
    setProgress(0);
  };

  const dropZoneClass = clsx(
    'flex items-center w-full justify-center  transition-all ease-in-out opacity-1 py-[32px] md:py-[42px] border-2 border-dashed cursor-pointer',
    { 'opacity-[0.5] text-aqua border-aqua': dragActive }
  );

  return (
    <div className="w-full mt-[72px] mb-[56px] md:my-[48px]">
      {progress <= 0 && !isError ? (
        <div
          className={dropZoneClass}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
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
      ) : (
        <ProgressBar
          progress={progress}
          isConfirmed={fileId !== null}
          isError={isError}
          onRetry={handleRetry}
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
