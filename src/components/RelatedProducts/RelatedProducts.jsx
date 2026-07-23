import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";

import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const RelatedProducts = () => {
  const navigate = useNavigate();

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
<section className="max-w-7xl mx-auto px-4 -mt-10 sm:-mt-4 pb-10">
      {/* Heading */}

      <div className="text-center mb-8 sm:mb-10">

        <span className="inline-block bg-[#F5B800]/20 text-[#7A2418] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
          Premium Collection
        </span>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-3 text-[#7A2418]">
          Related <span className="text-[#4D9F38]">Products</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl mx-auto">
          Explore more cold pressed organic oils made using traditional
          wooden ghani process.
        </p>

      </div>

      {/* Products */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

        {products.slice(0, 4).map((item) => {

          const wished = isInWishlist(item.id);
          const added = isInCart(item.id);

          return (

            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-white border border-[#ECE6DA] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >

              {/* Bestseller */}

              <span className="absolute top-3 left-3 z-20 bg-[#7A2418] text-white text-[10px] sm:text-xs px-3 py-1 rounded-full shadow">
                Bestseller
              </span>

              {/* Wishlist */}

              <button
                onClick={() => toggleWishlist(item)}
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20
                w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center
                transition-all duration-300

                ${
                  wished
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-white text-[#7A2418] hover:bg-[#7A2418] hover:text-white"
                }`}
              >
                <Heart
                  size={18}
                  fill={wished ? "currentColor" : "none"}
                />
              </button>

              {/* Product */}

              <Link to={`/product/${item.slug}`}>

                <div className="bg-gradient-to-b from-[#FBF6EC] to-white h-40 sm:h-56 flex justify-center items-center overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 sm:h-44 lg:h-48 object-contain group-hover:scale-110 transition duration-500"
                  />

                </div>

                <div className="p-3 sm:p-5 text-center">

                  <h3 className="font-bold text-sm sm:text-lg text-[#333] line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Rating */}

                  <div className="flex justify-center gap-1 mt-2">

                    {[1,2,3,4,5].map((star)=>(
                      <svg
                        key={star}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        viewBox="0 0 20 20"
                        fill="#F5B800"
                      >
                        <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z"/>
                      </svg>
                    ))}

                  </div>

                  <p className="text-[#4D9F38] font-bold text-lg sm:text-xl mt-2">
                    {item.price}
                  </p>

                </div>

              </Link>

              {/* Button */}

              <div className="px-3 sm:px-5 pb-4 sm:pb-5">

                {added ? (

                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full bg-[#7A2418] hover:bg-[#5c1b11]
                    text-white py-2.5 sm:py-3 rounded-xl
                    flex items-center justify-center gap-2
                    font-semibold text-sm sm:text-base
                    transition-all duration-300 hover:scale-[1.03]"
                  >
                    <Eye size={18} />
                    View Cart
                  </button>

                ) : (

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-[#4D9F38] hover:bg-[#3b7c2c]
                    text-white py-2.5 sm:py-3 rounded-xl
                    flex items-center justify-center gap-2
                    font-semibold text-sm sm:text-base
                    transition-all duration-300 hover:scale-[1.03]"
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

    </section>
  );
};

export default RelatedProducts;