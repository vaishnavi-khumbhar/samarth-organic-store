import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Leaf } from "lucide-react";

import { products } from "../../data/products";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const RelatedProducts = () => {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative py-20 sm:py-24 bg-[#FAF6EE] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#4D9F38]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-[#4D9F38]/10 text-[#4D9F38] px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.2em] uppercase">
            Related Products
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#312E2A] mt-4">
            You May Also Like
          </h2>

          <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            Explore our premium wood pressed organic oils.
          </p>
        </motion.div>

        {/* Products */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
        >
          {products.map((item) => {
            const isWished = !!wishlist[item.id];
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl border border-[#7A2418]/5 shadow-[0_8px_24px_-12px_rgba(122,36,24,0.12)] hover:shadow-[0_24px_48px_-16px_rgba(122,36,24,0.25)] hover:border-[#7A2418]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-[#FAF7F2]">

                  {/* Organic badge */}
                  <span className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#4D9F38] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    <Leaf size={12} />
                    Organic
                  </span>

                  {/* Wishlist toggle */}
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleWishlist(item.id)}
                    aria-label="Toggle wishlist"
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-sm transition-colors duration-300 ${
                      isWished
                        ? "bg-red-500 text-white"
                        : "bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <Heart size={16} fill={isWished ? "currentColor" : "none"} />
                  </motion.button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-64 sm:h-72 w-full object-contain p-5 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Quick view overlay */}
                  <div className="absolute inset-0 bg-[#312E2A]/0 group-hover:bg-[#312E2A]/5 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <button className="flex items-center gap-2 bg-white text-[#312E2A] text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={15} />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">

                  <h3 className="text-lg sm:text-xl font-semibold text-[#312E2A] truncate">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex gap-0.5 text-[#F4B400] mt-2.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  {/* Price */}
                  <h4 className="text-[#4D9F38] text-xl sm:text-2xl font-bold mt-3">
                    {item.price}
                  </h4>

                  {/* Buttons */}
                  <div className="flex gap-2.5 sm:gap-3 mt-5 sm:mt-6">

                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 bg-[#4D9F38] text-white py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#3E822E] hover:shadow-lg transition-all duration-300"
                    >
                      View Product
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      aria-label="Add to cart"
                      className="p-2.5 sm:p-3 rounded-full border border-gray-200 hover:bg-[#4D9F38] hover:border-[#4D9F38] hover:text-white transition-colors duration-300"
                    >
                      <ShoppingCart size={18} />
                    </motion.button>

                  </div>

                </div>


                
              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
};

export default RelatedProducts;