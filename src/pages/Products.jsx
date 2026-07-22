import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductFilter from "../components/ProductFilter/ProductFilter";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA from "../components/CTA/CTA";

const productsBanner =
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&q=80";

const oilChips = [
  "Groundnut Oil",
  "Sesame Oil",
  "Coconut Oil",
  "Sunflower Oil",
  "Mustard Oil",
  "Flaxseed Oil",
  "Almond Oil",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const Products = () => {
  return (
    <>
      {/* ===== Products Banner ===== */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            src={productsBanner}
            alt="Wood Pressed Oil Manufacturer in Sangli - Samarth Organic Oil"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1815]/90 via-[#1a1815]/78 to-[#FFFBF5]" />
        </div>

        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4D9F38] via-[#F5B800] to-[#7A2418] z-10" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
         className="relative container-width pt-16 sm:pt-10 pb-10 sm:pb-24 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-[#F5B800] border border-white/20 px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.25em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] animate-pulse" />
            Our Products
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-5xl md:text-6xl font-bold mt-5 text-white leading-tight max-w-3xl mx-auto"
          >
            100% Pure Wood Pressed{" "}
            <span className="bg-gradient-to-r from-[#F5B800] to-[#ffd35c] bg-clip-text text-transparent">
              Organic Oils
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-7"
          >
            Best Wood Pressed Oil Manufacturer in Sangli — Groundnut, Sesame,
            Coconut, Sunflower, Mustard, Flaxseed &amp; Almond Oil, extracted
            using the traditional Lakdi Ghana process.
          </motion.p>


          {/* Search bar */}
          <motion.div variants={fadeUp} className="mt-2 max-w-xl mx-auto">
           
          </motion.div>


          {/* Oil category chips */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mt-8"
          >
            {oilChips.map((chip, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.06, y: -2 }}
                className="cursor-pointer bg-white/5 hover:bg-[#4D9F38] border border-white/15 hover:border-[#4D9F38] text-white/90 hover:text-white text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-all duration-300"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Filter bar — blended, no card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative container-width pb-6 sm:pb-8"
        >
          <ProductFilter />
        </motion.div>
      </section>

      <FeaturedProducts />

      <Testimonials />

      <CTA />
    </>
  );
};

export default Products;