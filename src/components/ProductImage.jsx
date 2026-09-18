import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * Drop-in <img> replacement used everywhere a product photo appears
 * (cards, details page, cart, favorites, add/edit previews). Never
 * shows a broken-image icon or blank box — falls back to a styled
 * placeholder that matches the store's look, and never affects the
 * underlying product's CRUD/cart/favorite functionality.
 */
export default function ProductImage({ src, alt, className = "", imgClassName = "" }) {
  const [status, setStatus] = useState(src ? "loading" : "empty");

  useEffect(() => {
    setStatus(src ? "loading" : "empty");
  }, [src]);

  const showFallback = status === "empty" || status === "error";

  return (
    <div className={`relative overflow-hidden bg-pink-soft ${className}`}>
      {!showFallback && (
        <img
          src={src}
          alt={alt || "Product"}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            status === "loading" ? "opacity-0" : "opacity-100"
          } ${imgClassName}`}
        />
      )}

      {status === "loading" && !showFallback && (
        <div className="skeleton absolute inset-0" aria-hidden="true" />
      )}

      {showFallback && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-pink-soft to-cream text-maroon/50">
          <ImageOff size={28} strokeWidth={1.5} />
          <span className="font-display text-sm tracking-wide text-maroon/60">
            Image unavailable
          </span>
        </div>
      )}
    </div>
  );
}
