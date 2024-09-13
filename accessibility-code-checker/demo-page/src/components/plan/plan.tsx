import Button from "../button/button";
import "./plan.css";

interface PlanProps {
  category: string;
  features: string[];
  price: number;
  invert?: boolean;
}

export const Plan: React.FC<PlanProps> = (props) => {
  const { category, features, price, invert } = props;
  const classNames = invert
    ? "plan invert rounded-corners"
    : "plan rounded-corners";
  return (
    <div className={classNames}>
      <h3 className="plan-category">{category}</h3>
      <h2 className="plan-price bold">${price}</h2>
      <hr />
      <ul className="plan-name bold">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button
        text="Get started"
        onClick={() => console.log("read more clicked")}
        secondary={!!invert}
      />
    </div>
  );
};
