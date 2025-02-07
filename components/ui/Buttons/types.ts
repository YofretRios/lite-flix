export interface BaseButtonProps {
  onClick?: () => void;
  className?: string;
  textStyle?: string;
  text?: string;
  icon?: {
    src: string;
    alt: string;
  };
}
