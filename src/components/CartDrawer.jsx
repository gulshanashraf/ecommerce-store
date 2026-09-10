import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductImage from "./ProductImage";
import { formatPKR } from "../utils/currency";

export default function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, removeItem, clearCart, subtotal } =
    useCart();
  const { showToast } = useToast();
  const [checkingOut, setCheckingOut] = useState(false);
  const [delivery, setDelivery] = useState({ address: "", city: "", contact: "" });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // No Order API exists on the backend yet, so this stays frontend-only —
    // we do not pretend the order is persisted to the database.
    showToast("Order details saved locally — checkout backend coming soon.");
    clearCart();
    setCheckingOut(false);
    closeCart();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[95] bg-maroon-deep/50 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-[96] flex h-full w-full max-w-md flex-col bg-cream-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-maroon/10 px-6 py-5">
          <h2 className="font-display text-2xl text-maroon-deep">Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-pink-soft hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag size={40} strokeWidth={1.2} className="text-maroon/40" />
            <p className="font-display text-xl text-maroon-deep">Your cart is empty</p>
            <p className="text-sm text-ink/60">Add some pieces you love to get started.</p>
            <Link
              to="/products"
              onClick={closeCart}
              className="mt-2 rounded-full bg-maroon px-6 py-2.5 text-sm font-medium text-cream-white hover:bg-maroon-deep"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {!checkingOut ? (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-1 text-sm font-medium text-ink">{item.name}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            className="text-ink/40 hover:text-maroon"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-ink/50">{formatPKR(item.price)}</p>
                        {typeof item.stock === "number" && (
                          <p className="text-[11px] text-ink/40">{item.stock} available</p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => decrement(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-maroon/20 text-maroon hover:bg-pink-soft"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => increment(item.id)}
                            disabled={item.stock != null && item.quantity >= item.stock}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-maroon/20 text-maroon hover:bg-pink-soft disabled:opacity-30"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                  <p className="text-sm text-ink/60">Delivery information</p>
                  <input
                    required
                    placeholder="Delivery Address"
                    value={delivery.address}
                    onChange={(e) => setDelivery((d) => ({ ...d, address: e.target.value }))}
                    className="w-full rounded-xl border border-maroon/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon"
                  />
                  <input
                    required
                    placeholder="City"
                    value={delivery.city}
                    onChange={(e) => setDelivery((d) => ({ ...d, city: e.target.value }))}
                    className="w-full rounded-xl border border-maroon/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon"
                  />
                  <input
                    required
                    placeholder="Contact Information"
                    value={delivery.contact}
                    onChange={(e) => setDelivery((d) => ({ ...d, contact: e.target.value }))}
                    className="w-full rounded-xl border border-maroon/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-maroon"
                  />
                </form>
              )}
            </div>

            <div className="border-t border-maroon/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="font-semibold text-maroon-deep">{formatPKR(subtotal)}</span>
              </div>
              {!checkingOut ? (
                <button
                  onClick={() => setCheckingOut(true)}
                  className="w-full rounded-full bg-maroon px-4 py-3 text-sm font-semibold tracking-wide text-cream-white transition hover:bg-maroon-deep"
                >
                  Checkout
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setCheckingOut(false)}
                    className="flex-1 rounded-full border border-maroon/20 px-4 py-3 text-sm font-medium text-ink hover:bg-pink-soft"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 rounded-full bg-maroon px-4 py-3 text-sm font-semibold text-cream-white hover:bg-maroon-deep"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
