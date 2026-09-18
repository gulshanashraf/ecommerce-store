import { Link } from "react-router-dom";

export default function FinalBanner() {
  return (
    <section className="container-page py-10 md:py-14">
      {/* Banner Container with Soft Shadow and Clean Professional Look */}
      <div className="relative overflow-hidden rounded-3xl bg-black shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1800&q=95"
          alt="Find Your Perfect Style"
          className="h-[420px] w-full object-cover object-center md:h-[480px] transition-transform duration-700 hover:scale-105"
        />
        
        {/* Left side par halka sa soft fade taake text bilkul wazeh dikhe, right side bilkul crystal clear aur saaf product view */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent md:w-3/5 pointer-events-none" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-md px-6 md:px-14 z-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-white/90 drop-shadow-md">
              Fashion Store
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-white md:text-5xl drop-shadow-lg">
              Find Your Perfect Style
            </h2>
            <p className="mt-3 max-w-sm text-white/90 font-medium leading-relaxed drop-shadow">
              Premium fabrics, modern silhouettes and everyday essentials — all in one place.
            </p>
            <Link
              to="/products"
              className="mt-7 inline-block rounded-full bg-[#7C0000] px-9 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-[#5A0000] shadow-xl hover:scale-105 border border-white/20"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}