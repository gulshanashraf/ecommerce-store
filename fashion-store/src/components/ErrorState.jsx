import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message = "Unable to load products.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-maroon/10 bg-white px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-soft text-maroon">
        <AlertTriangle size={26} />
      </div>
      <div>
        <p className="font-display text-2xl text-maroon-deep">{message}</p>
        <p className="mt-1 text-sm text-ink/60">Please try again.</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full bg-maroon px-6 py-2.5 text-sm font-medium tracking-wide text-cream-white transition hover:bg-maroon-deep"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
