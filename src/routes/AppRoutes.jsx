import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile"; // <-- import if page exists

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
      ],
    },
  ],
  {
    basename: "/samarth-organic-store",
  }
);