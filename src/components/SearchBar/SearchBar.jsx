import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../../data/products";
// Backend वापरत असाल:
// import { useProducts } from "../../hooks/useProducts";

const SearchBar = ({ setOpen = () => {} }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");

  // Backend वापरत असाल
  // const { products } = useProducts();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered =
    query.trim() === ""
      ? []
      : products.filter((item) =>
          item.name.toLowerCase().includes(query.trim().toLowerCase())
        );

  const handleSelect = (slug) => {
    navigate(`/product/${slug}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative w-full overflow-visible">
      <div className="flex items-center bg-white border border-[#E5DCC8] rounded-full px-4 py-3 shadow-sm">
        <Search size={18} className="text-[#7A2418] shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none px-3 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered.length > 0) {
              handleSelect(filtered[0].slug);
            }
          }}
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E5DCC8] shadow-2xl z-[9999] max-h-[70vh] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.slug)}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#FBF6EC] transition text-left"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-lg bg-white border"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-[#222] text-sm">
                    {item.name}
                  </h4>

                  <p className="text-[#4D9F38] font-bold text-sm mt-1">
                    {item.price}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 font-medium">
              No Product Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;