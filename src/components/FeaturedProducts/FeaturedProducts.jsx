import { products } from "../../data/products";
import { ShoppingCart, Heart } from "lucide-react";

const FeaturedProducts = () => {
  return (
    <section className="section-padding section-bg relative overflow-hidden">
      {/* Ambient brand glows */}
      <div className="absolute -top-10 right-0 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-10 w-64 h-64 bg-[#4D9F38]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-width relative">

        <div className="text-center">
          <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.2em] uppercase">
            Best Sellers
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#7A2418]">
            Our <span className="text-[#4D9F38]">Products</span>
          </h2>

          <p className="max-w-xl mx-auto mt-3 text-sm sm:text-base text-[#6B6B6B]">
            Hand-picked, wood pressed and cold extracted — our most loved
            bottles, straight from the ghana to your kitchen.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 md:mt-16">

          {products.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#7A2418]/10 shadow-[0_8px_24px_-12px_rgba(122,36,24,0.15)] hover:border-[#7A2418] hover:shadow-[0_20px_40px_-16px_rgba(122,36,24,0.3)] hover:-translate-y-2 transition-all duration-300 text-center"
            >
              {/* Bestseller ribbon — small ecommerce touch */}
              {index < 3 && (
                <span
                  className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 text-[9px] sm:text-[10px] font-bold tracking-wide uppercase text-white px-2.5 py-1 rounded-full shadow-sm"
                  style={{ background: "linear-gradient(135deg, #7A2418, #5C160D)" }}
                >
                  Bestseller
                </span>
              )}

              {/* Wishlist — floating top-right */}
              <button
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#FBF6EC] text-[#7A2418] hover:bg-[#7A2418] hover:text-white transition-colors duration-300"
              >
                <Heart size={15} />
              </button>

              {/* Image with soft cream badge behind it */}
              <div className="relative flex items-center justify-center h-40 sm:h-56 lg:h-60 mt-2">
                <div className="absolute inset-0 m-auto w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-[#FBF6EC] transition-transform duration-500 group-hover:scale-110" />
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative h-36 sm:h-52 lg:h-56 object-contain mx-auto drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="text-sm sm:text-xl font-semibold mt-2 sm:mt-2 text-[#312E2A] group-hover:text-[#7A2418] transition-colors line-clamp-1">
                {item.name}
              </h3>

              <div className="flex items-center justify-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                    fill={i < 4 ? "#F5B800" : "#E5E0D5"}
                  >
                    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
                  </svg>
                ))}
              </div>

              <p className="text-[#4D9F38] font-bold mt-1.5 sm:mt-2 text-base sm:text-lg">
                {item.price}
              </p>

              <button className="group/btn relative w-full mt-3 sm:mt-3 flex items-center justify-center gap-2 bg-[#4D9F38] hover:bg-[#3e842d] text-white rounded-full py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors overflow-hidden">
                <ShoppingCart size={16} className="transition-transform duration-300 group-hover/btn:-translate-x-0.5" />
                Add to Cart
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;