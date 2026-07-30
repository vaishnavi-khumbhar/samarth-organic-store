import { 
  RotateCcw,
  SlidersHorizontal,
  Package,
  IndianRupee,
  ArrowUpDown,
} from "lucide-react";

const ProductFilter = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "All Products",
      price: "All Prices",
      sort: "Recommended",
    });
  };

  return (
    <section className="-mt-10 sm:-mt-14 lg:-mt-24 relative z-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">

        <div className="bg-white rounded-[20px] sm:rounded-[30px] border border-[#ECE4D6] shadow-[0_15px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden">

          {/* Header */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5 px-5 sm:px-8 py-5 sm:py-7 border-b border-[#F2E8DA]">

            <div>

              <div className="inline-flex items-center gap-2 bg-[#4D9F38]/10 text-[#4D9F38] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase">

                <SlidersHorizontal size={14} />

                Smart Filters

              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#2F2B28]">
                Find Your Favourite Product
              </h2>

              <p className="text-gray-500 mt-2">
                Filter and Sort Products Easily.
              </p>

            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-[#7A2418] font-semibold hover:text-[#4D9F38]"
            >
              <RotateCcw size={18} />
              Reset Filters
            </button>

          </div>

          <div className="p-5 sm:p-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

              {/* CATEGORY */}

              <div>

                <label className="flex items-center gap-2 mb-3 font-semibold">

                  <Package
                    size={18}
                    className="text-[#4D9F38]"
                  />

                  Category

                </label>

                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleChange("category", e.target.value)
                  }
                  className="w-full h-14 rounded-xl border border-[#ECE2D0] bg-[#FAF7F2] px-5 outline-none"
                >
                  <option>All Products</option>

                  <optgroup label="Wood Pressed Oils">
                    <option>Groundnut Oil</option>
                    <option>Sesame Oil</option>
                    <option>Coconut Oil</option>
                    <option>Sunflower Oil</option>
                    <option>Mustard Oil</option>
                    <option>Flexseed Oil</option>
                    <option>Almond Oil</option>
                    <option>Walnut Oil</option>
                    <option>Safflower Oil</option>
                    <option>Castor Oil</option>
                  </optgroup>

                  <optgroup label="Hair Oils">
                    <option>Onion Hair Oil</option>
                    <option>Curry Leaves Hair Oil</option>
                  </optgroup>

                  <optgroup label="Natural Jaggery">
                    <option>Jaggery Powder</option>
                    <option>Jaggery Candy</option>
                    <option>Liquid Jaggery</option>
                    <option>Jaggery</option>
                  </optgroup>

                  <optgroup label="Handmade Soaps">
                    <option>Aloe Vera Soap</option>
                    <option>Multani Mitti Soap</option>
                    <option>Neem Soap</option>
                    <option>De-tan Soap</option>
                    <option>Charcoal Soap</option>
                  </optgroup>

                  <optgroup label="Natural Honey">
                    <option>Natural Tulsi Honey</option>
                    <option>Forest Honey</option>
                  </optgroup>

                  <optgroup label="Pure Ghee">
                    <option>Gir Cow Ghee</option>
                  </optgroup>
                </select>

              </div>

              {/* PRICE */}

              <div>
                <label className="flex items-center gap-2 mb-3 font-semibold">
                  <IndianRupee
                    size={18}
                    className="text-[#F5B800]"
                  />
                  Price
                </label>

                <select
                  value={filters.price}
                  onChange={(e) =>
                    handleChange("price", e.target.value)
                  }
                  className="w-full h-14 rounded-xl border border-[#ECE2D0] bg-[#FAF7F2] px-5 outline-none"
                >
                  <option>All Prices</option>
                  <option>Under ₹100</option>
                  <option>₹100 - ₹300</option>
                  <option>₹300 - ₹600</option>
                  <option>₹600 - ₹1000</option>
                  <option>₹1000+</option>
                </select>
              </div>

              {/* SORT */}

              <div>
                <label className="flex items-center gap-2 mb-3 font-semibold">
                  <ArrowUpDown
                    size={18}
                    className="text-[#7A2418]"
                  />
                  Sort By
                </label>

                <div className="flex items-center h-14 rounded-xl border border-[#ECE2D0] bg-[#FAF7F2] px-4">
                  <ArrowUpDown
                    size={18}
                    className="mr-3 text-[#7A2418]"
                  />

                  <select
                    value={filters.sort}
                    onChange={(e) =>
                      handleChange("sort", e.target.value)
                    }
                    className="w-full bg-transparent outline-none cursor-pointer"
                  >
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

              {/* APPLY */}

              <div className="flex items-end">
                <button
                  type="button"
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-[#4D9F38] to-[#2E7D32] text-white font-semibold shadow-lg cursor-default"
                >
                  Filters Applied
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