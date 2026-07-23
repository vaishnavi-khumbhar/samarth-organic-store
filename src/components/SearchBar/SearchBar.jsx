import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../../data/products";

const SearchBar = ({ setOpen = () => {} }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = query.trim();

  const results = trimmed
    ? products.filter((item) =>
        item.name.toLowerCase().includes(trimmed.toLowerCase())
      )
    : [];

  const handleSelect = (slug) => {
    setQuery("");
    setOpen(false);

    navigate(`/product/${slug}`);
  };

  const handleClose = () => {
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 bg-white rounded-full border border-[#E5DCC8] px-4 py-2.5">

        <Search size={18} className="text-[#7A2418]" />

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 outline-none bg-transparent"
        />

        {query && (
          <button onClick={() => setQuery("")}>
            <X size={18} />
          </button>
        )}

      </div>

      {trimmed && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border z-50 max-h-80 overflow-y-auto">

          {results.length ? (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.slug)}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#FBF6EC]"
              >
                <img
                  src={item.image}
                  className="w-12 h-12 object-contain"
                  alt={item.name}
                />

                <div className="text-left">
                  <h4 className="font-semibold">
                    {item.name}
                  </h4>

                  <p className="text-[#4D9F38] font-bold">
                    {item.price}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-5 text-center">
              No Product Found
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default SearchBar;