
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

    const searchValue = query.trim();

    navigate(
      `/products?search=${encodeURIComponent(searchValue)}`
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
      className={`fixed inset-x-0 top-0 z-50 w-full overflow-visible transition-all duration-300 ${
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
      {/* =================================================
          MAIN NAVBAR
      ================================================= */}

      <div
        className="
          container-page
          mx-auto
          flex
          h-[68px]
          w-full
          max-w-full
          items-center
          gap-2
          px-3
          py-2
          text-white
          sm:h-[72px]
          sm:gap-3
          sm:px-4
          md:h-20
          md:gap-4
          md:px-0
          md:py-3
        "
      >
        {/* =================================================
            BRAND
        ================================================= */}

        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="
            flex
            min-w-0
            shrink
            items-baseline
            gap-1
            overflow-hidden
            whitespace-nowrap
            sm:gap-1.5
          "
        >
          <span
            className="
              font-display
              text-[17px]
              font-bold
              uppercase
              tracking-[0.04em]
              text-white
              drop-shadow-md
              sm:text-xl
              sm:tracking-[0.06em]
              md:text-3xl
              md:tracking-[0.08em]
            "
          >
            Fashion Store
          </span>
        </Link>

        {/* =================================================
            DESKTOP NAV LINKS
        ================================================= */}

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="whitespace-nowrap text-sm font-semibold tracking-wide text-white drop-shadow transition hover:scale-105 hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}

          {/* ADD PRODUCT */}

          <button
            type="button"
            onClick={onAddProduct}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-white bg-white/25 px-5 py-2 text-sm font-bold tracking-wide text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] backdrop-blur-md transition hover:scale-105 hover:bg-white/35"
          >
            <Plus
              size={16}
              strokeWidth={2.5}
            />
            Add Product
          </button>
        </nav>

        {/* =================================================
            DESKTOP SEARCH
        ================================================= */}

        <form
          onSubmit={submitSearch}
          className="
            hidden
            max-w-xs
            flex-1
            items-center
            gap-2
            rounded-full
            border-2
            border-white
            bg-black/30
            px-4
            py-2.5
            shadow-[0_8px_25px_rgba(0,0,0,0.3)]
            backdrop-blur-md
            transition
            md:flex
          "
        >
          <Search
            size={16}
            className="shrink-0 text-white stroke-[2.5]"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full min-w-0 bg-transparent text-sm font-medium text-white outline-none placeholder:font-semibold placeholder:text-white"
          />
        </form>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div
          className="
            ml-auto
            flex
            shrink-0
            items-center
            gap-1.5
            sm:gap-2
            md:gap-4
          "
        >
          {/* =================================================
              FAVORITES
          ================================================= */}

          <Link
            to="/favorites"
            aria-label="Favorites"
            onClick={() => setMobileOpen(false)}
            className="
              relative
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-black/35
              text-white
              shadow-[0_8px_25px_rgba(0,0,0,0.3)]
              transition
              hover:scale-110
              hover:bg-black/50
              sm:h-10
              sm:w-10
              md:h-11
              md:w-11
            "
          >
            <Heart
              size={18}
              strokeWidth={2.5}
              className="drop-shadow-md sm:size-[19px] md:size-[20px]"
            />

            {favCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-extrabold text-[#7C0000] shadow-md sm:h-5 sm:w-5 sm:text-[11px]">
                {favCount}
              </span>
            )}
          </Link>

          {/* =================================================
              CART
          ================================================= */}

          <button
            type="button"
            onClick={openCart}
            aria-label="Cart"
            className="
              relative
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-[#7C0000]
              text-white
              shadow-[0_8px_25px_rgba(0,0,0,0.3)]
              transition
              hover:scale-110
              hover:bg-[#9E1A1A]
              sm:h-10
              sm:w-10
              md:h-11
              md:w-11
            "
          >
            <ShoppingBag
              size={18}
              strokeWidth={2.5}
              className="drop-shadow-md sm:size-[19px]"
            />

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-extrabold text-[#7C0000] shadow-md sm:h-5 sm:w-5 sm:text-[11px]">
                {itemCount}
              </span>
            )}
          </button>

          {/* =================================================
              DESKTOP AUTH
          ================================================= */}

          {!user ? (
            <>
              {/* LOGIN */}

              <button
                type="button"
                onClick={onLogin}
                className="hidden items-center justify-center whitespace-nowrap rounded-full border-2 border-white px-4 py-2 text-sm font-bold text-white transition hover:scale-105 hover:bg-white hover:text-[#7C0000] sm:flex"
              >
                Login
              </button>

              {/* SIGN UP */}

              <button
                type="button"
                onClick={onSignup}
                className="hidden items-center justify-center whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-[#7C0000] shadow-lg transition hover:scale-105 hover:bg-white/90 sm:flex"
              >
                Sign Up
              </button>
            </>
          ) : (
            /* =================================================
               DESKTOP PROFILE
            ================================================= */

            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((v) => !v)
                }
                aria-label="Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-extrabold uppercase text-[#7C0000] shadow-lg transition hover:scale-110 md:h-11 md:w-11"
              >
                {userInitial}
              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div className="absolute right-0 top-14 z-[70] w-56 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">
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
                    type="button"
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
                    type="button"
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

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen((v) => !v)
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-black/35
              text-white
              shadow-[0_8px_25px_rgba(0,0,0,0.3)]
              transition
              hover:bg-black/50
              sm:h-10
              sm:w-10
              lg:hidden
            "
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X
                size={20}
                strokeWidth={2.5}
              />
            ) : (
              <Menu
                size={20}
                strokeWidth={2.5}
              />
            )}
          </button>
        </div>
      </div>

      {/* =================================================
          MOBILE MENU
      ================================================= */}

      {mobileOpen && (
        <div
          className="
            max-h-[calc(100vh-68px)]
            overflow-y-auto
            border-t
            border-white/30
            px-4
            pb-5
            pt-3
            text-white
            shadow-2xl
            sm:max-h-[calc(100vh-72px)]
            sm:px-5
            lg:hidden
          "
          style={{
            backgroundColor: "#7C0000",
          }}
        >
          {/* =================================================
              MOBILE SEARCH
          ================================================= */}

          <form
            onSubmit={submitSearch}
            className="mb-4 flex w-full items-center gap-2 rounded-full border-2 border-white/60 bg-white/15 px-4 py-2.5 shadow-md backdrop-blur-sm"
          >
            <Search
              size={17}
              className="shrink-0 text-white stroke-[2.5]"
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search..."
              className="w-full min-w-0 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/80"
            />
          </form>

          {/* =================================================
              MOBILE LINKS
          ================================================= */}

          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="rounded-xl px-3 py-3 text-sm font-bold transition hover:bg-white/20"
              >
                {link.label}
              </Link>
            ))}

            {/* =================================================
                MOBILE ADD PRODUCT
            ================================================= */}

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onAddProduct();
              }}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border-2 border-white/60 bg-white/25 px-4 py-2.5 text-sm font-bold shadow-md transition hover:bg-white/35"
            >
              <Plus
                size={16}
                strokeWidth={2.5}
              />
              Add Product
            </button>

            {/* =================================================
                MOBILE AUTH
            ================================================= */}

            {!user ? (
              <>
                {/* LOGIN */}

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLogin();
                  }}
                  className="mt-2 flex w-full items-center justify-center rounded-full border-2 border-white px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#7C0000]"
                >
                  Login
                </button>

                {/* SIGN UP */}

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onSignup();
                  }}
                  className="flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#7C0000] transition hover:bg-white/90"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* =================================================
                    MOBILE USER
                ================================================= */}

                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/15 p-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg font-extrabold uppercase text-[#7C0000]">
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

                {/* PROFILE */}

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/profile");
                  }}
                  className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition hover:bg-white/20"
                >
                  <User size={18} />
                  Profile
                </button>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-white transition hover:bg-white/20"
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

