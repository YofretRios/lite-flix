import { motion, AnimatePresence } from 'motion/react';
import { useSelect } from './SelectContext';

type SelectContentProps = {
  children: React.ReactNode;
};

export default function SelectContent({ children }: SelectContentProps) {
  const { isOpen } = useSelect();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="select-menu"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
