import { createContext, useContext } from 'react';

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedValue: {
    value: string;
    label: string;
  };
  setSelectedValue: (value: { value: string; label: string }) => void;
  onChange?: (value: { value: string; label: string }) => void;
};

export const SelectContext = createContext<SelectContextType | undefined>(
  undefined
);

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('useSelect must be used within SelectProvider');
  return context;
};
