import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useAddress } from "../context/AddressContext";
import {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../utils/api";

// Razorpay cha checkout.js script dynamically load karण्yasathi helper
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

/* ---------------- Professional line-icon set (no external icon package needed) ---------------- */
/* size is a fixed px attribute so passing className for color never removes sizing */

const TruckIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <path d="M1 3h13v13H1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M14 8h4.5l3.5 4v4h-8V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="6" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.5" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const StoreIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <path d="M3 9.5 4.5 4h15L21 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M3 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M5 10v9.5h14V10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9.5 19.5V14h5v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const CashIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 9v.01M19 15v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* Stylized instant-payment mark (two-tone arrows) — evokes UPI without reproducing NPCI's trademarked logo */
const UpiIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <path d="M3 13.5 11 4v6.2L21 4l-8 9.8V8.2L3 18v-4.5z" fill="#F58220" stroke="none" />
    <path d="M3 18 13 8.2v5.6L21 4" stroke="#0B7B41" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/* Generic QR mark — QR codes aren't anyone's trademark, and it's the single most
   recognizable visual for "instant payment" in India, same as the real Razorpay sheet */
const QrIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M3 3h7v7H3V3zm2 2v3h3V5H5z" />
    <path d="M14 3h7v7h-7V3zm2 2v3h3V5h-3z" />
    <path d="M3 14h7v7H3v-7zm2 2v3h3v-3H5z" />
    <path d="M14 14h2v2h-2zM18 14h3v2h-3zM14 18h2v3h-2zM18 17h3v4h-3z" />
  </svg>
);

const CardIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const BankIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <path d="M3 10 12 4l9 6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M4 10h16v9H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M4 19h16M8 13v4M12 13v4M16 13v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* Generic wallet mark — matches the "Wallet" row Razorpay's own sheet shows */
const WalletIcon = ({ className = "", size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h11A2.5 2.5 0 0 1 19 7.5V8H5.5A2.5 2.5 0 0 1 3 7.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 8h15a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="16.5" cy="14" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

const MapPinIcon = ({ className = "", size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const LockIcon = ({ className = "", size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className}>
    <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CheckBadge = () => (
  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#6B1E1E] text-white flex items-center justify-center shadow-sm">
    <svg viewBox="0 0 24 24" fill="none" width={12} height={12}>
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const RadioCircle = ({ selected }) => (
  <span
    className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
      selected ? "border-[#6B1E1E]" : "border-[#c9bfae]"
    }`}
  >
    {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#6B1E1E]" />}
  </span>
);

/* Small colored icon badge used in the payment-method rows below — matches
   the soft rounded-square icon chips Razorpay's own checkout sheet uses */
const MethodBadge = ({ children, bg }) => (
  <span
    className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center"
    style={{ background: bg }}
  >
    {children}
  </span>
);

/* ------------------------------------------------------------------------------------------- */

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isLoggedIn, openLoginModal } = useAuth();
  const { addresses, selectedAddress, setSelectedAddressId } = useAddress();
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // "delivery" | "pickup"
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" | "online"
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const deliveryCharge = deliveryMethod === "delivery" && cartTotal < 499 ? 40 : 0;
  const baseTotal = cartTotal + deliveryCharge;

  // Genuine incentive for paying online instead of COD — actually reduces the payable amount below,
  // not just a label. Adjust ONLINE_PAYMENT_DISCOUNT to match what the backend/Razorpay order will charge.
  const ONLINE_PAYMENT_DISCOUNT = baseTotal > 0 ? Math.min(10, baseTotal) : 0;
  const onlineTotal = baseTotal - ONLINE_PAYMENT_DISCOUNT;
  const total = paymentMethod === "online" ? onlineTotal : baseTotal;

  const handlePlaceOrder = async () => {
    setError("");

    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    if (deliveryMethod === "delivery" && !selectedAddress) {
      setError("Kripaya delivery sathi ek address select kara.");
      return;
    }

    setPlacing(true);
    try {
      // Step 1: order backend var create kara
      const orderPayload = {
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
          size_label: item.selectedSize?.label || null,
        })),
        delivery_method: deliveryMethod,
        address_id: deliveryMethod === "delivery" ? selectedAddress.id : null,
        payment_method: paymentMethod,
        online_payment_discount: paymentMethod === "online" ? ONLINE_PAYMENT_DISCOUNT : 0,
      };

      const { data } = await createOrder(orderPayload);
      const order = data.order;

      if (paymentMethod === "cod") {
        // COD -> order aadhichach "confirmed" aahe, seedha success page var java
        clearCart();
        navigate(`/order-success/${order.order_number}`);
        return;
      }

      // ---------- ONLINE PAYMENT (Razorpay) ----------
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        setError("Razorpay load nahi zala. Internet check kara.");
        setPlacing(false);
        return;
      }

      const { data: rzpData } = await createRazorpayOrder(order.id);

      const options = {
        key: rzpData.key_id,
        amount: rzpData.amount,
        currency: rzpData.currency,
        name: "Samarth Organic",
        description: `Order ${order.order_number}`,
        order_id: rzpData.razorpay_order_id,
        handler: async function (response) {
          // Payment success -> signature verify karण्yasathi backend la pathva
          try {
            await verifyRazorpayPayment({
              order_id: order.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            navigate(`/order-success/${order.order_number}`);
          } catch (err) {
            setError("Payment zala pan verify nahi zala. Support la contact kara.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: { color: "#6B1E1E" },
        // Only lets us pick which language the popup OPENS in by default —
        // Razorpay doesn't let us remove languages from the switcher inside
        // their own popup (that list is entirely theirs, not ours to edit).
        // Change 'mar' to 'hi' or 'en' here if you'd rather default to
        // Hindi or English instead.
        config: {
          display: {
            language: "mar",
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setError("Payment fail zala. Kripaya parat try kara.");
      });
      rzp.open();
    } catch (err) {
      setError(err?.response?.data?.error || "Kahitari chukla, parat try kara.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="font-body bg-[#FBF3E7] min-h-screen py-10 px-5">
      {/* Distinctive display + body font pairing for the whole checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600..900&family=Inter:wght@400;500;600;700&display=swap');
        .checkout-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
      `}</style>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#f2e8d8] shadow-[0_8px_30px_rgba(107,30,30,0.06)] p-6 md:p-10">
        <div className="mb-8">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#2F7A38] mb-1">
            Almost there
          </p>
          <h1 className="checkout-display text-4xl md:text-5xl font-extrabold text-[#6B1E1E] tracking-tight">
            Checkout
          </h1>
        </div>

        {/* ---------- Delivery Method ---------- */}
        <div className="mb-7">
          <p className="checkout-display text-lg font-bold text-[#6B1E1E] mb-3">
            How do you want your order?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeliveryMethod("delivery")}
              className={`relative flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 bg-white text-sm font-bold transition-colors ${
                deliveryMethod === "delivery"
                  ? "border-[#6B1E1E] text-[#6B1E1E]"
                  : "border-[#ecdfc9] text-[#5c5348] hover:border-[#d9c9a3]"
              }`}
            >
              {deliveryMethod === "delivery" && <CheckBadge />}
              <TruckIcon size={24} />
              Home Delivery
            </button>
            <button
              onClick={() => setDeliveryMethod("pickup")}
              className={`relative flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 bg-white text-sm font-bold transition-colors ${
                deliveryMethod === "pickup"
                  ? "border-[#6B1E1E] text-[#6B1E1E]"
                  : "border-[#ecdfc9] text-[#5c5348] hover:border-[#d9c9a3]"
              }`}
            >
              {deliveryMethod === "pickup" && <CheckBadge />}
              <StoreIcon size={24} />
              Store Pickup
            </button>
          </div>
        </div>

        {/* ---------- Address (only if delivery) ---------- */}
        {deliveryMethod === "delivery" && (
          <div className="mb-7">
            <p className="checkout-display text-lg font-bold text-[#6B1E1E] mb-3 flex items-center gap-2">
              <MapPinIcon size={16} className="text-[#6B1E1E]" />
              Deliver to
            </p>
            {addresses.length === 0 ? (
              <p className="text-sm text-[#8a8178]">
                Ajun kahi address save keleli nahi. Profile page varun add kara.
              </p>
            ) : (
              <div className="space-y-2">
                {addresses.map((a) => (
                  <label
                    key={a.id}
                    className={`flex items-start gap-3 border-2 rounded-xl p-3.5 bg-white cursor-pointer transition-colors ${
                      selectedAddress?.id === a.id
                        ? "border-[#6B1E1E]"
                        : "border-[#ecdfc9] hover:border-[#d9c9a3]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mt-0.5 accent-[#6B1E1E]"
                      checked={selectedAddress?.id === a.id}
                      onChange={() => setSelectedAddressId(a.id)}
                    />
                    <span className="text-sm text-[#3a332c]">
                      <strong className="font-bold text-[#6B1E1E]">{a.name}</strong>{" "}
                      <span className="text-[#8a8178]">· {a.tag}</span>
                      <br />
                      {a.flat}, {a.locality}, {a.city}, {a.state} - {a.pincode}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------- Payment Method ---------- */}
        <div className="mb-7">
          <p className="checkout-display text-lg font-bold text-[#6B1E1E] mb-3">
            Payment Method
          </p>
          <div className="space-y-3.5 overflow-hidden">
            {/* Cash on Delivery */}
            <label
              onClick={() => setPaymentMethod("cod")}
              className={`group flex items-center justify-between gap-3 p-4 rounded-2xl border bg-white cursor-pointer transition-all duration-200 ${
                paymentMethod === "cod"
                  ? "border-[#6B1E1E] shadow-[0_6px_18px_rgba(107,30,30,0.10)]"
                  : "border-[#ecdfc9] hover:border-[#d9c9a3] hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm font-bold text-[#2B2420] whitespace-nowrap">₹{baseTotal}</span>
                <span className="w-px h-9 bg-[#ecdfc9]" />
                <MethodBadge bg="linear-gradient(135deg,#FBF3E7,#F3E6D0)">
                  <span className="text-[#6B1E1E]"><CashIcon size={17} /></span>
                </MethodBadge>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-[#2B2420] truncate">Cash on Delivery</span>
                  <span className="block text-xs text-[#8a8178] truncate">Pay when your order arrives</span>
                </span>
              </div>
              <RadioCircle selected={paymentMethod === "cod"} />
            </label>

            {/* UPI / Cards / Netbanking / Wallet via Razorpay — with a real, working discount */}
            <div
              className={`relative rounded-2xl border overflow-hidden transition-all duration-200 ${
                paymentMethod === "online"
                  ? "border-[#6B1E1E] shadow-[0_10px_26px_rgba(107,30,30,0.12)]"
                  : "border-[#ecdfc9] hover:border-[#d9c9a3] hover:shadow-sm"
              }`}
            >
              {/* Recommended ribbon — same visual role as the "fastest way to pay" nudge
                  on real payment pages, drawn ourselves rather than a screenshot of one */}
              <span className="absolute top-0 right-5 bg-[#2F7A38] text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-b-md">
                RECOMMENDED
              </span>

              <label
                onClick={() => setPaymentMethod("online")}
                className="flex items-center justify-between gap-3 p-4 pt-5 bg-white cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="whitespace-nowrap leading-tight">
                    <span className="block text-xs text-[#b3aa9c] line-through">₹{baseTotal}</span>
                    <span className="block text-sm font-extrabold text-[#2F7A38]">₹{onlineTotal}</span>
                  </span>
                  <span className="w-px h-9 bg-[#ecdfc9]" />
                  <MethodBadge bg="linear-gradient(135deg,#FFF3E8,#FFE4D0)">
                    <QrIcon size={17} className="text-[#6B1E1E]" />
                  </MethodBadge>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-[#2B2420] truncate">UPI, Cards &amp; Netbanking</span>
                    <span className="text-xs text-[#8a8178]">via Razorpay — India's most trusted checkout</span>
                  </span>
                </div>
                <RadioCircle selected={paymentMethod === "online"} />
              </label>

              {/* Method strip — mirrors the row of options the real Razorpay sheet shows
                  (UPI / Card / Netbanking / Wallet), using our own generic icon set */}
              <div className="flex items-center gap-2 px-4 pb-4">
                {[
                  { Icon: UpiIcon, label: "UPI", bg: "#FFF6EC" },
                  { Icon: CardIcon, label: "Cards", bg: "#F3F0FF" },
                  { Icon: BankIcon, label: "Netbanking", bg: "#EAF6EC" },
                  { Icon: WalletIcon, label: "Wallet", bg: "#FDECEC" },
                ].map(({ Icon, label, bg }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full text-[11px] font-semibold text-[#5c5348]"
                    style={{ background: bg }}
                  >
                    <Icon size={13} className="text-[#6B1E1E]" />
                    {label}
                  </span>
                ))}
              </div>

              {ONLINE_PAYMENT_DISCOUNT > 0 && (
                <div className="bg-[#E4F3E1] text-[#2F7A38] text-xs font-bold text-center py-1.5">
                  Save ₹{ONLINE_PAYMENT_DISCOUNT} — pay online instead of COD
                </div>
              )}
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-[#8a8178] mt-2.5">
            <LockIcon size={14} />
            Your payment info is encrypted and never stored on our servers
          </p>
        </div>

        {/* ---------- Order Summary ---------- */}
        <div className="border-t-2 border-dashed border-[#f2e8d8] pt-5 mb-6 text-sm bg-[#FBF3E7]/60 -mx-6 md:-mx-10 px-6 md:px-10 pb-1">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a8178] mb-3">
            Order Summary
          </p>
          <div className="flex justify-between mb-1.5 text-[#5c5348]">
            <span>Subtotal</span>
            <span className="font-semibold text-[#6B1E1E]">₹{cartTotal}</span>
          </div>
          <div className="flex justify-between mb-1.5 text-[#5c5348]">
            <span>Delivery Charge</span>
            <span className="font-semibold text-[#6B1E1E]">
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
            </span>
          </div>
          {paymentMethod === "online" && ONLINE_PAYMENT_DISCOUNT > 0 && (
            <div className="flex justify-between mb-3 text-[#2F7A38]">
              <span>Online Payment Discount</span>
              <span className="font-semibold">− ₹{ONLINE_PAYMENT_DISCOUNT}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline font-extrabold text-[#6B1E1E] pt-3 border-t border-[#f2e8d8]">
            <span className="checkout-display text-lg">Total</span>
            <span className="checkout-display text-2xl">₹{total}</span>
          </div>
        </div>

        {error && (
          <div className="text-sm font-medium text-[#B23A3A] bg-[#FBE7E7] border border-[#f3c9c9] rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={placing || cart.length === 0}
          className="checkout-display w-full bg-[#6B1E1E] hover:bg-[#571818] active:scale-[0.99] text-white font-bold text-lg py-4 rounded-full shadow-[0_6px_20px_rgba(107,30,30,0.35)] transition-all disabled:opacity-60 disabled:shadow-none"
        >
          {placing ? "Placing order..." : `Place Order · ₹${total}`}
        </button>
      </div>
    </section>
  );
};

export default Checkout;