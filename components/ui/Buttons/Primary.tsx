import clsx from 'clsx';
import { BaseButtonProps } from './types';

export default function Primary({
  children,
  type = 'button',
  className,
  onClick,
}: BaseButtonProps) {
  const classes = clsx(
    'bg-background text-white py-[21px] flex items-center justify-center space-x-2 min-w-[248px] transition-opacity duration-300 hover:opacity-80 tracking-[4px] text-[18px]/[21.6px]',
    className
  );

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
