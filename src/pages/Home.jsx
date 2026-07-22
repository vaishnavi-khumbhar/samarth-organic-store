import Hero from "../components/Hero/Hero";
import OfferBanner from "../components/OfferBanner/OfferBanner";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Benefits from "../components/Benefits/Benefits";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import AboutPreview from "../components/AboutPreview/AboutPreview";
import ManufacturingProcess from "../components/ManufacturingProcess/ManufacturingProcess";
import CounterSection from "../components/CounterSection/CounterSection";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA from "../components/CTA/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <OfferBanner />
       <AboutPreview />
      <Categories />
       <Benefits />
      <FeaturedProducts />
     
      <WhyChooseUs />
      <ManufacturingProcess />
      <CounterSection />
      <Testimonials />
     
      <CTA />
    </>
  );
};

export default Home;