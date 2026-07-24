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
  Droplet,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useAddress } from "../context/AddressContext";

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
  // isLoggedIn / user / logout now come from the shared AuthContext, so this
  // page always reflects whatever the header / cart login flow already did.
  const { user, isLoggedIn, loginWithPhone, updateUser, logout } = useAuth();
  
  const { addresses } = useAddress();

  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [activeTab, setActiveTab] = useState("orders");

  const displayUser = {
    name: user?.name || "Guest",
    phone: user?.phone || "",
    email: user?.email || "",
    joined: user?.joined ? new Date(user.joined).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "",
  };

  const orders = [
    { id: "SO2401", date: "18 Jul 2026", items: "Groundnut Oil x2", total: "₹440", status: "Delivered" },
    { id: "SO2398", date: "05 Jul 2026", items: "Sesame Oil, Mustard Oil", total: "₹450", status: "Delivered" },
    { id: "SO2385", date: "22 Jun 2026", items: "Coconut Oil x1", total: "₹270", status: "Cancelled" },
  ];

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "wishlist", label: "My Wishlist", icon: Heart },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const statusStyle = (status) =>
    status === "Delivered"
      ? { bar: "bg-[#2F7A38]", chip: "bg-[#E4F3E1] text-[#2F7A38]" }
      : status === "Cancelled"
      ? { bar: "bg-[#B23A3A]", chip: "bg-[#FBE7E7] text-[#B23A3A]" }
      : { bar: "bg-[#C98A2B]", chip: "bg-[#FBEAD0] text-[#8A4B12]" };

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      loginWithPhone(authForm.phone);
      if (authMode === "signup") {
        updateUser({ name: authForm.name, email: authForm.email });
      }
    }, 1200);
  };

  const handleLogout = () => {
    logout();
    setAuthMode("login");
    setActiveTab("orders");
    setAuthForm({ name: "", phone: "", email: "", password: "" });
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

              <div className="relative">
                <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  value={authForm.phone}
                  onChange={handleAuthChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all"
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
          <button className="relative flex items-center gap-1.5 border border-white/40 text-white hover:bg-white hover:text-[#6B1E1E] font-semibold text-sm px-4 py-2 rounded-full transition-colors">
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
                <div className="space-y-4">
                  {orders.map((o) => {
                    const s = statusStyle(o.status);
                    return (
                      <div key={o.id} className="flex items-stretch gap-4 border border-[#f2e8d8] rounded-xl overflow-hidden">
                        <div className={`w-1.5 shrink-0 ${s.bar}`} />
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between py-4 pr-4 gap-2">
                          <div>
                            <p className="font-semibold text-[#2B2B28]">{o.id} <span className="text-xs text-[#a89f92] font-normal">· {o.date}</span></p>
                            <p className="text-sm text-[#8a8178]">{o.items}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-[#6B1E1E]">{o.total}</span>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.chip}`}>
                              {o.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-10 text-center">
                <Heart size={28} className="mx-auto text-[#C98A2B] mb-3" />
                <p className="text-sm text-[#8a8178]">Go to the Wishlist page to view saved items.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl border border-[#f2e8d8] shadow-sm p-6">
                <h2 className="font-display text-lg font-semibold text-[#2B2420] mb-5">Account Settings</h2>
                <div className="space-y-4 max-w-md">
                  <input placeholder="Full Name" defaultValue={displayUser.name} className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all" />
                  <input placeholder="Phone" defaultValue={displayUser.phone} className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all" />
                  <input placeholder="Email" defaultValue={displayUser.email} className="w-full px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#2F7A38] focus:ring-4 focus:ring-[#2F7A38]/10 outline-none transition-all" />
                  <button className="bg-[#2F7A38] hover:bg-[#255f2c] text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
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
