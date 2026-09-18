import { useNavigate } from "react-router-dom";
import ProductImage from "../components/ProductImage";
import BackLink from "../components/BackLink";
import { CATEGORIES } from "../utils/categories";
import { useProducts } from "../context/ProductsContext";

export default function Categories() {
  const navigate = useNavigate();
  const { products } = useProducts();

  return (
    <div className="container-page py-10 md:py-14">
      <BackLink />
      <h1 className="mb-8 font-display text-4xl text-maroon-deep">All Categories</h1>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const count = products.filter((p) => p.category === cat.name).length;
          return (
            <button
              key={cat.name}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              className="group overflow-hidden rounded-2xl border border-maroon/10 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
            >
              <ProductImage
                src={cat.image}
                alt={cat.name}
                className="aspect-square w-full"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="p-4">
                <h3 className="font-display text-lg text-maroon-deep">{cat.name}</h3>
                <p className="text-xs text-ink/50">{count} products</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
