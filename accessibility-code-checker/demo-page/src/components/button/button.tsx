import "./button.css";

interface ButtonProps {
  onClick: () => void;
  text: string;
  noBorder?: boolean;
  secondary?: boolean;
  icon?: string;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  noBorder,
  secondary,
  icon,
}) => {
  const border = noBorder ? "no-border" : "";
  const secondaryClass = secondary ? "secondary" : "";
  const classes = `button ${border} ${secondaryClass}`;
  const textAndIcon = icon ? `${icon} ${text}` : text;

  return (
    <button className={classes} onClick={onClick}>
      {textAndIcon}
    </button>
  );
};

export default Button;
