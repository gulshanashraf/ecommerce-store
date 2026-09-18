import AuthModal from "./components/AuthModal";
import { AuthProvider } from "./context/AuthContext";

import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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

  // Login / Signup modal
  const [authMode, setAuthMode] = useState(null);

  const { pathname } = useLocation();

  const isHome = pathname === "/";

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (product) => {
    setDeletingProduct(product);
  };

  return (
    <>
      <ScrollToTop />

      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <Navbar
        onAddProduct={() => setAddOpen(true)}
        onLogin={() => setAuthMode("login")}
        onSignup={() => setAuthMode("signup")}
      />

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <main
        className={`min-h-screen ${
          isHome ? "" : "pt-[72px] md:pt-20"
        }`}
      >
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <Home
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            }
          />

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={
              <Products
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            }
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/products/:id"
            element={
              <ProductDetails
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            }
          />

          {/* CATEGORIES */}
          <Route
            path="/categories"
            element={<Categories />}
          />

          {/* FAVORITES */}
          <Route
            path="/favorites"
            element={
              <Favorites
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            }
          />
        </Routes>
      </main>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <Footer />

      {/* ========================= */}
      {/* CART */}
      {/* ========================= */}

      <CartDrawer />

      {/* ========================= */}
      {/* ADD PRODUCT */}
      {/* ========================= */}

      <AddProductModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />

      {/* ========================= */}
      {/* EDIT PRODUCT */}
      {/* ========================= */}

      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
      />

      {/* ========================= */}
      {/* DELETE PRODUCT */}
      {/* ========================= */}

      <DeleteConfirmation
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
      />

      {/* ========================= */}
      {/* LOGIN / SIGNUP MODAL */}
      {/* ========================= */}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={(mode) => setAuthMode(mode)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ProductsProvider>
          <CartProvider>
            <AuthProvider>
              <FavoritesProvider>
                <AppShell />
              </FavoritesProvider>
            </AuthProvider>
          </CartProvider>
        </ProductsProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}