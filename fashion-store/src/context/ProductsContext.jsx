import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as productService from "../services/productService";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err?.response
          ? "Unable to load products. Please try again."
          : "Unable to reach the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product) => {
    const created = await productService.createProduct(product);
    await fetchProducts();
    return created;
  };

  const editProduct = async (id, product) => {
    const updated = await productService.updateProduct(id, product);
    await fetchProducts();
    return updated;
  };

  const removeProduct = async (id) => {
    await productService.deleteProduct(id);
    await fetchProducts();
  };

  const value = {
    products,
    loading,
    error,
    refetch: fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
