import Banner from "../components/Banner";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default LandingPage;
