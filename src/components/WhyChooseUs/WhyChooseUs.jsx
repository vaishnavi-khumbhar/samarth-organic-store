import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import whyImg from "../../assets/why.png";

const data = [
  "Traditional Lakdi Ghana Process",
  "100% Chemical Free",
  "Cold Pressed Extraction",
  "Rich Natural Nutrients",
  "Premium Quality Oils",
  "Trusted by Families",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const WhyChooseUs = () => {
  return (
    <section className="section-padding section-bg relative overflow-hidden">
      {/* Ambient brand glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#4D9F38]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-width relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.2em] uppercase">
            Why Choose Us
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight text-[#7A2418]">
            Why Choose <span className="text-[#4D9F38]">Samarth Organic Oil ?</span>
          </h2>

          <p className="mt-5 sm:mt-6 text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-lg mx-auto lg:mx-0">
            At Samarth Organic Oil, we follow traditional Lakdi Ghana
            extraction methods to preserve the purity, taste and nutrients
            of every drop.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            {data.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 bg-white rounded-2xl border-2 border-[#7A2418]/10 px-4 py-3 text-left hover:border-[#7A2418] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_6px_16px_-10px_rgba(122,36,24,0.2)]"
              >
                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#4D9F38]/10 text-[#4D9F38]">
                  <CheckCircle size={18} />
                </span>
                <p className="text-sm sm:text-[15px] font-medium text-[#7A2418]">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 lg:order-2 relative"
        >
          <div className="absolute -inset-3 sm:-inset-4 rounded-[2rem] border-2 border-[#F5B800]/40 -z-10" />
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
  src={whyImg}
  alt="Why Choose Samarth Organic Oil"
  className="w-full h-64 sm:h-80 lg:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
/>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(90,22,13,0.35) 100%)",
              }}
            />
          </div>

          {/* Floating trust badge */}
          <div className="absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl shadow-xl px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 border-2 border-[#F5B800]/30">
            <span
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #7A2418, #5C160D)" }}
            >
              <CheckCircle size={20} />
            </span>
            <div>
              <p className="text-base sm:text-lg font-bold text-[#312E2A] leading-none">100%</p>
              <p className="text-[10px] sm:text-xs text-[#6B6B6B] mt-1">Pure &amp; Natural</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;