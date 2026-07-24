import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import ProductFilter from "../components/ProductFilter/ProductFilter";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

import { products } from "../data/products";

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
    if (filters.category !== "All Products") {
      data = data.filter((item) => item.name === filters.category);
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
      <section className="relative overflow-hidden min-h-[480px] sm:min-h-[520px] lg:min-h-[540px]">

        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4 }}
            src={productsBanner}
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
          pt-16
          sm:pt-20
          pb-12
          sm:pb-20
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
            px-5 py-2
            rounded-full
            text-xs
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
            text-3xl
            sm:text-5xl
            md:text-6xl
            font-bold
            mt-5
            text-white
            "
          >
            100% Pure Wood Pressed
            <span className="text-[#F5B800]"> Organic Oils</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="
            mt-5
            max-w-2xl
            mx-auto
            text-white/80
            "
          >
            Premium cold pressed organic oils made using traditional Lakdi Ghana process.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="
            flex flex-wrap
            justify-center
            gap-3
            mt-8
            "
          >
            {oilChips.map((chip, index) => (
              <span
                key={index}
                className="
                bg-white/10
                border
                border-white/20
                text-white
                px-4
                py-2
                rounded-full
                text-sm
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