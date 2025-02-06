import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { SelectContext } from './SelectContext';

type SelectProps = {
  children: React.ReactNode;
  className?: string;
  defaultValue?: {
    value: string;
    label: string;
  };
  onChange?: (value: { value: string; label: string }) => void;
};

export default function Select({
  children,
  className,
  defaultValue = { value: '', label: '' },
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectClasses = clsx('relative z-20 text-center', className);

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedValue,
        setSelectedValue,
        onChange,
      }}
    >
      <div ref={dropdownRef} className={selectClasses}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}
