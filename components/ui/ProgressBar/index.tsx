import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';

type ProgressBarProps = {
  progress: number;
  isConfirmed?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  cancelRequest?: () => void;
};

const statuses = {
  idle: '',
  loading: 'Cancelar',
  success: '¡Listo!',
  error: 'Reintentar',
};

export default function ProgressBar({
  progress,
  isConfirmed,
  isError,
  cancelRequest,
  onRetry,
}: ProgressBarProps) {
  const [status, setStatus] = useState(statuses.idle);

  useEffect(() => {
    if (progress === 100 && isConfirmed) {
      setStatus(statuses.success);
    } else if (isError) {
      setStatus(statuses.error);
    } else {
      setStatus(statuses.loading);
    }
  }, [progress, isConfirmed, isError]);

  const statusClass = clsx(
    'text-[14px]/[14px] lg:text-[18px]/[18px] tracking-[4] mt-[18px] text-right transition-opacity duration-300 hover:opacity-70',
    { 'text-aqua': status === statuses.success }
  );
  const progressClass = clsx('absolute bg-aqua h-[8px] -top-[2px]', {
    'bg-red': isError,
  });

  const onAction = () => {
    if (onRetry && statuses.error) {
      onRetry();
      setStatus(statuses.idle);
    }
    if (cancelRequest && statuses.loading) {
      cancelRequest();
      setStatus(statuses.idle);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full h-[87.60px] lg:h-[106.60px]">
      <p className="text-[14px]/[16px] tracking-[4px] lg:text-[16px]/[19px] font-light mb-[16px]">
        Cargando&nbsp;
        <span className="text-[14px]/[14px] lg:text-[16px]/[16px] tracking-[4px] font-bold">
          %{progress}
        </span>
      </p>
      <div className="w-full h-[4px] bg-white/50 relative">
        <motion.div
          className={progressClass}
          initial={{ width: !isError ? 0 : 100 }}
          animate={{ width: `${!isError ? progress : 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <button type="button" className={statusClass} onClick={onAction}>
        {status}
      </button>
    </div>
  );
}
