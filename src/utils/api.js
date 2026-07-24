import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// =========================
// AUTH
// =========================

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const signupUser = (data) => {
  return API.post("/auth/register", data);
};

// =========================
// PRODUCTS
// =========================

export const fetchProducts = (categorySlug) => {
  return API.get(
    categorySlug
      ? `/products?category=${categorySlug}`
      : "/products"
  );
};

// =========================
// ORDERS
// =========================

export const createOrder = (data) => {
  return API.post("/orders", data);
};

// =========================
// PAYMENT
// =========================

export const createRazorpayOrder = (data) => {
  return API.post("/payment/create-order", data);
};

export default API;