import { X } from "lucide-react";
import { Search } from "lucide-react";

const SearchModal = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999]
      bg-black/50 backdrop-blur-sm
      flex justify-center items-start pt-28"
    >
      <div
        className="w-[95%]
        max-w-4xl
        rounded-3xl
        bg-white
        p-10"
      >
        {/* Header */}

        <div className="flex justify-between items-center">

          <h2 className="text-4xl font-bold">
            Search Products
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <X size={30} />
          </button>

        </div>

        {/* Search Input */}

        <div className="relative mt-8">

          <input
            type="text"
            placeholder="Search Organic Oils..."
            className="w-full
            rounded-full
            border-2
            px-8
            py-5
            text-lg
            outline-none"
          />

          <Search
            className="absolute
            right-8
            top-5"
          />

        </div>

        {/* Popular Search */}

        <div className="mt-10">

          <h3 className="text-2xl font-semibold">
            Popular Searches
          </h3>

          <div className="flex flex-wrap gap-4 mt-5">

            {[
              "Groundnut Oil",
              "Coconut Oil",
              "Sesame Oil",
              "Mustard Oil",
              "Sunflower Oil",
            ].map((item) => (
              <button
                key={item}
                className="rounded-full
                bg-[#FAF6EE]
                px-5
                py-3"
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* Trending */}

        <div className="mt-10">

          <h3 className="text-2xl font-semibold">
            Trending Products
          </h3>

          <div className="mt-5 space-y-4">

            <p>Groundnut Oil</p>

            <p>Organic Coconut Oil</p>

            <p>Cold Pressed Sesame Oil</p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SearchModal;