import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ open, onClose, title, children, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-reveal"
        onClick={onClose}
      />
      <div
        className={`relative z-10 max-h-[90vh] w-full ${maxWidth} animate-reveal overflow-hidden rounded-2xl border-2 border-[#7C0000] bg-white shadow-2xl`}
      >
        {/* Modal Header with Solid Maroon (#7C0000) and Bold White Text */}
        <div 
          className="relative flex items-center justify-between px-6 py-4 md:px-8 shadow-md"
          style={{ backgroundColor: "#7C0000" }}
        >
          <h2 className="font-display text-xl font-bold uppercase tracking-[0.06em] text-white md:text-2xl drop-shadow-sm">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 border-2 border-white text-white shadow-md transition hover:bg-white/40 hover:scale-110"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div className="max-h-[calc(90vh-64px)] overflow-y-auto p-6 md:p-8 bg-white">{children}</div>
      </div>
    </div>
  );
}