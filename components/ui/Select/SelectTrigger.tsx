import Image from 'next/image';
import { useSelect } from './SelectContext';
import arrowDown from '@/assets/icons/arrow-down.svg';

type SelectTriggerProps = {
  children: React.ReactNode;
};

export default function SelectTrigger({ children }: SelectTriggerProps) {
  const { isOpen, setIsOpen, selectedValue } = useSelect();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="relative flex items-end px-4 py-4 text-[16px]/[16px] tracking-[4px]"
    >
      <span className="font-normal">{children}</span>
      <span className="font-bold ml-[7px]">{selectedValue.label}</span>
      <Image
        className="absolute top-[18px] -right-[5px]"
        src={arrowDown}
        alt="Open Select"
      />
    </button>
  );
}
