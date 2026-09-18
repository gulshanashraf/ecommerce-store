import { Link } from "react-router-dom";
import { Camera, Users, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-maroon-deep text-cream-white/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="font-display text-2xl uppercase tracking-wide text-cream-white">
            Fashion Store
          </span>
          <p className="mt-3 max-w-xs text-sm">
            Premium fashion for everyday elegance — designed and curated for Pakistan.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Camera, label: "Instagram" },
              { Icon: Users, label: "Facebook" },
              { Icon: MessageCircle, label: "Twitter" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-white/10 transition hover:bg-cream-white/20"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-cream-white">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-cream-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-cream-white">Products</Link></li>
            <li><Link to="/categories" className="hover:text-cream-white">Categories</Link></li>
            <li><Link to="/favorites" className="hover:text-cream-white">Favorites</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-cream-white">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            {["Women", "Men", "Kids", "Accessories"].map((c) => (
              <li key={c}>
                <Link to={`/products?category=${c}`} className="hover:text-cream-white">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-cream-white">Customer Support</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-cream-white">Help</a></li>
            <li><a href="#" className="hover:text-cream-white">Contact</a></li>
            <li><a href="#" className="hover:text-cream-white">Shipping</a></li>
            <li><a href="#" className="hover:text-cream-white">Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-cream-white">Contact</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} /> +92 300 0000000</li>
            <li className="flex items-center gap-2"><Mail size={14} /> hello@fashionstore.pk</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Lahore, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-white/10 py-5 text-center text-xs text-cream-white/50">
        © 2026 Fashion Store. All Rights Reserved.
      </div>
    </footer>
  );
}
