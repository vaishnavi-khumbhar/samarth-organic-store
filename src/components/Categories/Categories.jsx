import { categories } from "../../data/categories";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-7 md:py-16 lg:py-7 bg-gradient-to-b from-[#FFFDF8] via-[#FFF8EE] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

        <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5B800]/15 text-[#7A2418] font-semibold uppercase tracking-[0.15em] text-[11px] sm:text-xs">
  Our Categories
</span>

<h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#7A2418]">
  Premium
  <span className="text-[#4D9F38]"> Organic Oils</span>
</h2>

<p className="mt-4 text-sm sm:text-base lg:text-lg text-[#666] leading-7 max-w-2xl mx-auto">
  Discover our collection of traditional wood pressed oils made naturally
  without chemicals or preservatives.
</p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-7 lg:gap-8 mt-12 lg:mt-16">

          {categories.map((item, index) => (

            <div
              key={index}
              className="group relative bg-white rounded-[30px] overflow-hidden border border-[#F3E5CB] shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer"
            >

              {/* Top Gradient */}
              <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-br from-[#FFF7E8] via-[#FFF3DA] to-[#FFFDF9]" />

              {/* Decorative Circle */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-[#FBF6EC] group-hover:scale-110 transition duration-500" />

              {/* Image */}
              <div className="relative flex justify-center items-center h-52 sm:h-60">

                <img
                  src={item.image}
                  alt={item.title}
                  className="relative h-40 sm:h-48 lg:h-52 object-contain drop-shadow-2xl transition duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                />

              </div>

              {/* Content */}
              <div className="px-4 sm:px-6 pb-6">

                <h3 className="text-center font-extrabold text-[#7A2418] text-lg sm:text-2xl lg:text-[26px] leading-tight group-hover:text-[#4D9F38] transition">
                  {item.title}
                </h3>

                <p className="mt-3 text-center text-sm sm:text-base text-gray-500 leading-6">
                  Pure, Natural & Cold Pressed
                </p>

                <button
                  onClick={() => navigate("/products")}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4D9F38] to-[#5DB944] text-white font-bold text-sm sm:text-base py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Explore Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
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