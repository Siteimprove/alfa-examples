import { Service } from "../service/service";
import it from "../../assets/icons/it.webp";
import marketing from "../../assets/icons/marketing.webp";
import developer from "../../assets/icons/developer.webp";
import seo from "../../assets/icons/seo.webp";
import security from "../../assets/icons/security.webp";
import cloud from "../../assets/icons/cloud.webp";
import { Layout } from "../layout/layout";
import "./our-services.css";

export const OurServices: React.FC = () => {
  return (
    <Layout className="our-services" topPadding="large">
      <div className="our-services-content">
        <div className="our-services-description">
          <p className="section-title">Our services</p>
          <h2>What service we offer</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <div className="our-services-services">
          <Service
            category="Inclusivity"
            description="Boost customer trust and brand reputation with accessible content."
            img={it}
            className="invert"
          />
          <Service
            category="Marketing Performance"
            description="Propel your marketing strategy with insights in one place."
            img={marketing}
          />
          <Service
            category="Content Experience"
            description="Attract your target audiences with a frictionless user experience."
            img={developer}
          />
          <Service
            category="SEO Booster"
            description="We can help you to find the problems that may are killing your search engines"
            img={seo}
          />
          <Service
            category="Content Security"
            description="Avoid lawsuits for not having adequate content to the main accessibility standards around the globe."
            img={security}
          />
          <Service
            category="Online management"
            description="Operate and configure everything completely simply and online"
            img={cloud}
          />
        </div>
      </div>
    </Layout>
  );
};
