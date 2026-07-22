import { categories } from "../../data/categories";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
 
  const navigate = useNavigate();

 
  return (
<section className="section-padding pt-8 md:pt-2 pb-3">
        <div className="container-width">

        <div className="text-center">

          <span className="inline-block bg-[#F5B800]/15 text-[#7A2418] px-4 py-1.5 rounded-full font-semibold text-xs tracking-[0.2em] uppercase">
            Our Categories
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#7A2418]">
            Premium <span className="text-[#4D9F38]">Organic Oils</span>
          </h2>

          <p className="mt-3 text-[#6B6B6B] max-w-xl mx-auto text-sm sm:text-base">
            Cold pressed, chemical free and packed straight from the wood ghana — pick your everyday essential.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mt-12 md:mt-16">

          {categories.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl border-2 border-[#7A2418]/15 shadow-[0_8px_24px_-12px_rgba(122,36,24,0.15)] p-4 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-16px_rgba(122,36,24,0.3)] hover:border-[#7A2418] cursor-pointer overflow-hidden"
            >
              {/* soft accent glow behind the bottle */}
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#F5B800]/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-center justify-center h-28 sm:h-40 lg:h-44">
                <div className="absolute inset-0 m-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#FBF6EC] transition-transform duration-500 group-hover:scale-110" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative h-24 sm:h-36 lg:h-40 mx-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                />
              </div>

           <h3 className="relative text-base sm:text-xl font-extrabold text-center mt-4 sm:mt-5 text-[#7A2418] group-hover:text-[#4D9F38] transition-colors duration-300">
  {item.title}
</h3>

              <div className="relative flex justify-center mt-3 sm:mt-5">
               <button
  onClick={() => navigate("/products")}
  className="flex items-center gap-1.5 text-xs sm:text-sm text-[#4D9F38] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#4D9F38]/30 group-hover:bg-[#4D9F38] group-hover:text-white group-hover:border-[#4D9F38] transition-all duration-300"
>
  Explore
  <ArrowRight
    size={16}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;