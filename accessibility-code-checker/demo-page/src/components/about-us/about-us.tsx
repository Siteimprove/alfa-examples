import { Layout } from "../layout/layout";
import signature from "../../assets/img/signature.webp";
import "./about-us.css";

export const AboutUs: React.FC = () => {
  return (
    <Layout className="about-us" topPadding="large">
      <div className="about-us-content">
        <div className="about-us-content-left">
          <a href="www.siteimprove.com">
            <span className="about-us-img"></span>
          </a>
        </div>
        <div className="about-us-content-right">
          <p className="section-name">About Us</p>
          <h2>We Build New Future With Best Techology</h2>
          <p>
            We’re a people-centric software company driven by the desire to show
            businesses that making the internet a more inclusive place is good
            for their users, their business outcomes, and the future of the
            internet. That’s why Siteimprove is the go-to solution for
            organizations who want to grow their business with purpose.
          </p>
          <div className="about-us-bullets">
            <ul>
              <li>We work with you</li>
              <li>We help you simplify the complex</li>
              <li>Affordable Pricing</li>
            </ul>
            <ul>
              <li>We empower you to grow</li>
              <li>Innovative Solutions</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <img src={signature} alt="Signature" />
          <p className="about-us-name">Chief Executive Officer</p>
        </div>
      </div>
    </Layout>
  );
};
