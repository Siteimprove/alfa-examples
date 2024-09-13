import "./banner.css";

interface BannerProps {
  children: React.ReactNode;
  backgroundImg: string;
  lightenBackground?: boolean;
  darkenBackground?: boolean;
}

export const Banner: React.FC<BannerProps> = (props) => {
  const { backgroundImg, children, darkenBackground, lightenBackground } =
    props;
  const classes = `banner ${darkenBackground ? "darken" : ""} ${
    lightenBackground ? "lighten" : ""
  }`;

  return (
    <div
      className={classes}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {children}
    </div>
  );
};
