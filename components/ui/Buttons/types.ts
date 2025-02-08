export interface BaseButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
