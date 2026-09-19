import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Pencil,
  Trash2,
  Eye,
  Check,
} from "lucide-react";
import ProductImage from "./ProductImage";
import { formatPKR } from "../utils/currency";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}) {
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

    setTimeout(() => {
      setHeartPop(false);
    }, 350);
  };

  const handleAddToCart = () => {
    if (outOfStock) return;

    addItem(product, 1);
    showToast(`${product.name} added to cart`);

    setJustAdded(true);

    setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  return (
    <div className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-maroon/15 bg-white shadow-[var(--shadow-color-card)] transition-all duration-300 hover:-translate-y-1 hover:border-maroon/30 hover:shadow-xl">

      {/* FAVORITE */}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFavorite();
        }}
        aria-label={
          favored
            ? "Remove from favorites"
            : "Add to favorites"
        }
        className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-maroon shadow transition hover:scale-105 sm:right-3 sm:top-3 ${
          heartPop ? "animate-heart" : ""
        }`}
      >
        <Heart
          size={14}
          fill={favored ? "currentColor" : "none"}
        />
      </button>

      {/* DISCOUNT */}
      {product.discountPercent && (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-maroon px-2 py-1 text-[10px] font-semibold text-cream-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-xs">
          {product.discountPercent}% OFF
        </span>
      )}

      {/* IMAGE */}
      <Link
        to={`/products/${product.id}`}
        className="relative block w-full"
      >
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

      {/* PRODUCT INFO */}
      <div className="flex flex-1 flex-col items-center px-2.5 pb-3 pt-2 text-center sm:px-4 sm:pb-4 sm:pt-3">

        {/* CATEGORY */}
        <p className="text-[9px] font-medium uppercase tracking-wide text-maroon/60 sm:text-[11px]">
          {product.category}
        </p>

        {/* NAME */}
        <Link
          to={`/products/${product.id}`}
          className="max-w-full"
        >
          <h3 className="mt-0.5 line-clamp-1 font-display text-base text-ink hover:text-maroon sm:text-lg">
            {product.name}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        {product.description && (
          <p className="mt-0.5 line-clamp-1 max-w-full text-[10px] text-ink/50 sm:text-xs">
            {product.description}
          </p>
        )}

        {/* PRICE */}
        <div className="mt-1 flex items-baseline gap-1.5 sm:mt-1.5 sm:gap-2">
          <span className="text-sm font-semibold text-maroon-deep sm:text-base">
            {formatPKR(product.price)}
          </span>

          {product.oldPrice && (
            <span className="text-[10px] text-ink/40 line-through sm:text-xs">
              {formatPKR(product.oldPrice)}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-2.5 flex w-full flex-col gap-1.5 sm:mt-3 sm:flex-row sm:items-center sm:gap-1.5">

          {/* ADD */}
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`flex w-full items-center justify-center gap-1.5 rounded-full px-2.5 py-2 text-[10px] font-semibold tracking-wide transition sm:flex-1 sm:px-3 sm:py-2 sm:text-xs ${
              justAdded
                ? "bg-maroon-light text-cream-white"
                : "bg-maroon text-cream-white hover:bg-maroon-deep"
            } disabled:cursor-not-allowed disabled:bg-ink/20 disabled:text-cream-white`}
          >
            {justAdded ? (
              <>
                <Check size={13} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                Add
              </>
            )}
          </button>

          {/* ICONS */}
          <div className="flex w-full items-center justify-center gap-1.5 sm:w-auto">

            {/* VIEW */}
            <Link
              to={`/products/${product.id}`}
              aria-label="View details"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-maroon/25 text-maroon transition hover:bg-maroon hover:text-cream-white sm:h-9 sm:w-9"
            >
              <Eye size={13} />
            </Link>

            {/* EDIT */}
            <button
              onClick={() => onEdit?.(product)}
              aria-label="Edit product"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-maroon/25 text-maroon transition hover:bg-maroon hover:text-cream-white sm:h-9 sm:w-9"
            >
              <Pencil size={12} />
            </button>

            {/* DELETE */}
            <button
              onClick={() => onDelete?.(product)}
              aria-label="Delete product"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-maroon/25 text-maroon transition hover:bg-maroon hover:text-cream-white sm:h-9 sm:w-9"
            >
              <Trash2 size={12} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}