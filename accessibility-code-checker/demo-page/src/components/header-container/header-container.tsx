import "./header-container.css";

import logo from "../../assets/img/quant117-logo.png";
import Button from "../button/button";
import { Layout } from "../layout/layout";

export const HeaderContainer: React.FC = () => {
  return (
    <Layout className="header-container" topPadding="large">
      <div className="header-container-content">
        <div className="site-branding">
          <img src={logo} alt="Quant logo" />
        </div>
        <div className="header-container-search">
          <input type="text" placeholder="Search Products..." />
          <Button
            text="Search"
            onClick={() => console.log("search clicked")}
            noBorder
          />
        </div>
      </div>
    </Layout>
  );
};
