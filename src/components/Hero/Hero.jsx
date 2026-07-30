import { motion } from "framer-motion";
import heroOil from "../../assets/images/hero/oil-bottle.png";
import center from "../../assets/images/hero/center.png";
import { Link } from "react-router-dom";

import { Leaf, ShieldCheck, Droplets } from "lucide-react";


const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFFBF5]">
      {/* Decorative color glows */}
      <div className="absolute top-10 right-0 w-72 h-72 md:w-96 md:h-96 bg-[#F4B400]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 md:w-72 md:h-72 bg-[#4D9F38]/10 rounded-full blur-3xl"></div>

      {/* Background Oil Image — desktop/tablet only, position/size untouched */}
      <motion.img
        src={heroOil}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="
          pointer-events-none
          select-none
          hidden md:block
          absolute
          inset-0
          m-auto
          w-full
          h-full
          object-contain
          z-0
        "
      />

      {/* Readability scrim over the image — sits on top, doesn't move the image itself */}
      <div
        className="hidden md:block pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, #FFFBF5 0%, rgba(255,251,245,0.92) 22%, rgba(255,251,245,0.55) 42%, rgba(255,251,245,0) 60%)",
        }}
      />

      {/* ===== Mobile-only: image on top with brand name, content below ===== */}
     <div className="md:hidden relative overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-[#FFF8ED] to-[#F8F5EF]">

  {/* Hero Image */}
  <div className="relative h-[330px] overflow-hidden">
    <img
      src={center}
      alt="Samarth Organic Oil"
      className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03]"
    />


    {/* Top Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30" />



    {/* Bottom Blur */}
    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FFF8ED] via-[#FFF8ED]/70 to-transparent" />

    {/* Floating Badge */}
     <motion.div
  className="absolute -top-1 left-1/2 -translate-x-1/2 z-30"
  animate={{
    y: [0, -5, 0],
    scale: [1, 1.04, 1],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <span className="inline-flex items-center bg-white/90 backdrop-blur-xl border border-[#4D9F38]/30 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.15em] text-[#4D9F38] shadow-xl">
    100% PURE & NATURAL
  </span>
</motion.div>
</div>

  {/* Content */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative -mt-14 px-5 pb-10"
  >
<motion.div
  animate={{
    boxShadow: [
      "0 0 0 rgba(77,159,56,0.10)",
      "0 0 30px rgba(77,159,56,0.22)",
      "0 0 0 rgba(77,159,56,0.10)",
    ],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[30px] border-2 border-[#4D9F38]/20 shadow-2xl px-5 py-5"
>

  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#4D9F38]/5 via-transparent to-[#F4B400]/10 pointer-events-none" />

  {/* Top Shine */}
  <div className="absolute -top-20 left-0 w-full h-24 bg-white/40 blur-3xl rotate-6" />

  <div className="relative z-10">

     <h1 className="font-serif text-[32px] leading-[1.1] font-bold text-center">
  <span className="text-[#7A2418] block">
    Premium Organic
  </span>

  <span className="text-[#4D9F38] block">
    Natural Products
  </span>

  <span className="text-[#7A2418] block">
    For Healthy Living
  </span>
</h1>

<p className="mt-4 text-center text-[14px] leading-7 text-[#666]">
  Explore our collection of Wood Pressed Oils, Natural Honey,
  Handmade Soaps, Pure Gir Cow Ghee and Traditional Jaggery
  products made with care for a healthier lifestyle.
</p>

      {/* Buttons */}

      <div className="mt-6 space-y-3">

<div className="flex flex-col sm:flex-row gap-4">
  <Link to="/products" className="w-full">
    <button
      className="w-full rounded-full bg-gradient-to-r from-[#4D9F38] to-[#68B04F] py-3.5 text-white font-semibold transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-[#4D9F38]/30"
    >
      Shop Now
    </button>
  </Link>

  <Link to="/about" className="w-full">
    <button
      className="w-full rounded-full border-2 border-[#4D9F38] bg-white text-[#4D9F38] py-3.5 font-semibold transition-all duration-300 hover:bg-[#4D9F38] hover:text-white hover:scale-[1.03]"
    >
      Learn More
    </button>
  </Link>
</div>

</div>

      {/* Stats */}

<div className="grid grid-cols-3 gap-2 mt-6">

<motion.div
whileHover={{y:-4,scale:1.05}}
className="rounded-xl bg-[#F9F7F2] py-2.5 border border-[#4D9F38]/15 text-center shadow-sm"
>
<h3 className="text-[#4D9F38] font-bold text-base">100%</h3>
<p className="text-[10px] text-gray-600">Pure</p>
</motion.div>

<motion.div
whileHover={{y:-4,scale:1.05}}
className="rounded-xl bg-[#F9F7F2] py-2.5 border border-[#4D9F38]/15 text-center shadow-sm"
>
<h3 className="text-[#4D9F38] font-bold text-base">Natural</h3>
<p className="text-[10px] text-gray-600">Chemical Free</p>
</motion.div>

<motion.div
whileHover={{y:-4,scale:1.05}}
className="rounded-xl bg-[#F9F7F2] py-2.5 border border-[#4D9F38]/15 text-center shadow-sm"
>
<h3 className="text-[#4D9F38] font-bold text-base">Fresh</h3>
<p className="text-[10px] text-gray-600">Cold Pressed</p>
</motion.div>

</div>

    </div>
</motion.div>
</motion.div>

</div>

      {/* ===== Desktop/tablet content — overlaid on the untouched background image ===== */}
      <div className="hidden md:flex relative z-[2] max-w-7xl mx-auto px-6 min-h-[85vh] lg:min-h-[90vh] items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl"
        >
         

        <h1 className="font-serif text-[30px] sm:text-[36px] lg:text-6xl font-bold leading-tight">
  <span className="text-[#7A2418] block">
    Premium Organic
  </span>

  <span className="text-[#4D9F38] block">
    Natural Products
  </span>

  <span className="text-[#7A2418] block">
    For Healthy Living
  </span>
</h1>

<p className="mt-5 max-w-xl text-gray-600 text-sm sm:text-base leading-7">
  Discover our premium collection of <span className="font-semibold text-[#7A2418]">Wood Pressed Oils</span>,
  <span className="font-semibold text-[#7A2418]"> Natural Honey</span>,
  <span className="font-semibold text-[#7A2418]"> Handmade Soaps</span>,
  <span className="font-semibold text-[#7A2418]"> Jaggery Products</span> and
  <span className="font-semibold text-[#7A2418]"> Pure Gir Cow Ghee</span>,
  crafted to bring purity, nutrition and wellness to your everyday life.
</p>

          <div className="mt-7 flex flex-wrap gap-4">
           <div className="flex flex-wrap gap-4">
  <Link to="/products">
    <button className="bg-[#4D9F38] hover:bg-[#3e842d] text-white px-8 py-3.5 lg:py-4 rounded-full font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-[#4D9F38]/25">
      Shop Now
    </button>
  </Link>

  <Link to="/about">
    <button className="border-2 border-[#F4B400] text-[#8C3D2F] px-8 py-3.5 lg:py-4 rounded-full font-semibold hover:bg-[#F4B400]/10 transition-colors">
      Learn More
    </button>
  </Link>
</div>
          </div>


<div className="mt-8 flex flex-wrap gap-3">

  <div className="flex items-center gap-2 bg-white/80 border border-[#E9E3D8] rounded-full px-4 py-2 shadow-sm hover:shadow-md transition">
    <Leaf className="w-4 h-4 text-[#4D9F38]" />
    <span className="text-sm font-medium text-[#312E2A]">
      100% Pure
    </span>
  </div>

  <div className="flex items-center gap-2 bg-white/80 border border-[#E9E3D8] rounded-full px-4 py-2 shadow-sm hover:shadow-md transition">
    <ShieldCheck className="w-4 h-4 text-[#F4B400]" />
    <span className="text-sm font-medium text-[#312E2A]">
      Chemical Free
    </span>
  </div>

  <div className="flex items-center gap-2 bg-white/80 border border-[#E9E3D8] rounded-full px-4 py-2 shadow-sm hover:shadow-md transition">
    <Droplets className="w-4 h-4 text-[#4D9F38]" />
    <span className="text-sm font-medium text-[#312E2A]">
      Cold Pressed
    </span>
  </div>

</div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;