import { useState, useEffect } from "react";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Edit2,
  ChevronRight,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Droplet,
  ShieldCheck,
  X as XIcon,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useAddress } from "../context/AddressContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { fetchMyOrders, cancelOrder } from "../utils/api";

/*
  Design tokens
  -------------
  Ink      #2B2420  – body text
  Maroon   #6B1E1E  – brand primary (kumkum / sindoor red)
  Forest   #2F7A38  – organic / success accent
  Mustard  #C98A2B  – oil-gold secondary accent
  Cream    #FBF3E7  – page background
  Sand     #ECDFC9  – hairline borders
  Paper    #FDF8EF  – input / card fill

  Display face: Fraunces (warm, artisanal serif — echoes hand-pressed,
  small-batch character). Body/UI face: Inter.

  Signature motif: the "ghani wheel" — concentric rings + a droplet,
  a nod to the traditional stone oil press. Used as the loading state,
  the avatar ring, and the auth panel's centerpiece.
*/

const GhaniMark = ({ size = 56, spin = false }) => (
  <div
    className={`relative shrink-0 ${spin ? "animate-spin" : ""}`}
    style={{ width: size, height: size, animationDuration: "6s" }}
  >
    <div className="absolute inset-0 rounded-full border-[3px] border-[#C98A2B]/40" />
    <div className="absolute inset-[6px] rounded-full border-[3px] border-[#2F7A38]/50" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Droplet size={size * 0.32} className="text-[#6B1E1E] fill-[#6B1E1E]" />
    </div>
  </div>
);

