import { createContext, useContext, useRef } from 'react';
import UploadModal from '.';

type UploadModalContextType = {
  dialogRef?: React.RefObject<HTMLDialogElement | null>;
  openDialog: () => void;
};

const UploadModalContext = createContext<UploadModalContextType | undefined>(
  undefined
);

export const useDialog = () => {
  const context = useContext(UploadModalContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

type DialogProviderProps = {
  children: React.ReactNode;
};

export function UploadModalProvider({ children }: DialogProviderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const value = { dialogRef, openDialog };

  return (
    <UploadModalContext.Provider value={value}>
      {children}
      <UploadModal ref={dialogRef} />
    </UploadModalContext.Provider>
  );
}
