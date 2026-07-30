import { createContext, useContext } from "react";
import { useAccountStorage } from "../hooks/useAccountStorage";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // FIX: was `useState(() => localStorage.getItem("samarth_wishlist"))` —
  // one fixed key shared by every account on this browser. Now scoped per
  // logged-in account (see hooks/useAccountStorage.js).
  const [wishlist, setWishlist] = useAccountStorage("samarth_wishlist", []);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists ? prev : [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};