import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductImage from "./ProductImage";
import { formatPKR } from "../utils/currency";

export default function PromotionalSection({ products = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Change product every 5 seconds
  useEffect(() => {
    if (products.length <= 1) return;

    const interval = setInterval(() => {
      setIsChanging(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          return (prevIndex + 1) % products.length;
        });

        setIsChanging(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (!products.length) {
    return null;
  }

  const product = products[currentIndex];

  if (!product) {
    return null;
  }

  const productImage = product.imageURL || product.image;

  const productDescription =
    product.description ||
    product.desc ||
    "A beautiful piece from our latest collection, selected especially for you.";

  const productId = product._id || product.id;

  return (
    <section className="container-page py-8 md:py-12">
      <div className="grid min-h-[380px] overflow-hidden rounded-3xl bg-pink-soft md:grid-cols-2 md:min-h-[400px]">

        {/* IMAGE */}
        <div className="relative h-[280px] md:h-[400px] overflow-hidden">
          <div
            className={`
              h-full w-full
              transition-all duration-500 ease-in-out
              ${
                isChanging
                  ? "scale-105 opacity-0"
                  : "scale-100 opacity-100"
              }
            `}
          >
            <ProductImage
              src={
                productImage ||
                "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80"
              }
              alt={product.name || "Product"}
              className="h-full w-full object-cover"
            />
          </div>

          {product.discountPercent && (
            <div className="absolute left-5 top-5 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-maroon text-center text-cream-white shadow-lg">
              <span className="text-sm font-bold leading-none">
                {product.discountPercent}%
              </span>

              <span className="text-[8px] uppercase tracking-wide">
                Off
              </span>
            </div>
          )}
        </div>

        {/* PRODUCT DETAILS */}
        <div
          className={`
            flex flex-col justify-center
            p-6 md:p-10
            transition-all duration-500 ease-in-out
            ${
              isChanging
                ? "translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }
          `}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-maroon/70">
            Special Collection
          </p>

          <h2 className="font-display text-3xl leading-tight text-maroon-deep md:text-4xl">
            {product.name}
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-ink/70">
            {productDescription}
          </p>

          <ul className="mt-4 space-y-1 text-xs text-ink/60">
            <li>Handpicked quality products</li>
            <li>Nationwide delivery available</li>
            <li>Easy exchanges available</li>
          </ul>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-xl text-maroon-deep">
              {formatPKR(product.price)}
            </span>

            {product.oldPrice && (
              <span className="text-sm text-ink/40 line-through">
                {formatPKR(product.oldPrice)}
              </span>
            )}

            {typeof product.stock === "number" && (
              <span className="text-xs text-ink/50">
                {product.stock} in stock
              </span>
            )}
          </div>

          <Link
            to={`/products/${productId}`}
            className="mt-5 inline-block w-fit rounded-full bg-maroon px-7 py-3 text-sm font-semibold tracking-wide text-cream-white transition hover:bg-maroon-deep"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}