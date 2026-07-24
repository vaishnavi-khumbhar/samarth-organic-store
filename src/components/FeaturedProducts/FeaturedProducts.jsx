import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

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

              return (

                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#eee] hover:border-[#7A2418]/30 shadow hover:shadow-2xl transition duration-300"
                >


                                    {/* Bestseller */}
                  {index < 3 && (
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-[#7A2418] text-white text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 rounded-full font-semibold">
                      Bestseller
                    </span>
                  )}

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
                    <div className="bg-[#FBF6EC] h-44 sm:h-72 lg:h-80 flex justify-center items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-36 sm:h-60 lg:h-68 object-contain transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-3 sm:p-5 text-center">
                      <h3 className="font-black text-base sm:text-xl lg:text-2xl text-[#7A2418] tracking-wide line-clamp-1">
                        {item.name}
                      </h3>

                      <div className="flex justify-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2">
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

                      <p className="text-[#4D9F38] font-bold text-base sm:text-xl mt-2 sm:mt-3">
                        {item.price}
                      </p>
                    </div>
                  </Link>

                  <div className="px-3 sm:px-5 pb-3 sm:pb-5">
                    {added ? (
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