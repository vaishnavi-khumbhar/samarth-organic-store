import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ShoppingCart, Heart, User, ChevronDown, Droplet, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../hooks/useProducts";
import SearchBar from "../SearchBar/SearchBar";

// Nicer display names for known categories — anything not listed here just
// falls back to whatever the category is called in the database, so a
// brand-new category still shows up immediately without needing a code change.
const CATEGORY_TITLES = {
  Oils: "Wood Pressed Oils",
  "Hair Oils": "Hair Oils",
  Jaggery: "Natural Jaggery",
  Soap: "Handmade Soaps",
  Honey: "Natural Honey",
  Ghee: "Pure Ghee",
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // FIX: the Products dropdown used to be a hardcoded list of category ->
  // product names baked into this file. Any product added in the admin
  // panel never showed up here, and any product NOT in this hardcoded
  // list would 404 (its link guessed a slug from the name instead of
  // using the product's real slug). Now it's built from the live catalog,
  // grouped by each product's real category, using each product's real
  // slug — new products/categories appear here automatically.
  const { products } = useProducts();

  const megaMenuSections = products.reduce((sections, p) => {
    if (!p.category) return sections;
    let section = sections.find((s) => s.key === p.category);
    if (!section) {
      section = {
        key: p.category,
        title: CATEGORY_TITLES[p.category] || p.category,
        items: [],
      };
      sections.push(section);
    }
    section.items.push({ name: p.name, slug: p.slug });
    return sections;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Products", path: "/products", megaMenu: megaMenuSections },
    { label: "Contact Us", path: "/contact" },
  ];

  const iconBtn =
    "relative w-10 h-10 flex items-center justify-center rounded-full text-[#7A2418] bg-[#FBF6EC] hover:bg-[#7A2418] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#7A2418]/20";

  const mobileIconBtn =
    "relative w-9 h-9 flex items-center justify-center rounded-full text-[#7A2418] bg-[#FBF6EC] active:scale-95 transition-all duration-200";

  const mobileBadge =
    "absolute -top-1 -right-1 bg-[#F0821D] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white";

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_6px_24px_-8px_rgba(122,36,24,0.25)]" : "border-b border-[#F0E4CE]"
      }`}
    >
      <div
        className="h-[3px] w-full"
        style={{ background: "linear-gradient(90deg, #7A2418 0%, #F5B800 50%, #3C8C2E 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-18 lg:h-[72px] gap-2 md:gap-4">
          {/* Logo + wordmark */}
          <NavLink to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
            <img
              src={logo}
              alt="Samarth Organic Oil"
              className="h-9 md:h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="leading-tight">
              <span
                className="block font-serif text-base md:text-2xl lg:text-2xl font-bold tracking-wide"
                style={{ color: "#7A2418" }}
              >
                SAMARTH
              </span>
              <span
                className="block text-[9px] md:text-xs lg:text-sm font-semibold tracking-[0.2em] md:tracking-[0.25em]"
                style={{ color: "#3C8C2E" }}
              >
                ORGANIC
              </span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) =>
              item.megaMenu ? (
                <div
                  key={item.label}
                  className="relative static-parent"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className="group flex items-center gap-1 px-4 py-2 font-medium text-[#2B2B28] hover:text-[#7A2418] transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${
                        productsOpen ? "rotate-180 text-[#7A2418]" : ""
                      }`}
                    />
                    <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#F5B800] rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </NavLink>

                  {/* Mega menu panel — multi-column, one per category */}
                  {productsOpen && item.megaMenu.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                      <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-[#F0E4CE] p-6 grid grid-cols-3 gap-x-8 gap-y-5 w-[720px] max-w-[90vw]">
                        {item.megaMenu.map((section) => (
                          <div key={section.key}>
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#7A2418] mb-2.5 pb-1.5 border-b border-[#F0E4CE]">
                              {section.title}
                            </h4>
                            <div className="flex flex-col gap-1.5">
                              {section.items.map((child) => (
                                <NavLink
                                  key={child.slug}
                                  to={`/product/${child.slug}`}
                                  onClick={() => setProductsOpen(false)}
                                  className="group/item flex items-center gap-2 text-sm text-[#2B2B28] hover:text-[#7A2418] transition-colors"
                                >
                                  <span className="w-5 h-5 shrink-0 flex items-center justify-center rounded-full bg-[#FBF6EC] text-[#3C8C2E] group-hover/item:bg-[#7A2418] group-hover/item:text-white transition-colors">
                                    <Droplet size={10} />
                                  </span>
                                  {child.name}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative px-4 py-2 font-medium transition-colors ${
                      isActive ? "text-[#7A2418]" : "text-[#2B2B28] hover:text-[#7A2418]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#F5B800] rounded-full origin-left transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          {/* Right side: search + icons — desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-52 xl:w-64">
              <SearchBar setOpen={() => {}} />
            </div>

            <div className="flex items-center gap-2 pl-1">
              <NavLink
                to="/profile"
                aria-label="Account"
                className={({ isActive }) => `${iconBtn} ${isActive ? "bg-[#7A2418] text-white" : ""}`}
              >
                <User size={18} />
              </NavLink>

              <NavLink
                to="/wishlist"
                aria-label="Wishlist"
                className={({ isActive }) => `${iconBtn} relative ${isActive ? "bg-[#7A2418] text-white" : ""}`}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#F0821D] text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                aria-label="Cart"
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#7A2418]/30"
                style={{ background: "linear-gradient(135deg, #7A2418, #5C160D)" }}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#F0821D] text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          {/* Right side icons — mobile */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={() => setMobileSearchOpen((s) => !s)}
              aria-label="Search"
              className={`${mobileIconBtn} ${mobileSearchOpen ? "bg-[#7A2418] text-white" : ""}`}
            >
              <Search size={16} />
            </button>

            <NavLink to="/wishlist" aria-label="Wishlist" className={mobileIconBtn}>
              <Heart size={16} />
              {wishlistCount > 0 && <span className={mobileBadge}>{wishlistCount}</span>}
            </NavLink>

            <NavLink
              to="/cart"
              aria-label="Cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-white active:scale-95 transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #7A2418, #5C160D)" }}
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && <span className={mobileBadge}>{cartCount}</span>}
            </NavLink>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={mobileIconBtn}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Expandable mobile search row */}
        <div
          className={`lg:hidden grid transition-all duration-300 ease-out ${
            mobileSearchOpen ? "grid-rows-[1fr] opacity-100 pb-3" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          {mobileSearchOpen && (
            <div className="lg:hidden absolute left-0 right-0 top-full z-[9999] px-3 pt-2">
              <div className="rounded-2xl bg-white shadow-2xl border border-[#E5DCC8] p-2">
                <SearchBar setOpen={() => setMobileSearchOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile backdrop + slide-in panel */}
      {createPortal(
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
              menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />

          <div
            className={`fixed top-0 right-0 h-full w-[86%] max-w-sm bg-white z-[100] shadow-2xl lg:hidden transition-transform duration-300 ease-out flex flex-col ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              className="h-[3px] w-full shrink-0"
              style={{ background: "linear-gradient(90deg, #7A2418 0%, #F5B800 50%, #3C8C2E 100%)" }}
            />

            <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Samarth Organic Oil" className="h-12 w-auto object-contain" />
                <div className="leading-tight">
                  <h2 className="text-xl font-bold tracking-wide text-[#7A2418]">SAMARTH</h2>
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-[#3C8C2E]">ORGANIC</p>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FBF6EC] text-[#7A2418] shadow-sm hover:bg-[#7A2418] hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pt-3 pb-5">
              <div className="flex flex-col gap-1">
                {navLinks.map((item) =>
                  item.megaMenu ? (
                    <div key={item.label} className="border-b border-[#F0E4CE]">
                      <div className="flex items-center justify-between">
                        <NavLink
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="flex-1 py-4 font-medium text-[#2B2B28] hover:text-[#7A2418]"
                        >
                          {item.label}
                        </NavLink>

                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          aria-label="Toggle product categories"
                          className="px-2 py-4"
                        >
                          <ChevronDown
                            size={18}
                            className={`text-[#F5B800] transition-transform duration-300 ${
                              mobileProductsOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Accordion — categories, each with their own item list */}
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          mobileProductsOpen ? "grid-rows-[1fr] opacity-100 pb-3" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-col gap-4 pl-2">
                            {item.megaMenu.map((section) => (
                              <div key={section.key}>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#7A2418] mb-2">
                                  {section.title}
                                </h4>
                                <div className="flex flex-col gap-0.5">
                                  {section.items.map((child) => (
                                    <NavLink
                                      key={child.slug}
                                      to={`/product/${child.slug}`}
                                      onClick={() => setMenuOpen(false)}
                                      className="flex items-center gap-3 py-2 text-sm text-[#555] hover:text-[#7A2418]"
                                    >
                                      <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-[#FBF6EC] text-[#3C8C2E]">
                                        <Droplet size={11} />
                                      </span>
                                      {child.name}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="py-4 font-medium text-[#2B2B28] border-b border-[#F0E4CE] hover:text-[#7A2418] transition-colors"
                    >
                      {item.label}
                    </NavLink>
                  )
                )}
              </div>
            </div>

            {/* Panel footer actions */}
            <div className="flex items-center justify-around px-5 py-4 border-t border-[#F0E4CE] shrink-0">
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-1.5 text-xs font-medium text-[#2B2B28]"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-full bg-[#FBF6EC] text-[#7A2418]">
                  <User size={18} />
                </span>
                Account
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-1.5 text-xs font-medium text-[#2B2B28]"
              >
                <span className="relative w-11 h-11 flex items-center justify-center rounded-full bg-[#FBF6EC] text-[#7A2418]">
                  <Heart size={18} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#F0821D] text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                      {wishlistCount}
                    </span>
                  )}
                </span>
                Wishlist
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-1.5 text-xs font-medium text-[#2B2B28] relative"
              >
                <span
                  className="relative w-11 h-11 flex items-center justify-center rounded-full text-white"
                  style={{ background: "linear-gradient(135deg, #7A2418, #5C160D)" }}
                >
                  <ShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#F0821D] text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </span>
                Cart
              </NavLink>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
};

export default Navbar;