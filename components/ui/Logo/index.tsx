import React from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';

export default function Logo({ className, ...rest }: { className?: string }) {
  const classes = clsx(
    'text-aqua tracking-[4px] text-[34px]/[34px]',
    className
  );

  return (
    <motion.p className={classes} {...rest}>
      <span className="font-bold">LITE</span>
      <span className="font-light">FLIX</span>
    </motion.p>
  );
}
