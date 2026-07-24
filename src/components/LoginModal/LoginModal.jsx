import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const LoginModal = () => {
  const { showLogin, closeLoginModal, loginWithPhone } = useAuth();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!showLogin) return null;

  const validPhone = /^[6-9]\d{9}$/.test(phone);

  const reset = () => {
    setStep("phone");
    setPhone("");
    setOtp("");
    setError("");
    setLoading(false);
  };

  const close = () => {
    closeLoginModal();
    reset();
  };

  const sendOtp = () => {
    if (!validPhone) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (!agreed) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 900);
  };

  const verifyOtp = () => {
    if (otp.trim().length < 4) {
      setError("Please enter the OTP.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      loginWithPhone(phone);
      reset();
    }, 900);
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

            <p className="text-sm text-[#8A8178] mt-3">
              Welcome to
            </p>

            <h2 className="text-3xl font-bold text-[#2B2B28] text-center">
              SAMARTH ORGANIC
            </h2>

            <p className="text-xs text-[#8A8178] mt-1">
              Pure • Natural • Healthy
            </p>
          </div>

          {step === "phone" ? (
            <>
              {/* Mobile Number */}
              <div>
                <label className="text-sm font-semibold text-[#2B2B28]">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="Enter your mobile number"
                  className="w-full mt-2 px-5 py-4 rounded-2xl border border-[#E9D9C0] bg-[#FFFDF9] text-sm outline-none focus:border-[#3C8C2E] focus:ring-2 focus:ring-[#3C8C2E]/20"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 font-medium mt-3">
                  {error}
                </p>
              )}

              {/* OTP Button */}
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full mt-6 py-4 rounded-full text-white font-bold shadow-xl bg-gradient-to-r from-[#7A2418] to-[#A64B29] hover:scale-[1.02] duration-300 disabled:opacity-70"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>

              {/* Terms */}
              <div className="mt-6 pt-5 border-t border-[#EFE4D2]">
                <label className="flex gap-2 items-start text-xs leading-6 text-[#7F776D]">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 accent-[#7A2418]"
                  />

                  <span>
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-[#3C8C2E] underline font-semibold"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and consent to receive important updates and offers via
                    WhatsApp & SMS.
                  </span>
                </label>
              </div>
            </>
          ) : (
            <>
              {/* OTP Text */}
              <p className="text-sm text-[#8A8178] text-center mb-5">
                OTP sent successfully to
                <span className="font-semibold text-[#2B2B28]">
                  {" "}
                  +91 {phone}
                </span>
              </p>

              {/* OTP Input */}
              <input
                type="tel"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="Enter OTP"
                className="w-full py-4 rounded-2xl border border-[#E9D9C0] bg-[#FFFDF9] text-center tracking-[0.5em] text-xl font-bold outline-none focus:border-[#3C8C2E]"
              />

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 font-medium mt-3">
                  {error}
                </p>
              )}

              {/* Verify Button */}
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full mt-6 py-4 rounded-full text-white font-bold shadow-xl bg-gradient-to-r from-[#3C8C2E] to-[#63AE45] hover:scale-[1.02] duration-300 disabled:opacity-70"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              {/* Bottom Buttons */}
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  className="text-sm font-semibold text-[#7A2418]"
                >
                  Resend OTP
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setError("");
                  }}
                  className="text-sm font-semibold text-[#7A2418]"
                >
                  Change Number
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;