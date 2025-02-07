import clsx from 'clsx';
import Image from 'next/image';
import { BaseButtonProps } from './types';

export default function Tertiary({
  className,
  text,
  icon,
  textStyle,
  onClick,
}: BaseButtonProps) {
  const classes = clsx(
    'bg-transparent text-white px-4 py-2 flex items-center space-x-2',
    className
  );
  const textClasses = clsx(
    'font-bold tracking-[4px] text-[18px]/[18px]',
    textStyle
  );

  return (
    <button onClick={onClick} type="button" className={classes}>
      {icon && <Image className={textClasses} src={icon.src} alt={icon.alt} />}
      <span className={textClasses}>{text}</span>
    </button>
  );
}
