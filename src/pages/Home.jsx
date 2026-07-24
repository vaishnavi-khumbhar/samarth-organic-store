import Hero from "../components/Hero/Hero";
import OfferBanner from "../components/OfferBanner/OfferBanner";
import Categories from "../components/Categories/Categories";
import Benefits from "../components/Benefits/Benefits";
import AboutPreview from "../components/AboutPreview/AboutPreview";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import ManufacturingProcess from "../components/ManufacturingProcess/ManufacturingProcess";
import CounterSection from "../components/CounterSection/CounterSection";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA from "../components/CTA/CTA";

import { products } from "../data/products";

const Home = () => {
  return (
    <>
      <Hero />

      <OfferBanner />

      <AboutPreview />

      <Categories />

      <Benefits />

      {/* Featured Products */}
      <FeaturedProducts products={products} />

      <WhyChooseUs />

      <ManufacturingProcess />

      <CounterSection />

      <Testimonials />

      <CTA />
    </>
  );
};

export default Home;