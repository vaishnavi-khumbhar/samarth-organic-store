import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";

// categoryName should match a category NAME exactly as stored in the
// database / shown in the admin panel (e.g. "Ghee", "Honey", "Soap"),
// not a slug — the PHP backend filters with `category = ?` directly.
export const useProducts = (categoryName) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchProducts(categoryName)
      .then((res) => {
        // FIX: api/products/index.php returns { products: [...] },
        // so the array lives at res.data.products — not res.data.
        // The old code did setProducts(res.data), which stored the
        // whole { products: [...] } object instead of an array, so
        // every page using this hook silently got broken data (this
        // is why nobody noticed it was never wired up anywhere).
        if (!cancelled) setProducts(res.data?.products || []);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err?.response?.data?.error || err.message || "Failed to load products: "
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryName]);

  return { products, loading, error };
};