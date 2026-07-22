import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-gradient-to-b from-white to-[#FFF9F2]">
      <div className="container-width">

        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <span className="inline-block px-5 py-2 rounded-full bg-[#F5B800]/15 text-[#7A2418] text-xs font-semibold tracking-[0.2em] uppercase">
            About Samarth Organic
          </span>

          {/* Heading */}
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#7A2418]">
            Pure Tradition,
            <span className="text-[#4D9F38]"> Healthy Living</span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-[#6B6B6B] text-base sm:text-lg leading-8 max-w-3xl mx-auto">
            Samarth Organic Oil brings you
            <span className="font-semibold text-[#7A2418]">
              {" "}100% Wood Pressed, Chemical-Free Oils
            </span>{" "}
            made using the traditional Lakdi Ghana process, preserving natural
            nutrition, aroma and authentic taste.
          </p>

          {/* Features */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <span className="px-5 py-2 rounded-full bg-white border border-[#4D9F38]/20 text-[#4D9F38] font-medium shadow-sm">
               100% Natural
            </span>

            <span className="px-5 py-2 rounded-full bg-white border border-[#4D9F38]/20 text-[#4D9F38] font-medium shadow-sm">
               Wood Pressed
            </span>

            <span className="px-5 py-2 rounded-full bg-white border border-[#4D9F38]/20 text-[#4D9F38] font-medium shadow-sm">
               Chemical Free
            </span>

          </div>

          {/* Button */}
          <div className="mt-10">
            <button
              onClick={() => navigate("/about")}
              className="inline-flex items-center gap-2 bg-[#4D9F38] hover:bg-[#3D852D] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-[#4D9F38]/25 hover:scale-105 transition-all duration-300"
            >
              Know More
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutPreview;