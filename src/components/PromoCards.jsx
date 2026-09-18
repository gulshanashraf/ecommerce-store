import { Truck, Sparkles, Tag } from "lucide-react";

const CARDS = [
  {
    icon: Truck,
    title: "Free Delivery",
    text: "On all orders over Rs. 5,000 nationwide.",
  },
  {
    icon: Sparkles,
    title: "New Season",
    text: "Fresh arrivals every week, curated for you.",
    accent: true,
  },
  {
    icon: Tag,
    title: "Special Offer",
    text: "Seasonal edits at prices worth celebrating.",
  },
];

// Duplicated once so the track can loop seamlessly at translateX(-50%).
const TRACK = [...CARDS, ...CARDS];

export default function PromoCards() {
  return (
    <section className="py-8 md:py-10">
      <h2 className="container-page mb-6 text-center font-display text-3xl font-bold uppercase tracking-wide text-maroon-deep md:text-4xl">
        Why Shop With Us
      </h2>

      <div className="group relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
          {TRACK.map(({ icon: Icon, title, text, accent }, i) => (
            <div
              key={i}
              className={`flex w-64 shrink-0 flex-col items-center rounded-2xl border border-maroon/10 px-6 py-8 text-center sm:w-72 ${
                accent ? "bg-maroon text-cream-white" : "bg-cream"
              }`}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                  accent ? "bg-cream-white/15 text-cream-white" : "bg-pink-soft text-maroon"
                }`}
              >
                <Icon size={22} />
              </div>
              <h3 className={`font-display text-xl ${accent ? "text-cream-white" : "text-maroon-deep"}`}>
                {title}
              </h3>
              <p className={`mt-1.5 text-sm ${accent ? "text-cream-white/80" : "text-ink/60"}`}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
