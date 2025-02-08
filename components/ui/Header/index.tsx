import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import clsx from 'clsx';
import plusIcon from '@/assets/icons/plus-icon.svg';
import bellIcon from '@/assets/icons/bell-icon.svg';
import menuIcon from '@/assets/icons/menu-icon.svg';
import user from '@/assets/images/user.png';
import Menu from '../Menu';
import Tertiary from '../Buttons/Tertiary';
import AnimatedWrapper from '../AnimatedWrapper';
import { getAnimationProps } from '@/utils/animationVariants';
import Logo from '../Logo';
import { DialogTrigger } from '../Dialog';

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuClasses = clsx('transition-opacity duration-300', {
    'opacity-0': openMenu,
  });

  const triggerMenu = () => {
    setOpenMenu(true);
  };

  return (
    <motion.header className="py-[15px] lg:py-[32px] flex items-center justify-between lg:justify-start">
      <Logo
        className="order-2 lg:order-1 z-[80] lg:z-20"
        {...getAnimationProps('slideBottom')}
      />

      <AnimatedWrapper
        preset="slideBottom"
        className="hidden lg:flex lg:order-2 lg:z-20"
      >
        <DialogTrigger className="z-30" asChild>
          <Tertiary className="ml-[64px] ">
            <Image src={plusIcon} alt="Play" />
            <span>Agregar Pelicula</span>
          </Tertiary>
        </DialogTrigger>
      </AnimatedWrapper>

      <motion.button
        type="button"
        className="order-1 lg:order-2 lg:ml-auto z-[10] lg:z-20 py-[10px]"
        onClick={triggerMenu}
        {...getAnimationProps('slideTop', 0.3)}
      >
        <Image className={menuClasses} src={menuIcon} alt="Menu" />
      </motion.button>

      <motion.button
        className="relative hidden lg:block lg:order-2 lg:ml-[40px] z-20"
        type="button"
        {...getAnimationProps('slideTop', 0.4)}
      >
        <Image src={bellIcon} alt="Notifications" />
        <div className="absolute h-[9px] w-[9px] bg-aqua top-[0] right-[1px] rounded-full"></div>
      </motion.button>

      <motion.button
        className="order-3 lg:ml-[40px] z-[80] lg:z-30"
        type="button"
        {...getAnimationProps('slideTop', 0.5)}
      >
        <Image height={40} width={40} src={user} alt="Anonymous user" />
      </motion.button>

      <Menu isOpen={openMenu} setIsOpen={setOpenMenu} />
    </motion.header>
  );
}
