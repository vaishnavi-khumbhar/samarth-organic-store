import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import logo from "../../assets/logo.png";

import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const BRAND = "#7A2418";
const BRAND_GOLD = "#F5B800";
const BRAND_GREEN = "#4D9F38";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const products = [
  { label: "Products", to: "/products" },
  { label: "Sesame Oil",to: "/products" },
  { label: "Coconut Oil", to: "/products"},
  { label: "Mustard Oil", to: "/products" },
  { label: "Sunflower Oil",to: "/products" },
];

const socials = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaWhatsapp, href: "#", label: "WhatsApp" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <footer className="relative bg-white text-[#312E2A] overflow-hidden border-t border-[#7A2418]/10">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4D9F38]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
className="relative max-w-7xl mx-auto px-5 pt-10 pb-8 sm:pt-12 sm:pb-6"      >
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-10 text-center lg:text-left">

          {/* About + Logo */}
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start">

          <div className="flex flex-col items-center lg:items-start">

  <div className="w-28 h-20 rounded-2xl overflow-hidden shadow-md border border-[#7A2418]/10 flex items-center justify-center">
    <img
      src={logo}
      alt="Samarth Organic Oil"
      className="w-full h-full object-contain p-1 transition-transform duration-300 hover:scale-105"
    />
  </div>

  <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-wide text-[#7A2418]">
    Samarth <span className="text-[#7A2418]">Organic</span>
  </h2>

</div>

            <p className="mt-5 text-gray-500 leading-7 sm:leading-8 text-sm sm:text-base max-w-xs lg:max-w-none">
              Experience pure, wood-pressed edible oils crafted from
              premium seeds for a healthier lifestyle.
            </p>

            <div className="flex gap-3 mt-6 justify-center lg:justify-start">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white shadow-sm transition-colors duration-300"
                  style={{ background: BRAND }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start">
           <h3 className="text-xl sm:text-2xl font-black tracking-wide relative inline-block pb-2 text-[#7A2418]">
  Information
  <span
    className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-10 h-1 rounded-full"
    style={{ background: BRAND }}
  />
</h3>

            <ul className="space-y-3.5 mt-6">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    onClick={scrollToTop}
                    className="group flex items-center justify-center lg:justify-start gap-2 text-gray-500 hover:text-[#7A2418] transition-colors duration-200 text-sm sm:text-base"
                  >
                    <span
                      className="hidden lg:block w-0 group-hover:w-3 h-px transition-all duration-300"
                      style={{ background: BRAND_GOLD }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide relative inline-block pb-2 text-[#7A2418]">
  Products
  <span
    className="absolute bottom-0 w-10 h-1 rounded-full left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0"
    style={{ background: BRAND }}
  />
</h3>

            <ul className="space-y-3.5 mt-6">
              {products.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    onClick={scrollToTop}
                    className="group flex items-center justify-center lg:justify-start gap-2 text-gray-500 hover:text-[#7A2418] transition-colors duration-200 text-sm sm:text-base"
                  >
                    <span
                      className="hidden lg:block w-0 group-hover:w-3 h-px transition-all duration-300"
                      style={{ background: BRAND }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start">
           <h3 className="text-xl sm:text-2xl font-black tracking-wide relative inline-block pb-3 text-[#7A2418]">
  Contact Us
  <span
    className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-10 h-1 rounded-full"
    style={{ background: BRAND }}
  />
</h3>
          

            <div className="space-y-4 mt-6 w-full flex flex-col items-center lg:items-start">
              {[
                { icon: Phone, text: "+91 7620006003", href: "tel:+917620006003" },
                { icon: Mail, text: "samarthorganicoil@gmail.com", href: "mailto:samarthorganicoil@gmail.com" },
                { icon: MapPin, text: "Near School No. 1, Asha Naka Road, Urun-Islampur, Tal. Walwa, Dist. Sangli – 415409, Maharashtra", href: null },
              ].map(({ icon: Icon, text, href }, i) => {
                const content = (
                  <div className="flex items-start gap-3 group max-w-xs lg:max-w-none">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300 group-hover:bg-[#7A2418]"
                      style={{ backgroundColor: "rgba(122,36,24,0.08)" }}
                    >
                      <Icon
  size={16}
  className="transition-colors duration-300 text-[#7A2418] group-hover:text-[#7A2418]"
/>
                    </div>
                    <span className="text-gray-500 group-hover:text-[#312E2A] transition-colors duration-200 text-sm sm:text-base leading-6 pt-1.5 text-left">
                      {text}
                    </span>
                  </div>
                );
                return (
                  <div key={i}>
                    {href ? <a href={href}>{content}</a> : content}
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom bar */}
      <div
  className="relative border-t mt-2 pb-20 sm:pb-6"
  style={{ borderColor: "rgba(122,36,24,0.4)" }}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

          <p className="text-center text-[11px] sm:text-sm text-gray-500 leading-6">
            © 2026 Samarth Organic Oil. All Rights Reserved.
          </p>

          <p className="mt-2 text-center text-[13px] sm:text-sm text-gray-500 leading-6 flex items-center justify-center gap-1 flex-wrap">
  Designed &amp; Developed By{" "}

  <a
    href="https://www.advertisingandbrandingmarketing.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold inline-flex items-center gap-0.5 hover:underline transition-colors"
    style={{ color: BRAND }}
  >
    Advertising Branding &amp; Marketing
   
  </a>
</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;