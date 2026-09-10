import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../utils/categories";
import ProductImage from "./ProductImage";

export default function CategoryCarousel() {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="container-page py-10 md:py-14">
      {/* Header with Title & Hero-Style Maroon Arrows */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-wide text-[#7C0000] md:text-4xl drop-shadow-sm">
          Shop by Categories
        </h2>
        
        <div className="flex items-center gap-3 bg-black/5 p-2 rounded-full backdrop-blur-md border border-[#7C0000]/20 shadow-md">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll categories left"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C0000] text-white border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition hover:bg-[#9E1A1A] hover:scale-110"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll categories right"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C0000] text-white border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition hover:bg-[#9E1A1A] hover:scale-110"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Categories Track with Proper Padding to Avoid Zoom Cut-off */}
      <div
        ref={trackRef}
        className="no-scrollbar -mx-2 flex gap-6 overflow-x-auto scroll-smooth px-2 pt-4 pb-6"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
            className="group flex w-36 shrink-0 flex-col items-center gap-3.5 md:w-44"
          >
            <div className="relative overflow-visible rounded-full p-1.5 transition-transform duration-300 group-hover:scale-110">
              <ProductImage
                src={cat.image}
                alt={cat.name}
                className="h-32 w-32 rounded-full object-cover ring-2 ring-[#7C0000]/30 shadow-lg transition duration-300 group-hover:ring-4 group-hover:ring-[#7C0000] md:h-40 md:w-40"
              />
            </div>
            <span className="text-center text-sm font-bold tracking-wide text-gray-800 transition group-hover:text-[#7C0000] md:text-base">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}