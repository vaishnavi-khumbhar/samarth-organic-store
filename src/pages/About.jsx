import { motion } from "framer-motion";
import { Leaf, Award, Users, Sparkles } from "lucide-react";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Benefits from "../components/Benefits/Benefits";
import ManufacturingProcess from "../components/ManufacturingProcess/ManufacturingProcess";
import CTA from "../components/CTA/CTA";
import { NavLink } from "react-router-dom";

import aboutBanner from "../assets/images/about/about-banner.jpg";
import storyImage from "../assets/images/about/story.jpg";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const stats = [
  { icon: <Leaf size={20} />, value: "100%", label: "Natural" },
  { icon: <Award size={20} />, value: "25+", label: "Products" },
  { icon: <Users size={20} />, value: "5000+", label: "Happy Families" },
  { icon: <Sparkles size={20} />, value: "0%", label: "Chemicals" },
];

const About = () => {
  return (
    <>
      {/* ===== Full-width Overlay Banner ===== */}
      <section className="relative h-[62vh] min-h-[380px] sm:min-h-[420px] max-h-[600px] w-full overflow-visible">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src={aboutBanner}
          alt="Samarth Organic - Wood Pressed Oil"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1815]/90 via-[#1a1815]/40 to-[#1a1815]/30" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block bg-white/10 backdrop-blur-sm text-[#F5B800] border border-white/20 px-3 sm:px-4 py-1.5 rounded-full font-semibold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase"
          >
            About Samarth Organic
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mt-4 sm:mt-5 text-white leading-tight max-w-[280px] sm:max-w-3xl"
          >
            Trusted Brand of <br className="hidden sm:block" />
            Natural &amp; Organic Products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-4 sm:mt-5 text-white/85 max-w-[280px] sm:max-w-xl text-xs sm:text-base leading-6 sm:leading-7"
          >
            Extracted the traditional Lakdi Ghana way — pure, chemical-free,
            and full of natural goodness.
          </motion.p>
        </div>

        {/* Floating stats strip overlapping banner bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute -bottom-16 xs:-bottom-14 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[90%] xs:w-[88%] sm:w-auto z-20"
        >
          <div className="bg-white rounded-2xl sm:rounded-full shadow-[0_20px_50px_-15px_rgba(122,36,24,0.35)] px-3 xs:px-4 sm:px-10 py-4 sm:py-6 grid grid-cols-2 sm:flex sm:items-center gap-4 xs:gap-5 sm:gap-10">
            {stats.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 xs:gap-3 justify-center sm:justify-start"
              >
                <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4D9F38]/10 text-[#4D9F38] shrink-0">
                  {item.icon}
                </span>
                <div className="text-left">
                  <p className="font-bold text-[#312E2A] text-sm xs:text-base sm:text-lg leading-none">
                    {item.value}
                  </p>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-gray-400 mt-1">
                    {item.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <span className="hidden sm:block w-px h-8 bg-gray-200 ml-4 sm:ml-6" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== Our Story ===== */}
      <section className="relative overflow-hidden bg-[#FFFBF5] mt-16 xs:mt-16 sm:mt-24 lg:mt-10 py-14 sm:py-20">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-width relative grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-[22px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_-18px_rgba(122,36,24,0.3)]">
              <img
                src={storyImage}
                alt="Samarth Organic - Traditional Process"
                className="w-full h-[220px] xs:h-[260px] sm:h-[380px] object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-4 -right-3 sm:-top-5 sm:-right-6 bg-gradient-to-br from-[#7A2418] to-[#5C160D] text-white rounded-xl sm:rounded-2xl shadow-xl px-3.5 py-3 sm:px-5 sm:py-4 text-center"
            >
              <p className="text-lg xs:text-xl sm:text-3xl font-bold leading-none">
                Est.
              </p>
              <p className="text-[9px] xs:text-[10px] sm:text-xs text-white/80 mt-1 tracking-wide">
                Lakdi Ghana
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block bg-[#4D9F38]/10 text-[#4D9F38] px-3.5 sm:px-4 py-1.5 rounded-full font-semibold text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase"
            >
              Our Story
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-2xl xs:text-3xl sm:text-4xl font-bold mt-4 text-[#7A2418] leading-tight"
            >
              Pure Goodness <span className="text-[#7A2418]">From Nature</span>,
              <br />
              <span className="text-[#4D9F38]">To Your Home</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 sm:mt-6 leading-7 sm:leading-8 text-gray-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0"
            >
              Samarth Organic is dedicated to bringing premium natural and
              organic products to every home. From traditional Wood Pressed
              Oils to Pure Gir Cow Ghee, Natural Honey, Handmade Soaps and
              Jaggery products, every product is carefully prepared using
              authentic methods to preserve its natural goodness.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 leading-7 sm:leading-8 text-gray-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0"
            >
              Our mission is to promote a healthier lifestyle through
              chemical-free, nutrient-rich and naturally crafted products
              that combine traditional wisdom with modern quality standards.
            </motion.p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-7 sm:mt-8 max-w-xl mx-auto lg:mx-0">
              {[
                "Wood Pressed Oils",
                "Hair Oils",
                "Natural Honey",
                "Handmade Soaps",
                "Traditional Jaggery",
                "Gir Cow Ghee",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 sm:gap-3 rounded-xl bg-white border border-[#E9E3D8] px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm"
                >
                  <Leaf size={16} className="text-[#4D9F38] shrink-0 sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm font-medium text-[#312E2A]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <NavLink to="/products">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(122,36,24,0.05)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="border-2 border-[#7A2418] text-[#7A2418] rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-colors"
                >
                  Our Products
                </motion.button>
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />
      <Benefits />
      <ManufacturingProcess />
      <CTA />
    </>
  );
};

export default About;