
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
} from "lucide-react";

import ProductImage from "../components/ProductImage";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { formatPKR } from "../utils/currency";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";

export default function ProductDetails({ onEdit, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, loading: productsLoading } = useProducts();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);

  // Product shared products list se find ho raha hai
  const product =
    products.find((p) => String(p.id) === String(id)) || null;

  const loading = productsLoading;

  if (loading) {
    return (
      <div className="container-page py-14">
        <Loading count={1} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-14">
        <ErrorState
          message="Product not found."
          onRetry={() => navigate(0)}
        />
      </div>
    );
  }

  const favored = isFavorite(product.id);
  const outOfStock = product.stock === 0;
  const maxQty = product.stock ?? 99;

  const handleAddToCart = () => {
    if (outOfStock) return;

    addItem(product, quantity);
    showToast(`${product.name} added to cart`);
  };

  // Backend ka actual image field imageURL hai
  const productImage = product.imageURL || product.image;

  // Backend ka actual description field desc hai
  const productDescription =
    product.description || product.desc;

  return (
    <div className="container-page py-10 md:py-14">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-maroon transition hover:opacity-70"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
        Back
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* ================= PRODUCT IMAGE ================= */}
        <div>
          <ProductImage
            src={productImage}
            alt={product.name}
            className="aspect-[4/5] w-full rounded-2xl"
          />
        </div>

        {/* ================= PRODUCT INFORMATION ================= */}
        <div>
          {/* Category */}
          <p className="text-sm font-medium uppercase tracking-wide text-maroon/60">
            {product.category}
          </p>

          {/* Product Name */}
          <h1 className="mt-1 font-display text-4xl text-maroon-deep">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-2xl text-maroon-deep">
              {formatPKR(product.price)}
            </span>

            {product.oldPrice && (
              <span className="text-ink/40 line-through">
                {formatPKR(product.oldPrice)}
              </span>
            )}

            {product.discountPercent && (
              <span className="rounded-full bg-pink-soft px-2.5 py-1 text-xs font-semibold text-maroon">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          {productDescription && (
            <div className="mt-5 max-w-md">
              <h3 className="mb-2 text-sm font-semibold text-maroon-deep">
                Description
              </h3>

              <p className="text-sm leading-relaxed text-ink/70">
                {productDescription}
              </p>
            </div>
          )}

          {/* Stock */}
          {typeof product.stock === "number" && (
            <p className="mt-4 text-sm text-ink/60">
              {outOfStock ? (
                <span className="font-medium text-maroon">
                  Out of stock
                </span>
              ) : (
                <>
                  <span className="font-medium text-ink">
                    {product.stock}
                  </span>{" "}
                  in stock
                </>
              )}
            </p>
          )}

          {/* Quantity */}
          {!outOfStock && (
            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm text-ink/60">
                Quantity
              </span>

              <div className="flex items-center gap-3 rounded-full border border-maroon/20 px-3 py-1.5">
                {/* Minus */}
                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  aria-label="Decrease quantity"
                  className="text-maroon"
                >
                  <Minus size={14} />
                </button>

                {/* Quantity Number */}
                <span className="w-5 text-center text-sm">
                  {quantity}
                </span>

                {/* Plus */}
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(maxQty, q + 1)
                    )
                  }
                  aria-label="Increase quantity"
                  className="text-maroon"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex items-center gap-2 rounded-full bg-maroon px-7 py-3 text-sm font-semibold tracking-wide text-cream-white transition hover:bg-maroon-deep disabled:cursor-not-allowed disabled:bg-ink/20"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>

            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-maroon/20 text-maroon transition hover:bg-pink-soft"
              aria-label={
                favored
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                size={18}
                fill={favored ? "currentColor" : "none"}
              />
            </button>

            {/* Edit */}
            <button
              onClick={() => onEdit?.(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-maroon/20 text-maroon transition hover:bg-pink-soft"
              aria-label="Edit product"
            >
              <Pencil size={16} />
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete?.(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-maroon/20 text-maroon transition hover:bg-pink-soft"
              aria-label="Delete product"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="mt-8 inline-block text-sm font-medium text-maroon hover:opacity-70"
          >
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

