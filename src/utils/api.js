import axios from "axios";

// IMPORTANT: Ha URL tumcha XAMPP setup प्रमाणे badla.
// Jar tumhi "samarth-backend" folder C:/xampp/htdocs/ madhe thevla asel,
// tar khali cha URL barobar aahe. Folder cha naav vegla asel tr te change kara.
const API = axios.create({
  baseURL: "http://localhost/samarth-backend/api",
});

// Prtyek request sobat, jar user logged in asel, tar token automatically
// Authorization header madhe pathvla jato.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("samarth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// AUTH
// =========================
export const loginUser = (data) => API.post("/auth/login.php", data);
export const signupUser = (data) => API.post("/auth/register.php", data);
export const fetchMyProfile = () => API.get("/auth/me.php");
// NEW — used by Profile.jsx's "Save Changes" (Account Settings) via
// AuthContext's updateUser(). Backend: api/auth/update_profile.php
export const updateProfile = (data) => API.post("/auth/update_profile.php", data);

// =========================
// PRODUCTS
// =========================
export const fetchProducts = (categorySlug) => {
  return API.get(
    categorySlug ? `/products/index.php?category=${categorySlug}` : "/products/index.php"
  );
};
export const fetchProductBySlug = (slug) => API.get(`/products/show.php?slug=${slug}`);

// =========================
// CATEGORIES
// =========================
export const fetchCategories = () => API.get("/categories/index.php");

// =========================
// ADDRESSES
// =========================
export const fetchAddresses = () => API.get("/addresses/index.php");
export const addAddress = (data) => API.post("/addresses/index.php", data);
export const updateAddress = (data) => API.post("/addresses/update.php", data);
export const deleteAddress = (id) => API.post("/addresses/delete.php", { id });

// =========================
// ORDERS
// =========================
// data = { items: [{product_id, qty, size_label}], delivery_method: "delivery"|"pickup",
//          address_id, payment_method: "cod"|"online", notes }
export const createOrder = (data) => API.post("/orders/create.php", data);
export const fetchMyOrders = () => API.get("/orders/list.php");
export const fetchOrderById = (id) => API.get(`/orders/show.php?id=${id}`);
// NEW — used by Profile.jsx's "Cancel Order" button. Backend: api/orders/cancel.php
export const cancelOrder = (id) => API.post("/orders/cancel.php", { id });

// =========================
// PAYMENT (Razorpay)
// =========================
export const createRazorpayOrder = (orderId) =>
  API.post("/payment/create_order.php", { order_id: orderId });

export const verifyRazorpayPayment = (data) =>
  API.post("/payment/verify.php", data);

export default API;