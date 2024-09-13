import { Layout } from "../layout/layout";
import { Testimonial } from "../testimonial/testimonial";
import johnDoe from "../../assets/img/john.webp";
import jenniferDoe from "../../assets/img/jennifer.webp";
import claudiaDoe from "../../assets/img/claudia.webp";
import "./testimonials.css";

export const Testimonials: React.FC = () => {
  return (
    <Layout
      className="testimonials"
      style={{ backgroundColor: "var(--color--dark-blue)", opacity: 0.9 }}
      topPadding="large"
    >
      <div className="testimonials-content">
        <div className="testimonials-top">
          <p className="section-title">Testimonials</p>
          <h2>What Clients Say About Us</h2>
          <p className="subtle">Our clients can tell you even better than us</p>
        </div>
        <div className="testimonials-bottom">
          <Testimonial
            name="John Doe"
            position="CEO, non existant Co."
            text="The Siteimprove platform has enabled us to increase team efficiency by over 22% and double our traffic we wouldn’t be happier with the results."
            img={johnDoe}
          />
          <Testimonial
            name="Jennifer Doe"
            position="Marketing"
            text="Currently we can anticipate problems with the pre-publish tool and with this we avoid many problems in advance."
            img={jenniferDoe}
          />
          <Testimonial
            name="Claudia Doe"
            position="Marketing"
            text="We’ve made a lot of progress since we begin with Siteimprove. Catching possible misspellings, SEO problems and fixing accessibility issues, now we’re always trying to keep our level close to 100!"
            img={claudiaDoe}
          />
        </div>
      </div>
    </Layout>
  );
};
