import clsx from 'clsx';
import { BaseButtonProps } from './types';

export default function Tertiary({ children, className }: BaseButtonProps) {
  const classes = clsx(
    'bg-transparent text-white px-4 py-2 flex items-center space-x-2',
    className
  );

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
