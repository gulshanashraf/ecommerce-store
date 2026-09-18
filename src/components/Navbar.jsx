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

  // User ke naam ka first letter
  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();

    navigate(
      `/products?search=${encodeURIComponent(query)}`
    );

    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-white/20 shadow-2xl backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{
        backgroundColor: solid
          ? "#7C0000"
          : "transparent",
      }}
    >
      <div className="container-page flex h-[72px] items-center gap-4 py-3 md:h-20 text-white">

        {/* ========================= */}
        {/* BRAND */}
        {/* ========================= */}

        <Link
          to="/"
          className="flex shrink-0 items-baseline gap-1.5"
        >
          <span className="font-display text-2xl font-bold uppercase tracking-[0.08em] md:text-3xl drop-shadow-md text-white">
            Fashion Store
          </span>
        </Link>

        {/* ========================= */}
        {/* DESKTOP NAV LINKS */}
        {/* ========================= */}

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-semibold tracking-wide transition text-white drop-shadow hover:text-white/80 scale-105"
            >
              {link.label}
            </Link>
          ))}

          {/* Add Product */}
          <button
            onClick={onAddProduct}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold tracking-wide transition border-2 border-white bg-white/25 text-white hover:bg-white/35 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:scale-105"
          >
            <Plus
              size={16}
              strokeWidth={2.5}
            />
            Add Product
          </button>
        </nav>

        {/* ========================= */}
        {/* SEARCH */}
        {/* ========================= */}

        <form
          onSubmit={submitSearch}
          className="hidden max-w-xs flex-1 items-center gap-2 rounded-full px-4.5 py-2.5 backdrop-blur-md md:flex transition border-2 border-white bg-black/30 shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
        >
          <Search
            size={16}
            className="text-white stroke-[2.5]"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-white placeholder:font-semibold text-white font-medium"
          />
        </form>

        {/* ========================= */}
        {/* ACTIONS */}
        {/* ========================= */}

        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-4">

          {/* FAVORITES */}
          <Link
            to="/favorites"
            aria-label="Favorites"
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition bg-black/35 border-2 border-white text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:bg-black/50 hover:scale-110"
          >
            <Heart
              size={20}
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
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition bg-[#7C0000] border-2 border-white text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:bg-[#9E1A1A] hover:scale-110"
          >
            <ShoppingBag
              size={19}
              strokeWidth={2.5}
              className="drop-shadow-md"
            />

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-[#7C0000] shadow-md">
                {itemCount}
              </span>
            )}
          </button>

          {/* ========================= */}
          {/* AUTH */}
          {/* ========================= */}

          {!user ? (
            <>
              {/* LOGIN */}
              <button
                onClick={onLogin}
                className="hidden sm:flex items-center justify-center rounded-full border-2 border-white px-4 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-[#7C0000] hover:scale-105"
              >
                Login
              </button>

              {/* SIGN UP */}
              <button
                onClick={onSignup}
                className="hidden sm:flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-bold text-[#7C0000] transition hover:bg-white/90 hover:scale-105 shadow-lg"
              >
                Sign Up
              </button>
            </>
          ) : (
            /* ========================= */
            /* LOGGED IN DP */
            /* ========================= */

            <div className="relative hidden sm:block">

              <button
                onClick={() =>
                  setProfileOpen((v) => !v)
                }
                aria-label="Profile"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#7C0000] text-lg font-extrabold uppercase shadow-lg transition hover:scale-110"
              >
                {userInitial}
              </button>

              {/* PROFILE DROPDOWN */}
              {profileOpen && (
                <div className="absolute right-0 top-14 w-56 rounded-2xl bg-white p-3 shadow-2xl border border-gray-100">

                  {/* USER NAME */}
                  <div className="border-b border-gray-100 px-3 pb-3">
                    <p className="text-xs text-gray-400">
                      Logged in as
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-[#7C0000]">
                      {user.username}
                    </p>
                  </div>

                  {/* PROFILE */}
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

                  {/* LOGOUT */}
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
            onClick={() =>
              setMobileOpen((v) => !v)
            }
            className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden transition bg-black/35 border-2 border-white text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X
                size={22}
                strokeWidth={2.5}
              />
            ) : (
              <Menu
                size={22}
                strokeWidth={2.5}
              />
            )}
          </button>

        </div>
      </div>

      {/* ========================= */}
      {/* MOBILE MENU */}
      {/* ========================= */}

      {mobileOpen && (
        <div
          className="border-t border-white/30 px-5 pb-5 pt-3 lg:hidden text-white shadow-2xl"
          style={{
            backgroundColor: "#7C0000",
          }}
        >

          {/* MOBILE SEARCH */}
          <form
            onSubmit={submitSearch}
            className="mb-4 flex items-center gap-2 rounded-full border-2 border-white/50 bg-white/15 px-4 py-2.5 shadow-md"
          >
            <Search
              size={16}
              className="text-white stroke-[2.5]"
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-white placeholder:text-white/80 outline-none font-semibold"
            />
          </form>

          {/* MOBILE LINKS */}
          <div className="flex flex-col gap-1.5">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-white/20 transition"
              >
                {link.label}
              </Link>
            ))}

            {/* MOBILE ADD PRODUCT */}
            <button
              onClick={() => {
                setMobileOpen(false);
                onAddProduct();
              }}
              className="mt-2 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-white/25 px-4 py-2.5 text-sm font-bold hover:bg-white/35 transition border-2 border-white/50 shadow-md"
            >
              <Plus
                size={16}
                strokeWidth={2.5}
              />
              Add Product
            </button>

            {/* ========================= */}
            {/* MOBILE AUTH */}
            {/* ========================= */}

            {!user ? (
              <>
                {/* MOBILE LOGIN */}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onLogin();
                  }}
                  className="mt-2 flex items-center justify-center rounded-full border-2 border-white px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#7C0000]"
                >
                  Login
                </button>

                {/* MOBILE SIGNUP */}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onSignup();
                  }}
                  className="flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#7C0000] transition hover:bg-white/90"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* MOBILE USER */}
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/15 p-3 border border-white/30">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#7C0000] text-lg font-extrabold uppercase">
                    {userInitial}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-white/70">
                      Logged in as
                    </p>

                    <p className="truncate text-sm font-bold text-white">
                      {user.username}
                    </p>
                  </div>

                </div>

                {/* MOBILE PROFILE */}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/profile");
                  }}
                  className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold hover:bg-white/20 transition"
                >
                  <User size={18} />
                  Profile
                </button>

                {/* MOBILE LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  );
}