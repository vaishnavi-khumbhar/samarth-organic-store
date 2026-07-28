import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  MessageCircle,
  Leaf,
  Check,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  Link2,
  Check as CheckIcon,
  X,
  ZoomIn,
} from "lucide-react";

import {
  FaFacebookF,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import { SiTelegram } from "react-icons/si";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const weightOptions = ["250ml", "500ml", "1L"];

const toNumber = (val) => {
  if (typeof val === "number") return val;
  return parseFloat(String(val).replace(/[^\d.]/g, "")) || 0;
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.slug === id);
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState(weightOptions[1]);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // ---- Desktop hover-zoom state ----
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageWrapRef = useRef(null);

  // ---- Mobile tap-to-zoom modal ----
  const [mobileZoomOpen, setMobileZoomOpen] = useState(false);

  // ---- Viewport-based mobile detection (matches the md: 768px breakpoint
  // used everywhere else on this page). We deliberately do NOT use
  // matchMedia("(hover: none)") here — device-preview tools, touchscreen
  // laptops, and some tablets report hover as available even at phone-sized
  // viewports, which silently breaks tap-to-zoom. Width is a more reliable
  // signal here and stays consistent with the rest of the layout.
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!product) {
    return (
      <section className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#7A2418] mb-3">Product not found</h1>
        <p className="text-[#8a8178] mb-6">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/products"
          className="inline-block bg-[#4D9F38] hover:bg-[#3e842d] text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Back to Products
        </Link>
      </section>
    );
  }

  const wished = isInWishlist(product.id);
  const priceNum = toNumber(product.price);
  const mrpNum = product.mrp ? toNumber(product.mrp) : null;
  const discountPct = mrpNum && mrpNum > priceNum ? Math.round((1 - priceNum / mrpNum) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: qty, weight });
    navigate("/cart");
  };

 const handleBuyNow = () => {
  addToCart({
    ...product,
    quantity: qty,
    weight,
  });

  navigate("/cart");
};

  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to order ${qty} x ${product.name} (${weight}) - ${product.price}`
  );

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`Check out ${product.name} on Samarth Organic`);

  const shareLinks = [
    {
      label: "Copy Link",
      icon: Link2,
      color: "text-[#7A2418]",
      onClick: () => {
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
    },
    {
      label: "Facebook",
      icon: FaFacebookF,
      color: "text-[#1877F2]",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      color: "text-[#25D366]",
      href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}`,
    },
    {
      label: "Twitter",
      icon: FaXTwitter,
      color: "text-black",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: "Telegram",
      icon: SiTelegram,
      color: "text-[#26A5E4]",
      href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${shareText}`,
    },
  ];

  // Only track zoom position via real mouse movement (desktop) — touch devices skip this
  const handleMouseMove = (e) => {
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const imgSrc = product.image_url || product.image;

  return (
    <>
      <div
        className="h-[3px] w-full"
        style={{ background: "linear-gradient(90deg, #7A2418 0%, #F5B800 50%, #3C8C2E 100%)" }}
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-5 py-5 md:py-12 pb-28 md:pb-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#8a8178] mb-5 md:mb-8">
          <Link to="/" className="hover:text-[#7A2418] transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link to="/products" className="hover:text-[#7A2418] transition-colors">Products</Link>
          <ChevronRight size={13} />
          <span className="text-[#312E2A] font-medium">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-start">

          {/* Product Image */}
          <div className="md:sticky md:top-24">
            <div className="relative flex gap-4">

              {/* Main image box — hover-zoom on desktop, tap-to-zoom on mobile */}
              <div
                ref={imageWrapRef}
                onMouseEnter={() => setZoomActive(true)}
                onMouseLeave={() => setZoomActive(false)}
                onMouseMove={handleMouseMove}
                onClick={() => {
                  // Width-based check (matches md: 768px breakpoint used across
                  // this page), not hover-capability — see isMobile state above.
                  if (isMobile) {
                    setMobileZoomOpen(true);
                  }
                }}
                className="relative flex-1 bg-[#FBF6EC] rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8 sm:p-10 shadow-[0_8px_30px_-12px_rgba(122,36,24,0.15)] cursor-zoom-in"
              >
                <div className="absolute inset-0 m-auto w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#F5EDDB] to-[#F0E4CE]" />

                <span className="absolute top-5 left-5 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#4D9F38] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  <Leaf size={12} />
                  Organic
                </span>

                {/* Tap-to-zoom hint, mobile only */}
                <span className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white/95 text-[#7A2418] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  <ZoomIn size={12} /> View Product
                </span>

                <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label="Toggle wishlist"
                    className={`w-9 h-9 flex items-center justify-center rounded-full shadow-sm transition-colors ${
                      wished
                        ? "bg-[#7A2418] text-white"
                        : "bg-white/95 text-[#7A2418] hover:bg-[#7A2418] hover:text-white"
                    }`}
                  >
                    <Heart size={16} fill={wished ? "currentColor" : "none"} />
                  </button>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareOpen((v) => !v);
                      }}
                      aria-label="Share product"
                      className="w-9 h-9 flex items-center justify-center rounded-full shadow-sm bg-white/95 text-[#7A2418] hover:bg-[#7A2418] hover:text-white transition-colors"
                    >
                      <Share2 size={15} />
                    </button>

                    {shareOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShareOpen(false);
                          }}
                        />
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#F0E4CE] py-2 z-40 overflow-hidden">
                          {shareLinks.map(({ label, icon: Icon, color, href, onClick }) =>
                            href ? (
                              <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setShareOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#312E2A] hover:bg-[#FBF6EC] transition-colors"
                              >
                                <Icon size={16} className={color} />
                                {label}
                              </a>
                            ) : (
                              <button
                                key={label}
                                onClick={() => onClick()}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#312E2A] hover:bg-[#FBF6EC] transition-colors text-left"
                              >
                                {copied ? (
                                  <>
                                    <CheckIcon size={16} className="text-[#4D9F38]" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Icon size={16} className={color} />
                                    {label}
                                  </>
                                )}
                              </button>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <img
                  src={imgSrc}
                  alt={product.name}
                  className="relative z-[1] max-h-[85%] max-w-[80%] object-contain drop-shadow-xl"
                />
              </div>

              {/* Desktop hover-zoom pane — needs real mouse hover, so md+ (not lg+, so it works on more screens) */}
              {zoomActive && (
                <div
                  className="hidden md:block flex-1 rounded-3xl overflow-hidden border border-[#F0E4CE] shadow-[0_8px_30px_-12px_rgba(122,36,24,0.15)] bg-[#FBF6EC]"
                  style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: "220%",
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
              <div className="group flex flex-col items-center justify-center text-center rounded-2xl bg-gradient-to-b from-[#FFF8EE] to-[#FBF6EC] border border-[#F2E3C6] p-3 sm:p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#7A2418]/10 flex items-center justify-center mb-2 group-hover:bg-[#7A2418] transition">
                  <Truck size={20} className="text-[#7A2418] group-hover:text-white transition" />
                </div>
                <h4 className="text-[11px] sm:text-sm font-bold text-[#7A2418]">Free Delivery</h4>
                <p className="text-[9px] sm:text-xs text-[#6B6B6B] mt-1 leading-tight">On All Orders</p>
              </div>

              <div className="group flex flex-col items-center justify-center text-center rounded-2xl bg-gradient-to-b from-[#FFF8EE] to-[#FBF6EC] border border-[#F2E3C6] p-3 sm:p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#4D9F38]/10 flex items-center justify-center mb-2 group-hover:bg-[#4D9F38] transition">
                  <ShieldCheck size={20} className="text-[#4D9F38] group-hover:text-white transition" />
                </div>
                <h4 className="text-[11px] sm:text-sm font-bold text-[#4D9F38]">100% Authentic</h4>
                <p className="text-[9px] sm:text-xs text-[#6B6B6B] mt-1 leading-tight">Organic Products</p>
              </div>

              <div className="group flex flex-col items-center justify-center text-center rounded-2xl bg-gradient-to-b from-[#FFF8EE] to-[#FBF6EC] border border-[#F2E3C6] p-3 sm:p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F5B800]/15 flex items-center justify-center mb-2 group-hover:bg-[#F5B800] transition">
                  <RotateCcw size={20} className="text-[#F5B800] group-hover:text-white transition" />
                </div>
                <h4 className="text-[11px] sm:text-sm font-bold text-[#7A2418]">Easy Returns</h4>
                <p className="text-[9px] sm:text-xs text-[#6B6B6B] mt-1 leading-tight">7 Days Return</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-3 py-1 rounded-full font-semibold text-[10px] tracking-[0.15em] uppercase mb-3">
              Wood Pressed · Cold Extracted
            </span>

            <h1 className="text-3xl sm:text-3xl font-bold text-[#7A2418] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5 text-[#F4B400]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs text-[#8a8178]">(120+ reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <p className="text-[#4D9F38] text-3xl font-bold">
                ₹{priceNum}
                <span className="text-sm font-medium text-[#8a8178] ml-1.5">/ {weight}</span>
              </p>

              {mrpNum && mrpNum > priceNum && (
                <>
                  <span className="text-lg text-[#b0a696] line-through">₹{mrpNum}</span>
                  <span className="bg-[#2F7A38] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {discountPct}% OFF
                  </span>
                </>
              )}

              <button
                onClick={() => setShareOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#312E2A] hover:text-[#7A2418] transition-colors ml-auto"
              >
                <Share2 size={15} /> Share
              </button>
            </div>

            <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed">
              Wood pressed and cold extracted {product.name.toLowerCase()},
              made using traditional methods to retain natural nutrients,
              aroma and flavour — no chemicals, no preservatives.
            </p>

            <div className="h-px bg-[#F0E4CE] my-6" />

            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs font-semibold text-[#312E2A] mb-2 uppercase tracking-wide">Weight</p>
                <div className="flex gap-2">
                  {weightOptions.map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                        weight === w
                          ? "bg-[#7A2418] text-white border-[#7A2418] shadow-sm"
                          : "bg-white text-[#312E2A] border-[#E5DCC8] hover:border-[#7A2418]"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#312E2A] mb-2 uppercase tracking-wide">Quantity</p>
                <div className="inline-flex items-center gap-3 bg-[#FBF6EC] rounded-full px-2 py-1.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#7A2418] hover:bg-[#7A2418] hover:text-white transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-semibold w-4 text-center text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#7A2418] hover:bg-[#7A2418] hover:text-white transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop-only inline buttons */}
            <div className="hidden md:flex items-center gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#4D9F38] hover:bg-[#3e842d] active:scale-[0.98] text-white font-semibold py-3.5 rounded-full shadow-sm hover:shadow-md transition-all"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 text-white font-semibold py-3.5 rounded-full shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                style={{ background: "linear-gradient(135deg, #7A2418, #5C160D)" }}
              >
                Buy Now
              </button>
            </div>

            <a
              href={`https://wa.me/917620006003?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center gap-3 mt-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold rounded-full py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <FaWhatsapp className="text-xl" />
              <span>Order via WhatsApp</span>
            </a>

            <div className="flex md:hidden flex-wrap gap-x-4 gap-y-2 mt-6 text-xs text-[#6B6B6B]">
              <span className="flex items-center gap-1.5"><Check size={13} className="text-[#4D9F38]" /> 100% Wood Pressed</span>
              <span className="flex items-center gap-1.5"><Check size={13} className="text-[#4D9F38]" /> No Preservatives</span>
              <span className="flex items-center gap-1.5"><Check size={13} className="text-[#4D9F38]" /> Free Delivery</span>
            </div>

            <div className="mt-8 bg-[#FAF6EE] rounded-2xl p-5">
              <h3 className="font-semibold text-[#312E2A] mb-3 text-sm sm:text-base flex items-center gap-2">
                <Leaf size={16} className="text-[#4D9F38]" />
                Benefits
              </h3>
              <ul className="text-sm text-[#6B6B6B] space-y-1.5 list-disc list-inside">
                <li>100% natural, wood pressed extraction</li>
                <li>No chemicals, no preservatives</li>
                <li>Rich in natural nutrients and antioxidants</li>
                <li>Retains original aroma and flavour</li>
              </ul>
            </div>

            <div className="mt-4 bg-[#FAF6EE] rounded-2xl p-5">
              <h3 className="font-semibold text-[#312E2A] mb-3 text-sm sm:text-base">Nutrition (per 100ml)</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm text-[#6B6B6B] max-w-xs">
                <span>Energy</span><span className="font-medium text-[#312E2A]">884 kcal</span>
                <span>Total Fat</span><span className="font-medium text-[#312E2A]">100 g</span>
                <span>Saturated Fat</span><span className="font-medium text-[#312E2A]">Varies</span>
                <span>Cholesterol</span><span className="font-medium text-[#312E2A]">0 mg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky action bar — portaled to <body> so no ancestor (backdrop-blur,
          overflow-hidden, transform, etc.) can trap this fixed element and hide/squash it */}
      {createPortal(
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-[#F0E4CE] px-4 py-3 flex items-center gap-2.5 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
          <button
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
            className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full border transition-colors ${
              wished
                ? "bg-[#7A2418] text-white border-[#7A2418]"
                : "bg-white text-[#7A2418] border-[#E5DCC8]"
            }`}
          >
            <Heart size={18} fill={wished ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-[#4D9F38] active:scale-[0.98] text-white font-semibold py-3 rounded-full transition-all text-sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 text-white font-semibold py-3 rounded-full active:scale-[0.98] transition-all text-sm"
            style={{ background: "linear-gradient(135deg, #7A2418, #5C160D)" }}
          >
            Buy Now
          </button>
        </div>,
        document.body
      )}

      {/* Mobile fullscreen tap-to-zoom modal */}
      {mobileZoomOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center"
            onClick={() => setMobileZoomOpen(false)}
          >
            <button
              onClick={() => setMobileZoomOpen(false)}
              aria-label="Close zoom"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center"
            >
              <X size={20} />
            </button>
            <img
              src={imgSrc}
              alt={product.name}
              className="max-w-[95%] max-h-[85%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}

      <RelatedProducts />
    </>
  );
};

export default ProductDetails;