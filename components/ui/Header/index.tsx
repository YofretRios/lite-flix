import Image from 'next/image';
import Tertiary from '../Buttons/Tertiary';
import plusIcon from '@/assets/icons/plus-icon.svg';
import bellIcon from '@/assets/icons/bell-icon.svg';
import menuIcon from '@/assets/icons/menu-icon.svg';
import user from '@/assets/images/user.png';

export default function Header() {
  return (
    <header className="sticky py-[15px] lg:py-[32px] flex items-center justify-between md:justify-start container">
      <p className="text-aqua tracking-[4px] text-[34px]/[34px] order-2 md:order-1 animate-fadeInSlideBottom">
        <span className="font-bold">LITE</span>
        <span className="font-light font-semibold">FLIX</span>
      </p>

      <Tertiary
        className="ml-[64px] hidden md:flex md:order-2 animate-fadeInSlideBottom"
        text="Agregar Pelicula"
        icon={{ src: plusIcon, alt: 'Play' }}
      />

      <Image
        className="order-1 md:order-2 md:ml-auto opacity-0 animate-fadeInSlideTop delay-300ms"
        src={menuIcon}
        alt="Menu"
      />
      <Image
        className="hidden md:block md:order-2 md:ml-[40px] opacity-0 animate-fadeInSlideTop delay-400ms"
        src={bellIcon}
        alt="Notifications"
      />
      <Image
        className="order-3 md:ml-[40px] opacity-0 animate-fadeInSlideTop delay-500ms"
        height={40}
        width={40}
        src={user}
        alt="Anonymous user"
      />
    </header>
  );
}
