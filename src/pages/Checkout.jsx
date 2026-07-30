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
  const total = cartTotal + deliveryCharge;

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
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#f2e8d8] p-6 md:p-8">
        <h1 className="font-display text-2xl mb-6 text-[#2B2420]">Checkout</h1>

        {/* ---------- Delivery Method ---------- */}
        <div className="mb-6">
          <p className="font-semibold text-sm mb-2">How do you want your order?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeliveryMethod("delivery")}
              className={`flex-1 py-3 rounded-xl border text-sm font-semibold ${
                deliveryMethod === "delivery" ? "border-[#2F7A38] bg-[#E4F3E1] text-[#2F7A38]" : "border-[#ecdfc9]"
              }`}
            >
              🚚 Home Delivery
            </button>
            <button
              onClick={() => setDeliveryMethod("pickup")}
              className={`flex-1 py-3 rounded-xl border text-sm font-semibold ${
                deliveryMethod === "pickup" ? "border-[#2F7A38] bg-[#E4F3E1] text-[#2F7A38]" : "border-[#ecdfc9]"
              }`}
            >
              🏬 Store Pickup
            </button>
          </div>
        </div>

        {/* ---------- Address (only if delivery) ---------- */}
        {deliveryMethod === "delivery" && (
          <div className="mb-6">
            <p className="font-semibold text-sm mb-2">Deliver to</p>
            {addresses.length === 0 ? (
              <p className="text-sm text-[#8a8178]">
                Ajun kahi address save keleli nahi. Profile page varun add kara.
              </p>
            ) : (
              <div className="space-y-2">
                {addresses.map((a) => (
                  <label
                    key={a.id}
                    className={`flex items-start gap-3 border rounded-xl p-3 cursor-pointer ${
                      selectedAddress?.id === a.id ? "border-[#2F7A38] bg-[#E4F3E1]/40" : "border-[#ecdfc9]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?.id === a.id}
                      onChange={() => setSelectedAddressId(a.id)}
                    />
                    <span className="text-sm">
                      <strong>{a.name}</strong> · {a.tag}
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
        <div className="mb-6">
          <p className="font-semibold text-sm mb-2">Payment Method</p>
          <div className="flex gap-3">
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`flex-1 py-3 rounded-xl border text-sm font-semibold ${
                paymentMethod === "cod" ? "border-[#2F7A38] bg-[#E4F3E1] text-[#2F7A38]" : "border-[#ecdfc9]"
              }`}
            >
              💵 Cash on Delivery
            </button>
            <button
              onClick={() => setPaymentMethod("online")}
              className={`flex-1 py-3 rounded-xl border text-sm font-semibold ${
                paymentMethod === "online" ? "border-[#2F7A38] bg-[#E4F3E1] text-[#2F7A38]" : "border-[#ecdfc9]"
              }`}
            >
              💳 Pay Online (Razorpay)
            </button>
          </div>
        </div>

        {/* ---------- Order Summary ---------- */}
        <div className="border-t border-[#f2e8d8] pt-4 mb-6 text-sm">
          <div className="flex justify-between mb-1"><span>Subtotal</span><span>₹{cartTotal}</span></div>
          <div className="flex justify-between mb-1">
            <span>Delivery Charge</span>
            <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
          </div>
          <div className="flex justify-between font-bold text-[#6B1E1E] text-base mt-2">
            <span>Total</span><span>₹{total}</span>
          </div>
        </div>

        {error && <div className="text-sm text-[#B23A3A] bg-[#FBE7E7] rounded-lg p-3 mb-4">{error}</div>}

        <button
          onClick={handlePlaceOrder}
          disabled={placing || cart.length === 0}
          className="w-full bg-[#2F7A38] hover:bg-[#255f2c] text-white font-semibold py-3 rounded-full disabled:opacity-60"
        >
          {placing ? "Placing order..." : `Place Order · ₹${total}`}
        </button>
      </div>
    </section>
  );
};

export default Checkout;
