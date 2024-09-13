import quote from "../../assets/icons/quote.webp";
import "./testimonial.css";

interface TestimonialProps {
  text: string;
  name: string;
  position: string;
  img: string;
}

export const Testimonial: React.FC<TestimonialProps> = (props) => {
  const { text, name, position, img } = props;
  return (
    <div className="testimonial">
      <div className="testimonial-top rounded-corners">
        <img src={quote} />
        <p className="testimonial-item-text">{text}</p>
      </div>
      <div className="testimonial-bottom">
        <img src={img} />
        <h3 className="testimonial-item-name">{name}</h3>
        <p className="testimonial-item-position">{position}</p>
      </div>
    </div>
  );
};
