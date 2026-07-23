import { useState } from "react";
import {
  Tag,
  MapPin,
  FileText,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  Lock,
  ShieldCheck,
  X,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateCartQty, clearCart } = useCart();

  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [deliveryType, setDeliveryType] = useState("pickup"); // "address" | "pickup"
  const [showPayment, setShowPayment] = useState(false);
  const [payMethod, setPayMethod] = useState("upi");
  const [payStep, setPayStep] = useState("select"); // select | processing | success

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAMARTH10") {
      setDiscountPct(0.1);
      setCouponMsg("Coupon applied! 10% off");
    } else {
      setDiscountPct(0);
      setCouponMsg("Invalid coupon code");
    }
  };

  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = itemTotal * discountPct;
  const grandTotal = itemTotal - discount;

  const openPayment = () => {
    setPayStep("select");
    setShowPayment(true);
  };

  const startPayment = () => {
    setPayStep("processing");
    setTimeout(() => setPayStep("success"), 1800);
  };

  const closePayment = () => {
    setShowPayment(false);
    if (payStep === "success") {
      clearCart();
      setCoupon("");
      setCouponMsg("");
      setDiscountPct(0);
    }
  };

  return (
    <section className="bg-[#FBF6EC] min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#7A2418]">Cart</h1>
          <button className="text-sm font-semibold text-[#3C8C2E]">Pickup Order</button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-12 text-center">
            <ShoppingBag size={40} className="mx-auto text-[#d8ccc0] mb-4" />
<h2 className="font-extrabold text-3xl sm:text-4xl tracking-tight text-[#7A2418] mb-2">
  Your cart is empty
</h2>            <p className="text-sm text-[#8a8178] mb-5">Add some pure wood pressed oils to get started.</p>
            <a
              href="/products"
              className="inline-block bg-[#3C8C2E] hover:bg-[#316f26] text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT: offers, delivery, store, instructions */}
            <div className="lg:col-span-2 space-y-4">

              {/* Coupon */}
              <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={17} className="text-[#3C8C2E]" />
                  <span className="font-bold text-[#2B2B28]">Available offers</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3C8C2E] outline-none"
                  />
                  <button
                    onClick={applyCoupon}
                    className="text-[#7A2418] font-bold text-sm px-5 hover:text-[#5C160D] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-xs mt-2 font-semibold ${discountPct ? "text-[#3C8C2E]" : "text-[#B23A3A]"}`}>
                    {couponMsg}
                  </p>
                )}
              </div>

              {/* Delivery type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryType("address")}
                  className={`text-left bg-white rounded-2xl border p-5 transition-colors ${
                    deliveryType === "address" ? "border-[#7A2418] ring-2 ring-[#7A2418]/10" : "border-[#F0E4CE]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        deliveryType === "address" ? "border-[#7A2418]" : "border-[#ccc0ad]"
                      }`}
                    >
                      {deliveryType === "address" && <span className="w-2 h-2 rounded-full bg-[#7A2418]" />}
                    </span>
                    <span className="font-bold text-sm text-[#2B2B28]">Deliver to an address</span>
                  </div>
                  <p className="text-xs text-[#8a8178] pl-6">Get estimated delivery time after you add the address</p>
                </button>

                <button
                  onClick={() => setDeliveryType("pickup")}
                  className={`text-left bg-white rounded-2xl border p-5 transition-colors ${
                    deliveryType === "pickup" ? "border-[#7A2418] ring-2 ring-[#7A2418]/10" : "border-[#F0E4CE]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        deliveryType === "pickup" ? "border-[#7A2418]" : "border-[#ccc0ad]"
                      }`}
                    >
                      {deliveryType === "pickup" && <span className="w-2 h-2 rounded-full bg-[#7A2418]" />}
                    </span>
                    <span className="font-bold text-sm text-[#2B2B28]">Pickup from store</span>
                  </div>
                  <p className="text-xs text-[#8a8178] pl-6">Check with store if pickup is available today</p>
                </button>
              </div>

              {/* Store location */}
              {deliveryType === "pickup" && (
                <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={17} className="text-[#3C8C2E]" />
                      <span className="font-bold text-[#2B2B28]">Store location</span>
                    </div>
                    <span className="text-xs text-[#a89f92] italic">Check with store if pickup is available today</span>
                  </div>
                  <p className="font-bold text-[#7A2418] pl-6">Samarth Organic</p>
                  <p className="text-sm text-[#3C8C2E] pl-6">7620006003</p>
                  <p className="text-sm text-[#8a8178] pl-6">
                    Near School No. 1, Asha Naka Road, Urun-Islampur, Tal. Walwa, Dist. Sangli - 415409, Maharashtra
                  </p>
                </div>
              )}

              {/* Order instructions */}
              <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={17} className="text-[#3C8C2E]" />
                  <span className="font-bold text-[#2B2B28]">Order instructions</span>
                </div>
                <button className="text-[#7A2418] font-bold text-sm hover:text-[#5C160D] transition-colors">Add</button>
              </div>
            </div>

            {/* RIGHT: cart items + summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5 sticky top-24">
                <div className="space-y-5 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover bg-[#FDF8EF] border border-[#F0E4CE] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#2B2B28] truncate">{item.name}</p>
                        <p className="text-xs mt-0.5">
                          <span className="font-semibold text-[#2B2B28]">₹{item.price}</span>{" "}
                          {item.mrp > item.price && (
                            <>
                              <span className="line-through text-[#b0a696] ml-1">₹{item.mrp}</span>
                              <span className="text-[#3C8C2E] ml-1">
                                {Math.round((1 - item.price / item.mrp) * 100)}% OFF
                              </span>
                            </>
                          )}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                            className="text-[#B23A3A] hover:text-[#7A2418] transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="flex items-center border border-[#ecdfc9] rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-[#7A2418] hover:bg-[#FBF6EC] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold">{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#7A2418] hover:bg-[#FBF6EC] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="font-bold text-sm text-[#2B2B28] shrink-0">₹{item.price * item.qty}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#F0E4CE] pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-[#5b5750]">
                    <span>Item total</span>
                    <span className="font-semibold text-[#2B2B28]">₹{itemTotal.toFixed(2)}</span>
                  </div>
                  {discountPct > 0 && (
                    <div className="flex justify-between text-[#3C8C2E]">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center border-t border-[#F0E4CE] mt-4 pt-4 mb-5">
                  <span className="font-bold text-[#2B2B28]">Grand Total</span>
                  <span className="font-bold text-lg text-[#7A2418]">₹{grandTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={openPayment}
                  className="w-full bg-gradient-to-r from-[#F0821D] to-[#e05a12] hover:brightness-105 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-[#F0821D]/30"
                >
                  Pay Now
                </button>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#a89f92]">
                  <span className="flex items-center gap-1"><Lock size={12} /> Secured Payment</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={12} /> Verified Merchant</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-7 relative shadow-2xl">
            <button
              onClick={closePayment}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FBF6EC] text-[#7A2418] flex items-center justify-center hover:bg-[#7A2418] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {payStep === "select" && (
              <>
                <h2 className="text-xl font-bold text-[#7A2418] mb-1">Complete payment</h2>
                <p className="text-sm text-[#8a8178] mb-6">Amount payable: <span className="font-bold text-[#2B2B28]">₹{grandTotal.toFixed(2)}</span></p>

                <div className="space-y-3 mb-6">
                  {[
                    { id: "upi", label: "UPI", sub: "Pay via Google Pay, PhonePe, Paytm", icon: Smartphone },
                    { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
                    { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", icon: Wallet },
                  ].map(({ id, label, sub, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPayMethod(id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-colors text-left ${
                        payMethod === id ? "border-[#7A2418] bg-[#FBF6EC]" : "border-[#F0E4CE]"
                      }`}
                    >
                      <span className="w-10 h-10 rounded-full bg-white border border-[#F0E4CE] flex items-center justify-center text-[#7A2418] shrink-0">
                        <Icon size={18} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-sm text-[#2B2B28]">{label}</span>
                        <span className="block text-xs text-[#8a8178]">{sub}</span>
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          payMethod === id ? "border-[#7A2418]" : "border-[#ccc0ad]"
                        }`}
                      >
                        {payMethod === id && <span className="w-2 h-2 rounded-full bg-[#7A2418]" />}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={startPayment}
                  className="w-full bg-gradient-to-r from-[#F0821D] to-[#e05a12] hover:brightness-105 text-white font-bold py-3.5 rounded-full transition-all"
                >
                  Pay ₹{grandTotal.toFixed(2)}
                </button>
              </>
            )}

            {payStep === "processing" && (
              <div className="py-10 text-center">
                <div className="w-12 h-12 mx-auto mb-5 border-4 border-[#F0E4CE] border-t-[#7A2418] rounded-full animate-spin" />
                <h2 className="font-bold text-lg text-[#2B2B28] mb-1">Processing payment...</h2>
                <p className="text-sm text-[#8a8178]">Please don't close this window</p>
              </div>
            )}

            {payStep === "success" && (
              <div className="py-8 text-center">
                <CheckCircle2 size={52} className="mx-auto text-[#3C8C2E] mb-4" />
                <h2 className="font-bold text-xl text-[#2B2B28] mb-1">Payment successful</h2>
                <p className="text-sm text-[#8a8178] mb-6">
                  ₹{grandTotal.toFixed(2)} paid via {payMethod === "upi" ? "UPI" : payMethod === "card" ? "Card" : "Cash on Delivery"}
                </p>
                <button
                  onClick={closePayment}
                  className="w-full bg-[#3C8C2E] hover:bg-[#316f26] text-white font-bold py-3 rounded-full transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;