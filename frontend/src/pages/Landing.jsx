import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import WhyChooseCareerPilot from "../components/landing/WhyChooseCareerPilot";
import EarlyAccessFeedback from "../components/landing/EarlyAccessFeedback";
import PlatformStats from "../components/landing/PlatformStats";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import Contact from "../components/landing/Contact";
import ScrollToTop from "../components/common/ScrollToTop";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <WhyChooseCareerPilot />

      <EarlyAccessFeedback />

      <PlatformStats />

      <FAQ />

      <Footer />

      <ScrollToTop/>

      <Contact />

    </div>
  );
}

export default Landing;