import "./layout.css";

interface LayoutProps {
  children: React.ReactNode;
  topPadding?: "regular" | "large" | "none";
  className?: string;
  style?: React.CSSProperties;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  topPadding,
  style,
}) => {
  const classes = className
    ? `layout ${className} ${topPadding ?? "regular"}`
    : `layout ${topPadding ?? "regular"}`;

  return (
    <div className={`${classes}`} style={style}>
      <div className="layout-container">{children}</div>
    </div>
  );
};
