import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Droplet, ShieldCheck, Leaf } from "lucide-react";

/**
 * NOTE: "Happy Families" (5000+) is a placeholder — swap in the real
 * customer count whenever you have it. Everything else here is pulled
 * directly from the site content: 8 oil varieties currently listed
 * (Groundnut, Sesame, Coconut, Sunflower, Mustard, Flaxseed, Almond,
 * Walnut), 100% chemical-free claim, and the traditional cold-pressed
 * Lakdi Ghana process.
 */
const stats = [
  {
    icon: <Users size={26} />,
    end: 5000,
    suffix: "+",
    label: "Happy Families",
    accent: ["#4D9F38", "#3e842d"],
  },
  {
    icon: <Droplet size={26} />,
    end: 8,
    suffix: "+",
    label: "Oil Varieties",
    accent: ["#4D9F38", "#3e842d"],
  },
  {
    icon: <ShieldCheck size={26} />,
    end: 100,
    suffix: "%",
    label: "Chemical Free",
    accent: ["#4D9F38", "#3e842d"],
  },
  {
    icon: <Leaf size={26} />,
    end: 100,
    suffix: "%",
    label: "Cold Pressed",
    accent: ["#4D9F38", "#3e842d"],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

// --- Custom count-up hook (no external package needed) ---
function useCountUp(end, duration = 2200, shouldStart = false) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;

    let startTime = null;
    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOut curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
      else setValue(end);
    };
    requestAnimationFrame(animate);
  }, [shouldStart, end, duration]);

  return value;
}

function StatNumber({ end, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const value = useCountUp(end, 2200, isInView);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const CounterSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-[#FFFBF5]">
      {/* Ambient brand glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#4D9F38]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F5B800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-width relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.2em] uppercase">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#7A2418]">
            Trusted for <span className="text-[#4D9F38]">Purity &amp; Quality</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10 md:mt-14"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center border-2 border-[#7A2418]/10 shadow-[0_8px_24px_-12px_rgba(122,36,24,0.15)] hover:border-[#7A2418] hover:shadow-[0_20px_40px_-16px_rgba(122,36,24,0.3)] transition-all duration-300 overflow-hidden"
            >
              <span
                className="pointer-events-none absolute -bottom-4 -right-2 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{ background: item.accent[0] }}
              />

              <div
                className="relative mx-auto flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl text-white"
                style={{ background: `linear-gradient(135deg, ${item.accent[0]}, ${item.accent[1]})` }}
              >
                {item.icon}
              </div>

              <h3 className="relative mt-4 sm:mt-5 text-2xl sm:text-4xl font-bold text-[#312E2A]">
                <StatNumber end={item.end} suffix={item.suffix} />
              </h3>

           <p className="relative mt-2 sm:mt-2.5 text-sm sm:text-base font-bold text-[#7A2418] tracking-wide">
  {item.label}
</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CounterSection;