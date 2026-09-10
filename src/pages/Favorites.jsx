import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import BackLink from "../components/BackLink";
import { useProducts } from "../context/ProductsContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites({ onEdit, onDelete }) {
  const { products } = useProducts();
  const { favoriteIds } = useFavorites();

  const favoriteProducts = products.filter((p) => favoriteIds.has(p.id));

  return (
    <div className="container-page py-10 md:py-14">
      <BackLink />
      <h1 className="mb-8 font-display text-4xl text-maroon-deep">Favorites</h1>

      {favoriteProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          subtitle="Tap the heart on any product to save it here."
          action={
            <Link
              to="/products"
              className="mt-2 rounded-full bg-maroon px-6 py-2.5 text-sm font-medium text-cream-white hover:bg-maroon-deep"
            >
              Browse Products
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
