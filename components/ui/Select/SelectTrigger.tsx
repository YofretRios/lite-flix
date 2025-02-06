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
      className="px-4 py-4 text-[16px]/[16px] tracking-[4px]"
    >
      <span className="font-light font-semibold">{children}</span>
      {selectedValue.label}
    </button>
  );
}
