import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Deshmukh",
    location: "Pune",
    initials: "PD",
    rating: 5,
    text: "Premium quality organic oil. Healthy, pure and natural taste — you can actually smell the difference from store-bought oils.",
    accent: ["#7A2418", "#5C160D"],
  },
  {
    name: "Rahul Kulkarni",
    location: "Nashik",
    initials: "RK",
    rating: 5,
    text: "The cold-pressed process really shows in the flavor. My family switched completely and we've never looked back.",
    accent: ["#4D9F38", "#3e842d"],
  },
  {
    name: "Anjali Patil",
    location: "Mumbai",
    initials: "AP",
    rating: 5,
    text: "100% chemical free and it truly feels that way. Great packaging, fast delivery, and amazing customer support too.",
    accent: ["#F5B800", "#d99f00"],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const Testimonials = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-[#FFFBF5]">
      {/* Ambient glows */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#4D9F38]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-width relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

           <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.2em] uppercase">
            Testimonials
          </span>
         

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#7A2418]">
            Loved By Our <span className="text-[#4D9F38]">Customers</span>
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Real stories from real families who made the switch to pure,
            cold-pressed goodness.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 md:mt-16"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative bg-white p-7 sm:p-8 rounded-3xl border border-[#7A2418]/10 shadow-[0_8px_24px_-12px_rgba(122,36,24,0.15)] hover:shadow-[0_24px_48px_-16px_rgba(122,36,24,0.25)] hover:border-[#7A2418]/30 transition-all duration-300 overflow-hidden"
            >
              {/* Decorative glow */}
              <span
                className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: item.accent[0] }}
              />

              {/* Quote icon */}
              <Quote
                size={36}
                className="text-[#7A2418]/10 absolute top-6 right-6"
                fill="currentColor"
              />

              <div className="relative flex gap-1 text-[#F4B400]">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 400 }}
                  >
                    <Star size={18} fill="#F4B400" strokeWidth={0} />
                  </motion.div>
                ))}
              </div>

              <p className="relative mt-5 text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
                {item.text}
              </p>

              <div className="relative flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-full text-white font-semibold text-sm shrink-0"
                  style={{ background: `linear-gradient(135deg, ${item.accent[0]}, ${item.accent[1]})` }}
                >
                  {item.initials}
                </div>

                <div>
                  <h3 className="font-semibold text-[#312E2A] text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;