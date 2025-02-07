import { useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/plus-icon.svg';
import bellIcon from '@/assets/icons/bell-icon.svg';
import menuIcon from '@/assets/icons/menu-icon.svg';
import user from '@/assets/images/user.png';
import Menu from '../Menu';
import Tertiary from '../Buttons/Tertiary';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const triggerMenu = () => {
    setOpenMenu(true);
  };

  return (
    <header className="py-[15px] lg:py-[32px] flex items-center justify-between md:justify-start">
      <p className="text-aqua tracking-[4px] text-[34px]/[34px] order-2 md:order-1 animate-fadeInSlideBottom z-30 md:z-20">
        <span className="font-bold">LITE</span>
        <span className="font-light font-semibold">FLIX</span>
      </p>

      <Tertiary
        className="ml-[64px] hidden md:flex md:order-2 animate-fadeInSlideBottom"
        text="Agregar Pelicula"
        icon={{ src: plusIcon, alt: 'Play' }}
      />

      <button
        type="button"
        className="order-1 md:order-2 md:ml-auto opacity-0 animate-fadeInSlideTop delay-300ms py-[10px]"
        onClick={triggerMenu}
      >
        <Image src={menuIcon} alt="Menu" />
      </button>
      <button
        type="button"
        className="hidden md:block md:order-2 md:ml-[40px] opacity-0 animate-fadeInSlideTop delay-400ms"
      >
        <Image src={bellIcon} alt="Notifications" />
      </button>
      <button className="order-3 md:ml-[40px] opacity-0 animate-fadeInSlideTop delay-500ms z-30">
        <Image height={40} width={40} src={user} alt="Anonymous user" />
      </button>

      <Menu isOpen={openMenu} setIsOpen={setOpenMenu} />
    </header>
  );
}
