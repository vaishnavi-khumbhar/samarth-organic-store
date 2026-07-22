import { motion } from "framer-motion";
import {
  HeartPulse,
  Leaf,
  Soup,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    title: "Healthy Heart",
    desc: "Naturally extracted without excess heat, our oils help support a healthy heart with every meal.",
    icon: <HeartPulse size={30} />,
  },
  {
    title: "Chemical Free",
    desc: "Free from chemicals, artificial preservatives and synthetic colors — just pure, natural oil.",
    icon: <ShieldCheck size={30} />,
  },
  {
    title: "Better Digestion",
    desc: "Cold pressed at low temperatures, our oils are gentle on the stomach and aid better digestion.",
    icon: <Soup size={30} />,
  },
  {
    title: "Rich Nutrition",
    desc: "Retains natural vitamins, antioxidants and healthy fatty acids lost in refined oils.",
    icon: <Sparkles size={30} />,
  },
  {
    title: "100% Natural",
    desc: "Made using the traditional Lakdi Ghana wood pressed process, with nothing artificial added.",
    icon: <Leaf size={30} />,
  },
  {
    title: "Premium Quality",
    desc: "Every batch is carefully processed to maintain the highest standards families trust.",
    icon: <BadgeCheck size={30} />,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Benefits = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient brand glows */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#4D9F38]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-width relative">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.2em] uppercase">
            Benefits
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#7A2418]">
            Benefits of <span className="text-[#4D9F38]">Wood Pressed Oil</span>
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-[#6B6B6B]">
            Choosing Cold Pressed Organic Oil means choosing better nutrition
            and healthier everyday cooking — naturally extracted, never refined.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-12 md:mt-16"
        >
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#7A2418]/10 shadow-[0_8px_24px_-12px_rgba(122,36,24,0.15)] hover:border-[#7A2418] hover:shadow-[0_20px_40px_-16px_rgba(122,36,24,0.3)] transition-all duration-300"
            >
              {/* icon badge */}
              <motion.div
                whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white"
                style={{ background: "linear-gradient(135deg, #4D9F38, #3e842d)" }}
              >
                {item.icon}
                <span className="absolute inset-0 rounded-2xl bg-[#F5B800] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.div>

            <h3 className="text-[20px] sm:text-[28px] font-bold leading-tight tracking-[0.02em] text-[#7A2418] mt-5 transition-all duration-300 group-hover:text-[#4D9F38]">
  {item.title}
</h3>

              <p className="mt-2.5 text-sm text-[#6B6B6B] leading-relaxed">
                {item.desc}
              </p>

              {/* underline accent */}
              <span className="block mt-4 h-[2px] w-10 bg-[#F5B800] rounded-full group-hover:w-16 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Benefits;