const Profile = () => {
  // FIX: this page used to destructure `loginWithPhone` and `updateUser`
  // from useAuth() — neither exists on AuthContext (it only exports
  // `login(email, password)` and `signup(payload)`, both of which call the
  // real PHP backend). Calling an undefined function inside handleAuthSubmit
  // threw a silent runtime error, so submitting the form did nothing visible.
  const { user, isLoggedIn, login, signup, logout, updateUser } = useAuth();

  const { addresses } = useAddress();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authForm, setAuthForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [activeTab, setActiveTab] = useState("orders");

  // ---- Real orders (was a hardcoded fake array before) ----
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  // ---- Account Settings form (was uncontrolled inputs + a dead button) ----
  const [settingsForm, setSettingsForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState("");

  // Keep the settings form in sync if `user` changes (e.g. right after login)
  useEffect(() => {
    setSettingsForm({
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
    });
  }, [user?.name, user?.phone, user?.email]);

  // Load this account's real orders from GET /api/orders/list.php
  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    setOrdersLoading(true);
    setOrdersError("");
    fetchMyOrders()
      .then((res) => {
        if (!cancelled) setOrders(res.data?.orders || []);
      })
      .catch((err) => {
        if (!cancelled) {
          setOrdersError(err?.response?.data?.error || "Failed to load orders.");
        }
      })
      .finally(() => {
        if (!cancelled) setOrdersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  const displayUser = {
    name: user?.name || "Guest",
    phone: user?.phone || "",
    email: user?.email || "",
    joined: user?.joined ? new Date(user.joined).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "",
  };

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "wishlist", label: "My Wishlist", icon: Heart },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  // Matches the real `orders.status` ENUM from the database:
  // pending, confirmed, processing, out_for_delivery, delivered, cancelled
  const STATUS_LABELS = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  const statusStyle = (status) =>
    status === "delivered"
      ? { bar: "bg-[#2F7A38]", chip: "bg-[#E4F3E1] text-[#2F7A38]" }
      : status === "cancelled"
      ? { bar: "bg-[#B23A3A]", chip: "bg-[#FBE7E7] text-[#B23A3A]" }
      : { bar: "bg-[#C98A2B]", chip: "bg-[#FBEAD0] text-[#8A4B12]" };

  // Only pending/confirmed/processing orders can still be cancelled —
  // matches the guard on the backend (orders/cancel.php).
  const canCancel = (status) => !["delivered", "cancelled"].includes(status);

  // FIX: order cards only ever showed the fulfillment `status` (Confirmed,
  // Pending, etc) — never whether the payment itself actually went
  // through. A customer who paid online had no visible confirmation of
  // that; a genuinely-still-pending online payment looked identical to a
  // paid one. This badge shows the real payment_status for both COD and
  // online orders.
  const paymentBadge = (o) => {
    if (o.payment_method === "cod") {
      return o.payment_status === "paid"
        ? { label: "Paid (COD)", chip: "bg-[#E4F3E1] text-[#2F7A38]" }
        : { label: "Pay on Delivery", chip: "bg-[#FBEAD0] text-[#8A4B12]" };
    }
    if (o.payment_status === "paid") {
      return { label: "Paid", chip: "bg-[#E4F3E1] text-[#2F7A38]" };
    }
    if (o.payment_status === "failed") {
      return { label: "Payment Failed", chip: "bg-[#FBE7E7] text-[#B23A3A]" };
    }
    return { label: "Payment Pending", chip: "bg-[#FBEAD0] text-[#8A4B12]" };
  };

  const handleCancelOrder = async (order) => {
    if (!window.confirm(`Cancel order ${order.order_number}?`)) {
      return;
    }
    setCancellingId(order.id);
    try {
      await cancelOrder(order.id);
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: "cancelled" } : o))
      );
    } catch (err) {
      alert(err?.response?.data?.error || "Order cancellation failed, please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (authMode === "signup") {
      if (!authForm.name || !authForm.email || !authForm.password) {
        setAuthError("Name, email, and password are required.");
        return;
      }
      if (authForm.password.length < 6) {
        setAuthError("Password kimman 6 characters cha asava.");
        return;
      }
    } else if (!authForm.email || !authForm.password) {
      setAuthError("Email and password are required.");
      return;
    }

    setAuthLoading(true);
    try {
      if (authMode === "signup") {
        // register.php expects { name, email, phone, password }
        await signup({
          name: authForm.name,
          email: authForm.email,
          phone: authForm.phone,
          password: authForm.password,
        });
      } else {
        // login.php authenticates by email + password, not phone
        await login(authForm.email, authForm.password);
      }
      setAuthForm({ name: "", phone: "", email: "", password: "" });
    } catch (err) {
      setAuthError(
        err?.response?.data?.error || "Kahitari chukla, parat try kara."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setAuthMode("login");
    setActiveTab("orders");
    setAuthError("");
    setAuthForm({ name: "", phone: "", email: "", password: "" });
  };

  const handleSettingsChange = (e) => {
    setSettingsForm({ ...settingsForm, [e.target.name]: e.target.value });
    setSettingsSuccess("");
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");

    if (!settingsForm.name || !settingsForm.email) {
      setSettingsError("Name and email are required.");
      return;
    }

    setSettingsLoading(true);
    try {
      await updateUser(settingsForm);
      setSettingsSuccess("Profile updated!");
    } catch (err) {
      setSettingsError(err?.response?.data?.error || "Update failed, please try again.");
    } finally {
      setSettingsLoading(false);
    }
  };

  const fonts = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
      .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
      .font-body { font-family: 'Inter', sans-serif; }
    `}</style>
  );

  /* ---------------- LOGIN / SIGNUP SCREEN ---------------- */
  if (!isLoggedIn) {
    return (
      <section className="font-body bg-[#FBF3E7] min-h-screen flex items-center justify-center py-10 px-5">
        {fonts}
        <div className="w-full max-w-4xl rounded-[28px] overflow-hidden shadow-[0_30px_70px_rgba(107,30,30,0.12)] grid grid-cols-1 md:grid-cols-2 border border-[#ECDFC9]">

          {/* Brand panel */}
          <div className="relative bg-[#6B1E1E] text-white p-8 md:p-10 flex flex-col justify-between overflow-hidden min-h-[220px] md:min-h-0">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px)",
                backgroundSize: "26px 26px, 34px 34px",
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <GhaniMark size={44} />
                <span className="font-display text-lg tracking-wide">Samarth Organic</span>
              </div>

              <h1 className="font-display text-3xl md:text-[2.35rem] leading-[1.15] mt-8 md:mt-14">
                Pressed slow.
                <br />
                Delivered fresh.
              </h1>
              <p className="text-white/70 text-sm mt-4 max-w-xs">
                Sign in to track your orders, manage addresses and revisit
                the oils you love — cold-pressed the traditional way.
              </p>
            </div>

            <div className="relative hidden md:flex items-center gap-2 text-white/60 text-xs mt-10">
              <ShieldCheck size={15} />
              Your details are kept private and secure.
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-white p-8 md:p-10">
            <div className="flex bg-[#FBF3E7] rounded-full p-1 mb-7">
              <button
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  authMode === "login" ? "bg-[#6B1E1E] text-white" : "text-[#6B1E1E]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  authMode === "signup" ? "bg-[#6B1E1E] text-white" : "text-[#6B1E1E]"
                }`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="font-display text-2xl text-[#2B2420] mb-1">
              {authMode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-[#8a8178] mb-6">
              {authMode === "login"
                ? "Enter your details to continue."
                : "Takes less than a minute."}
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div className="relative">
                  <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full name"
                    value={authForm.name}
                    onChange={handleAuthChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
                  />
                </div>
              )}

              {/* FIX: login.php authenticates by email, not phone — Email
                  now shows in BOTH modes. Phone is only collected at
                  signup (it's stored on the account, but isn't a login
                  credential), so it's no longer a required field on login. */}
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  value={authForm.email}
                  onChange={handleAuthChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
                />
              </div>

              {authMode === "signup" && (
                <div className="relative">
                  <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={authForm.phone}
                    onChange={handleAuthChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  value={authForm.password}
                  onChange={handleAuthChange}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b0a696]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {authMode === "login" && (
                <div className="text-right">
                  <button type="button" className="text-xs font-semibold text-[#2F7A38] hover:text-[#255f2c]">
                    Forgot password?
                  </button>
                </div>
              )}

              {authError && (
                <div className="text-sm text-[#B23A3A] bg-[#FBE7E7] rounded-lg p-3">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#2F7A38] hover:bg-[#255f2c] text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
              >
                {authLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {authMode === "login" ? "Logging in..." : "Creating account..."}
                  </>
                ) : authMode === "login" ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-xs text-[#a89f92] mt-6">
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => setAuthMode("signup")} className="font-semibold text-[#6B1E1E]">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setAuthMode("login")} className="font-semibold text-[#6B1E1E]">
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- LOGGED-IN PROFILE DASHBOARD ---------------- */
  return (
    <section className="font-body bg-[#FBF3E7] min-h-screen py-10 md:py-16">
      {fonts}
      <div className="max-w-6xl mx-auto px-5">

        {/* User header card */}
        <div className="relative bg-[#6B1E1E] rounded-2xl shadow-sm p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 15%, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative w-20 h-20 rounded-full ring-4 ring-white/20 bg-white/10 text-white flex items-center justify-center text-2xl font-display font-semibold shrink-0">
            {(displayUser.name || "G").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="relative flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-display text-xl md:text-2xl font-semibold text-white">{displayUser.name}</h1>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#C98A2B] text-white px-2.5 py-1 rounded-full">
                Gold Member
              </span>
            </div>
            <p className="text-sm text-white/70 mt-1">
              {displayUser.phone}
              {displayUser.email && ` · ${displayUser.email}`}
            </p>
            {displayUser.joined && <p className="text-xs text-white/50 mt-1">Member since {displayUser.joined}</p>}
          </div>
          <button
            onClick={() => setActiveTab("settings")}
            className="relative flex items-center gap-1.5 border border-white/40 text-white hover:bg-white hover:text-[#6B1E1E] font-semibold text-sm px-4 py-2 rounded-full transition-colors"
          >
            <Edit2 size={15} /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm overflow-hidden">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-sm font-semibold border-b border-[#f2e8d8] last:border-0 transition-colors border-l-[3px] ${
                    activeTab === id
                      ? "bg-[#FBF3E7] text-[#2F7A38] border-l-[#2F7A38]"
                      : "text-[#5C1A1A] border-l-transparent hover:bg-[#FBF3E7]/60"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} /> {label}
                  </span>
                  <ChevronRight size={16} />
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-[#B23A3A] hover:bg-[#FBE7E7] transition-colors border-l-[3px] border-l-transparent"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <h2 className="font-display text-lg font-semibold text-[#2B2420] mb-5">My Orders</h2>

                {ordersLoading && (
                  <p className="text-sm text-[#8a8178] py-6 text-center">Loading orders...</p>
                )}

                {!ordersLoading && ordersError && (
                  <p className="text-sm text-[#B23A3A] py-6 text-center">{ordersError}</p>
                )}

                {!ordersLoading && !ordersError && orders.length === 0 && (
                  <div className="text-center py-8">
                    <Package size={26} className="mx-auto text-[#C98A2B] mb-3" />
                    <p className="text-sm text-[#8a8178]">No orders yet — go place your first one!</p>
                  </div>
                )}

                {!ordersLoading && !ordersError && orders.length > 0 && (
                  <div className="space-y-4">
                    {orders.map((o) => {
                      const s = statusStyle(o.status);
                      const pay = paymentBadge(o);
                      const itemsSummary = (o.items || [])
                        .map((i) => `${i.product_name}${i.size_label ? ` (${i.size_label})` : ""} x${i.qty}`)
                        .join(", ");
                      const dateLabel = o.created_at
                        ? new Date(o.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                        : "";

                      return (
                        <div key={o.id} className="flex items-stretch gap-4 border border-[#f2e8d8] rounded-xl overflow-hidden">
                          <div className={`w-1.5 shrink-0 ${s.bar}`} />
                          <div className="flex-1 flex flex-col gap-2 py-4 pr-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <p className="font-semibold text-[#2B2B28]">
                                  {o.order_number} <span className="text-xs text-[#a89f92] font-normal">· {dateLabel}</span>
                                </p>
                                <p className="text-sm text-[#8a8178]">{itemsSummary}</p>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap justify-end">
                                <span className="font-semibold text-[#6B1E1E]">₹{Number(o.total)}</span>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${pay.chip}`}>
                                  {pay.label}
                                </span>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.chip}`}>
                                  {STATUS_LABELS[o.status] || o.status}
                                </span>
                              </div>
                            </div>

                            {canCancel(o.status) && (
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => handleCancelOrder(o)}
                                  disabled={cancellingId === o.id}
                                  className="flex items-center gap-1.5 text-xs font-semibold text-[#B23A3A] hover:text-[#8a2b2b] disabled:opacity-60"
                                >
                                  <XIcon size={13} />
                                  {cancellingId === o.id ? "Cancelling..." : "Cancel Order"}
                                </button>
                                {o.payment_method === "online" && o.payment_status === "paid" && (
                                  <span className="text-[11px] text-[#a89f92]">
                                    (already paid — refund handled manually)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-lg font-semibold text-[#2B2420]">Saved Addresses</h2>
                </div>
                {addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin size={26} className="mx-auto text-[#C98A2B] mb-3" />
                    <p className="text-sm text-[#8a8178]">
                      No saved addresses yet — add one from the Cart page when choosing "Deliver to an address".
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((a) => (
                      <div key={a.id} className="flex items-start gap-3 border border-[#f2e8d8] rounded-xl p-4">
                        <MapPin size={16} className="text-[#C98A2B] mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-[#6B1E1E] mb-1">{a.name} · {a.tag}</p>
                          <p className="text-sm text-[#8a8178]">
                            {a.flat}, {a.locality}, {a.city}, {a.state} - {a.pincode}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <h2 className="font-display text-lg font-semibold text-[#2B2420] mb-5">My Wishlist</h2>

                {wishlist.length === 0 ? (
                  <div className="text-center py-10">
                    <Heart size={28} className="mx-auto text-[#C98A2B] mb-3" />
                    <p className="text-sm text-[#8a8178]">
                      No items saved yet — tap the heart icon on any product to add it here.
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="border border-[#f2e8d8] rounded-2xl overflow-hidden flex flex-col"
                      >
                        <div className="bg-[#FBF3E7] h-36 flex items-center justify-center p-4">
                          <img
                            src={item.image_url || item.image}
                            alt={item.name}
                            className="h-full object-contain"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-semibold text-[#2B2B28] text-sm line-clamp-1">{item.name}</h3>
                          <p className="text-[#4D9F38] font-bold mt-1">₹{item.price}</p>

                          <div className="mt-auto pt-3 flex gap-2">
                            <button
                              onClick={() => addToCart(item)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-[#4D9F38] hover:bg-[#3d812e] text-white text-xs font-semibold py-2 rounded-full transition-colors"
                            >
                              <ShoppingCart size={13} />
                              {isInCart(item.id) ? "In Cart" : "Add"}
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              aria-label="Remove from wishlist"
                              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[#FBE7E7] text-[#B23A3A] hover:bg-[#B23A3A] hover:text-white transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <h2 className="font-display text-lg font-semibold text-[#2B2420] mb-5">Account Settings</h2>
                <form onSubmit={handleSettingsSave} className="space-y-4 max-w-md">
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={settingsForm.name}
                    onChange={handleSettingsChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    value={settingsForm.phone}
                    onChange={handleSettingsChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={settingsForm.email}
                    onChange={handleSettingsChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
                  />

                  {settingsError && (
                    <div className="text-sm text-[#B23A3A] bg-[#FBE7E7] rounded-lg p-3">{settingsError}</div>
                  )}
                  {settingsSuccess && (
                    <div className="text-sm text-[#2F7A38] bg-[#E4F3E1] rounded-lg p-3">{settingsSuccess}</div>
                  )}

                  <button
                    type="submit"
                    disabled={settingsLoading}
                    className="bg-[#2F7A38] hover:bg-[#255f2c] text-white font-semibold px-6 py-2.5 rounded-full transition-colors disabled:opacity-70"
                  >
                    {settingsLoading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;