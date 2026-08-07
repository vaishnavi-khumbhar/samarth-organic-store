import { createContext, useContext } from "react";
import { useAccountStorage } from "../hooks/useAccountStorage";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // FIX: was `useState(() => localStorage.getItem("samarth_cart"))` — one
  // fixed key shared by every account on this browser. Now scoped per
  // logged-in account (see hooks/useAccountStorage.js).
  const [cart, setCart] = useAccountStorage("samarth_cart", []);

  const addToCart = (product) => {
    // FIX: was hardcoded to 1 in both branches below, so whatever quantity
    // was actually selected on the product page (`quantity` field) was
    // silently thrown away — Add to Cart always added exactly 1.
    const qtyToAdd = Math.max(1, Number(product.quantity) || 1);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qtyToAdd }
            : item
        );
      }

      return [...prev, { ...product, qty: qtyToAdd }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty + delta),
            }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // convert ₹399 -> 399
  const cartTotal = cart.reduce((sum, item) => {
    const price = Number(String(item.price).replace(/[^\d]/g, ""));
    return sum + price * item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};