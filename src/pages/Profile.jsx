import { useState } from "react";
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
} from "lucide-react";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [activeTab, setActiveTab] = useState("orders");

  const user = {
    name: authForm.name || "Rahul Sharma",
    phone: authForm.phone || "+91 98765 43210",
    email: authForm.email || "rahul.sharma@gmail.com",
    joined: "Member since Jan 2025",
  };

  const orders = [
    { id: "SO2401", date: "18 Jul 2026", items: "Groundnut Oil x2", total: "₹440", status: "Delivered" },
    { id: "SO2398", date: "05 Jul 2026", items: "Sesame Oil, Mustard Oil", total: "₹450", status: "Delivered" },
    { id: "SO2385", date: "22 Jun 2026", items: "Coconut Oil x1", total: "₹270", status: "Cancelled" },
  ];

  const addresses = [
    { label: "Home", detail: "123, Shivaji Nagar, Pune, Maharashtra - 411005" },
    { label: "Office", detail: "45, MG Road, Pune, Maharashtra - 411001" },
  ];

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "wishlist", label: "My Wishlist", icon: Heart },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const statusColor = (status) =>
    status === "Delivered"
      ? "bg-[#E4F3E1] text-[#2F7A38]"
      : status === "Cancelled"
      ? "bg-[#FBE7E7] text-[#B23A3A]"
      : "bg-[#FBEAD0] text-[#8A4B12]";

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setIsLoggedIn(true);
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthMode("login");
    setActiveTab("orders");
    setAuthForm({ name: "", phone: "", email: "", password: "" });
  };

  /* ---------------- LOGIN / SIGNUP SCREEN ---------------- */
  if (!isLoggedIn) {
    return (
      <section className="bg-[#FBF3E7] min-h-screen flex items-center justify-center py-14 px-5">
        <div className="w-full max-w-md">

          {/* Logo / brand mark */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#5C1A1A] text-white flex items-center justify-center font-bold text-xl mb-3">
              S
            </div>
            <h1 className="text-2xl font-bold text-[#5C1A1A]">
              {authMode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-[#8a8178] mt-1">
              {authMode === "login"
                ? "Login to view your orders, wishlist and more"
                : "Join Samarth Organic for a personalised experience"}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6 md:p-8">

            {/* Tab switch */}
            <div className="flex bg-[#FBF3E7] rounded-full p-1 mb-6">
              <button
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                  authMode === "login" ? "bg-[#5C1A1A] text-white" : "text-[#5C1A1A]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                  authMode === "signup" ? "bg-[#5C1A1A] text-white" : "text-[#5C1A1A]"
                }`}
              >
                Sign Up
              </button>
            </div>

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
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3FA34D] focus:ring-4 focus:ring-[#3FA34D]/10 outline-none transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  value={authForm.phone}
                  onChange={handleAuthChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3FA34D] focus:ring-4 focus:ring-[#3FA34D]/10 outline-none transition-all"
                />
              </div>

              {authMode === "signup" && (
                <div className="relative">
                  <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email address"
                    value={authForm.email}
                    onChange={handleAuthChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3FA34D] focus:ring-4 focus:ring-[#3FA34D]/10 outline-none transition-all"
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
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3FA34D] focus:ring-4 focus:ring-[#3FA34D]/10 outline-none transition-all"
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
                  <button type="button" className="text-xs font-semibold text-[#3FA34D] hover:text-[#2F7A38]">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#3FA34D] hover:bg-[#358c42] text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
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
                  <button onClick={() => setAuthMode("signup")} className="font-semibold text-[#5C1A1A]">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setAuthMode("login")} className="font-semibold text-[#5C1A1A]">
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
    <section className="bg-[#FBF3E7] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-5">

        {/* User header card */}
        <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-[#5C1A1A] text-white flex items-center justify-center text-2xl font-bold shrink-0">
            {user.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-[#5C1A1A]">{user.name}</h1>
            <p className="text-sm text-[#8a8178] mt-1">{user.phone} · {user.email}</p>
            <p className="text-xs text-[#a89f92] mt-1">{user.joined}</p>
          </div>
          <button className="flex items-center gap-1.5 border border-[#3FA34D] text-[#3FA34D] hover:bg-[#3FA34D] hover:text-white font-semibold text-sm px-4 py-2 rounded-full transition-colors">
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
                  className={`w-full flex items-center justify-between px-5 py-4 text-sm font-semibold border-b border-[#f2e8d8] last:border-0 transition-colors ${
                    activeTab === id ? "bg-[#E4F3E1] text-[#2F7A38]" : "text-[#5C1A1A] hover:bg-[#FBF3E7]"
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
                className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-[#B23A3A] hover:bg-[#FBE7E7] transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <h2 className="font-bold text-lg text-[#5C1A1A] mb-5">My Orders</h2>
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id} className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#f2e8d8] rounded-xl p-4 gap-2">
                      <div>
                        <p className="font-semibold text-[#2B2B28]">{o.id} <span className="text-xs text-[#a89f92] font-normal">· {o.date}</span></p>
                        <p className="text-sm text-[#8a8178]">{o.items}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#5C1A1A]">{o.total}</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-lg text-[#5C1A1A]">Saved Addresses</h2>
                  <button className="text-sm font-semibold text-[#3FA34D]">+ Add New</button>
                </div>
                <div className="space-y-4">
                  {addresses.map((a) => (
                    <div key={a.label} className="border border-[#f2e8d8] rounded-xl p-4">
                      <p className="font-semibold text-[#5C1A1A] mb-1">{a.label}</p>
                      <p className="text-sm text-[#8a8178]">{a.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6 text-center text-sm text-[#8a8178]">
                Go to the Wishlist page to view saved items.
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <h2 className="font-bold text-lg text-[#5C1A1A] mb-5">Account Settings</h2>
                <div className="space-y-4 max-w-md">
                  <input placeholder="Full Name" defaultValue={user.name} className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3FA34D] outline-none" />
                  <input placeholder="Phone" defaultValue={user.phone} className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3FA34D] outline-none" />
                  <input placeholder="Email" defaultValue={user.email} className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3FA34D] outline-none" />
                  <button className="bg-[#3FA34D] hover:bg-[#358c42] text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;