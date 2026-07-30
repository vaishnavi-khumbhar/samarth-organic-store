import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <Heart size={70} className="text-red-500 mb-4" />

        <h2 className="text-3xl font-bold text-[#7A2418]">
          Your Wishlist is Empty
        </h2>

        <p className="text-gray-500 mt-3">
          Add your favourite products to wishlist.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#FFFCF7]">
      <div className="container-width">

        <h2 className="text-4xl font-bold text-[#7A2418] mb-10 text-center">
          My Wishlist
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {wishlist.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-[#eee]"
            >
              <div className="p-5">

                <img
                  src={item.image_url || item.image}
                  alt={item.name}
                  className="h-56 object-contain mx-auto"
                />

               <h3 className="mt-5 text-lg sm:text-2xl lg:text-2xl font-black text-center text-[#7A2418] tracking-wide">
  {item.name}
</h3>

                <p className="text-[#4D9F38] text-xl font-bold text-center mt-2">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full mt-5 bg-[#4D9F38] hover:bg-[#39752b] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Trash2 size={18} />
                  Remove
                </button>

              </div>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Wishlist;