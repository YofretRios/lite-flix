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
import { motion } from 'motion/react';
import { getAnimationProps } from '@/utils/animationVariants';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const { openDialog } = useDialog();

  const triggerMenu = () => {
    setOpenMenu(true);
  };

  return (
    <header className="py-[15px] lg:py-[32px] flex items-center justify-between md:justify-start">
      <motion.p
        className="order-2 md:order-1 z-30 md:z-20 text-aqua tracking-[4px] text-[34px]/[34px]"
        {...getAnimationProps('slideBottom')}
      >
        <span className="font-bold">LITE</span>
        <span className="font-light font-semibold">FLIX</span>
      </motion.p>

      <AnimatedWrapper
        preset="slideBottom"
        className="hidden md:flex md:order-2 md:z-20"
      >
        <Tertiary onClick={openDialog} className="ml-[64px] ">
          <Image src={plusIcon} alt="Play" />
          <span>Agregar Pelicula</span>
        </Tertiary>
      </AnimatedWrapper>

      <motion.button
        type="button"
        className="order-1 md:order-2 md:ml-auto z-20 py-[10px]"
        onClick={triggerMenu}
        {...getAnimationProps('slideTop', 0.3)}
      >
        <Image src={menuIcon} alt="Menu" />
      </motion.button>

      <motion.button
        className="hidden md:block md:order-2 md:ml-[40px] z-20"
        type="button"
        {...getAnimationProps('slideTop', 0.4)}
      >
        <Image src={bellIcon} alt="Notifications" />
      </motion.button>

      <motion.button
        className="order-3 md:ml-[40px] z-30"
        type="button"
        {...getAnimationProps('slideTop', 0.5)}
      >
        <Image height={40} width={40} src={user} alt="Anonymous user" />
      </motion.button>

      <Menu isOpen={openMenu} setIsOpen={setOpenMenu} />
    </header>
  );
}
