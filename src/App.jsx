import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { ToastProvider } from "./context/ToastContext";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import DeleteConfirmation from "./components/DeleteConfirmation";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const [addOpen, setAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const handleEdit = (product) => setEditingProduct(product);
  const handleDelete = (product) => setDeletingProduct(product);

  return (
    <>
      <ScrollToTop />
      <Navbar onAddProduct={() => setAddOpen(true)} />

      {/* On the homepage the hero must start at the very top so the fixed,
          transparent navbar overlays the hero image itself (no solid strip
          behind it). Every other page needs the top padding so content
          doesn't sit under the fixed solid navbar. */}
      <main className={`min-h-screen ${isHome ? "" : "pt-[72px] md:pt-20"}`}>
        <Routes>
          <Route path="/" element={<Home onEdit={handleEdit} onDelete={handleDelete} />} />
          <Route path="/products" element={<Products onEdit={handleEdit} onDelete={handleDelete} />} />
          <Route
            path="/products/:id"
            element={<ProductDetails onEdit={handleEdit} onDelete={handleDelete} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites onEdit={handleEdit} onDelete={handleDelete} />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />

      <AddProductModal open={addOpen} onClose={() => setAddOpen(false)} />
      <EditProductModal product={editingProduct} onClose={() => setEditingProduct(null)} />
      <DeleteConfirmation product={deletingProduct} onClose={() => setDeletingProduct(null)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ProductsProvider>
          <CartProvider>
            <FavoritesProvider>
              <AppShell />
            </FavoritesProvider>
          </CartProvider>
        </ProductsProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
