import { Banner } from "../banner/banner";
import Button from "../button/button";
import topBannerBg from "../.././assets/img/top-banner.webp";
import { Layout } from "../layout/layout";
import "./top-section.css";

export const TopSection: React.FC = () => {
  return (
    <div className="top-section">
      <Banner backgroundImg={topBannerBg}>
        <span className="top-section-dimmer"></span>
        <div className="top-section-top">
          <span className="top-section-dimmer-light"></span>
          <Layout>
            <div className="top-section-top-content">
              <h3>Birmingham Services</h3>
              <Button
                text="Get started"
                onClick={() => console.log("Button clicked")}
              />
            </div>
          </Layout>
        </div>

        <div className="top-section-content">
          <Layout className="top-section-content-layout">
            <div className="top-section-content-left">
              <h1>We Are “the Company” that will improve your business</h1>
              <p>
                Attracting more people with the right message is harder than
                ever. Stand out with content that starts conversations and grows
                revenue.
              </p>
              <Button
                text="Get started"
                onClick={() => console.log("Button clicked")}
              />
            </div>
            <div className="top-section-content-right"></div>
          </Layout>
        </div>
      </Banner>
    </div>
  );
};
