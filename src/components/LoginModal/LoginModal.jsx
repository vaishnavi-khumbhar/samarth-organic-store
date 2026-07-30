import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

// FIX: this modal used to be a fake phone + OTP flow that called
// `loginWithPhone(phone)` — a function that doesn't exist on AuthContext
// (and there's no send-otp/verify-otp endpoint on the backend either).
// Tapping "Verify & Login" silently crashed. Replaced with a real
// email + password form wired to AuthContext's `login()`, which calls
// api/auth/login.php. Full account creation still happens on the
// Profile page, so this modal links there for "New here?".
const LoginModal = () => {
  const { showLogin, closeLoginModal, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!showLogin) return null;

  const reset = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError("");
    setLoading(false);
  };

  const close = () => {
    closeLoginModal();
    reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email ani password bharणe garjeche aahe.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await login(email, password);
      reset(); // AuthContext closes the modal itself on success
    } catch (err) {
      setError(err?.response?.data?.error || "Email ya password chukicha aahe.");
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[300] overflow-y-auto bg-black/60 backdrop-blur-md"
      onClick={close}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative overflow-hidden bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-[#F2E8D7] w-full max-w-sm max-h-[90vh] overflow-y-auto p-7"
        >
          {/* Top Background */}
          <div className="absolute top-0 left-0 h-28 w-full bg-gradient-to-r from-[#7A2418] via-[#A64B29] to-[#3C8C2E] opacity-10 pointer-events-none" />

          {/* Close Button */}
          <button
            type="button"
            onClick={close}
            className="absolute z-[9999] top-5 right-5 w-10 h-10 rounded-full bg-[#FBF6EC] text-[#7A2418] flex items-center justify-center hover:bg-[#7A2418] hover:text-white duration-300 shadow-md"
          >
            <X size={18} />
          </button>

          {/* Logo */}
          <div className="relative z-10 flex flex-col items-center mb-7">
            <img
              src={logo}
              alt="Samarth Organic"
              className="w-20 h-20 object-contain rounded-2xl shadow-lg"
            />

            <p className="text-sm text-[#8A8178] mt-3">Welcome back to</p>

            <h2 className="text-3xl font-bold text-[#2B2B28] text-center">
              SAMARTH ORGANIC
            </h2>

            <p className="text-xs text-[#8A8178] mt-1">
              Pure • Natural • Healthy
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-[#E9D9C0] bg-[#FFFDF9] text-sm outline-none focus:border-[#3C8C2E] focus:ring-2 focus:ring-[#3C8C2E]/20"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-11 pr-11 py-4 rounded-2xl border border-[#E9D9C0] bg-[#FFFDF9] text-sm outline-none focus:border-[#3C8C2E] focus:ring-2 focus:ring-[#3C8C2E]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b0a696]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full text-white font-bold shadow-xl bg-gradient-to-r from-[#7A2418] to-[#A64B29] hover:scale-[1.02] duration-300 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-xs text-[#8A8178] mt-6 pt-5 border-t border-[#EFE4D2]">
            New here?{" "}
            <Link
              to="/profile"
              onClick={close}
              className="font-semibold text-[#7A2418] underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;