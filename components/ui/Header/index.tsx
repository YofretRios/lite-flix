import { useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/plus-icon.svg';
import bellIcon from '@/assets/icons/bell-icon.svg';
import menuIcon from '@/assets/icons/menu-icon.svg';
import user from '@/assets/images/user.png';
import Menu from '../Menu';
import Tertiary from '../Buttons/Tertiary';
import { useDialog } from '../UploadModal/UploadModalContext';
import AnimatedWrapper from '../AnimatedWrapper';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const { openDialog } = useDialog();

  const triggerMenu = () => {
    setOpenMenu(true);
  };

  return (
    <header className="py-[15px] lg:py-[32px] flex items-center justify-between md:justify-start">
      <AnimatedWrapper
        preset="slideBottom"
        className="order-2 md:order-1 z-30 md:z-20"
      >
        <p className="text-aqua tracking-[4px] text-[34px]/[34px] ">
          <span className="font-bold">LITE</span>
          <span className="font-light font-semibold">FLIX</span>
        </p>
      </AnimatedWrapper>

      <AnimatedWrapper
        preset="slideBottom"
        className="hidden md:flex md:order-2 md:z-20"
      >
        <Tertiary onClick={openDialog} className="ml-[64px] ">
          <Image src={plusIcon} alt="Play" />
          <span>Agregar Pelicula</span>
        </Tertiary>
      </AnimatedWrapper>

      <AnimatedWrapper
        className="order-1 md:order-2 md:ml-auto z-20"
        preset="slideTop"
        delay={0.3}
      >
        <button type="button" className="py-[10px]" onClick={triggerMenu}>
          <Image src={menuIcon} alt="Menu" />
        </button>
      </AnimatedWrapper>

      <AnimatedWrapper
        className="hidden md:block md:order-2 md:ml-[40px] z-20"
        preset="slideTop"
        delay={0.4}
      >
        <button type="button">
          <Image src={bellIcon} alt="Notifications" />
        </button>
      </AnimatedWrapper>

      <AnimatedWrapper
        className="order-3 md:ml-[40px] z-30"
        preset="slideTop"
        delay={0.5}
      >
        <button>
          <Image height={40} width={40} src={user} alt="Anonymous user" />
        </button>
      </AnimatedWrapper>

      <Menu isOpen={openMenu} setIsOpen={setOpenMenu} />
    </header>
  );
}
