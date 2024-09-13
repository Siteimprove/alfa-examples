import { Layout } from "../layout/layout";
import "./menu.css";

export const Menu: React.FC = () => {
  return (
    <Layout className="menu" topPadding="none">
      <div className="menu-content">
        <div className="menu-item">
          <a href="#home">Shop</a>
        </div>
        <div className="menu-item">
          <a href="#about">Finance</a>
        </div>
        <div className="menu-item">
          <a href="#services">Tax</a>
        </div>
        <div className="menu-item">
          <a href="#contact">Learn</a>
        </div>
      </div>
    </Layout>
  );
};
