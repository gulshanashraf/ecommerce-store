import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function BackLink({ to = "/", label = "Back to Home" }) {
  return (
    <Link
      to={to}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-maroon transition hover:opacity-70"
    >
      <ChevronLeft size={20} strokeWidth={2.5} /> {label}
    </Link>
  );
}
