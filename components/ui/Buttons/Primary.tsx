import clsx from 'clsx';
import Image from 'next/image';
import { BaseButtonProps } from './types';

export default function Primary({
  type = 'button',
  className,
  text,
  icon,
  textStyle,
  onClick,
}: BaseButtonProps) {
  const classes = clsx(
    'bg-background text-white py-[21px] flex items-center justify-center space-x-2 min-w-[248px]',
    className
  );

  const textClasses = clsx('tracking-[4px] text-[18px]/[21.6px]', textStyle);

  return (
    <button type={type} className={classes} onClick={onClick}>
      {icon && <Image src={icon.src} alt={icon.alt} />}
      <span className={textClasses}>{text}</span>
    </button>
  );
}
