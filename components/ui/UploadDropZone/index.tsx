import React, { useRef, useState } from 'react';
import Image from 'next/image';
import uploadToImageKit from '@/services/uploadImage';
import clipIcon from '@/assets/icons/clip.svg';
import clsx from 'clsx';

type UploadDropZoneProps = {
  onUploadProgress?: (progress: number) => void;
  onDrop?: (file: File) => void;
  onSelected?: (file: File) => void;
  onSuccess?: (url: string) => void;
};

export default function UploadDropZone({
  onUploadProgress,
}: UploadDropZoneProps) {
  const [dragActive, setDragActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneClass = clsx(
    'flex items-center w-full justify-center mt-[72px] transition-all ease-in-out opacity-1 mb-[56px] md:my-[48px] py-[32px] md:py-[42px] border-2 border-dashed border-white cursor-pointer',
    { 'border-aqua opacity-[0.5] text-aqua': dragActive }
  );

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
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    console.log('handleDrop');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      const results = await uploadToImageKit(file, onUploadProgress);

      console.log(results);
    }
  };

  const handleClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelect = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      const results = await uploadToImageKit(file, onUploadProgress);

      console.log(results);
    }
  };

  return (
    <div>
      <div
        className={dropZoneClass}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <p className="text-[16px]/[19px] tracking-[4px] md:text-[16px]/[16px]">
          <Image className="inline mr-[16px]" src={clipIcon} alt="Paper clip" />
          <span>Agregá un archivo</span>
          <span className="hidden md:inline">
            &nbsp;o arrastralo y soltalo aquí
          </span>
        </p>
      </div>
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
