export interface BaseButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
  textStyle?: string;
  text?: string;
  icon?: {
    src: string;
    alt: string;
  };
}
