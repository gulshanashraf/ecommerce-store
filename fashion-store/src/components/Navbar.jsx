import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Plus,
  User,
  LogOut,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Favorites", to: "/favorites" },
];

export default function Navbar({
  onAddProduct,
  onLogin,
  onSignup,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { itemCount, openCart } = useCart();
  const { count: favCount } = useFavorites();
  const { user, logout } = useAuth();

  const isHome = location.pathname === "/";

  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  /*
    Desktop:
    Same layout, only background color is now maroon.

    Mobile:
    Sidebar opens from right side.
  */
  const solid = true;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className="fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-visible border-b border-white/20 shadow-2xl backdrop-blur-md"
        style={{
          backgroundColor: "#7C0000",
        }}
      >
        <div className="container-page flex h-[72px] min-w-0 items-center gap-2 py-3 text-white md:h-20 md:gap-4">

          {/* BRAND */}
          <Link
            to="/"
            className="flex min-w-0 shrink items-baseline gap-1.5"
          >
            <span className="font-display text-lg font-bold uppercase tracking-[0.06em] drop-shadow-md text-white sm:text-xl md:text-3xl md:tracking-[0.08em]">
              Fashion Store
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="whitespace-nowrap text-sm font-semibold tracking-wide text-white drop-shadow transition hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={onAddProduct}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-white bg-white/25 px-5 py-2 text-sm font-bold tracking-wide text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] backdrop-blur-md transition hover:scale-105 hover:bg-white/35"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Product
            </button>
          </nav>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={submitSearch}
            className="hidden max-w-xs flex-1 items-center gap-2 rounded-full border-2 border-white bg-black/30 px-4 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.3)] backdrop-blur-md md:flex"
          >
            <Search
              size={16}
              className="text-white stroke-[2.5]"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:font-semibold placeholder:text-white"
            />
          </form>

          {/* ACTIONS */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">

            {/* FAVORITES */}
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-black/35 text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition hover:scale-110 hover:bg-black/50 md:h-11 md:w-11"
            >
              <Heart
                size={19}
                strokeWidth={2.5}
                className="drop-shadow-md"
              />

              {favCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-[#7C0000] shadow-md">
                  {favCount}
                </span>
              )}
            </Link>

            {/* CART */}
            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#7C0000] text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition hover:scale-110 hover:bg-[#9E1A1A] md:h-11 md:w-11"
            >
              <ShoppingBag
                size={18}
                strokeWidth={2.5}
                className="drop-shadow-md"
              />

              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-[#7C0000] shadow-md">
                  {itemCount}
                </span>
              )}
            </button>

            {/* DESKTOP LOGIN / SIGNUP */}
            {!user ? (
              <>
                <button
                  onClick={onLogin}
                  className="hidden items-center justify-center rounded-full border-2 border-white px-4 py-2 text-sm font-bold text-white transition hover:scale-105 hover:bg-white hover:text-[#7C0000] sm:flex"
                >
                  Login
                </button>

                <button
                  onClick={onSignup}
                  className="hidden items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-bold text-[#7C0000] shadow-lg transition hover:scale-105 hover:bg-white/90 sm:flex"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  onClick={() =>
                    setProfileOpen((v) => !v)
                  }
                  aria-label="Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-extrabold uppercase text-[#7C0000] shadow-lg transition hover:scale-110"
                >
                  {userInitial}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 w-56 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">

                    <div className="border-b border-gray-100 px-3 pb-3">
                      <p className="text-xs text-gray-400">
                        Logged in as
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-[#7C0000]">
                        {user.username}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-[#f8f3ef] hover:text-[#7C0000]"
                    >
                      <User size={18} />
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-black/35 text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition hover:bg-black/50 lg:hidden md:h-11 md:w-11"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={22} strokeWidth={2.5} />
              ) : (
                <Menu size={22} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/45 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-screen w-[82%] max-w-[360px] flex-col bg-[#7C0000] text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/20 px-5 md:h-20">
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            Fashion Store
          </span>

          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/10 transition hover:bg-white/20"
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* SIDEBAR CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          {/* SEARCH */}
          <form
            onSubmit={submitSearch}
            className="mb-5 flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-4 py-3 shadow-md"
          >
            <Search
              size={17}
              className="shrink-0 text-white"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/75"
            />
          </form>

          {/* LINKS */}
          <div className="flex flex-col gap-1.5">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-white/15"
              >
                {link.label}
              </Link>
            ))}

            {/* ADD PRODUCT */}
            <button
              onClick={() => {
                setMobileOpen(false);
                onAddProduct();
              }}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/20 px-4 py-3 text-sm font-bold transition hover:bg-white/30"
            >
              <Plus size={17} />
              Add Product
            </button>

            {/* AUTH */}
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onLogin();
                  }}
                  className="mt-2 flex items-center justify-center rounded-full border-2 border-white px-4 py-3 text-sm font-bold transition hover:bg-white hover:text-[#7C0000]"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onSignup();
                  }}
                  className="flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-bold text-[#7C0000] transition hover:bg-white/90"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* USER */}
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 p-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg font-extrabold uppercase text-[#7C0000]">
                    {userInitial}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-white/65">
                      Logged in as
                    </p>

                    <p className="truncate text-sm font-bold text-white">
                      {user.username}
                    </p>
                  </div>
                </div>

                {/* PROFILE */}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/profile");
                  }}
                  className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-white/15"
                >
                  <User size={18} />
                  Profile
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-white/15"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}