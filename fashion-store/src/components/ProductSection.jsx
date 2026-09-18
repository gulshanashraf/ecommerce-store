import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductSection({ title, products, viewAllTo = "/products", onEdit, onDelete }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="container-page py-6 md:py-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-maroon-deep md:text-4xl">
          {title}
        </h2>
        <Link
          to={viewAllTo}
          className="flex items-center gap-1 text-sm font-medium text-maroon transition hover:gap-2"
        >
          View All <ArrowRight size={15} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}
