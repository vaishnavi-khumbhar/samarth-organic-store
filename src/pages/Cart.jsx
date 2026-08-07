import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useAddress } from "../context/AddressContext";
import AddressForm from "../components/AddressForm/AddressForm";

// Safely convert anything (string like "₹399", number, undefined, null) into a plain number
const toNum = (val) => {
  if (val === undefined || val === null) return 0;
  const n = Number(String(val).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

// product data madhe kadhi `img` kadhi `image` field asto, donhi try karto
const getImg = (item) => item.img || item.image || "";

const INSTRUCTIONS_MAX = 100;

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQty } = useCart();
  const { requireLogin } = useAuth();
  const { addresses, selectedAddressId, setSelectedAddressId } = useAddress();

  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [deliveryType, setDeliveryType] = useState("pickup"); // "address" | "pickup"
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Order instructions box: closed by default, "Add" opens the textarea,
  // "Save Instructions" saves + collapses it back down.
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [savedInstructions, setSavedInstructions] = useState("");

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAMARTH10") {
      setDiscountPct(0.1);
      setCouponMsg("Coupon applied! 10% off");
    } else {
      setDiscountPct(0);
      setCouponMsg("Invalid coupon code");
    }
  };

  const handleToggleInstructions = () => {
    if (showInstructions) {
      // Save button pressed -> persist the text and collapse
      setSavedInstructions(instructions.trim());
      setShowInstructions(false);
    } else {
      setShowInstructions(true);
    }
  };

  // price / qty ata number madhech convert hotay, mhanun NaN chi problem nahi yenar
  const itemTotal = cart.reduce(
    (sum, item) => sum + toNum(item.price) * toNum(item.qty),
    0
  );
  const discount = itemTotal * discountPct;
  const grandTotal = itemTotal - discount;

  // "Deliver to an address" -> login required first
  const handleChooseAddressDelivery = () => {
    requireLogin(() => {
      setDeliveryType("address");
      setShowAddressForm(addresses.length === 0);
    });
  };

  // FIX: this used to open a local modal whose "Pay" button just faked a
  // setTimeout("processing" -> "success") — no order was ever created, no
  // real payment ever happened, yet the cart cleared as if one had. The
  // real, fully-wired flow (creates the order, and for online payment
  // opens the actual Razorpay checkout + verifies it server-side) already
  // exists on the /checkout page — this just sends you there instead of
  // faking it locally.
  const handlePayNow = () => {
    requireLogin(() => navigate("/checkout"));
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
            </h2>
            <p className="text-sm text-[#8a8178] mb-5">Add some pure wood pressed oils to get started.</p>
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

              {/* Coupon - ata mobile var stack hoil, baher jaणar nahi */}
              <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={17} className="text-[#3C8C2E]" />
                  <span className="font-bold text-[#2B2B28]">Available offers</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full sm:flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-[#ecdfc9] bg-[#FDF8EF] text-sm focus:border-[#3C8C2E] outline-none"
                  />
                  <button
                    onClick={applyCoupon}
                    className="w-full sm:w-auto shrink-0 bg-[#7A2418] sm:bg-transparent text-white sm:text-[#7A2418] font-bold text-sm px-5 py-2.5 sm:py-0 rounded-xl sm:rounded-none hover:opacity-90 sm:hover:text-[#5C160D] transition-colors"
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
                  onClick={handleChooseAddressDelivery}
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
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
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

              {/* Delivery address (login-gated) */}
              {deliveryType === "address" && (
                <div>
                  {showAddressForm || addresses.length === 0 ? (
                    <AddressForm
                      onSaved={() => setShowAddressForm(false)}
                      onCancel={addresses.length > 0 ? () => setShowAddressForm(false) : undefined}
                    />
                  ) : (
                    <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Truck size={17} className="text-[#3C8C2E]" />
                          <span className="font-bold text-[#2B2B28]">Delivery Address</span>
                        </div>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="text-sm font-semibold text-[#7A2418] hover:text-[#5C160D] transition-colors"
                        >
                          + Add New
                        </button>
                      </div>
                      <div className="space-y-3">
                        {addresses.map((a) => (
                          <label
                            key={a.id}
                            className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${
                              selectedAddressId === a.id ? "border-[#7A2418] bg-[#FBF6EC]" : "border-[#F0E4CE]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="selectedAddress"
                              checked={selectedAddressId === a.id}
                              onChange={() => setSelectedAddressId(a.id)}
                              className="mt-1 accent-[#7A2418]"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-[#2B2B28]">{a.name}</span>
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#FBF6EC] text-[#7A2418] border border-[#ecdfc9]">
                                  {a.tag}
                                </span>
                              </div>
                              <p className="text-sm text-[#8a8178] mt-0.5">{a.phone}</p>
                              <p className="text-sm text-[#8a8178]">
                                {a.flat}, {a.locality}, {a.city}, {a.state} - {a.pincode}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Order instructions */}
              <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5">
                <div className={`flex items-center justify-between ${showInstructions ? "mb-3" : ""}`}>
                  <div className="flex items-center gap-2">
                    <FileText size={17} className="text-[#3C8C2E]" />
                    <span className="font-bold text-[#2B2B28]">Order instructions</span>
                  </div>
                  <button
                    onClick={handleToggleInstructions}
                    className="text-[#7A2418] font-bold text-sm hover:text-[#5C160D] transition-colors"
                  >
                    {showInstructions ? "Save Instructions" : savedInstructions ? "Edit" : "Add"}
                  </button>
                </div>

                {showInstructions && (
                  <div className="relative">
                    <textarea
                      autoFocus
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value.slice(0, INSTRUCTIONS_MAX))}
                      maxLength={INSTRUCTIONS_MAX}
                      rows={3}
                      placeholder="Type order instructions here"
                      className="w-full resize-none border border-[#F0E4CE] rounded-xl p-3 pb-6 text-sm text-[#2B2B28] placeholder:text-[#b0a696] focus:border-[#7A2418] outline-none"
                    />
                    <span className="absolute bottom-2 right-3 text-[11px] text-[#a89f92]">
                      {instructions.length}/{INSTRUCTIONS_MAX}
                    </span>
                  </div>
                )}

                {!showInstructions && savedInstructions && (
                  <p className="text-sm text-[#5b5750] mt-2">{savedInstructions}</p>
                )}
              </div>
            </div>

            {/* RIGHT: cart items + summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#F0E4CE] shadow-sm p-5 lg:sticky lg:top-24">
                <div className="space-y-5 mb-4">
                  {cart.map((item) => {
                    const price = toNum(item.price);
                    const mrp = toNum(item.mrp);
                    const qty = toNum(item.qty) || 1;
                    const lineTotal = price * qty;

                    return (
                      <div key={item.id} className="flex items-start gap-3">
                        <img
                          src={getImg(item)}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover bg-[#FDF8EF] border border-[#F0E4CE] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#2B2B28] truncate">{item.name}</p>
                          <p className="text-xs mt-0.5">
                            <span className="font-semibold text-[#2B2B28]">₹{price}</span>{" "}
                            {mrp > price && (
                              <>
                                <span className="line-through text-[#b0a696] ml-1">₹{mrp}</span>
                                <span className="text-[#3C8C2E] ml-1">
                                  {Math.round((1 - price / mrp) * 100)}% OFF
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
                              <span className="w-7 text-center text-xs font-semibold">{qty}</span>
                              <button
                                onClick={() => updateCartQty(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center text-[#7A2418] hover:bg-[#FBF6EC] transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="font-bold text-sm text-[#2B2B28] shrink-0">₹{lineTotal.toFixed(2)}</p>
                      </div>
                    );
                  })}
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
                  onClick={handlePayNow}
                  className="w-full bg-gradient-to-r from-[#F0821D] to-[#e05a12] hover:brightness-105 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-[#F0821D]/30"
                >
                  Pay Now
                </button>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#a89f92] flex-wrap">
                  <span className="flex items-center gap-1"><Lock size={12} /> Secured Payment</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={12} /> Verified Merchant</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;