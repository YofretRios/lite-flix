import clsx from 'clsx';
import { BaseButtonProps } from './types';

export default function Tertiary({
  children,
  className,
  onClick,
}: BaseButtonProps) {
  const classes = clsx(
    'bg-transparent text-white font-bold tracking-[4px] text-[18px]/[18px] px-4 py-2 flex items-center space-x-2 transition-opacity duration-300 hover:opacity-60',
    className
  );

  return (
    <button onClick={onClick} type="button" className={classes}>
      {children}
    </button>
  );
}
