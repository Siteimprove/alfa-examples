import "./service.css";

interface ServiceProps {
  img: string;
  category: string;
  description: string;
  className?: string;
}

export const Service: React.FC<ServiceProps> = (props) => {
  const { img, category, description, className } = props;
  const classes = className
    ? `service rounded-corners ${className}`
    : "service rounded-corners";
  return (
    <div className={classes}>
      <div className="service-img">
        <img src={img} alt="service" />
      </div>
      <h3 className="service-category">{category}</h3>
      <p className="service-description bold">{description}</p>
      <a href="#" className="service-read-more">
        Read more
      </a>
    </div>
  );
};
