import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import ProductFilter from "../components/ProductFilter/ProductFilter";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA from "../components/CTA/CTA";
import aboutBanner from "../assets/images/about/about-banner.jpg";


import { products } from "../data/products";


const productChips = [
  "Wood Pressed Oils",
  "Hair Oils",
  "Natural Honey",
  "Handmade Soaps",
  "Jaggery",
  "Gir Cow Ghee",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const Products = () => {
  // FILTER STATE
  const [filters, setFilters] = useState({
    search: "",
    category: "All Products",
    price: "All Prices",
    sort: "Recommended",
  });

  // FILTER LOGIC
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // SEARCH
    if (filters.search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // CATEGORY
    if (filters.category !== "All Products") {
      data = data.filter((item) => item.name === filters.category);
    }

    // PRICE FUNCTION
    const getPrice = (price) => Number(price.replace(/[₹,]/g, ""));

    // PRICE FILTER
    if (filters.price === "₹0 - ₹500") {
      data = data.filter((item) => getPrice(item.price) <= 500);
    }

    if (filters.price === "₹500 - ₹1000") {
      data = data.filter((item) => {
        const price = getPrice(item.price);
        return price >= 500 && price <= 1000;
      });
    }

    if (filters.price === "₹1000+") {
      data = data.filter((item) => getPrice(item.price) >= 1000);
    }

    // SORT
    switch (filters.sort) {
      case "Alphabetically A-Z":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Alphabetically Z-A":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Price : Low to High":
        data.sort((a, b) => getPrice(a.price) - getPrice(b.price));
        break;

      case "Price : High to Low":
        data.sort((a, b) => getPrice(b.price) - getPrice(a.price));
        break;

      default:
        break;
    }

    return data;
  }, [filters]);

  return (
    <>
      {/* ================= HERO ================= */}
      {/*
        NOTE: min-h below is required because ProductFilter uses a negative
        top margin (-mt-16 etc.) to float up and overlap the bottom edge of
        this hero. Without an explicit min-height here, this section had no
        real height on its own (only absolutely-positioned children + text
        that could collapse), so the overlap swallowed the entire hero
        instead of just overlapping its bottom edge.

        Mobile note: min-h values are lower on small screens since the
        hero text wraps to more lines there but the chip row is shorter;
        this keeps the hero from feeling oversized on phones while still
        leaving room for ProductFilter's negative-margin overlap.
      */}
      <section className="relative overflow-hidden min-h-[460px] xs:min-h-[500px] sm:min-h-[560px] lg:min-h-[600px]">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4 }}
            src={aboutBanner}
            alt="Organic Oil Products"
            loading="eager"
            className="w-full h-full object-cover"
          />

          <div
            className="
            absolute inset-0
            bg-gradient-to-b
            from-[#1a1815]/70
            via-[#1a1815]/60
            to-[#FFFBF5]
            "
          />
        </div>

        <div
          className="
          absolute top-0 left-0
          w-full h-1
          bg-gradient-to-r
          from-[#4D9F38]
          via-[#F5B800]
          to-[#7A2418]
          "
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
          relative
          container-width
          px-4 sm:px-6
          pt-12 xs:pt-14 sm:pt-20
          pb-10 xs:pb-12 sm:pb-20
          text-center
          "
        >
          <motion.span
            variants={fadeUp}
            className="
            inline-flex
            bg-white/10
            backdrop-blur-sm
            text-[#F5B800]
            border border-white/20
            px-4 sm:px-5 py-1.5 sm:py-2
            rounded-full
            text-[10px] sm:text-xs
            font-semibold
            uppercase
            tracking-widest
            "
          >
            Our Products
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="
            text-2xl
            xs:text-3xl
            sm:text-5xl
            md:text-6xl
            font-bold
            mt-4 sm:mt-5
            text-white
            leading-tight
            "
          >
            Premium Organic
            <span className="text-[#F5B800]">{" "}Natural Products</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
            mt-4 sm:mt-5
            max-w-md sm:max-w-2xl
            mx-auto
            text-white/80
            text-sm sm:text-base
            leading-6 sm:leading-7
            "
          >
            Explore our premium collection of Wood Pressed Oils, Hair Oils,
            Natural Honey, Handmade Soaps, Traditional Jaggery and Pure Gir
            Cow Ghee crafted for a healthy and natural lifestyle.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="
            flex flex-wrap
            justify-center
            gap-2 sm:gap-3
            mt-6 sm:mt-8
            "
          >
            {productChips.map((chip, index) => (
              <span
                key={index}
                className="
                bg-white/10
                border
                border-white/20
                text-white
                px-3 sm:px-4
                py-1.5 sm:py-2
                rounded-full
                text-[11px] sm:text-sm
                whitespace-nowrap
                "
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FILTER
          Rendered OUTSIDE the hero <section> now (it has its own
          negative margin to pull itself up over the hero's bottom edge,
          so it doesn't need to live inside the hero's DOM/z-stack). */}
      <ProductFilter filters={filters} setFilters={setFilters} />

      {/* PRODUCTS */}
      <FeaturedProducts products={filteredProducts} />

      <Testimonials />

      <CTA />
    </>
  );
};

export default Products;