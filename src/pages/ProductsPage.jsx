import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import ProductFilter from "../components/ProductFilter/ProductFilter";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

import { useProducts } from "../hooks/useProducts";
import { fetchCategories } from "../utils/api";

const productsBanner =
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600&q=80";

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

// price now comes back from the API as a real number (e.g. 230.0), not a
// string like "₹230" — this just guards against either shape safely.
const getPrice = (price) => {
  if (typeof price === "number") return price;
  return Number(String(price).replace(/[₹,]/g, "")) || 0;
};

const ProductsPage = () => {
  // FIX: this page used to `import { products } from "../data/products"` —
  // a hardcoded dummy array — so nothing added/edited/deleted in the admin
  // panel could ever show up here, no matter what was in the database.
  // useProducts() calls the real /api/products/index.php endpoint instead.
  const { products, loading, error } = useProducts();

  // Real category names for the filter dropdown + hero chips, pulled from
  // /api/categories/index.php (falls back to whatever categories are
  // present on the loaded products if that call fails for any reason).
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then((res) => {
        if (!cancelled) {
          setCategories((res.data?.categories || []).map((c) => c.name));
        }
      })
      .catch(() => {
        /* handled by the products-derived fallback below */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryChips = useMemo(() => {
    if (categories.length) return categories;
    return [...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [categories, products]);

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

    // Category — matches against the real `category` column from the DB
    if (filters.category !== "All Products") {
      data = data.filter((item) => item.category === filters.category);
    }

    // Price
    if (filters.price === "Under ₹100") {
      data = data.filter((item) => getPrice(item.price) < 100);
    }
    if (filters.price === "₹100 - ₹300") {
      data = data.filter((item) => {
        const p = getPrice(item.price);
        return p >= 100 && p <= 300;
      });
    }
    if (filters.price === "₹300 - ₹600") {
      data = data.filter((item) => {
        const p = getPrice(item.price);
        return p >= 300 && p <= 600;
      });
    }
    if (filters.price === "₹600 - ₹1000") {
      data = data.filter((item) => {
        const p = getPrice(item.price);
        return p >= 600 && p <= 1000;
      });
    }
    if (filters.price === "₹1000+") {
      data = data.filter((item) => getPrice(item.price) > 1000);
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
        data.sort((a, b) => getPrice(a.price) - getPrice(b.price));
        break;

      case "Price : High to Low":
        data.sort((a, b) => getPrice(b.price) - getPrice(a.price));
        break;

      default:
        break;
    }

    return data;
  }, [filters, products]);

  return (
    <>
      {/* ================= HERO ================= */}
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

      {/* FILTER */}
      <ProductFilter filters={filters} setFilters={setFilters} categories={categories} />

      {loading && (
        <p className="text-center py-16 text-[#8a8178]">Loading products...</p>
      )}

      {!loading && error && (
       <p className="text-center py-16 text-red-500">
  Failed to load products: {error}
</p>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center py-16 text-[#8a8178]">
          Ya filter sathi konte pn product sapadle nahi.
        </p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <FeaturedProducts products={filteredProducts} />
      )}
    </>
  );
};

export default ProductsPage;