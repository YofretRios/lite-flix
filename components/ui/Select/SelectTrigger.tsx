import Image from 'next/image';
import { useSelect } from './SelectContext';

type SelectTriggerProps = {
  children: React.ReactNode;
};

export default function SelectTrigger({ children }: SelectTriggerProps) {
  const { isOpen, setIsOpen, selectedValue } = useSelect();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="items-end py-4 text-[16px]/[16px] tracking-[4px]"
    >
      <span className="font-normal">{children}</span>
      <span className="font-bold ml-[7px]">{selectedValue.label}</span>
      <Image
        className="inline ml-[10px]"
        src="/icons/arrow-down.svg"
        width="13"
        height="8"
        alt="Open Select"
      />
    </button>
  );
}
