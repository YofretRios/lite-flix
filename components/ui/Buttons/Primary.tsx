import clsx from 'clsx';
import { BaseButtonProps } from './types';

export default function Primary({
  children,
  type = 'button',
  className,
  onClick,
  disabled = false,
}: BaseButtonProps) {
  const classes = clsx(
    'bg-background text-white py-[21px] flex items-center justify-center space-x-2 min-w-[248px] transition-opacity duration-300 hover:opacity-70 tracking-[4px] text-[18px]/[21.6px] disabled:opacity-50',
    className
  );

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
