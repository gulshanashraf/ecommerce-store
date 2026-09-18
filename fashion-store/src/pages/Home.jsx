
import Hero from "../components/Hero";
import CategoryCarousel from "../components/CategoryCarousel";
import ProductSection from "../components/ProductSection";
import PromotionalSection from "../components/PromotionalSection";
import PromoCards from "../components/PromoCards";
import FinalBanner from "../components/FinalBanner";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { useProducts } from "../context/ProductsContext";

export default function Home({ onEdit, onDelete }) {
  const { products, loading, error, refetch } = useProducts();

  // ---------------------------------------
  // NEW ARRIVALS
  // ---------------------------------------
  const newArrivals = [...products].slice(-8).reverse();

  const newArrivalIds = new Set(
    newArrivals.map((product) => product._id)
  );

  // ---------------------------------------
  // TRENDING PRODUCTS
  // ---------------------------------------
  const trending = products
    .filter((product) => !newArrivalIds.has(product._id))
    .slice(0, 4);

  const trendingIds = new Set(
    trending.map((product) => product._id)
  );

  // ---------------------------------------
  // EVERYDAY ESSENTIALS
  // ---------------------------------------
  const essentials = products
    .filter(
      (product) =>
        product.category === "Everyday Essentials" &&
        !newArrivalIds.has(product._id) &&
        !trendingIds.has(product._id)
    )
    .slice(0, 8);

  const essentialsIds = new Set(
    essentials.map((product) => product._id)
  );

  // ---------------------------------------
  // RECOMMENDED FOR YOU
  // ---------------------------------------
  const usedIds = new Set([
    ...newArrivalIds,
    ...trendingIds,
    ...essentialsIds,
  ]);

  const recommended = products
    .filter((product) => !usedIds.has(product._id))
    .slice(0, 8);

  // ---------------------------------------
  // DISCOUNTED PRODUCTS
  // ---------------------------------------
  const discounted = products
    .filter((product) => product.discountPercent)
    .slice(0, 8);

  return (
    <div>
      <Hero />

      <CategoryCarousel />

      {/* Loading */}
      {loading && (
        <div className="container-page py-8">
          <Loading />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="container-page py-8">
          <ErrorState
            message={error}
            onRetry={refetch}
          />
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <>
          {/* New Arrivals */}
          {newArrivals.length > 0 && (
            <ProductSection
              title="New Arrivals"
              products={newArrivals}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}

          {/* Trending */}
          {trending.length > 0 && (
            <ProductSection
              title="Trending Products"
              products={trending}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}

          {/* Promotional Section */}
          <PromotionalSection
            products={products}
          />

          {/* Everyday Essentials */}
          {essentials.length > 0 && (
            <ProductSection
              title="Essentials"
              products={essentials}
              viewAllTo="/products?category=Everyday%20Essentials"
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}

          {/* Recommended */}
          {recommended.length > 0 && (
            <ProductSection
              title="Recommended For You"
              products={recommended}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}

          {/* Discounted */}
          {discounted.length > 0 && (
            <ProductSection
              title="Don't Miss Out"
              products={discounted}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}

          <PromoCards />
        </>
      )}

      <FinalBanner />
    </div>
  );
}

