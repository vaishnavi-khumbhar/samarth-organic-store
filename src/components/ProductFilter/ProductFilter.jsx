import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  Package,
  IndianRupee,
  ArrowUpDown,
} from "lucide-react";

const ProductFilter = () => {
  return (
    <section className="-mt-10 sm:-mt-14 lg:-mt-16 relative z-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">

        <div className="bg-white rounded-[20px] sm:rounded-[30px] border border-[#ECE4D6] shadow-[0_15px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5 px-5 sm:px-8 py-5 sm:py-7 border-b border-[#F2E8DA]">

            <div>
              <div className="inline-flex items-center gap-2 bg-[#4D9F38]/10 text-[#4D9F38] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.18em] uppercase">
                <SlidersHorizontal size={14} className="sm:w-[15px] sm:h-[15px]" />
                Smart Filters
              </div>

              <h2 className="mt-2.5 sm:mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-[#2F2B28]">
                Find Your Favourite Oil
              </h2>

              <p className="text-gray-500 mt-1.5 sm:mt-2 text-sm sm:text-base">
                Search, filter and sort products easily.
              </p>
            </div>

            <button className="flex items-center gap-2 text-[#7A2418] font-semibold hover:text-[#4D9F38] transition text-sm sm:text-base self-start lg:self-auto">
              <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
              Reset Filters
            </button>

          </div>

          {/* Body */}
          <div className="p-5 sm:p-8">

            {/* Search */}
            <div className="relative mb-6 sm:mb-8">
              <Search
                size={18}
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 sm:w-5 sm:h-5"
              />

              <input
                type="text"
                placeholder="Search Organic Oils..."
                className="w-full h-13 sm:h-16 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#ECE2D0] pl-11 sm:pl-14 pr-4 sm:pr-5 text-sm sm:text-[15px] outline-none focus:border-[#4D9F38] focus:ring-4 focus:ring-[#4D9F38]/10 transition"
                style={{ height: "3.25rem" }}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 mb-2.5 sm:mb-3 text-sm font-semibold text-[#444]">
                  <Package size={16} className="text-[#4D9F38] sm:w-[18px] sm:h-[18px]" />
                  Category
                </label>

                <select className="w-full h-12 sm:h-14 rounded-xl border border-[#ECE2D0] bg-[#FAF7F2] px-4 sm:px-5 text-sm sm:text-base outline-none focus:border-[#4D9F38] focus:ring-4 focus:ring-[#4D9F38]/10 transition">
                  <option>All Products</option>
                  <option>Groundnut Oil</option>
                  <option>Sesame Oil</option>
                  <option>Coconut Oil</option>
                  <option>Sunflower Oil</option>
                  <option>Mustard Oil</option>
                  <option>Flaxseed Oil</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="flex items-center gap-2 mb-2.5 sm:mb-3 text-sm font-semibold text-[#444]">
                  <IndianRupee size={16} className="text-[#F5B800] sm:w-[18px] sm:h-[18px]" />
                  Price
                </label>

                <select className="w-full h-12 sm:h-14 rounded-xl border border-[#ECE2D0] bg-[#FAF7F2] px-4 sm:px-5 text-sm sm:text-base outline-none focus:border-[#F5B800] focus:ring-4 focus:ring-[#F5B800]/10 transition">
                  <option>All Prices</option>
                  <option>₹0 - ₹500</option>
                  <option>₹500 - ₹1000</option>
                  <option>₹1000+</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="flex items-center gap-2 mb-2.5 sm:mb-3 text-sm font-semibold text-[#444]">
                  <ArrowUpDown size={16} className="text-[#7A2418] sm:w-[18px] sm:h-[18px]" />
                  Sort By
                </label>

                <div className="bg-[#FAF7F2] border border-[#ECE2D0] rounded-xl h-12 sm:h-14 px-3 sm:px-4 flex items-center">
                  <ArrowUpDown
                    size={16}
                    className="text-[#7A2418] mr-2 sm:mr-3 shrink-0 sm:w-[18px] sm:h-[18px]"
                  />

                  <select className="w-full bg-transparent outline-none text-[#4B2E1E] font-medium cursor-pointer text-sm sm:text-base">
                    <option>Recommended</option>
                    <option>Newest</option>
                    <option>Best Selling</option>
                    <option>Price : Low to High</option>
                    <option>Price : High to Low</option>
                    <option>Alphabetically A-Z</option>
                    <option>Alphabetically Z-A</option>
                  </select>
                </div>
              </div>

              {/* Button */}
              <div className="flex items-end">
                <button className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-[#7A2418] via-[#8E2A1A] to-[#5C160D] text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  Apply Filters
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductFilter;