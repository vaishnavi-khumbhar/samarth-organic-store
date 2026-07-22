import { motion } from "framer-motion";
import {
  Wheat,
  Leaf,
  Factory,
  ShieldCheck,
  Package,
  Truck,
} from "lucide-react";

const processData = [
  {
    step: "01",
    title: "Premium Seeds",
    desc: "Carefully selected premium quality seeds to ensure pure taste, natural aroma and maximum nutrition.",
    tag: "Handpicked",
    accent: ["#4D9F38", "#4D9F38"],
    icon: <Wheat size={22} />,
  },

  {
    step: "02",
    title: "Natural Cleaning",
    desc: "Seeds are cleaned naturally without using chemicals to maintain purity and freshness.",
    tag: "Chemical-Free",
    accent: ["#4D9F38", "#4D9F38"],
    icon: <Leaf size={22} />,
  },

  {
    step: "03",
    title: "Lakdi Ghana Process",
    desc: "Traditional wooden extraction process keeps oil nutrients, flavour and natural benefits intact.",
    tag: "Traditional",
    accent: ["#4D9F38", "#4D9F38"],
    icon: <Factory size={22} />,
  },

  {
    step: "04",
    title: "Quality Testing",
    desc: "Every batch is carefully checked for purity, quality, taste and consistency before packing.",
    tag: "Lab Tested",
    accent: ["#4D9F38", "#4D9F38"],
    icon: <ShieldCheck size={22} />,
  },

  {
    step: "05",
    title: "Premium Packaging",
    desc: "Hygienically packed bottles preserve freshness, aroma and natural goodness of oil.",
    tag: "Fresh Packed",
    accent: ["#4D9F38", "#4D9F38"],
    icon: <Package size={22} />,
  },

  {
    step: "06",
    title: "Fast Delivery",
    desc: "Secure packaging and quick delivery ensure fresh organic oil reaches your kitchen.",
    tag: "Quick Delivery",
    accent: ["#4D9F38", "#4D9F38"],
    icon: <Truck size={22} />,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const ManufacturingProcess = () => {
  return (
    <section className="section-padding section-bg relative overflow-hidden">

      <div className="absolute top-0 right-0 w-72 h-72 bg-[#F5B800]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4D9F38]/10 rounded-full blur-3xl" />

      <div className="container-width relative">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center"
        >

          <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase">

            Manufacturing Process

          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#312E2A]">

            Traditional{" "}
            <span className="text-[#4D9F38]">
              Lakdi Ghana Process
            </span>

          </h2>

          <p className="max-w-xl mx-auto mt-3 text-[#6B6B6B]">

            Every bottle is prepared through a slow traditional process
            to preserve purity and natural nutrition.

          </p>

        </motion.div>

        {/* Cards */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
        >

          {processData.map((item, index) => (

            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="relative bg-white rounded-2xl border-2 border-[#7A2418]/10 p-4 text-center overflow-hidden shadow-lg hover:border-[#7A2418] hover:shadow-2xl transition-all duration-300"
            >

              {/* Background Number */}

              <span
                className="absolute -top-4 right-0 text-7xl font-black opacity-5"
                style={{
color: item.accent[1],                }}
              >
                {item.step}
              </span>

              {/* Icon */}

              <div className="flex justify-between items-center">

                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                 style={{
 background:"#4D9F38",
}}>
                  {item.icon}
                </motion.div>

                <span className="bg-[#7A2418] text-white text-[10px] font-bold px-2 py-1 rounded-full">

                  STEP {item.step}

                </span>

              </div>

              {/* Title */}

            <h3 className="mt-4 text-[26px] md:text-[28px] font-black tracking-wide text-[#7A2418]">
  {item.title}
</h3>

              {/* Description */}

              <p className="mt-2 text-[14px] leading-5 text-[#6B6B6B]">

                {item.desc}

              </p>

              {/* Tag */}

              <div className="mt-3">

                <span
                  className="text-[13px] font-semibold px-3 py-1 rounded-full"
                  style={{
                   color: item.accent?.[1] || "#4D9F38",
background: `${item.accent?.[0] || "#4D9F38"}20`,
                  }}
                >
                  {item.tag}
                </span>

              </div>

              {/* Bottom Line */}

              <div
                className="w-10 h-[3px] rounded-full mx-auto mt-4 transition-all duration-300 hover:w-16"
                style={{
                  background:item.accent?.[0] || "#4D9F38",
                }}
              />

            </motion.div>

          ))}

        </motion.div>

      </div>

    </section>
  );
};

export default ManufacturingProcess;