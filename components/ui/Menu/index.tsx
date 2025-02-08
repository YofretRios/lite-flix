import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import closeIcon from '@/assets/icons/close.svg';
import plusIcon from '@/assets/icons/plus-icon.svg';
import Tertiary from '../Buttons/Tertiary';
import useBlockScrolling from '@/utils/hooks/useBlockScrolling';
import { useDialog } from '../UploadModal/UploadModalContext';

type MenuProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
  useBlockScrolling(isOpen);
  const { openDialog } = useDialog();

  const menuClass = clsx(
    'absolute pl-[24px] md:pl-[88px] right-0 top-0 h-screen bg-background z-30 w-full md:w-[768px] transition-transform duration-500 ease-in-out',
    {
      '-translate-y-full': !isOpen,
      'translate-y-[0%]': isOpen,
    }
  );

  const closeMenu = () => {
    setIsOpen(false);
  };

  const addMovie = () => {
    openDialog();
    closeMenu();
  };

  return (
    <div className={menuClass}>
      <div className="py-[25px] lg:py-[42px] flex items-center justify-between md:justify-start">
        <button type="button" onClick={closeMenu}>
          <Image src={closeIcon} alt="Close menu" />
        </button>
      </div>
      <ul className="font-light mt-[64px] md:mt-[94px]  space-y-[40px] text-[22px]/[22px] font-light tracking-[4px]">
        <li>inicio</li>
        <li>series</li>
        <li>películas</li>
        <li>agregadas recientemente</li>
        <li>populares</li>
        <li>mis películas</li>
        <li>mi lista</li>
        <li>
          <Tertiary onClick={addMovie}>
            <Image src={plusIcon} alt="Plus" />
            <span className="text-[22px]/[22px]">Agregar Pelicula</span>
          </Tertiary>
        </li>
        <li>cerrar sesión</li>
      </ul>
    </div>
  );
}
