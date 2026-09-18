import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import ProductCard from "../components/ProductCard";
import BackLink from "../components/BackLink";
import SortDropdown, { sortProducts } from "../components/SortDropdown";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { useProducts } from "../context/ProductsContext";
import { filterProducts } from "../utils/search";
import { CATEGORIES } from "../utils/categories";

export default function Products({ onEdit, onDelete }) {
  const { products, loading, error, refetch } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("newest");

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const filtered = useMemo(
    () => sortProducts(filterProducts(products, { search, category }), sortBy),
    [products, search, category, sortBy]
  );

  const clearSearch = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("search");
    setSearchParams(next);
  };

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("category", value);
    else next.delete("category");
    setSearchParams(next);
  };

  return (
    <div className="container-page py-10 md:py-14">
      <BackLink />
      <div className="mb-8">
        <h1 className="font-display text-4xl text-maroon-deep">
          {category || "All Products"}
        </h1>
        {search && <p className="mt-1 text-sm text-ink/60">Results for "{search}"</p>}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCategory("")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            !category ? "bg-maroon text-cream-white" : "border border-maroon/20 text-ink hover:bg-pink-soft"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.name}
            onClick={() => setCategory(c.name)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              category === c.name
                ? "bg-maroon text-cream-white"
                : "border border-maroon/20 text-ink hover:bg-pink-soft"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink/60">{filtered.length} products</p>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {loading && <Loading count={12} />}

      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No products found"
          subtitle="Try a different search term or browse another category."
          action={
            <button
              onClick={clearSearch}
              className="mt-2 rounded-full bg-maroon px-6 py-2.5 text-sm font-medium text-cream-white hover:bg-maroon-deep"
            >
              Clear Search
            </button>
          }
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
