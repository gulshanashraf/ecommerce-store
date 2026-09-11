import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Pencil, Trash2, Eye, Check } from "lucide-react";
import ProductImage from "./ProductImage";
import { formatPKR } from "../utils/currency";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product, onEdit, onDelete }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [heartPop, setHeartPop] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const favored = isFavorite(product.id);
  const outOfStock = product.stock === 0;

  const handleFavorite = () => {
    toggleFavorite(product.id);
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 350);
  };

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, 1);
    showToast(`${product.name} added to cart`);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-maroon/15 bg-white shadow-[var(--shadow-color-card)] transition-all duration-300 hover:-translate-y-1 hover:border-maroon/30 hover:shadow-xl">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFavorite();
        }}
        aria-label={favored ? "Remove from favorites" : "Add to favorites"}
        className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-maroon shadow transition hover:scale-105 ${
          heartPop ? "animate-heart" : ""
        }`}
      >
        <Heart size={14} fill={favored ? "currentColor" : "none"} />
      </button>

      {product.discountPercent && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-maroon px-2.5 py-1 text-xs font-semibold text-cream-white">
          {product.discountPercent}% OFF
        </span>
      )}

      <Link to={`/products/${product.id}`} className="relative block w-full">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="aspect-square w-full overflow-hidden rounded-t-2xl transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {outOfStock && (
          <span className="absolute inset-x-0 bottom-0 bg-maroon-deep/90 py-1.5 text-center text-[11px] font-medium tracking-wide text-cream-white">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col items-center px-4 pb-4 pt-3 text-center">
        <p className="text-[11px] font-medium uppercase tracking-wide text-maroon/60">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-0.5 line-clamp-1 font-display text-lg text-ink hover:text-maroon">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mt-0.5 line-clamp-1 text-xs text-ink/50">
            {product.description}
          </p>
        )}

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-semibold text-maroon-deep">
            {formatPKR(product.price)}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-ink/40 line-through">
              {formatPKR(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Product Actions */}
        <div className="mt-3 flex w-full items-center gap-1.5 max-[480px]:flex-col max-[480px]:gap-2">

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold tracking-wide transition max-[480px]:w-[75%] max-[480px]:flex-none max-[480px]:py-2.5 ${
              justAdded
                ? "bg-maroon-light text-cream-white"
                : "bg-maroon text-cream-white hover:bg-maroon-deep"
            } disabled:cursor-not-allowed disabled:bg-ink/20 disabled:text-cream-white`}
          >
            {justAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add
              </>
            )}
          </button>

          {/* View + Edit + Delete */}
          <div className="flex items-center gap-1.5 max-[480px]:w-full max-[480px]:justify-center">
            <Link
              to={`/products/${product.id}`}
              aria-label="View details"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon/25 text-maroon transition hover:bg-maroon hover:text-cream-white"
            >
              <Eye size={14} />
            </Link>

            <button
              onClick={() => onEdit?.(product)}
              aria-label="Edit product"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon/25 text-maroon transition hover:bg-maroon hover:text-cream-white"
            >
              <Pencil size={13} />
            </button>

            <button
              onClick={() => onDelete?.(product)}
              aria-label="Delete product"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon/25 text-maroon transition hover:bg-maroon hover:text-cream-white"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}