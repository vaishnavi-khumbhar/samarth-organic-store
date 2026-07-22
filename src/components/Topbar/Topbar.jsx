import * as MarqueeModule from "react-fast-marquee";
import {
  Leaf,
  Droplet,
  ShieldCheck,
  Truck,
  Award,
  Heart,
} from "lucide-react";

const Marquee =
  MarqueeModule.default?.default ??
  MarqueeModule.default ??
  MarqueeModule;

const OfferBanner = () => {
  const offers = [
    {
      icon: <Leaf size={14} strokeWidth={2.4} />,
      text: "100% Chemical Free Organic Oil",
    },
    {
      icon: <Droplet size={14} strokeWidth={2.4} />,
      text: "Traditional Lakdi Ghana Process",
    },
    {
      icon: <ShieldCheck size={14} strokeWidth={2.4} />,
      text: "Cold Pressed Organic Oil",
    },
    {
      icon: <Heart size={14} strokeWidth={2.4} />,
      text: "Healthy Everyday Cooking",
    },
    {
      icon: <Award size={14} strokeWidth={2.4} />,
      text: "Premium Quality Products",
    },
    {
      icon: <Truck size={14} strokeWidth={2.4} />,
      text: "Made in Maharashtra",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#5C160D] via-[#7A2418] to-[#5C160D]">

      {/* Background Glow */}
      <div className="absolute -top-16 left-0 w-44 h-44 bg-[#3C8C2E]/20 blur-[70px] rounded-full" />
      <div className="absolute -bottom-16 right-0 w-44 h-44 bg-[#F5B800]/20 blur-[70px] rounded-full" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent" />

      <Marquee
        speed={35}
        pauseOnHover
        gradient={false}
        className="relative py-1.5"
      >
        {offers.map((item, index) => (
          <div key={index} className="mx-2">
            <div
              className="
                flex
                items-center
                gap-2

                px-3
                py-1.5

                rounded-full

                border
                border-white/15

                bg-white/10
                backdrop-blur-lg

                shadow-md

                hover:bg-white/15
                hover:scale-105
                hover:shadow-yellow-500/20

                transition-all
                duration-300
              "
            >
              {/* Icon */}
              <div
                className="
                  w-7
                  h-7

                  rounded-full

                  flex
                  items-center
                  justify-center

                  bg-gradient-to-br
                  from-yellow-400
                  to-orange-400

                  text-[#7A2418]

                  shadow-sm

                  group-hover:rotate-6
                "
              >
                {item.icon}
              </div>

              {/* Text */}
              <span
                className="
                  text-[12px]
                  md:text-xs

                  font-medium

                  tracking-wide

                  text-white

                  whitespace-nowrap
                "
              >
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default OfferBanner;