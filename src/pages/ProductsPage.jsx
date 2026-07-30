import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import ProductFilter from "../components/ProductFilter/ProductFilter";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

import { products } from "../data/products";

const productsBanner =
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&q=80";

// Chips now reflect every category actually present in products.js
// (Oils, Hair Oils, Jaggery, Soap, Honey, Ghee) instead of only oil names,
// so this stays correct automatically if new categories are added later.
const categoryChips = [
  ...new Set(products.map((item) => item.category || "Oils")),
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

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "All Products",
    price: "All Prices",
    sort: "Recommended",
  });

  const filteredProducts = useMemo(() => {
    let data = [...products];

    // Search
    if (filters.search) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category
    // FIX: was comparing item.name to filters.category, which meant a
    // category like "Soap" never matched any product name. Now compares
    // against item.category (falling back to "Oils" for the original 8
    // entries that predate the category field).
    if (filters.category !== "All Products") {
      data = data.filter(
        (item) => (item.category || "Oils") === filters.category
      );
    }

    // Price
    if (filters.price === "Under ₹400") {
      data = data.filter(
        (item) => Number(item.price.replace("₹", "")) < 400
      );
    }

    if (filters.price === "₹400 - ₹600") {
      data = data.filter((item) => {
        const price = Number(item.price.replace("₹", ""));
        return price >= 400 && price <= 600;
      });
    }

    if (filters.price === "₹600 - ₹800") {
      data = data.filter((item) => {
        const price = Number(item.price.replace("₹", ""));
        return price > 600 && price <= 800;
      });
    }

    if (filters.price === "₹800+") {
      data = data.filter(
        (item) => Number(item.price.replace("₹", "")) > 800
      );
    }

    // Sort
    switch (filters.sort) {
      case "Alphabetically A-Z":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Alphabetically Z-A":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Price : Low to High":
        data.sort(
          (a, b) =>
            Number(a.price.replace("₹", "")) -
            Number(b.price.replace("₹", ""))
        );
        break;

      case "Price : High to Low":
        data.sort(
          (a, b) =>
            Number(b.price.replace("₹", "")) -
            Number(a.price.replace("₹", ""))
        );
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
        min-h is required because ProductFilter uses a negative top margin
        to float up and overlap the bottom edge of this hero. Without an
        explicit min-height, this section would have no real height of its
        own and the overlap would swallow it entirely.
      */}
      <section className="relative overflow-hidden min-h-[460px] xs:min-h-[500px] sm:min-h-[520px] lg:min-h-[540px]">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4 }}
            src={productsBanner}
            alt="Samarth Organic Products"
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
            Pure, Natural &amp;
            <span className="text-[#F5B800]"> Traditionally Made</span>
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
            From Wood Pressed Oils and Hair Oils to Natural Honey, Handmade
            Soaps, Traditional Jaggery and Pure Gir Cow Ghee — every product
            is made using authentic, chemical-free methods for a healthier,
            more natural lifestyle.
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
            {categoryChips.map((chip, index) => (
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

      {/* FILTER — floats up over the hero's bottom edge via its own negative margin */}
      <ProductFilter filters={filters} setFilters={setFilters} />

      <FeaturedProducts products={filteredProducts} />
    </>
  );
};

export default ProductsPage;