import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TopSection } from "./components/head-section/top-section";
import { Pricing } from "./components/pricing/pricing";
import { AboutUs } from "./components/about-us/about-us";
import { OurServices } from "./components/our-services/our-services";
import { Testimonials } from "./components/testimonials/testimonials";
import { InaccessibleComponent } from "./pages/inaccessible-component";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inaccessible" element={<InaccessibleComponent />} />
        </Routes>
      </div>
    </Router>
  );
}
// Define the Home page component
const HomePage = () => (
  <>
    <TopSection />
    <AboutUs />
    <OurServices />
    <Pricing />
    <Testimonials />
  </>
);
export default App;
