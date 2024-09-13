import "./icon.css";

interface IconProps {
  src: string;
  alt: string;
  className?: string;
  onclick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ src, alt, className, onclick }) => {
  const classes = `icon ${className} ${onclick ? "clickable" : ""}`;
  return <img src={src} alt={alt} className={classes} onClick={onclick} />;
};
