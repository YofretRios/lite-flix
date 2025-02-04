import Image from 'next/image';
import Tertiary from '../Buttons/Tertiary';
import plusIcon from '@/assets/icons/plus-icon.svg';
import bellIcon from '@/assets/icons/bell-icon.svg';
import menuIcon from '@/assets/icons/menu-icon.svg';
import user from '@/assets/images/user.png';

export default function Header() {
  return (
    <header className="py-[15px] lg:py-[32px] flex items-center">
      <p className="text-aqua tracking-[4px] text-[34px]/[34px]">
        <span className="font-bold">LITE</span>
        <span className="font-normal">FLIX</span>
      </p>

      <Tertiary className="ml-[64px]">
        <Image src={plusIcon} alt="Add" />
        <span className="font-bold tracking-[4px] text-[18px]/[18px]">
          Agregar Pelicula
        </span>
      </Tertiary>

      <div className="flex items-center space-x-[40px] ml-auto">
        <Image src={menuIcon} alt="Menu" />
        <Image src={bellIcon} alt="Notifications" />
        <Image height={40} width={40} src={user} alt="Anonymous user" />
      </div>
    </header>
  );
}
