import { Plan } from "../plan/plan";
import { Layout } from "../layout/layout";
import "./pricing.css";

export const Pricing: React.FC = () => {
  return (
    <Layout className="pricing" topPadding="large">
      <div className="pricing-content">
        <div className="pricing-description">
          <div className="pricing-description-left">
            <p className="section-title">Our Pricing</p>
            <h2>Choose The Best Pricing</h2>
          </div>
          <div className="pricing-description-left">
            <p>
              The Siteimprove platform is customized to fit the needs of your
              business—whether it’s simply staying on top of your website
              content quality or aggressive digital growth. The best way to
              understand our pricing is to get in touch so we can prepare a
              quote specific to your needs.
            </p>
          </div>
        </div>
        <div className="pricing-plans">
          <Plan
            category="Bacic Plan"
            features={[
              "Accessibility",
              "Quality Assurance",
              "Analytics",
              "Performance",
            ]}
            price={59.9}
          />
          <Plan
            category="Premium Plan"
            features={[
              "Accessibility",
              "Quality Assurance",
              "Analytics",
              "Performance",
              "SEO",
              "",
              "",
              "",
              "Potential Misspellings Analysis",
            ]}
            price={159.9}
            invert
          />
          <Plan
            category="Standard Plan"
            features={[
              "Accessibility",
              "Quality Assurance",
              "Analytics",
              "Performance",
              "SEO",
            ]}
            price={89.9}
          />
        </div>
      </div>
    </Layout>
  );
};
