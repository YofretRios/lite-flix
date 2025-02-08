import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Tertiary from '../Buttons/Tertiary';
import useBlockScrolling from '@/utils/hooks/useBlockScrolling';
import { DialogTrigger } from '@radix-ui/react-dialog';

type MenuProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
  useBlockScrolling(isOpen);

  const menuClass = clsx(
    'absolute pl-[24px] lg:pl-[88px] right-0 top-0 h-screen bg-background z-30 w-full lg:w-[768px] transition-transform duration-500 ease-in-out',
    {
      '-translate-y-full': !isOpen,
      'translate-y-[0%]': isOpen,
    }
  );

  const closeMenu = () => {
    setIsOpen(false);
  };

  const addMovie = () => {
    closeMenu();
  };

  return (
    <div className={menuClass}>
      <div className="py-[25px] lg:py-[42px] flex items-center justify-between lg:justify-start z-[80]">
        <button type="button" onClick={closeMenu}>
          <Image
            src="/icons/close.svg"
            width="20"
            height="20"
            alt="Close menu"
          />
        </button>
      </div>
      <ul className="font-light mt-[64px] lg:mt-[94px]  space-y-[40px] text-[22px]/[22px] font-light tracking-[4px]">
        <li>inicio</li>
        <li>series</li>
        <li>películas</li>
        <li>agregadas recientemente</li>
        <li>populares</li>
        <li>mis películas</li>
        <li>mi lista</li>
        <li>
          <DialogTrigger asChild>
            <Tertiary onClick={addMovie}>
              <Image
                src="/icons/plus-icon.svg"
                width="16"
                height="16"
                alt="Plus"
              />
              <span className="text-[22px]/[22px]">Agregar Pelicula</span>
            </Tertiary>
          </DialogTrigger>
        </li>
        <li>cerrar sesión</li>
      </ul>
    </div>
  );
}
