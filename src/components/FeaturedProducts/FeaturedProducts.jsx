import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const toNumber = (val) => {
  if (typeof val === "number") return val;
  return parseFloat(String(val).replace(/[^\d.]/g, "")) || 0;
};

const FeaturedProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section className="section-padding section-bg relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-10 right-0 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-10 w-64 h-64 bg-[#4D9F38]/10 rounded-full blur-3xl" />

      <div className="container-width relative">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-block bg-[#F5B800]/20 text-[#7A2418] px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wider">
            Best Sellers
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-5 text-[#7A2418]">
            Our <span className="text-[#4D9F38]">Products</span>
          </h2>

          <p className="max-w-xl mx-auto mt-4 text-sm sm:text-base text-gray-600">
            Hand-picked, wood pressed and cold extracted oils made using the
            traditional wooden ghani process.
          </p>

        </div>

        {/* No Products */}

        {products.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20">

            <h3 className="text-2xl font-bold text-[#7A2418]">
              No Products Found
            </h3>

            <p className="mt-3 text-gray-500">
              Try changing your search or filter options.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-16">

            {products.map((item, index) => {

              const wished = isInWishlist(item.id);
              const added = isInCart(item.id);

              // ---- Price / MRP / discount ----
              const priceNum = toNumber(item.price);
              const mrpNum = item.mrp ? toNumber(item.mrp) : null;
              const discountPct = mrpNum && mrpNum > priceNum ? Math.round((1 - priceNum / mrpNum) * 100) : 0;

              // ---- Stock (optional field, works fine even if not present) ----
              const stock = item.stock ?? null;
              const lowStock = stock !== null && stock > 0 && stock <= 5;
              const outOfStock = stock !== null && stock <= 0;

              return (

                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#eee] hover:border-[#7A2418]/30 shadow hover:shadow-2xl transition duration-300"
                >

                  {/* Top-left badges: Bestseller + Discount stacked */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-col gap-1.5">
                    {index < 3 && (
                      <span className="bg-[#7A2418] text-white text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 rounded-full font-semibold w-fit">
                        Bestseller
                      </span>
                    )}
                    {discountPct > 0 && (
                      <span className="bg-[#2F7A38] text-white text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 rounded-full font-semibold w-fit">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
                      wished
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-white text-[#7A2418] hover:bg-[#7A2418] hover:text-white"
                    }`}
                  >
                    <Heart
                      size={16}
                      className="sm:w-[18px] sm:h-[18px]"
                      fill={wished ? "currentColor" : "none"}
                    />
                  </button>

                  <Link to={`/product/${item.slug}`}>
                    <div className="relative bg-[#FBF6EC] h-44 sm:h-72 lg:h-80 flex justify-center items-center">
                      <img
                        src={item.image_url || item.image}
                        alt={item.name}
                        className="h-36 sm:h-60 lg:h-68 object-contain transition duration-500 group-hover:scale-110"
                      />

                      {outOfStock && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <span className="bg-[#2B2B28] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Quick View — desktop hover only */}
                      <span className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-1.5 bg-white/95 text-[#7A2418] text-xs font-semibold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Eye size={14} /> Quick View
                      </span>
                    </div>

                    <div className="p-3 sm:p-5 text-center">
                      <h3 className="font-black text-base sm:text-xl lg:text-2xl text-[#7A2418] tracking-wide line-clamp-1">
                        {item.name}
                      </h3>

                      <div className="flex justify-center items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
                        <div className="flex gap-0.5 sm:gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              viewBox="0 0 20 20"
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill={i < 4 ? "#F5B800" : "#ddd"}
                            >
                              <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-500">(120)</span>
                      </div>

                      {/* Price + MRP + discount */}
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 flex-wrap">
                        <p className="text-[#4D9F38] font-bold text-base sm:text-xl">
                          ₹{priceNum}
                        </p>
                        {mrpNum && mrpNum > priceNum && (
                          <>
                            <span className="text-xs sm:text-sm text-gray-400 line-through">₹{mrpNum}</span>
                          </>
                        )}
                      </div>

                      {lowStock && (
                        <p className="text-[10px] sm:text-xs font-semibold text-[#B23A3A] mt-1">
                          Only {stock} left!
                        </p>
                      )}
                    </div>
                  </Link>

                  <div className="px-3 sm:px-5 pb-3 sm:pb-5">
                    {outOfStock ? (
                      <button
                        disabled
                        className="w-full py-2.5 sm:py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    ) : added ? (
                      <button
                        onClick={() => navigate("/cart")}
                        className="w-full py-2.5 sm:py-3 rounded-xl bg-[#7A2418] hover:bg-[#5C160D] text-white font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <Eye size={18} />
                        View Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full py-2.5 sm:py-3 rounded-xl bg-[#4D9F38] hover:bg-[#3d812e] text-white font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <ShoppingCart size={18} />
                        Add To Cart
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;