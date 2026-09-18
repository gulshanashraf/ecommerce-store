import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "fashion-store-cart";

function loadInitialCart() {
  // Note: this is in-memory + sessionStorage-free by design for artifact-safety
  // in preview environments; in a real deployed app this can read from
  // localStorage. Kept simple and frontend-only until a real Order API exists.
  return [];
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitialCart);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const maxStock = product.stock ?? Infinity;
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: nextQty } : i));
      }
      return [...prev, { ...product, quantity: Math.min(quantity, maxStock) }];
    });
    setIsOpen(true);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const setQuantity = (id, quantity) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i;
          const maxStock = i.stock ?? Infinity;
          const clamped = Math.max(1, Math.min(quantity, maxStock));
          return { ...i, quantity: clamped };
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const increment = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) setQuantity(id, item.quantity + 1);
  };

  const decrement = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) setQuantity(id, item.quantity - 1);
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    increment,
    decrement,
    setQuantity,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
