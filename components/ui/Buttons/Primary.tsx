import clsx from 'clsx';
import Image from 'next/image';
import { BaseButtonProps } from './types';

export default function Primary({ className, text, icon }: BaseButtonProps) {
  const classes = clsx(
    'bg-background text-white py-[21px] flex items-center justify-center space-x-2 min-w-[248]',
    className
  );

  return (
    <button type="button" className={classes}>
      {icon && <Image src={icon.src} alt={icon.alt} />}
      <span className="tracking-[4px] text-[18px]/[21.6px]">{text}</span>
    </button>
  );
}
