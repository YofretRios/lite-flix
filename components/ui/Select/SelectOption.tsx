import Image from 'next/image';
import clsx from 'clsx';
import { useSelect } from './SelectContext';

type SelectOptionProps = {
  label: string;
  value: string;
};

export default function SelectOption({ label, value }: SelectOptionProps) {
  const { setSelectedValue, setIsOpen, selectedValue, onChange } = useSelect();

  const handleSelect = () => {
    setSelectedValue({ value, label });
    if (onChange) onChange({ value, label });
    setIsOpen(false);
  };

  const isSelected = selectedValue.value === value;
  const labelClass = clsx('text-[16px]/[16px]', {
    'font-light': !isSelected,
  });

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="flex w-full px-[24px] py-[8px] text-left text-[16px]/[16px] tracking-[4px] hover:bg-white/10"
    >
      <span className={labelClass}>{label}</span>
      {isSelected && (
        <Image
          className="ml-auto"
          src="/icons/heavy-check-mark.svg"
          width="14"
          height="11"
          alt="Option Selected"
        />
      )}
    </button>
  );
}
