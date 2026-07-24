import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";

export const useProducts = (categorySlug) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    fetchProducts(categorySlug)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [categorySlug]);

  return {
    products,
    loading,
    error,
  };
};