import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/AppRoutes";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { AddressProvider } from "./context/AddressContext";
import LoginModal from "./components/LoginModal/LoginModal";


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AddressProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
            <LoginModal />
          </WishlistProvider>
        </CartProvider>
      </AddressProvider>
    </AuthProvider>
  </React.StrictMode>
);