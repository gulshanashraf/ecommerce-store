import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=95", // Slide 1: New classy shopping/retail store look
    eyebrow: "New Season",
    before: "",
    highlight: "Signature",
    after: " Style, Discovered",
    subtitle: "Explore our latest fashion collection.",
    cta: "Shop Now",
    to: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80", // Slide 2: Kept same as requested
    eyebrow: "Timeless Collection",
    before: "",
    highlight: "Elegant",
    after: " You, Effortlessly Defined",
    subtitle: "Discover pieces designed for every occasion.",
    cta: "Explore Collection",
    to: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=1600&q=95", // Slide 3: Beautiful boutique/shopping display look
    eyebrow: "Everyday Style",
    before: "Simple. ",
    highlight: "Elegant.",
    after: " You.",
    subtitle: "Upgrade your everyday wardrobe.",
    cta: "Shop Now",
    to: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=95", // Slide 4: Premium retail/shopping bags & products
    eyebrow: "Special Collection",
    before: "Style That ",
    highlight: "Stands Out",
    after: "",
    subtitle: "Find something made for your personality.",
    cta: "Discover Now",
    to: "/products",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [next, index]);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
              i === index ? "scale-110" : "scale-100"
            }`}
          />
          
          <div
            className="absolute inset-y-0 left-0 w-full md:w-2/3 lg:w-1/2 z-0"
            style={{
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              maskImage: 'linear-gradient(to right, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 100%)',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/40 via-transparent to-transparent" />
        </div>
      ))}

      <div className="container-page relative z-10 flex h-full items-center">
        <div key={index} className="max-w-2xl animate-reveal text-cream-white">
          <span className="mb-3 inline-block rounded-full border border-pink/60 bg-maroon-deep/30 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-pink backdrop-blur-sm">
            {SLIDES[index].eyebrow}
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.15] sm:text-5xl md:text-6xl">
            {SLIDES[index].before}
            <span className="mx-1 inline-block rounded-lg bg-[#7C0000] px-3 py-0.5 text-cream-white md:px-4 md:py-1 shadow-lg">
              {SLIDES[index].highlight}
            </span>
            {SLIDES[index].after}
          </h1>
          <p className="mt-4 max-w-md text-base text-cream-white/90 md:text-lg">
            {SLIDES[index].subtitle}
          </p>
          <Link
            to={SLIDES[index].to}
            className="mt-8 inline-block rounded-full bg-[#7C0000] px-8 py-3.5 text-sm font-semibold tracking-wide text-cream-white transition hover:bg-[#5A0000] shadow-xl hover:scale-105"
          >
            {SLIDES[index].cta}
          </Link>
        </div>
      </div>

      {/* Maroon & Glowing Navigation Arrows & Dots */}
      <div className="absolute bottom-7 right-6 z-10 flex items-center gap-3 md:right-10 bg-black/40 p-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-2xl">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C0000] text-white border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition hover:bg-[#9E1A1A] hover:scale-110"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        
        <div className="flex items-center gap-2 px-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-[#7C0000] border border-white shadow-md" : "w-3 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7C0000] text-white border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition hover:bg-[#9E1A1A] hover:scale-110"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}